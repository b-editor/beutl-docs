---
title: Pitfalls in Extension Development
description: Behaviors of Beutl 2.x that are easy to miss when building, packaging and testing an extension, and how to work with them.
---

This page collects behaviors that the API does not make obvious and that extension authors have run into. Where Beutl itself should change, the item links to the issue that tracks it. This page targets Beutl 2.0.0-preview.16; rebuild extensions against its SDK after migrating the APIs below.

## Migrating from preview.15 {/* #migrating-from-preview-15 */}

Check these changes when you move an extension from preview.15. Most extensions only need a rebuild against the preview.16 SDK, with their test projects moved to Avalonia 12.2.0. An extension that creates a scene renderer, a compositor or an object template service itself, implements the proxy store or the proxy job queue, or uses `SpeedIntegrator` has to change. Removed APIs have no compatibility shims.

- **Test projects:** The target framework stays `net11.0`. Avalonia moves to 12.2.0, so a test project that pins Avalonia packages, such as `Avalonia.Headless`, to Beutl's version moves to 12.2.0; a `BeutlHostPackageReference` follows on its own. The file format floor rises to preview.15: a project saved by preview.16 opens in preview.15 and later, and preview.11 to preview.14 refuse it. See the [version table](version-mapping.md).
- **`SceneRenderer`, `SceneComposer`, `SceneCompositor`, `ObjectTemplateService`:** Their constructors, and `ObjectTemplatePreviewRenderer.RenderPngAsync`, take a `SceneRenderServices` instead of the separate `FontManager?`, `EditorConfig?`, `ProxyStoreConfig?` and `DecoderRegistry?` parameters. The two constructors of `SceneComposer` are now one, `SceneComposer(scene, services, disableResourceShare, forceOriginalSource)`. `SceneCompositor.Fonts` and `Decoders` still give the fonts and the registry, which they read from its new `Services`. See [rendering a scene](media-providers.md#rendering-a-scene).
- **Proxies:** `TryGet`, `TryTransition`, `Delete` and `Touch` of `IProxyStore`, and `EnqueueAsync` of `IProxyJobQueue`, take an optional `VideoDeinterlaceOptions deinterlace` as their last parameter. Code that calls them only needs a rebuild, but a class that implements either interface must add the parameter, and a package built for preview.15 that implements one does not load in preview.16. A proxy generator receives an element's deinterlacing settings in `ProxyJob.Deinterlace` and registers its `ProxyEntry` with the same `Deinterlace`: Beutl uses a proxy only for an element whose settings match it. The store no longer reads the proxies that preview.15 made, so they have to be made again.
- **`SpeedIntegrator`:** The constructor no longer takes a sample rate: it is `SpeedIntegrator(Action? invalidateCallback = null)`, and `SampleRate` and `TryGetCache(int)` are removed. It integrates keyframed speed exactly from keyframe to keyframe instead of summing it 60 times a second, so a clip whose speed is keyframed maps to slightly different source times than before, by up to several frames on a steep ramp. It also notices keyframes that were added, removed or moved since it last integrated.
- **Video sources:** `SourceVideo` saves two new settings, how to read the source's transfer curve and whether to deinterlace it, which the user sets from **Transfer Curve** and **Deinterlace** in the menu of its **Source** property. `IDecoderInfo` gains `Capabilities`, and `IProxyResolver` a `Resolve` overload that takes the deinterlacing settings, both with default implementations. A decoder follows these settings through what it reports; see [decoders](media-providers.md#decoders).
- **Property editors with a field per component:** A control can now tell the context which components the user typed in, through `IValueEditorContext<TEdit>.PreviewEdit(value, relative, editedComponents)`, and `PropertyEditorViewModel<TValue>` passes them on to a new `ReplaceUnderExpression` overload. Both call the overloads without the components by default, so an existing context works as before. See [editing under an expression](editor-integration.md#editing-under-an-expression).

## Migrating from preview.14 {/* #migrating-from-preview-14 */}

Check these changes when you move an extension from preview.14. The decoders now belong to the host, as most other services did in preview.14: an extension that opens media itself, renders a scene, or implements one of the interfaces below has to change. Other extensions only need a rebuild, because many methods that open media gained an optional `DecoderRegistry? decoders` parameter. Removed APIs have no compatibility shims.

- **Test projects:** The target framework stays `net11.0`, Avalonia stays at 12.1.6, and the file format floor stays at preview.11, so a project saved by preview.15 still opens in preview.11. See the [version table](version-mapping.md).
- **`DecoderRegistry`:** No longer static. The host owns one, which `context.Services` in `Load` and the editor's `GetService` provide. `Register`, `Unregister`, `EnumerateDecoder`, `GuessDecoder`, `OpenMediaFile`, `ProxyResolver` and `DecodersChanged` are members of that instance, `DecoderRegistry.Initialize(config)` is now the constructor `new DecoderRegistry(config)`, and what the static `DecoderFileExtensions` did is now on its `FileExtensions`. `DecodingExtension` registers its decoder in the registry of the context it loads in. See [the decoder registry](media-providers.md#decoder-registry).
- **Opening media:** `MediaReader.Open` takes the registry as its last argument. A `VideoSource` or `SoundSource` that has a file throws `InvalidOperationException` when it is reconciled with a `CompositionContext` whose `Decoders` is `null`, so pass the host's registry wherever an API takes `DecoderRegistry? decoders`, such as `SceneRenderer`, `ExportRendererFactory.Create`, and `TryGetOriginalDuration` of `SourceSound` and `SourceVideo`. A test registers its decoders in a registry of its own.
- **Custom `IOriginalDurationProvider`, `IThumbnailsProvider` and `IProxyGeneratorFactory`:** `TryGetOriginalDuration`, `GetThumbnailStripAsync` and `GetWaveformChunksAsync` take `DecoderRegistry? decoders = null` as their last parameter, and `IProxyGeneratorFactory.Create` takes the `DecoderRegistry` to open the source with. A class that implements them must add the parameter, and a package built for preview.14 that implements one of them does not load in preview.15. A `Sound` that overrides `GetClipLayout` adds the same last parameter. Open media with the registry they receive.
- **Custom `ITimeMappedSource`:** `GetSourceDuration()` is now `GetSourceDuration(DecoderRegistry? decoders = null)`. It has a default implementation, so a class that kept the parameterless method still compiles, but Beutl no longer calls it, and edits stop keeping `OffsetPosition` within the timeline's length. Add the parameter. See [time-based content and splitting](#time-based-content-and-splitting).
- **Custom `IGenerativeRunHost`:** The new `Decoders` property has no default implementation, so a class that implements the interface must add it. `GenerativeGraphRunner` evaluates the graph and loads the nodes' previews with that registry.
- **Windows that your extension opens:** Copy `ControlDecoders.Decoders` from the opener as well. See [windows that your extension opens](#windows-that-your-extension-opens).
- **Project fonts:** Opening a project no longer loads its bundled fonts into the host's `FontManager`. Each scene editor resolves them through a `FontManager` of its own, which forks the host's, so the project's text drawn or measured with the `FontManager` from `Load` falls back to another font. Use the editor's. See [drawing text and pixels](#drawing-text-and-pixels).
- **Keyframes and expressions together:** The editor no longer removes an expression when the user adds keyframes, nor the keyframes when the user sets an expression, because an expression can now read them as `Value`. While `HasExpression` is `true`, the expression decides the value, even when `GetKeyFrameAnimation()` returns keyframes. See [keyframes and expressions](engine-object.md#keyframes-and-expressions).
- **Property editors:** A value editor can stay editable while its property has an expression, and then edits the value under it. `IValueEditorContext<TEdit>` has new members with default implementations, so an existing context still compiles and works as before. See [editing under an expression](editor-integration.md#editing-under-an-expression).
- **Browser downloads:** `BrowserDownloadOffer` now tells the method of the request that `Source` answered. An extension that requests `Source` itself checks `CanRequestAgain` first. See [browser downloads](editor-integration.md#browser-downloads).
- **Beutl's folder on Windows:** A new installation goes to `%LOCALAPPDATA%\Programs\Beutl` for the current user by default, without administrator rights, and an update keeps the folder of the installation it replaces. Find Beutl's own files from `AppContext.BaseDirectory` rather than assume `Program Files`.

## Migrating from preview.13 {/* #migrating-from-preview-13 */}

Check these changes when you move an extension from preview.13. Most of the global singletons that extensions used are gone: an extension takes the host's services from the context that `Load` receives. Every extension overrides `Load`, so every extension has to change and be rebuilt. Removed APIs have no compatibility shims.

- **Test projects:** The target framework stays `net11.0`, Avalonia stays at 12.1.6, and the file format floor stays at preview.11, so a project saved by preview.14 still opens in preview.11. See the [version table](version-mapping.md).
- **`Extension.Load()` and `Unload()`:** They are now `Load(IExtensionContext context)` and `Unload(IExtensionContext context)`, and `context.Services` gives the host's services. A subclass of `ThemeExtension`, `DecodingExtension`, `ProxyExtension` or `TutorialExtension` that overrides them passes the context on to the base method. A package built for preview.13 that overrides `Load()` or `Unload()` does not load in preview.14. See [services from the host](#services-from-the-host).
- **`LibraryService.Current`, `ObjectTemplateService.Instance`:** Removed. Resolve `LibraryService` or `ObjectTemplateService` from `context.Services`, or from the editor's `IEditorContext`. See [registering with the library](engine-object.md#registering-with-the-library).
- **`TutorialService`:** Removed with its `Current`. `TutorialExtension` registers its tutorials with the `ITutorialService` of the context, so code that calls its `Load` itself, such as a test, passes a context that provides one.
- **`GlobalConfiguration.Instance`:** Removed. Resolve `GlobalConfiguration` and read the section you need from it, such as `EditorConfig`. Its constructor is now public, so a test can make its own. `RenderCacheOptions.CreateFromGlobalConfiguration()` is now `CreateFromConfiguration(EditorConfig)`.
- **`Scene.AddChild`, `MoveChild`, `MoveChildren`, `CloseGapAfter` and `CloseAllGaps`:** They no longer read **Settings → Editor → Automatically adjusts scene duration** from `GlobalConfiguration.Instance`, and take `bool autoAdjustDuration` instead, `true` by default. Without the argument, they lengthen the scene to reach the elements even when the user turned the setting off. To follow the setting, pass `EditorConfig.AutoAdjustSceneDuration.Value` of the host's `GlobalConfiguration`.
- **`NotificationService`:** No longer static, and `NotificationService.Handler` is removed. Resolve `INotificationService` and call `Show`, `ShowInformation`, `ShowSuccess`, `ShowWarning` or `ShowError`, extension methods in `Beutl.Services` that take the same parameters as before.
- **`FontManager.Instance`:** Removed with `FontManager.Initialize` and `FontFamily.Typefaces`. `FormattedText`, `TextElements` and `TextElementsBuilder` take the `FontManager` to use, and `fonts.GetTypefaces(family)` lists the typefaces of a family. See [drawing text and pixels](#drawing-text-and-pixels).
- **Custom `IGenerativeRunHost`:** The new `Fonts` property has no default implementation, so a class that implements the interface must add it. `GenerativeGraphRunner` evaluates the graph with that `FontManager` when it captures a node's inputs.
- **Windows that your extension opens:** The controls of `Beutl.Controls` take the user's settings and the host's fonts from attached properties that Beutl sets on its windows. See [windows that your extension opens](#windows-that-your-extension-opens).
- **Render callbacks:** Each raster that a callback reads describes its footprint with one `RenderPlacement`. Read `Placement` on `EffectTarget`, `RenderExecutionInput`, `MaterializedInputDescription`, `OpaqueRenderOutput` and `RenderCallbackCanvas`, and `OutputPlacement` on `GeometrySession`, `OpaqueRenderSession` and `ShaderExecutionContext`, in place of their removed `Bounds`, `EffectiveScale`, `Scale`, `Density`, `WorkingScale`, `DeviceBounds`, `DeviceSize`, `DeviceGridOffset`, `LogicalOrigin`, `LogicalBounds`, `RasterBounds` and `RequiredRegion` members. `EffectTarget.Bounds` stays, and still moves the content. `MaterializedInputDescription.FromRenderTarget` takes a `RenderPlacement`. See [processing the render target](implement-effect.md#processing-the-render-target).
- **`GradingColorPicker`:** `IsDragging` and `StopDrag()` are removed. Follow the edits through `ColorChanged` and `ColorConfirmed`.
- **Beutl's UI fonts:** `Beutl.Controls` no longer embeds them, so the `avares://Beutl.Controls/Assets/Fonts/...` resources are gone. Use `UiFonts.DefaultFontFamily` or `UiFonts.GetFontFamily(culture)` in `Beutl.Controls.Styling`.
- **Async methods:** The SDK compiles `async` methods that return `Task` or `ValueTask` with .NET 11 runtime async. Such a method no longer carries `AsyncStateMachineAttribute`, and the continuation of a task created with `TaskCreationOptions.RunContinuationsAsynchronously` reaches the UI thread through the thread pool, so it can run after work posted to the UI thread right after the task completed. See [runtime async](create-csproj.md#runtime-async).
- **Browser downloads:** `Claim` and `ImportAsync` of `BrowserDownloadExtension` have default implementations, and the new `TryDownloadPageAsync` handles the browser's **Download file** command. See [browser downloads](editor-integration.md#downloading-the-pages-media).
- **Updates of your extension:** Beutl now installs new releases of store extensions automatically by default. See [target version and automatic updates](publish.md#target-version-and-automatic-updates).

## Migrating from preview.12 {/* #migrating-from-preview-12 */}

Check these changes when you move an extension from preview.12. No public API was removed in preview.13.

- **Test projects:** The target framework stays `net11.0`, Avalonia stays at 12.1.6, and the file format floor stays at preview.11, so a project saved by preview.13 still opens in preview.11. See the [version table](version-mapping.md).
- **Custom `ILayerAttributeService`:** The new `SetName(Scene scene, int zIndex, string name)` has no default implementation, so a class that implements the interface must add it. It names the layer at `zIndex`, creating its `TimelineLayer` when there is none, so that the name moves with the layer. An empty name clears the name and removes a `TimelineLayer` left with only default values. It returns `true` and commits one history entry when the name changed. Code that only calls the service needs no change.
- **BT.709 video:** `BitmapColorSpaceMapping.GetTransferFunction` maps the BT.709 and BT.2020 SDR tags to the new `BitmapColorSpaceTransferFn.CoreMedia709`, so such video decodes with darker shadows and exports with brighter shadow codes. See [decoders](media-providers.md#decoders).
- **Property editors:** With several elements selected, the property panel edits them together through a copy of one of them, and repeats each change to the copy on every element. See [several selected elements](editor-integration.md#several-selected-elements).
- **Code in string properties:** Mark a property that holds a shader or a script with `[DataType(CustomDataTypes.Code)]` for a monospace field that keeps its lines and takes Tab. `DataType.MultilineText` fields now wrap long lines. See [declaring properties](engine-object.md#declaring-properties).

## Migrating from preview.11 {/* #migrating-from-preview-11 */}

Check these changes when you move an extension from preview.11. No public API was removed in preview.12.

- **Target framework:** The packages and `Beutl.Extensibility.Sdk` target `net11.0`, so build with the .NET 11 SDK (Visual Studio 2026 18.12 or later). The SDK sets `net11.0` for a project that names no framework; change a project or a test project that names `net10.0`. An extension built for `net10.0` against preview.11 still loads in preview.12. See [project setup](create-csproj.md).
- **Test projects:** The file format floor stays at preview.11, so a project saved by preview.12 still opens in preview.11. A test project that pins Avalonia packages, such as `Avalonia.Headless`, to Beutl's version moves to 12.1.6. See the [version table](version-mapping.md).
- **Audio effects:** When a source's sample rate differs from the project's, its effects run at the source's rate, and Beutl converts to the project's rate after them. Take the rate from `AudioProcessContext.SampleRate` or the buffer, not from the project. See [sample rates](audio-effects.md#sample-rates).
- **Times you show:** The editor shows times as timecodes by default, and the user can switch to time or frame numbers. To match it, write a time with `TimeDisplayFormatter.Format` in the user's `EditorConfig.TimeDisplayFormat`. See [media time](media-providers.md#media-time-and-project-rates).
- **Effects in the library:** The library and the effect picker show each effect as a moving thumbnail. Register a recipe for each of your effects; without one, its thumbnail plays at its defaults over a sample picture. See [library thumbnails](implement-effect.md#library-thumbnails).
- **`ColorBalancePad.DragStarted`:** Raised once a press has traveled 3 pixels instead of on the press, and the pointer lock starts then too. A click raises neither `DragStarted` nor `DragCompleted`.
- **Custom `IPreviewPlayer`:** The new `CleanPreviewImage` returns `PreviewImage` by default, and `AcquireCleanPreview()` a handle that does nothing. Override them in a player that draws over its frames, such as a selection outline: the library draws effect thumbnails on that frame.

## Migrating from preview.10 {/* #migrating-from-preview-10 */}

Check these changes when you move an extension from preview.10. Removed APIs have no compatibility shims.

- **Test projects:** A project saved by preview.11 does not open in preview.10 or earlier. See the [version table](version-mapping.md).
- **`FAColorPicker`, `ColorPickerButton`, `ColorPickerFlyout`:** Removed from `Beutl.Controls` with the rest of its copy of the FluentAvalonia color picker in `FluentAvalonia.UI.Controls`: `ColorButtonColorChangedEventArgs`, `ColorChangedEventArgs`, `ColorComponent`, `ColorPickerComponent`, `ColorRamp`, `ColorSpectrum`, `ColorSpectrumComponents`, `ColorSpectrumShape`, `ColorTextType`, and the themes `ColorPickerStyles.axaml` and `ColorPickerButtonStyles.axaml`. Use `SimpleColorPicker`, or `SimpleColorPickerButton` for a color that is not a property of an object. See [shared controls](#use-the-shared-controls).
- **`ColorPaletteItem`:** Moved from `FluentAvalonia.UI.Controls` to `Beutl.Controls.PropertyEditors`. It raises `Click` instead of setting the color of the `FAColorPicker` around it. `Beutl.Controls.Behaviors.ColorPaletteItemBehavior` and the `ColorPaletteItemTemplate` resource are removed.
- **`SimpleColorPicker.SetColor`:** Also sets the picker's `Color`. It used to raise the events only.
- **`ColorGradingWheel`:** `InputType`, `InputTypeProperty`, `ShowDetails` and `ShowDetailsProperty` are removed. Its template parts are now `PART_Layout`, `PART_Header`, `PART_Pad`, `PART_MasterWheel`, `PART_Components` and `PART_ResetButton` instead of `PART_GradingColorPicker`, so a custom theme has to provide them. Set the new `Neutral` to the property's default when that is not zero; `MaxChroma`, `MasterRange` and `IsSideBySide` are new as well.
- **Theme and app resources:** `BeutlDarkBorder.axaml` and `BeutlDarkColors.axaml` no longer define the keys only the FluentAvalonia picker read: `ColorPickerBackground`, `ColorPickerComponentLabelBackground`, `ColorPickerTabsBackground`, `ColorPickerTabItemForeground`, `ColorPickerTabItemForegroundPointerOver`, `ColorPickerTabItemForegroundSelected`, `ColorPickerTabItemSelectionIndicatorColor`, `ColorPickerTabItemSelectionIndicatorPointerOver`, `ColorPickerColorTypeButtonBackground`, `ColorPickerMoreButtonForeground`, `ColorPickerMoreButtonForegroundPressed` and `ColorPickerColorPaletteItemBorderBrushPointerOver`. The app resource `PaletteColors` and the color grading tab's `MinimalNumberEditor` and `PropertiesVisibilityToggleButtonStyle` are gone too.
- **`UIToneMappingOperator`:** `None` is now `5` instead of `0`, and `0` is the new `Auto`, which is also `default(UIToneMappingOperator)`. Rebuild an extension compiled against the old values, and name `None` where code relied on `default` meaning None. `EditorConfig.ToneMappingMode` defaults to `Auto`, a saved `0` reads as `Auto`, and `UIToneMappingOperatorExtensions.Resolve(mode, showsHdr)` gives the operator a preview applies.
- **`DynamicsNode.MapChannels`:** Removed. A node deriving from `DynamicsNode` reads each channel with `AudioBuffer.GetChannelData(channel)`.
- **`MessageStrings`, `Strings`, `TutorialStrings`:** `MessageStrings.ConfirmInstall`, `UpdateCompletedLaunchConfirm`, `UpdateCompletedLaunchPrompt`, `ApplicationNotLaunched`, `ApplicationPathNotSpecified`, `Strings.CreateNewProjectOrScene`, `OpenAFileYouHaveAlreadyCreated`, `StartEditing`, `All`, `Projects`, `Files`, `Recently`, `NoFilesUsedRecently`, `Previous` and `TutorialStrings.StartTutorial` are gone. Provide your own strings.
- **Starting playback:** Call `IPreviewPlayer.Play()` instead of running `editor.playPause`, and time live input with `GetPlaybackTime()`. See [the playhead during playback](#the-playhead-during-playback).
- **Encoders that write several files:** List them in `EncodingController.OutputFiles` instead of moving them out of Beutl's staging folder yourself. See [writing several files](media-providers.md#writing-several-files).
- **References to a library Beutl ships:** Replace a `PackageReference` that sets `ExcludeAssets` and `PrivateAssets`, or pins Beutl's version, with `BeutlHostPackageReference`. See [libraries that Beutl already ships](#libraries-that-beutl-already-ships).
- **Drawables added through `IElementAdder` or `IElementObjectService`:** A new drawable whose transform group is still empty gets a `TranslateTransform`, a `RotationTransform` and a `ScaleTransform`. Do not add your own `TranslateTransform` to it afterwards, or it has two. See [element sources](editor-integration.md#element-sources).
- **State saved outside properties:** An explicit save writes only the elements whose properties changed since the last one. See [keep saved state in properties](#keep-saved-state-in-properties).
- **Context menus on macOS:** A `ContextMenu` or a context flyout opens as a native menu by default. See [context menus on macOS](#context-menus-on-macos).
- **Custom `ISceneSettingsService`:** The new `Apply` overload that takes `masterVolume` has a default implementation, which writes `Scene.MasterVolume` and calls the overload without it. Override it so that a change of the master volume alone is committed too.
- **Custom `INodeGraphMutationService`:** The new `CanConnect(GraphModel, GraphNode, INodePort?, GraphNode, INodePort?)` has a default implementation that answers `false` for a `null` port. Override it if your service adds ports to dynamic-port nodes.

## Migrating from preview.9 {/* #migrating-from-preview-9 */}

Check these changes when you move an extension from preview.9. Removed and moved APIs have no compatibility shims.

- **`Drawable` and `FilterEffect` overrides:** Move them onto the nested `Resource`. See [drawing objects](implement-drawing-object.md#migrating-from-preview-9) and [effects](implement-effect.md#migrating-from-preview-9).
- **`CustomEffect` callbacks:** A callback run by the renderer can no longer launch another renderer. Use `RenderDependency`; see [effects](implement-effect.md#processing-the-render-target).
- **Code that reads a `MediaReader`:** `ReadAudio` returns `AudioStreamInfo.ChannelLayout` channels instead of always stereo, so handle any channel count. See [decoders](media-providers.md#decoders).
- **`ISampleProvider` implementations and encoders:** Declare `ChannelLayout` when a provider returns anything other than stereo, and take the encoder's channel count from it. See [provider contracts](media-providers.md#provider-contracts).
- **`AudioEffect` and `AudioNode` implementations:** They receive the project's channel count in a 5.1 or 7.1 project. See [channel layouts](audio-effects.md#channel-layouts).
- **`StrokeEffect.Style`, `StrokeEffect.StrokeStyles`:** Removed. Where code set `Style` to `Foreground`, set the pen's `StrokeOrder` to `StrokeOrder.BelowFill`. `Background` is the default `AboveFill`.
- **`NotifySplitted` on `SourceVideo`, `SourceSound`, `SceneSound`, `SceneDrawable`:** These types no longer declare it publicly. Call it through `ISplittable` or `Element.NotifySplitted`.
- **`FontFamilyPickerFlyout`, `FontFamilyPickerFlyoutViewModel`:** Renamed to `SearchablePickerFlyout`, which takes an `ISearchablePickerViewModel`; the view model is now internal. See [shared controls](#use-the-shared-controls).
- **Custom `IElementAttributeService`:** Implement `SetTrackMatte(Element, MatteSourceKind, int?, MatteMode)` and `SetVisibleInOutput(Element, bool)`.
- **Custom `INodeGraphMutationService`:** Implement `CanConnect(GraphModel, INodePort, INodePort)` and `RewireListSlot(GraphModel, Connection, GraphNode, INodePort?)`.
- **Custom `ISceneSettingsService`:** Implement `Apply(Scene, PixelSize, MediaTime, MediaTime, SpeakerLayout)`.
- **`ExtensionsStrings`, `Strings`, `GraphicsStrings`:** `ExtensionsStrings.NoLogoImageAvailable`, `Free`, `Description`, `Package_Screenshots`, `Strings.Link` and `GraphicsStrings.StrokeEffect_Style` are gone. Provide your own strings.
- **`WeakEvents`, `WeakEvent`, `WeakEvent<TSender, TEventArgs>`, `IWeakEventSubscriber<TEventArgs>`:** Removed from `Beutl.Utilities`. Subscribe to the event directly and unsubscribe when done.
- **Test projects:** A project saved by preview.10 does not open in preview.9 or earlier. See the [version table](version-mapping.md).

## Packaging and loading

### Keep the source generator private

Since preview.9, the SDK marks `Beutl.Engine.SourceGenerators` as `PrivateAssets="all"`, so the preview.8 workaround that disabled the automatic reference is no longer needed. Remove that workaround when upgrading; the SDK keeps the generator version aligned with `$(BeutlPackagesVersion)`.

Check the `.nuspec` inside your `.nupkg`: the source generator must not appear as an install-time dependency.

### Libraries that Beutl already ships {/* #libraries-that-beutl-already-ships */}

Each extension is loaded into its own `AssemblyLoadContext`, but when Beutl ships an assembly of the same name in the same or a newer version, the extension gets Beutl's copy. If your extension asks for a newer version, its copy is loaded separately, and its types do not match Beutl's. Without `ExcludeAssets="runtime;native"`, native libraries that come in transitively, such as libSkiaSharp and HarfBuzz, also land in the `runtimes` folder of your output.

Since preview.11, reference such a library (FluentIcons, for example) with `BeutlHostPackageReference` and no version:

```xml
<ItemGroup>
  <BeutlHostPackageReference Include="FluentIcons.Avalonia.Fluent" />
</ItemGroup>
```

The SDK turns it into a `PackageReference` at the version Beutl ships, with `ExcludeAssets="runtime;native"` and `PrivateAssets="all"`. Your extension compiles against the library and runs on Beutl's copy, and nothing of the library goes into your output or package. The names it accepts are the packages in Beutl's [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/main/Directory.Packages.props), without the build, test and packaging tools, and without the libraries that only the FFmpeg worker, or the Media Foundation extension on Windows x64, loads. A name Beutl does not ship stops the restore with an error: reference a library of your own with a normal `PackageReference`.

After a build, `<AssemblyName>.deps.json` in the output should list your own assembly and only the libraries that Beutl does not ship. The SDK also references `Beutl.Controls`; see [project setup](create-csproj.md).

### Libraries that load through the default context

Since preview.11, when a library asks `AssemblyLoadContext.Default` for an assembly that only your package holds, Beutl finds it in your package. The default context loads a copy of its own, which stays loaded until Beutl exits, and your extension's context uses that copy when it is new enough, so its types keep one identity. A library already loaded in your extension's context still cannot load, through the default context, an assembly that refers back to it ([#3921](https://github.com/b-editor/beutl/issues/3921)).

### Services from the host {/* #services-from-the-host */}

Since preview.14, Beutl passes an `IExtensionContext` to `Load` and `Unload`. Its `Services` is the host's `IServiceProvider`, which provides `LibraryService`, `ObjectTemplateService`, `GlobalConfiguration`, `FontManager`, `INotificationService` and `ITutorialService`, and since preview.15 `DecoderRegistry`. It finds a service by its exact type, so ask for `GlobalConfiguration` and read a section such as `EditorConfig` from it. `GetRequiredService<T>()` is in `Microsoft.Extensions.DependencyInjection`, which the SDK's references bring.

```csharp
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;
using Beutl.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MyExtension;

[Export]
public sealed class ShapesExtension : Extension
{
    private INotificationService? _notifications;

    public override void Load(IExtensionContext context)
    {
        context.Services.GetRequiredService<LibraryService>()
            .RegisterGroup("My Shapes", group => group
                .AddDrawable<RectShape>("My Rectangle"));

        // Keep what later code needs, and let it go in Unload.
        _notifications = context.Services.GetRequiredService<INotificationService>();
    }

    public override void Unload(IExtensionContext context)
    {
        _notifications = null;
    }

    public void ReportFailure(Exception exception)
        => _notifications?.ShowError("My Shapes", exception.Message);
}
```

- Beutl loads extensions one at a time: the built-in ones first, then installed packages by name, then side-loaded ones. It calls `Unload` after a failed `Load` as well, so write `Unload` to undo only what `Load` finished, and to run more than once.
- In a command, a tool tab or another factory, take services from the editor it serves, such as `execution.EditorContext` or the `IEditorContext` that a tool tab is created for: the scene editor provides the services above, and its own, through `GetService`. One instance of an extension can serve more than one host, so prefer these over the services kept from `Load`. Since preview.15, the editor's `FontManager` is a fork that resolves the fonts bundled with the scene's project ahead of the host's.

### Loading is all or nothing

- Beutl looks for extensions among the public types of your assembly. An extension class must be `public`, derive from `Extension`, have the `[Export]` attribute and a parameterless constructor.
- Beutl reads the public types strictly. If one of them refers to an assembly that cannot be loaded, such as a library you excluded that Beutl does not ship, the whole package fails to load.
- If `Load` of one extension throws, every extension in the same package is rolled back.

### Sideloads

`DebugApplication` builds go to `~/.beutl/sideloads/<AssemblyName>`. Beutl only picks up a folder that contains a DLL with the folder's own name (`<name>/<name>.dll`), so keep that naming if you copy files there yourself.

### Version numbers and icons

- A stable version such as `0.1.0` that depends on Beutl's preview packages makes `dotnet pack` report NU5104. Use a prerelease version, such as `0.1.0-preview.1`, while you target a preview of Beutl.
- `PackageIcon` sets the icon inside the `.nupkg`. The icon on the store page is uploaded separately from the developer page (see [Publishing Extensions](publish.md)). Use a square image without rounded corners: the store and Beutl round them when they display it.

## Saving and editing

### Collection converters belong on the value type

Since preview.9, a collection type's own `[JsonConverter]` is honored on both save and load. Without a converter, Beutl still writes collections item by item. `ICoreSerializable` and reference values follow Beutl's own serialization paths.

A `[JsonConverter]` placed on a property member is not read by the property system. Put it on the value type, or implement the appropriate Beutl serialization contract; do not rely on the member attribute.

### Time-based content and splitting {/* #time-based-content-and-splitting */}

When the user splits an element, Beutl copies it and calls `ISplittable.NotifySplitted` on the objects of both halves. An object that plays something on its own timeline, such as comments, lyrics or lip sync, should continue in the back half from where the front half stopped. Without that, the back half starts over from the beginning.

Implement `ITimeMappedSource`, the contract `SourceVideo`, `SourceSound`, `SceneSound` and `SceneDrawable` share. Only `OffsetPosition` and `Speed` are required: the default `NotifySplitted` moves the back half's `OffsetPosition` further into the timeline, and Split, Trim and Slip rewrite it through this contract. A `Sound` subclass already has both properties, so it only needs to add the interface.

```csharp
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;

public abstract partial class TimedDrawable : Drawable, ITimeMappedSource
{
    protected TimedDrawable()
    {
        ScanProperties<TimedDrawable>();
    }

    public IExpressionProperty<MediaTime> OffsetPosition { get; } =
        Property.CreateExpression(MediaTime.Zero);

    // Null plays the timeline at 100%.
    IExpressionProperty<float>? ITimeMappedSource.Speed => null;
}
```

At the element's local time `t`, the source plays its timeline at `OffsetPosition` plus the integral of `Speed` over `[0, t]`, so draw from that position. `GetSourceDuration(decoders)` reports the timeline's length, which edits stay within; open a media file with the `DecoderRegistry` it receives. `HasDynamicMapping` defaults to `OffsetPosition.HasExpression`; override `HasDynamicTimeline` when an expression picks the timeline. Implement `ISplittable` directly only for an object without such a timeline.

### Saved but not shown

`HideProperties(...)`, a protected method of `EngineObject`, hides properties from the property panel. They are still saved, undone and copied, so use it for values that your own editor sets.

### Keep saved state in properties {/* #keep-saved-state-in-properties */}

Since preview.11, an explicit save writes only the elements whose properties changed since the last save, keyframes and lists included. The first save after a scene opens, and a save that moves files or repairs media, still write every element. Keep what your object saves in its properties: a value that only a field holds, written by your own `Serialize`, reaches the file only when something else in its element changes. Hide such a property from the panel with `HideProperties(...)` when your own editor sets it.

### One undo step for several changes {/* #one-undo-step-for-several-changes */}

A property editor can obtain `HistoryManager` from the `IServiceProvider` visitor passed to `IPropertyEditorContext.Accept`. For an explicit edit, call `BeginEdit`, change properties inside `edit.Enter()`, then call `Complete()`. Disposing an unfinished session cancels its changes.

Only one edit session may be open. Call `RunAfterEditAsync` on the UI thread to queue an independent writer behind the active session. Do not hold an `Enter()` scope across `await`.

```csharp
using Beutl;
using Beutl.Editor;
using Beutl.ProjectSystem;

public static class TimingEdits
{
    public static Task SetTimingAsync(
        HistoryManager history, Element element, MediaTime start, MediaTime length)
        => history.RunAfterEditAsync(() =>
        {
            using EditSession edit = history.BeginEdit("Change timing");
            using (edit.Enter())
            {
                element.Start.Value = start;
                element.Length.Value = length;
            }
            edit.Complete();
        });
}
```

## Editor integration

### Register timeline-compatible library items

Since preview.9, `AddDrawable<T>()` and `AddSound<T>()` register the `EngineObject` format as well as their drawable or sound format. The preview.8 `AddMultiple` workaround is no longer necessary. `BindDrawable<T>()` and `BindSound<T>()` still register both formats when building a multiple-format item.

```csharp
using Beutl.Graphics.Shapes;
using Beutl.Services;

public static class ShapeLibrary
{
    // Call this from Load with the LibraryService of the context.
    public static void Register(LibraryService library)
        => library.RegisterGroup("My Extension", group => group
            .AddDrawable<RectShape>("My Rectangle"));
}
```

A test can register into a `new LibraryService()` and check that its `GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` contains your type.

### The playhead during playback {/* #the-playhead-during-playback */}

During playback, `IEditorClock.CurrentTime` advances only when a rendered frame is shown. It moves in whole frames, and it falls behind the audio, or stops, when rendering is slow. To time live input during playback, read `IPreviewPlayer.GetPlaybackTime()` instead. It follows the audio the user hears, or the wall clock while nothing plays audio, and returns `null` while playback is stopped. While playback is starting, and during fast or reverse playback, which plays no audio, it returns the playhead.

`IPreviewPlayer.Play()` starts playback from the playhead at normal speed, and does nothing while playback is already running. Await `IPreviewPlayer.Pause()` before changing scene state that playback might still access. The scene editor provides the player as a service of its `IEditorContext`. `Play()` and `GetPlaybackTime()` have default implementations, so another `IPreviewPlayer` implementation still compiles; until it overrides them, `Play()` does nothing and `GetPlaybackTime()` returns `null`.

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

public sealed class TapRecorder(IPreviewPlayer player)
{
    private readonly List<MediaTime> _taps = [];

    public IReadOnlyList<MediaTime> Taps => _taps;

    public static TapRecorder? Create(IEditorContext editor)
        => editor.GetService(typeof(IPreviewPlayer)) is IPreviewPlayer player
            ? new TapRecorder(player)
            : null;

    public void Start()
    {
        _taps.Clear();
        player.Play();
    }

    // Call this from the key or pointer handler of each tap.
    public void Tap()
    {
        if (player.GetPlaybackTime() is { } time)
            _taps.Add(time);
    }

    public Task StopAsync() => player.Pause();
}
```

`IEditorClock.CurrentTime` is read-only and contains a `MediaTime`; seek with `IEditorClock.Seek(time)`. Likewise, change the selected object with `IEditorSelection.Select(obj)`, and use `SelectedElements` for the shared timeline selection. See [editor integration](editor-integration.md) for registering commands.

### Tool tabs

- `ToolTabExtension.Header` labels the tool picker; returning `null` hides the tool there. Open tabs use the per-instance `IToolContext.Header` reactive property.
- `OpenToolTab` brings an already-open context to the front. Use `FindToolTab<T>()` to reuse one.
- Implement `IPinnableToolContext` for a tab that can remain on its target instead of following selection. Keep `IsPinned` and `HasTarget` in sync with the target's lifetime.
- Override `ReuseContentAcrossActivation` only when the same control should survive tab activation changes. It can still leave and re-enter the visual tree; a reused `IDisposable` control is disposed before its context when the tab closes.
- `GetIcon()` returns a FluentAvalonia 3 `FAIconSource`. Return a new icon source for each call.

## UI

### Use the shared controls {/* #use-the-shared-controls */}

`Beutl.Controls` is now a public package automatically referenced by the SDK. Use `Beutl.Controls.ToolTabBar` instead of rebuilding it from private theme resource keys. For built-in property editor integration, use the [typed registrations](editor-integration.md#property-editors) in `Beutl.Extensibility`.

For a searchable, pinnable list like the font and codec pickers, derive from `SearchablePickerViewModel<TSearchKey>`, implement `Search`, and open it with `SearchablePickerFlyout`. Set `PresenterThemeKey` and `NoResultsText` for the look and wording.

`Beutl.Controls.EmptyState` tells that a view has nothing to show yet. Set `Icon`, `Title` and `Description`, and put an action, such as a button, in its content; a part that is not set takes no space. `Beutl.Controls.StatusLabel` shows the state of an item in a list or a row: `Text` is what it says, and `Kind` (`Neutral`, `Accent`, `Success`, `Caution` or `Critical`) picks its colors. Both pass `AutomationProperties.LiveSetting` on to the text they announce.

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            xmlns:controls="using:Beutl.Controls"
            xmlns:icons="using:FluentIcons.Avalonia.Fluent"
            Spacing="8">
    <controls:EmptyState Title="No markers"
                         Description="Markers you add to the timeline appear here.">
        <controls:EmptyState.Icon>
            <icons:SymbolIcon Symbol="Bookmark" />
        </controls:EmptyState.Icon>
        <Button Content="Add a marker" />
    </controls:EmptyState>
    <controls:StatusLabel Kind="Success" Text="Ready" />
</StackPanel>
```

For a color that is not a property of an object, such as one of your settings, use `Beutl.Controls.PropertyEditors.SimpleColorPickerButton`. It opens `SimpleColorPicker` with the palettes, applies the color when the user confirms it, and then raises `ColorConfirmed`. Set `IsAlphaEnabled` to `false` to keep the color opaque and hide the opacity.

`Beutl.Controls.AnimatedThumbnail`, new in preview.12, shows an `IAnimatedThumbnailSource`: its still at rest, and its frames, laid out in one sheet, in a loop while `IsPlaying` is `true`. It asks the source for the still only while it is on screen and for the frames only while it plays, so a long list loads only what is seen.

When adjusting a property's controls, check their spacing and label alignment under Beutl's theme. Headless rendering is useful for layout checks, but also check the result in Beutl before release.

### Windows that your extension opens {/* #windows-that-your-extension-opens */}

Since preview.14, the controls of `Beutl.Controls` take the user's settings and the host's fonts from inherited attached properties, `ControlConfiguration.Configuration` and `ControlFonts.Fonts`, and `ControlNotifications.Notifications` carries the host's `INotificationService` to views the same way. Since preview.15, `ControlDecoders.Decoders` carries the host's `DecoderRegistry`, which the file pickers of video and sound properties read for the file types they offer. Beutl sets them on its windows, including floating tool tabs and the windows of a `ToolWindowExtension`, and a control in a tool tab, a flyout or a popup inherits them. A window that your extension creates and shows itself has none: native context menus on macOS and the pointer lock of property drags follow their defaults instead of the user's settings, a font picker makes a font manager of its own without the project's fonts, and `ControlNotifications.GetNotifications` and `ControlDecoders.GetDecoders` return `null`. Copy them from the control that opens the window:

```csharp
using Avalonia.Controls;
using Beutl.Controls;

public static class ExtensionWindows
{
    public static void CopyHostServices(Window window, Control opener)
    {
        ControlConfiguration.SetConfiguration(window, ControlConfiguration.GetConfiguration(opener));
        ControlFonts.SetFonts(window, ControlFonts.GetFonts(opener));
        ControlNotifications.SetNotifications(window, ControlNotifications.GetNotifications(opener));
        ControlDecoders.SetDecoders(window, ControlDecoders.GetDecoders(opener));
    }
}
```

The color pickers in such a window still show only the default palette and record no recent colors.

### Context menus on macOS {/* #context-menus-on-macos */}

Since preview.11, on macOS a `ContextMenu`, or a `ContextFlyout` that is a `MenuFlyout`, `FAMenuFlyout` or `FACommandBarFlyout`, opens as a native menu while **Settings → View → Use native context menus** is on, as it is by default. The Avalonia menu still opens, unseen, so its bindings, its `Opening` handlers and `IsOpen` keep working. A `MenuItem` shows its text, check mark and input gesture, but not its `Icon`; a FluentAvalonia item also shows its `IconSource`. A menu that holds anything else, such as a `MenuItem` whose header is not text, stays an Avalonia menu, and so does a flyout opened through `Button.Flyout` or `ShowAt`. Check your menus on macOS with the setting on and off.

## Drawing text and pixels {/* #drawing-text-and-pixels */}

- Since preview.14, `FormattedText`, `TextElements` and `TextElementsBuilder` take the `FontManager` that resolves their fonts. A resource takes it from `CompositionContext.Fonts` when it reconciles, as [`TextBlock`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextBlock.cs) does: while Beutl renders a scene, it is the font manager of the scene's editor. Outside rendering, take the `FontManager` of the editor whose scene the text belongs to, or the host's for text outside a project.
- Since preview.15, the editor's font manager is a fork. `FontManager.Fork()` makes a manager that resolves the fonts that `LoadProjectFonts` loads into it ahead of its parent's, and asks its parent for the rest. Those fonts never reach the parent, while `AddFont` adds to the installed fonts that every fork shares. Beutl forks the host's fonts for the open project, and that fork again for each of its scene editors. A fork that you hand to controls with `ControlFonts.SetFonts` is let go with `ControlFonts.Release` once they no longer show it.
- `context.DrawText(text, fill, pen)` draws an outline only when `FormattedText.Pen` is set. The pen argument alone draws no outline.
- `FormattedText.Bounds` includes text advance and spacing; `ActualBounds` includes stroke ink and `RasterBounds` covers rasterized glyph masks. None is a line height. Size lines with `Metrics.Ascent`, which is negative, and `Metrics.Descent`, and put the baseline at `top - Ascent`.
- Choose a registered font that covers your text instead of assuming a platform-specific default. The font manager provides fallback families; measure with the actual typeface used for rendering.
- `TextElements.Lines` caches the formatted result on first enumeration. If you change its input afterward, create a new `TextElements` and dispose the old one.
- The constructor of `Bgra8888` takes `(r, g, b, a)`, although the fields are stored in B, G, R, A order.
- Check the alpha component when testing transparent pixels; RGB values alone do not establish transparency.

## Source

- [`Beutl.Extensibility.Sdk.csproj`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Beutl.Extensibility.Sdk.csproj)
- [`Sdk.targets`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Sdk/Sdk.targets) and [`host-libraries.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/host-libraries.md)
- [`PluginLoadContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Api/Services/PluginLoadContext.cs)
- [`Extension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/Extension.cs) and [`IExtensionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IExtensionContext.cs)
- [`INotificationService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Services/INotificationService.cs) and [`GlobalConfiguration.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/GlobalConfiguration.cs)
- [`JsonSerializationContext.Serialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Serialize.cs)
- [`JsonSerializationContext.Deserialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Deserialize.cs)
- [`ISplittable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ISplittable.cs)
- [`ITimeMappedSource.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ITimeMappedSource.cs)
- [`HistoryManager.EditSessions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/HistoryManager.EditSessions.cs)
- [`EditSession.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditSession.cs)
- [`EditedElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditedElements.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`IPreviewPlayer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/IPreviewPlayer.cs)
- [`SceneEditorExtension.Commands.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/SceneEditorExtension.Commands.cs)
- [`SceneEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/SceneEditorTabExtension.cs)
- [`IPinnableToolContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IPinnableToolContext.cs)
- [`SearchablePickerFlyout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SearchablePickerFlyout.cs)
- [`SearchablePickerViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SearchablePickerViewModel.cs)
- [`EmptyState.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/EmptyState.cs), [`StatusLabel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/StatusLabel.cs) and [`SimpleColorPickerButton.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SimpleColorPickerButton.cs)
- [`AnimatedThumbnail.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/AnimatedThumbnail.cs) and [`IAnimatedThumbnailSource.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/IAnimatedThumbnailSource.cs)
- [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs)
- [`NativeContextMenus.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/NativeContextMenus.cs) and [`ContextMenuEntry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/ContextMenuEntry.cs)
- [`ControlConfiguration.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlConfiguration.cs), [`ControlFonts.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlFonts.cs), [`ControlNotifications.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlNotifications.cs), [`ControlDecoders.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlDecoders.cs) and [`UiFonts.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Styling/UiFonts.cs)
- [`DecoderRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/DecoderRegistry.cs), [`IOriginalLengthProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/IOriginalLengthProvider.cs), [`IThumbnailsProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/IThumbnailsProvider.cs) and [`ProxyGeneratorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyGeneratorRegistry.cs)
- [`GenerativeGraphRunner.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.NodeGraph/Generative/GenerativeGraphRunner.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs) and [`Scene.Gaps.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.Gaps.cs)
- [`RenderPlacement.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderPlacement.cs)
- [`FontManager.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Font/FontManager.cs) and [`CompositionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Composition/CompositionContext.cs)
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)
- [`ILayerAttributeService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ILayerAttributeService.cs)
- [`SceneRenderServices.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/SceneRenderServices.cs) and [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/SpeedIntegrator.cs)
- [`IProxyStore.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/IProxyStore.cs), [`IProxyJobQueue.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/IProxyJobQueue.cs) and [`ProxyStoreIndex.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyStoreIndex.cs)

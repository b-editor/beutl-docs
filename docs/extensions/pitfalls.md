---
title: Pitfalls in Extension Development
description: Behaviors of Beutl 2.x that are easy to miss when building, packaging and testing an extension, and how to work with them.
---

This page collects behaviors that the API does not make obvious and that extension authors have run into. Where Beutl itself should change, the item links to the issue that tracks it. This page targets Beutl 2.0.0-preview.12; rebuild extensions against its SDK after migrating the APIs below.

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

### Loading is all or nothing

- Beutl looks for extensions among the public types of your assembly. An extension class must be `public`, derive from `Extension`, have the `[Export]` attribute and a parameterless constructor.
- Beutl reads the public types strictly. If one of them refers to an assembly that cannot be loaded, such as a library you excluded that Beutl does not ship, the whole package fails to load.
- If `Load()` of one extension throws, every extension in the same package is rolled back.

### Sideloads

`DebugApplication` builds go to `~/.beutl/sideloads/<AssemblyName>`. Beutl only picks up a folder that contains a DLL with the folder's own name (`<name>/<name>.dll`), so keep that naming if you copy files there yourself.

### Version numbers and icons

- A stable version such as `0.1.0` that depends on Beutl's preview packages makes `dotnet pack` report NU5104. Use a prerelease version, such as `0.1.0-preview.1`, while you target a preview of Beutl.
- `PackageIcon` sets the icon inside the `.nupkg`. The icon on the store page is uploaded separately from the developer page (see [Publishing Extensions](publish.md)). Use a square image without rounded corners: the store and Beutl round them when they display it.

## Saving and editing

### Collection converters belong on the value type

Since preview.9, a collection type's own `[JsonConverter]` is honored on both save and load. Without a converter, Beutl still writes collections item by item. `ICoreSerializable` and reference values follow Beutl's own serialization paths.

A `[JsonConverter]` placed on a property member is not read by the property system. Put it on the value type, or implement the appropriate Beutl serialization contract; do not rely on the member attribute.

### Time-based content and splitting

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

At the clip's local time `t`, the source plays its timeline at `OffsetPosition` plus the integral of `Speed` over `[0, t]`, so draw from that position. `GetSourceDuration()` reports the timeline's length, which edits stay within. `HasDynamicMapping` defaults to `OffsetPosition.HasExpression`; override `HasDynamicTimeline` when an expression picks the timeline. Implement `ISplittable` directly only for an object without such a timeline.

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
    public static void Register()
        => LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddDrawable<RectShape>("My Rectangle"));
}
```

A test can check that `LibraryService.Current.GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` contains your type.

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

### Context menus on macOS {/* #context-menus-on-macos */}

Since preview.11, on macOS a `ContextMenu`, or a `ContextFlyout` that is a `MenuFlyout`, `FAMenuFlyout` or `FACommandBarFlyout`, opens as a native menu while **Settings → View → Use native context menus** is on, as it is by default. The Avalonia menu still opens, unseen, so its bindings, its `Opening` handlers and `IsOpen` keep working. A `MenuItem` shows its text, check mark and input gesture, but not its `Icon`; a FluentAvalonia item also shows its `IconSource`. A menu that holds anything else, such as a `MenuItem` whose header is not text, stays an Avalonia menu, and so does a flyout opened through `Button.Flyout` or `ShowAt`. Check your menus on macOS with the setting on and off.

## Drawing text and pixels

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
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)

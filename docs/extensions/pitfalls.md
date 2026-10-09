---
title: Pitfalls in Extension Development
description: Behaviors of Beutl 2.x that are easy to miss when building, packaging and testing an extension, and how to work with them.
---

This page collects behaviors that the API does not make obvious and that extension authors have run into. Where Beutl itself should change, the item links to the issue that tracks it. Everything here was checked against Beutl 2.0.0-preview.8.

## Packaging and loading

### The source generator becomes a package dependency

Outside `DebugApplication` builds, `Beutl.Extensibility.Sdk` 2.0.0-preview.8 and earlier reference `Beutl.Engine.SourceGenerators` without `PrivateAssets="all"`. `dotnet pack` then lists the generator as a dependency of your package. Beutl cannot resolve that dependency when it installs the package, and the install fails with `Unable to resolve dependency 'Beutl.Engine.SourceGenerators'`.

Turn off the automatic reference and add your own. `$(BeutlPackagesVersion)` is the version of the Beutl packages that the SDK references, so the generator always matches them:

```xml
<PropertyGroup>
  <BeutlAutoReferenceSourceGenerators>false</BeutlAutoReferenceSourceGenerators>
</PropertyGroup>

<ItemGroup>
  <PackageReference Include="Beutl.Engine.SourceGenerators"
                    OutputItemType="Analyzer"
                    ReferenceOutputAssembly="false"
                    Version="$(BeutlPackagesVersion)"
                    PrivateAssets="all" />
</ItemGroup>
```

Check the `.nuspec` inside your `.nupkg`: its dependencies should be Beutl's own packages only. The SDK is fixed in [b-editor/beutl#2727](https://github.com/b-editor/beutl/pull/2727); packages already published with the dependency are tracked in [b-editor/beutl#2730](https://github.com/b-editor/beutl/issues/2730).

### Libraries that Beutl already ships

Each extension is loaded into its own `AssemblyLoadContext`, but when Beutl ships an assembly of the same name in the same or a newer version, the extension gets Beutl's copy. When you use such a library (FluentIcons, for example):

- Reference the version Beutl ships, as listed in Beutl's [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/Directory.Packages.props). If you ask for a newer version, your copy is loaded separately, and its types do not match Beutl's.
- Exclude its runtime and native assets with `ExcludeAssets="runtime;native" PrivateAssets="all"`. `ExcludeAssets="runtime"` alone still copies native libraries that come in transitively, such as libSkiaSharp and HarfBuzz, into the `runtimes` folder of your output.

```xml
<PackageReference Include="FluentIcons.Avalonia.Fluent"
                  Version="2.1.343"
                  ExcludeAssets="runtime;native"
                  PrivateAssets="all" />
```

After a build, `<AssemblyName>.deps.json` in the output should list your own assembly and only the libraries that Beutl does not ship. A simpler way to reference these libraries is tracked in [b-editor/beutl#2733](https://github.com/b-editor/beutl/issues/2733).

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

### Values that implement `IEnumerable` ignore `[JsonConverter]`

Beutl's serializer checks for `IEnumerable` before it hands a value to `System.Text.Json`. When it saves a property whose value implements `IEnumerable`, it writes the elements one by one, and a `[JsonConverter]` on the type is not used. When it loads a JSON array into a type that implements `IEnumerable<T>`, it reads the elements one by one and puts them into a new instance of the type. That works for arrays and for `IList` types with a parameterless constructor; any other type loads as `null`, or the load throws.

Do not implement `IEnumerable` on value types you store in properties; expose the elements through a property such as `Items` instead. Tracked in [b-editor/beutl#2728](https://github.com/b-editor/beutl/issues/2728).

```csharp
[JsonConverter(typeof(CommentListConverter))]
public sealed class CommentList // Not IEnumerable<Comment>
{
    public IReadOnlyList<Comment> Items { get; }
}
```

### Time-based content and splitting

When the user splits an element, Beutl copies it and calls `ISplittable.NotifySplitted` on the objects of both halves. An object that plays something on its own timeline, such as comments, lyrics or lip sync, should shift its time in the back half, as `SourceVideo` and `SourceSound` do. Without it, the back half starts over from the beginning.

```csharp
public sealed partial class MyDrawable : Drawable, ISplittable
{
    // The content's time is the time since the element started, minus this offset.
    public IProperty<TimeSpan> TimeOffset { get; } = Property.Create(TimeSpan.Zero);

    public void NotifySplitted(bool backward, TimeSpan startDelta, TimeSpan durationDelta)
    {
        // The back half starts startDelta later, so its content moves back by as much.
        if (backward)
            TimeOffset.CurrentValue -= startDelta;
    }
}
```

### Saved but not shown

`HideProperties(...)`, a protected method of `EngineObject`, hides properties from the property panel. They are still saved, undone and copied, so use it for values that your own editor sets.

### One undo step for several changes

A property editor receives the `HistoryManager` through the visitor passed to `IPropertyEditorContext.Accept`. Change the properties, then call `Commit` once, so that the user undoes them in one step.

```csharp
public void Accept(IPropertyEditorContextVisitor visitor)
{
    visitor.Visit(this);
    if (visitor is IServiceProvider services)
        _history = services.GetService(typeof(HistoryManager)) as HistoryManager;
}

private void Assign(MyDrawable drawable, string path)
{
    drawable.MouthOpen.CurrentValue = path;
    drawable.MouthClosed.CurrentValue = "";
    _history?.Commit("Assign mouth layer");
}
```

## Editor integration

### Library items that cannot be added to the timeline

`GroupLibraryItem.AddDrawable<T>()` and `AddSound<T>()` register only the `Drawable` or `Sound` format, while the timeline accepts items that carry the `EngineObject` format. Such items appear in the library and in search, but dragging them onto the timeline does nothing. Register with `AddMultiple` and `BindDrawable<T>()` or `BindSound<T>()`, which register both formats. Tracked in [b-editor/beutl#2729](https://github.com/b-editor/beutl/issues/2729).

```csharp
LibraryService.Current.RegisterGroup("My Extension", group => group
    .AddMultiple("My Shape", item => item.BindDrawable<MyShape>()));
```

A test can check that `LibraryService.Current.GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` contains your type.

### The playhead during playback

During playback, `IEditorClock.CurrentTime` advances only when a rendered frame is shown. It moves in whole frames, and it falls behind the audio, or stops, when rendering is slow. Do not use it to time live input during playback; measure the time that has passed since `IPreviewPlayer.IsPlaying` became true instead.

There is no public method that starts playback. Run the editor's `PlayPause` command (the editor context implements `IContextCommandHandler`), and check `IsPlaying` first, because the command toggles. Stop playback with `IPreviewPlayer.Pause()`. A playback API for extensions is tracked in [b-editor/beutl#2731](https://github.com/b-editor/beutl/issues/2731).

```csharp
if (editorContext is IContextCommandHandler commands && !player.IsPlaying.Value)
    await commands.ExecuteAsync(new ContextCommandExecution("PlayPause"));
```

### Tool tabs

- A `ToolTabExtension` whose `Header` returns `null` is not listed in the menu that adds tabs. Open it from your own UI with `IEditorContext.OpenToolTab`.
- `OpenToolTab` brings a tab that is already open to the front instead of opening another one. Use `FindToolTab<T>()` to reuse an open tab.

## UI

### `Beutl.Controls` is not available

`Beutl.Controls` is not published as a package, so controls such as `ToolTabBar` cannot be referenced. To match Beutl's look, rebuild them from the theme resources that Beutl provides at run time. Bind the resources with `GetResourceObservable`, so that the control still works where a resource is missing, for example in tests that use another theme.

```csharp
var bar = new Border
{
    MinHeight = 38,
    Padding = new Thickness(4, 2),
    BorderThickness = new Thickness(0, 0, 0, 1),
};
bar.Bind(Border.BorderBrushProperty, bar.GetResourceObservable("DividerStrokeColorDefaultBrush"));

var add = new Button { Content = new FluentIcon { Icon = Icon.Add, FontSize = 16 } };
add.Bind(StyledElement.ThemeProperty, add.GetResourceObservable("ToolTabBarIconButtonTheme"));
```

Tool tabs often need `ToolTabBarIconButtonTheme`, `LiteComboBoxStyle`, `DividerStrokeColorDefaultBrush`, `TextFillColorSecondaryBrush` and the `options-group` style class. None of these are a public API, and they may change. Tracked in [b-editor/beutl#2732](https://github.com/b-editor/beutl/issues/2732).

### Property editor layout

Every property editor has a 4 px margin on the left and right, and its header and value have another 4 px around them. An editor that puts its header above a full-width value lines up with the other rows when it follows the same spacing, as Beutl's `GradientStopsEditor` does.

### `CheckBox` and `RadioButton` padding

If you change the `Padding` of a `CheckBox` or a `RadioButton`, also set `VerticalContentAlignment` to `Center`. FluentAvalonia's radio button puts its label at the top and moves it down to the glyph with a 6 px top padding, so removing that padding lifts the label above the glyph.

### Headless screenshots

Rendering your UI with Avalonia.Headless and Beutl's theme is useful, but the result is not always the same as in the app. A misaligned radio button label, for example, did not reproduce headlessly. Check the layout in Beutl itself before you release.

## Drawing text and pixels

- `context.DrawText(text, fill, pen)` draws an outline only when `FormattedText.Pen` is set. The pen argument alone draws no outline.
- `FormattedText.Bounds` is the box of the string's ink, not a line height. Size lines with `Metrics.Ascent`, which is negative, and `Metrics.Descent`, and put the baseline at `top - Ascent`.
- On macOS the default font family is Helvetica, which measures Japanese far too narrow. Choose a font that covers your text, such as "Noto Sans JP" when `FontManager.Instance.IsRegistered` reports it.
- The constructor of `Bgra8888` takes `(r, g, b, a)`, although the fields are stored in B, G, R, A order.
- In SkiaSharp, `SKColors.Transparent` is transparent white (`0x00FFFFFF`). Pixels that nothing was drawn on are `SKColors.Empty`, so check the alpha when you test that nothing was drawn.

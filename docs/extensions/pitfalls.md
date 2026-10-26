---
title: Pitfalls in Extension Development
description: Behaviors of Beutl 2.x that are easy to miss when building, packaging and testing an extension, and how to work with them.
---

This page collects behaviors that the API does not make obvious and that extension authors have run into. Where Beutl itself should change, the item links to the issue that tracks it. This page targets Beutl 2.0.0-preview.9; rebuild extensions against its SDK after migrating the APIs below.

## Packaging and loading

### Keep the source generator private

The preview.9 SDK marks `Beutl.Engine.SourceGenerators` as `PrivateAssets="all"`, so the preview.8 workaround that disabled the automatic reference is no longer needed. Remove that workaround when upgrading; the SDK keeps the generator version aligned with `$(BeutlPackagesVersion)`.

Check the `.nuspec` inside your `.nupkg`: the source generator must not appear as an install-time dependency.

### Libraries that Beutl already ships

Each extension is loaded into its own `AssemblyLoadContext`, but when Beutl ships an assembly of the same name in the same or a newer version, the extension gets Beutl's copy. When you use such a library (FluentIcons, for example):

- Reference the version Beutl ships, as listed in Beutl's [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/main/Directory.Packages.props). If you ask for a newer version, your copy is loaded separately, and its types do not match Beutl's.
- Exclude its runtime and native assets with `ExcludeAssets="runtime;native" PrivateAssets="all"`. `ExcludeAssets="runtime"` alone still copies native libraries that come in transitively, such as libSkiaSharp and HarfBuzz, into the `runtimes` folder of your output.

```xml
<PackageReference Include="FluentIcons.Avalonia.Fluent"
                  Version="2.1.344"
                  ExcludeAssets="runtime;native"
                  PrivateAssets="all" />
```

After a build, `<AssemblyName>.deps.json` in the output should list your own assembly and only the libraries that Beutl does not ship. The SDK also references `Beutl.Controls`; see [project setup](create-csproj.md).

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

In preview.9, a collection type's own `[JsonConverter]` is honored on both save and load. Without a converter, Beutl still writes collections item by item. `ICoreSerializable` and reference values follow Beutl's own serialization paths.

A `[JsonConverter]` placed on a property member is not read by the property system. Put it on the value type, or implement the appropriate Beutl serialization contract; do not rely on the member attribute.

### Time-based content and splitting

When the user splits an element, Beutl copies it and calls `ISplittable.NotifySplitted` on the objects of both halves. An object that plays something on its own timeline, such as comments, lyrics or lip sync, should shift its time in the back half, as `SourceVideo` and `SourceSound` do. Without it, the back half starts over from the beginning.

```csharp
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;

public abstract partial class TimedDrawable : Drawable, ISplittable
{
    protected TimedDrawable()
    {
        ScanProperties<TimedDrawable>();
    }

    public IExpressionProperty<MediaTime> TimeOffset { get; } =
        Property.CreateExpression(MediaTime.Zero);

    public void NotifySplitted(bool backward, MediaTime startDelta, MediaTime durationDelta)
    {
        if (backward)
            TimeOffset.Value -= startDelta;
    }
}
```

### Saved but not shown

`HideProperties(...)`, a protected method of `EngineObject`, hides properties from the property panel. They are still saved, undone and copied, so use it for values that your own editor sets.

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

In preview.9, `AddDrawable<T>()` and `AddSound<T>()` register the `EngineObject` format as well as their drawable or sound format. The preview.8 `AddMultiple` workaround is no longer necessary. `BindDrawable<T>()` and `BindSound<T>()` still register both formats when building a multiple-format item.

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

During playback, `IEditorClock.CurrentTime` advances only when a rendered frame is shown. It moves in whole frames, and it falls behind the audio, or stops, when rendering is slow. Do not use it to time live input during playback; measure the time that has passed since `IPreviewPlayer.IsPlaying` became true instead.

There is no start method on `IPreviewPlayer`. To start through the scene editor, find its `editor.playPause` command definition, check `CanRun`, and call `RunAsync` with the editor context. `IContextCommandHandler` no longer exists. Check `IsPlaying` first because this command toggles playback; await `IPreviewPlayer.Pause()` before changing scene state that playback might still access.

```csharp
using System.Linq;
using Beutl.Editor.Services;
using Beutl.Extensibility;

public static class PlaybackCommands
{
    public static async Task StartAsync(IEditorContext editor, IPreviewPlayer player)
    {
        if (player.IsPlaying.Value)
            return;

        ContextCommandDefinition? command = editor.Extension.ContextCommands
            .FirstOrDefault(item => item.Id == "editor.playPause");
        var execution = new ContextCommandExecution("editor.playPause")
        {
            EditorContext = editor
        };
        if (command?.CanRun(editor, execution) == true)
            await command.RunAsync(editor, execution);
    }
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

### Use the shared controls

`Beutl.Controls` is now a public package automatically referenced by the SDK. Use `Beutl.Controls.ToolTabBar` instead of rebuilding it from private theme resource keys. For built-in property editor integration, use the [typed registrations](editor-integration.md#property-editors) in `Beutl.Extensibility`.

When adjusting a property's controls, check their spacing and label alignment under Beutl's theme. Headless rendering is useful for layout checks, but also check the result in Beutl before release.

## Drawing text and pixels

- `context.DrawText(text, fill, pen)` draws an outline only when `FormattedText.Pen` is set. The pen argument alone draws no outline.
- `FormattedText.Bounds` includes text advance and spacing; `ActualBounds` includes stroke ink and `RasterBounds` covers rasterized glyph masks. None is a line height. Size lines with `Metrics.Ascent`, which is negative, and `Metrics.Descent`, and put the baseline at `top - Ascent`.
- Choose a registered font that covers your text instead of assuming a platform-specific default. The font manager provides fallback families; measure with the actual typeface used for rendering.
- `TextElements.Lines` caches the formatted result on first enumeration. If you change its input afterward, create a new `TextElements` and dispose the old one.
- The constructor of `Bgra8888` takes `(r, g, b, a)`, although the fields are stored in B, G, R, A order.
- Check the alpha component when testing transparent pixels; RGB values alone do not establish transparency.

## Source

- [`Beutl.Extensibility.Sdk.csproj`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Beutl.Extensibility.Sdk.csproj)
- [`JsonSerializationContext.Serialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Serialize.cs)
- [`JsonSerializationContext.Deserialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Deserialize.cs)
- [`ISplittable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ISplittable.cs)
- [`HistoryManager.EditSessions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/HistoryManager.EditSessions.cs)
- [`EditSession.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditSession.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`SceneEditorExtension.Commands.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/SceneEditorExtension.Commands.cs)
- [`SceneEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/SceneEditorTabExtension.cs)
- [`IPinnableToolContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IPinnableToolContext.cs)
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)

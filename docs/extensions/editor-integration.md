---
title: Integrating with the Editor
description: Register commands, property editors, MCP tools and element sources, and take over browser downloads, using the public extension contracts.
sidebar_position: 7
---

Beutl 2.0.0-preview.12 exposes these contracts through `Beutl.Extensibility`. Use the [preview.12 SDK](create-csproj.md) and rebuild your extension: several contract types have moved between assemblies in earlier previews, even where their namespaces stayed the same.

## Commands {/* #commands */}

Return command definitions from `ViewExtension.ContextCommands`. Each definition has a stable `Id`; the keymap saves bindings by that ID. `IContextCommandHandler` and the old command-name dispatch are gone.

- Use `ContextCommandDefinition<TContext>` with `ExecuteOnAsync` and optional `CanExecuteOn` for an open editor or tool context.
- Use `ContextCommandDefinition` with `Scope = ContextCommandScope.Extension`, `ExecuteAsync` and optional `CanExecute` for a command that does not need its own tab open. An active editor is still optional, so check `execution.EditorContext` before using it.
- `execution.Interaction` supplies `ShowInputAsync` and `ShowQuickPickAsync` for commands started from the palette. It is `null` for keyboard invocations. Await each request, stop on a `null` result, and observe `execution.CancellationToken`.
- If a handler has changing availability, implement `IContextCommandStateNotifier`. A shared extension whose availability depends on the active editor can implement `IContextCommandEditorStateNotifier`.

This command seeks the active editor to the start:

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

[Export]
public sealed class SeekCommands : ViewExtension
{
    public override IEnumerable<ContextCommandDefinition> ContextCommands =>
    [
        new ContextCommandDefinition("example.seekStart", "Go to start")
        {
            Scope = ContextCommandScope.Extension,
            CanExecute = execution =>
                execution.EditorContext?.GetService(typeof(IEditorClock)) is IEditorClock,
            ExecuteAsync = execution =>
            {
                if (execution.EditorContext?.GetService(typeof(IEditorClock)) is IEditorClock clock)
                    clock.Seek(MediaTime.Zero);
                return Task.CompletedTask;
            }
        }
    ];
}
```

Before executing another extension's definition, check `CanRun(context, execution)` and then call `RunAsync(context, execution)`. The scene editor's play and pause toggle is `editor.playPause`; to start playback, call `IPreviewPlayer.Play()` instead, as [playback integration](pitfalls.md#the-playhead-during-playback) shows.

## Property editors {/* #property-editors */}

Override `RegisterEditors(PropertyEditorRegistry)` with `protected override` in an extension assembly. The old `MatchProperty`, `TryCreateContext`, `TryCreateControl` overrides and `DefaultHandler` are removed.

<div style={{ overflowX: 'auto' }}>

| Registration | Intended use | Where it appears |
| --- | --- | --- |
| `Register<TValue, TContext>` | Your own `IPropertyEditorContext` and Avalonia `Control` | Property panel; nodes, list items and settings only when the corresponding control factory is supplied in `PropertyEditorOptions` |
| `RegisterGroup<TContext>` | One editor for several selected property adapters | Property panel |
| `RegisterValue<TValue, TEdit>` | A standard editor pairing `IValueEditorContext<TEdit>` with `IValueEditorControl<TEdit>` | Property panel, nodes, list items and settings |

</div>

`Register` and `RegisterValue` select the exact value type `TValue`. Set `PropertyEditorOptions.Match` to restrict a registration to a particular owner or property. For `Register`, use `CreateNodeControl`, `CreateListItemControl` and `CreateSettingsControl` to opt into those surfaces; an omitted surface falls through to another editor.

`IPropertyAdapter` and its generic, animation and expression interfaces are in the **Beutl.Engine assembly**, with the namespace **`Beutl.Extensibility`**. `GetCoreProperty()` is gone; use `GetEngineProperty()` when an adapter exposes an underlying `Beutl.IProperty`. `IAnimatablePropertyAdapter.Animation` is an `IKeyFrameAnimation?`; its generic counterpart uses `KeyFrameAnimation<T>?`.

The following registration wraps the default editor for `TextBlock.Text`. `TryCreateDefault` creates the inner context; `TryCreateControl` creates a fresh control for it on each call. Keep a separate wrapper context so its registration does not replace the inner editor's registration. Forward visitors, saved UI state and disposal to the inner context.

```csharp
using System.Text.Json.Nodes;
using Avalonia;
using Avalonia.Controls;
using Beutl.Extensibility;
using EngineText = Beutl.Graphics.Shapes.TextBlock;

[Export]
public sealed class TextPropertyEditors : PropertyEditorExtension
{
    protected override void RegisterEditors(PropertyEditorRegistry registry)
    {
        registry.Register<string?, WrappedTextContext>(
            property =>
            {
                if (!registry.TryCreateDefault(property, out var inner))
                    throw new InvalidOperationException("No default text editor.");
                return new WrappedTextContext(this, inner);
            },
            context =>
            {
                if (!registry.TryCreateControl(context.Inner, out var control))
                    throw new InvalidOperationException("No control for the text editor.");
                return new Border { Padding = new Thickness(4), Child = control };
            },
            new PropertyEditorOptions
            {
                Match = property => property.ImplementedType == typeof(EngineText)
                    && property.GetEngineProperty()?.Name == nameof(EngineText.Text)
            });
    }
}

public sealed class WrappedTextContext(
    PropertyEditorExtension extension, IPropertyEditorContext inner) : IPropertyEditorContext
{
    public PropertyEditorExtension Extension { get; } = extension;

    public IPropertyEditorContext Inner { get; } = inner;

    public void Accept(IPropertyEditorContextVisitor visitor)
    {
        visitor.Visit(this);
        Inner.Accept(visitor);
    }

    public void ReadFromJson(JsonObject json) => Inner.ReadFromJson(json);

    public void WriteToJson(JsonObject json) => Inner.WriteToJson(json);

    public void Dispose() => Inner.Dispose();
}
```

For an editor that writes several properties, use a [history edit session](pitfalls.md#one-undo-step-for-several-changes). Do not share an Avalonia control instance between editor surfaces.

## MCP tools {/* #mcp-tools */}

Derive from `McpToolExtension` to contribute a tool to Beutl's live MCP endpoint. `McpToolDefinition`, `McpToolCall`, `McpToolResult`, `McpToolContent`, `McpTextContent` and `McpImageContent` are all in **`Beutl.Extensibility`**; the old `Beutl.Editor.Services.Mcp` namespace is not the extension contract.

Keep `Tools` stable and independent of UI state: the host can read it from a background thread. Prefix tool names to avoid collisions. A tool name accepts 1–128 ASCII letters, digits, `_`, `-` or `.`. An argument schema must be a JSON object whose `type` is `object`; `instanceId` is reserved by the host.

`InvokeAsync` runs on the UI thread. Move expensive work away from it, observe cancellation, and resolve editor services again after an `await` because the editor may have closed. Return `McpToolResult.Error(...)` for a failure the caller can act on.

```csharp
using Beutl.Editor.Services;
using Beutl.Extensibility;

[Export]
public sealed class PlayheadTool : McpToolExtension
{
    private const string ToolName = "example.read_playhead";

    public override IReadOnlyList<McpToolDefinition> Tools { get; } =
    [
        new(ToolName, "Read the editor playhead as a time span.")
        {
            ReadOnlyHint = true,
            OpenWorldHint = false
        }
    ];

    public override ValueTask<McpToolResult> InvokeAsync(
        McpToolCall call, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        if (call.Name != ToolName)
            return ValueTask.FromResult(McpToolResult.Error("Unknown tool."));
        if (call.EditorContext?.GetService(typeof(IEditorClock)) is not IEditorClock clock)
            return ValueTask.FromResult(McpToolResult.Error("No scene editor is available."));

        return ValueTask.FromResult(
            McpToolResult.Text(clock.CurrentTime.Value.ToTimeSpan().ToString()));
    }
}
```

## Element sources {/* #element-sources */}

`ElementDescription`, `ElementSource` and the source-handler contracts are in **`Beutl.Extensibility`**. Submit descriptions through `IElementAdder.AddAsync` (`Beutl.Editor.Services`). A description uses `MediaTime` for `Start` and nullable `Length`; `Length: null` lets the source handler choose or preserve the length, while zero explicitly requests zero.

Built-in sources are `ElementSource.File`, `ElementSource.EngineObject`, `ElementSource.ElementTemplate` and `ElementSource.ElementSetTemplate`. `ElementSetTemplate` creates several complete elements, with the groups among them, from a saved `ElementSet`. They keep their names, lengths and transforms, and where each starts and lies relative to the others, so a description that asks for a name, a length or a position is refused. For example:

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;

public static class ElementRequests
{
    public static ValueTask<ElementAddResult> AddRectangleAsync(
        IElementAdder adder, CancellationToken cancellationToken)
        => adder.AddAsync(
            [new ElementDescription(
                Start: MediaTime.Zero,
                Length: MediaTime.FromSeconds(1),
                Layer: 0,
                Source: new ElementSource.EngineObject(() => new RectShape()),
                Name: "Rectangle")],
            cancellationToken);
}
```

The built-in file and engine-object handlers require a `Length`; a video or a sound file then takes its own length instead. Since preview.11, a new drawable whose transform group is still the empty one `Drawable` creates starts with a `TranslateTransform`, a `RotationTransform` and a `ScaleTransform`, like the drawables the user adds, and `Position` goes into that `TranslateTransform`. A drawable that sets its own transform keeps it, and `Position` adds a `TranslateTransform` to it. `IElementObjectService.Add` and `InsertAt`, which add an object to an existing element, fill an empty group the same way, so do not add your own `TranslateTransform` to a drawable you add through them.

Since preview.11, two flags place a request among the others of its batch. With `FollowsPrevious`, it starts where the previous request on the same `Layer` ended, which is known only once that request's source has opened; the first request on a layer starts at `Start`. With `StacksAboveScene`, it goes above what the scene holds when the first such request of the batch goes in, and `Layer` counts up from there, leaving out locked layers, so none of them refuses it.

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

public static class SequenceRequests
{
    // Places the files one after another on layer 0.
    public static ValueTask<ElementAddResult> AddInSequenceAsync(
        IElementAdder adder, IReadOnlyList<string> files, CancellationToken cancellationToken)
        => adder.AddAsync(
            [.. files.Select(file => new ElementDescription(
                Start: MediaTime.Zero,
                Length: MediaTime.FromSeconds(5),
                Layer: 0,
                Source: new ElementSource.File(file))
            {
                FollowsPrevious = true
            })],
            cancellationToken);
}
```

For a new source kind, derive a record from `ElementSource` and contribute `ElementSourceHandlerRegistration` entries from an exported `ElementSourceHandlerExtension`. Each `IElementSourceHandler` declares its exact `SourceType` and implements two stages:

1. `PreflightAsync` validates the request and returns `ElementSourcePreflightResult.Ready(preflight, targetLayers)` or `Rejected(failure)`. Reserve at least one target layer. The host owns and asynchronously disposes the returned `IElementSourcePreflight` after the batch finishes.
2. `MaterializeAsync` consumes that state and returns `ElementSourceMaterializationResult.Materialized(new ElementMaterialization(...))` or `Rejected(failure)`. The materialization holds the primary element, optional companions, groups and temporary resource leases. Resources that must survive materialization belong to the returned element graph instead of temporary leases. Set `KeepsArrangement` to `true` when the elements must keep where they start and lie relative to each other: the host then moves them together to the nearest free place and adds them as they are. Otherwise it fits each element on its own around whatever it overlaps.

Registration defaults to `ElementSourceHandlerRegistrationMode.Add`; use `Replace` only when intentionally replacing an existing handler for that exact source type.

## Browser downloads {/* #browser-downloads */}

Since preview.12, a `BrowserDownloadExtension` takes over files that pages in the [Browser](../reference/tool-tabs/web-browser.md) tab offer for download, and adds them to the editor in its own way, such as speech that a text-to-speech site generated, placed with its line. When a page offers a file, the browser asks each `BrowserDownloadExtension` in turn through `Claim`, and the first claim wins. Offers reach extensions only while the editor can add files to a saved scene in a saved project; otherwise the browser asks where to save the file as usual.

- `Claim(BrowserDownloadOffer)` runs on the UI thread for every offer, so decide from the offer alone and return quickly; return `null` to leave the file to the browser. `Page` is the page on display, `SuggestedName` the name the page or the server gave the file, and `Source` its address. A file that a page script generated (`IsGenerated`) has no address to request again, so its `Source` is the site credited with it. An exception from `Claim` is logged, and the next extension is asked.
- `BrowserDownloadClaim.PageScript` is a JavaScript expression that the browser evaluates in the offering page at once, while the page still shows what produced the file. When its value is a string, `ImportAsync` receives exactly that string as `PageData` on every platform. `PageData` is `null` when the script fails or gives anything else, or when the page does not answer within five seconds of the user confirming. Treat it as input from the page. `Description` takes the place of the file name on the download bar.
- The user still confirms the download on the bar, so a page cannot add anything on its own. The browser then saves the file to the project's `resources/downloads` folder without showing the download options, and calls `ImportAsync` on the UI thread with the file's full path as `FileName`. Resolve editor services through `EditorContext`; the package stays loaded until `ImportAsync` completes.
- Return `false` to leave the file to the browser, which adds an image, video or audio file to the timeline as one element. An exception shows on the bar as a failure to add the saved file, which stays in the folder. The token is canceled when the user cancels on the bar; let the `OperationCanceledException` through, so the bar reports a cancellation.

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

[Export]
public sealed class SpeechDownloads : BrowserDownloadExtension
{
    public override BrowserDownloadClaim? Claim(BrowserDownloadOffer offer)
    {
        if (offer.Page.Host != "speech.example"
            || !string.Equals(Path.GetExtension(offer.SuggestedName), ".mp3", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        return new BrowserDownloadClaim
        {
            // The line the page spoke, read while the page still shows it.
            PageScript = "document.querySelector('#text')?.value ?? ''",
            Description = "Add the speech, named after its line"
        };
    }

    public override async ValueTask<bool> ImportAsync(
        BrowserDownloadImportContext context, CancellationToken cancellationToken)
    {
        if (context.EditorContext.GetService(typeof(IElementAdder)) is not IElementAdder adder)
            return false;

        MediaTime start = context.EditorContext.GetService(typeof(IEditorClock)) is IEditorClock clock
            ? clock.CurrentTime.Value
            : MediaTime.Zero;
        ElementAddResult result = await adder.AddAsync(
            [new ElementDescription(
                Start: start,
                Length: MediaTime.FromSeconds(5),
                Layer: 0,
                Source: new ElementSource.File(context.FileName),
                Name: context.PageData ?? "")
            {
                StacksAboveScene = true
            }],
            cancellationToken);
        if (!result.IsSuccess)
            throw new InvalidOperationException(result.Failure!.Message, result.Failure.Exception);

        return true;
    }
}
```

The scene editor's `IEditorContext` also provides `IExtensionProvider` since preview.12. Its `Extensions` and `GetDescriptors<T>()` list the registered extensions as metadata, and `TryAcquire` leases one for an operation, as the browser does with each `BrowserDownloadExtension`. Dispose the lease when the operation ends.

## Repairing recovered elements {/* #element-recovery */}

Custom editors should check `Scene.IsElementLocked(element)` before ordinary edits. It includes recovery protection as well as user locks. When repairing by removing or replacing a blocking value or object, apply the change through the normal public property, keyframe or collection APIs, then call `ElementRecoveryService.TryCompleteRepair(element, history)` (`Beutl.Editor.Services`) with the `HistoryManager` already observing that scene. Commit that same history transaction afterward.

The method returns `true` when no blockers remain and normal persistence resumes, or `false` when the element is not protected or another blocker remains. It does not commit history itself. Undo restores the protection and the retained original data.

Unread members of saved objects are retained and written back on the next save. Use `Beutl.Serialization.DroppedMembersAttribute` when deliberately discarding an obsolete key, and do not reuse that name for a different meaning.

## Source

- [`ContextCommands.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ContextCommands.cs)
- [`IContextCommandInteraction.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IContextCommandInteraction.cs)
- [`PropertyEditorExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorExtension.cs)
- [`PropertyEditorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorRegistry.cs)
- [`PropertyEditorOptions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorOptions.cs)
- [`IPropertyAdapter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Extensibility/IPropertyAdapter.cs)
- [`McpToolExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolExtension.cs)
- [`McpToolDefinition.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolDefinition.cs)
- [`McpToolCall.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolCall.cs)
- [`McpToolResult.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolResult.cs)
- [`ElementDescription.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ElementDescription.cs)
- [`ElementSourceHandlerExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ElementSourceHandlerExtension.cs)
- [`IElementAdder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/IElementAdder.cs) and [`ElementObjectService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementObjectService.cs)
- [`CanonicalTransformLayout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/CanonicalTransformLayout.cs)
- [`BrowserDownloadExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/BrowserDownloadExtension.cs) and [`browser-downloads.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/browser-downloads.md)
- [`IExtensionProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IExtensionProvider.cs)
- [`ElementRecoveryService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementRecoveryService.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`DroppedMembersAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/DroppedMembersAttribute.cs)

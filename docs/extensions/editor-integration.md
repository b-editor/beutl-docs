---
title: Integrating with the Editor
description: Register commands, property editors, MCP tools and element sources using the public extension contracts.
sidebar_position: 7
---

Beutl 2.0.0-preview.9 exposes these contracts through `Beutl.Extensibility`. Use the [preview.9 SDK](create-csproj.md) and rebuild your extension: several contract types moved between assemblies, even where their namespaces stayed the same.

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

Before executing another extension's definition, check `CanRun(context, execution)` and then call `RunAsync(context, execution)`. The scene editor's playback ID is `editor.playPause`; see [playback integration](pitfalls.md#the-playhead-during-playback).

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

Built-in sources are `ElementSource.File`, `ElementSource.EngineObject` and `ElementSource.ElementTemplate`. For example:

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

For a new source kind, derive a record from `ElementSource` and contribute `ElementSourceHandlerRegistration` entries from an exported `ElementSourceHandlerExtension`. Each `IElementSourceHandler` declares its exact `SourceType` and implements two stages:

1. `PreflightAsync` validates the request and returns `ElementSourcePreflightResult.Ready(preflight, targetLayers)` or `Rejected(failure)`. Reserve at least one target layer. The host owns and asynchronously disposes the returned `IElementSourcePreflight` after the batch finishes.
2. `MaterializeAsync` consumes that state and returns `ElementSourceMaterializationResult.Materialized(new ElementMaterialization(...))` or `Rejected(failure)`. The materialization holds the primary element, optional companions, groups and temporary resource leases. Resources that must survive materialization belong to the returned element graph instead of temporary leases.

Registration defaults to `ElementSourceHandlerRegistrationMode.Add`; use `Replace` only when intentionally replacing an existing handler for that exact source type.

## Repairing recovered elements {/* #element-recovery */}

Custom editors should check `Scene.IsElementLocked(element)` before ordinary edits. It includes recovery protection as well as user locks. When repairing by removing or replacing a blocking value or object, apply the change through the normal public property, keyframe or collection APIs, then call `ElementRecoveryService.TryCompleteRepair(element, history)` (`Beutl.Editor.Services`) with the `HistoryManager` already observing that scene. Commit that same history transaction afterward.

The method returns `true` when no blockers remain and normal persistence resumes, or `false` when the element is not protected or another blocker remains. It does not commit history itself. Undo restores the protection and the retained original data.

Unread members of saved objects are retained and written back on the next save. Use `Beutl.Serialization.DroppedMembersAttribute` when deliberately discarding an obsolete key, and do not reuse that name for a different meaning.

## Source

- [`ContextCommandAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ContextCommandAttribute.cs)
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
- [`IElementAdder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/IElementAdder.cs)
- [`ElementRecoveryService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementRecoveryService.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`DroppedMembersAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/DroppedMembersAttribute.cs)

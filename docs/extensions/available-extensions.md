---
title: Types of Extensions You Can Develop
description: List of extension types that can be added to Beutl.
sidebar_position: 3
---

In Beutl, you can extend the following functionalities:

<div style={{ overflowX: 'auto' }}>

| Type Name | Description |
| --- | --- |
| DecodingExtension | Adds support for video and audio decoding, and input files |
| [ControllableEncodingExtension](media-providers.md) | Adds support for video and audio encoding, and output files |
| EditorExtension | Adds a UI for editing files |
| OutputExtension | Adds a UI for output |
| [Extension](sample-extensions.md#sugarshaker) | Base class for extensions (override the Load method to register functionalities) |
| ToolWindowExtension | Adds a tool window that can be opened from the Window menu |
| [PropertyEditorExtension](editor-integration.md#property-editors) | Adds a UI for editing specific property types |
| [ToolTabExtension](sample-extensions.md#tooltabextension) | Adds tabs to the scene editing screen |
| [ThemeExtension](implement-theme.md) | Adds a theme to the picker in Settings → Display |
| [ViewExtension](editor-integration.md#commands) | Registers commands with stable IDs and handlers |
| [McpToolExtension](editor-integration.md#mcp-tools) | Adds tools to the live MCP endpoint |
| [ElementSourceHandlerExtension](editor-integration.md#element-sources) | Creates timeline elements from custom source kinds |
| ProxyExtension | Registers a media proxy-generator factory |
| TutorialExtension | Registers tutorials |

</div>

`ProjectItemExtension` has been removed. Extension classes must carry `[Export]`, be public and have a parameterless constructor. Make `Extension.Unload()` idempotent and safe after partial initialization: it is also called to roll back a failed `Load()`.

## Source

- [`Extension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/Extension.cs)
- [`ProxyExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ProxyExtension.cs)
- [`TutorialExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/TutorialExtension.cs)
- [`ViewExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ViewExtension.cs)

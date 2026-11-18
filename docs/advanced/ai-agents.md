---
title: Editing with AI Agents
description: Let AI coding agents edit Beutl projects through MCP
sidebar_position: 6
---

# Editing with AI Agents

Beutl supports project editing by **AI coding agents** (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, and many others) through the **Model Context Protocol (MCP)**. An agent reads the scene as a declarative document, applies JSON Merge Patches through Beutl's undo history, and can render stills or storyboards to check the result.

Beutl installs one **`beutl-agent` MCP server** for both live editing and headless file editing. It communicates over stdio; each call chooses its target.

## Setting up from the app

Open **Settings → AI Agents**.

1. Choose the **Agent** and **Install scope**: **Project** or **Global (user profile)**. For a project installation, select the **Project folder**.
2. Under **Components**, select **Skills**, **Subagents** (where supported), and **MCP server**.
3. Press **Install**. Beutl writes the configuration or registers the server through the agent's CLI. If automatic registration is unavailable or fails, follow the instructions shown on the page.

The MCP executable ships with Beutl. If it cannot be found, reinstall Beutl or specify an existing server under **Advanced → Command** and **Arguments (one per line)**. The generated configuration sets `BEUTL_HOME` to Beutl's profile directory so the server can discover the editors in that profile. You do not need to copy a live URL or bearer token into the agent configuration.

:::note[Upgrading an older integration]

Reinstall the integration after updating Beutl. This replaces the split setup with `beutl-agent` and removes the separate `beutl-live` entry and its token. Edited skill and subagent files are backed up as `.bak` files before replacement. If a JSON configuration contains comments, Beutl leaves it unchanged and shows the entry to add and obsolete entries to remove manually.

:::

## Editing a running editor

1. Call `list_instances` and identify the desired editor by its process ID, project, and active scene.
2. Pass its `instanceId` to `list_scenes` and choose a returned `sceneId`.
3. Include `instanceId` on every subsequent live call, including job polling. Include `sceneId` on scene reads, edits, history operations, and renders. Catalog queries and job polling do not need `sceneId`.

There is no attach step or shared selected scene. Scene calls normally preserve the visible editor selection. Enable **Follow live MCP edits (experimental)** in **Settings → AI Agents** to follow edits and still renders in the scene tab, selection, playhead, and property editor.

If an instance becomes unavailable, rediscover it with `list_instances`. Omitting `instanceId` switches to headless file editing; it does not select the active editor.

## Editing files headlessly

Without `instanceId`, the same server uses a file-backed session. Start with `open_project` or `create_project`; these sessions do not use `sceneId`. Call `save_project` after successful edits.

File paths passed to tools must be **absolute**, including project, input media, and output paths. The old `BEUTL_WORKSPACE` setting is no longer used; there is no workspace root that supplies a base for relative paths.

Characters that the selected font lacks render with Beutl's bundled fallback fonts and color emoji, as in the app, so `render_still` and `export_video` show them as the editor does. The server orders the fallback fonts by the system's language, where the app follows its own language setting.

For manual registration, a typical JSON entry is:

```json
{
  "mcpServers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "/absolute/path/to/Beutl.AgentToolkit.Mcp",
      "env": { "BEUTL_HOME": "/absolute/path/to/beutl-profile" }
    }
  }
}
```

Use the executable and profile paths from your installation (`Beutl.AgentToolkit.Mcp.exe` on Windows). Configuration formats vary by agent; installation from **Settings → AI Agents** selects the appropriate format.

## Available tools (overview)

Call `get_started` first. The tool returns a compact usage guide.

| Group | Tools |
|-------|-------|
| Live discovery | `list_instances`, `list_scenes` |
| Session | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status` |
| Query / schema | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_fonts`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds` |
| Edit | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| Node graphs | `get_node_graph_guide`, `list_node_types`, `read_node_graph`, `edit_node_graph` |
| History | `undo`, `redo`, `read_history` |
| Render / inspection | `render_still`, `render_storyboard`, `measure_frame_differences`, `analyze_audio_rhythm`, `export_video`, `read_render_job`, `cancel_render_job` |
| AI generation (running editor) | `list_ai_models`, `generate_image`, `edit_image`, `generate_video`, `edit_video`, `transcribe_audio`, `list_ai_jobs`, `read_ai_job`, `cancel_ai_job` |

AI generation uses the account signed in to the running Beutl app and its AI credits. Each generation call is a paid request. Generated media is saved next to the target scene; use `apply_edit` to place it. Poll an existing job with `read_ai_job`, or find it with `list_ai_jobs`, instead of repeating a generation request after a timeout. Loaded extensions can also contribute tools.

`apply_edit` accepts exactly one of a complete `desired` document or a partial `patch`. For targeted edits, use a JSON Merge Patch in `patch` and provide the `schemaVersion` returned by `get_schema`. A full `desired` document is authoritative: omitted child arrays can delete existing content.

The node graph tools build and edit [node graphs](../reference/tool-tabs/node-graph.md) without C#, including GPU passes in GLSL with several passes, inputs, and intermediate images. A graph made this way is an ordinary Node Graph effect or drawable. `get_node_graph_guide` returns the rules with examples, and `list_node_types` lists the node types and their members. `read_node_graph` reads a graph's nodes, values, keyframes, and connections, with diagnostics such as shader compiler messages, and lists the scene's graphs when no graph is named. `edit_node_graph` applies `add`, `update`, `remove`, `connect`, and `disconnect` operations in order as one undo step, and `validateOnly` checks them without applying them. An edit that cannot apply, or that brings a new error such as GLSL that does not compile, is not applied, and the scene and its history stay as they were. `render_still` lists in its warnings each node that failed while the frame drew.

## Edit and inspect

1. Call `get_started` to understand the session, then inspect its current state with `read_document_summary` or a targeted `get_schema` query.
2. Apply a patch and inspect the operation and validation results. Warnings are advisory.
3. Use `render_still` or `render_storyboard` to inspect the rendered result. Check that the appearance and motion match what you asked for before proceeding.
4. In a file-backed session, call `save_project` after major successful edits and final revisions. This tool does not save live-editor sessions; use the editor's auto-save or Beutl's save action there.

`undo` and `redo` reverse and replay edits through history. Live sessions share the user's history, so inspect `read_history` and its `nextUndo` before undoing. Save a file-backed session again after undoing.

## Source

- [`AgentToolkitMcpServer.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/AgentToolkitMcpServer.cs)
- [`LiveInstanceTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Live/LiveInstanceTools.cs)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostTools.cs)
- [`AiAgentSettingsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/SettingsPages/AiAgentSettingsPageViewModel.cs)
- [`AgentToolkitInstallModels.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Installation/AgentToolkitInstallModels.cs)
- [`ToolPaths.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Common/ToolPaths.cs)
- [`AgentHostAiTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostAiTools.cs)
- [`AgentEditFollower.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentEditFollower.cs)
- [`NodeGraphTools.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.AgentToolkit/Tools/NodeGraphTools.cs) / [`StillRenderer.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.AgentToolkit/Rendering/StillRenderer.cs)
- [`BundledFontRegistration.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.AgentToolkit/Rendering/BundledFontRegistration.cs)

---
title: Editing with AI Agents
description: Let AI coding agents edit Beutl projects through MCP
sidebar_position: 6
---

# Editing with AI Agents

Beutl supports project editing by **AI coding agents** (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, and many others) through the **Model Context Protocol (MCP)**. An agent reads the scene as a declarative document, applies JSON Merge Patches through Beutl's undo history, and can render stills or storyboards to check the result.

Beutl provides two MCP servers:

- **Live MCP server** (recommended): runs inside the Beutl app and connects the agent to the **running editor**. Edits appear in the preview and timeline as they are made, and every change is added to the undo stack.
- **Stdio MCP server** (optional): runs as a headless process and edits project files **without launching the GUI**. It is intended for automation.

## Setting up from the app

Open **Settings → AI Agents**.

1. Choose the **Agent** to install for (Claude Code, Codex, Cursor, Gemini CLI, …, or *Custom (manual paths)*) and the **Install scope**: **Project** (into a project folder) or **Global (user profile)**.
2. Under **Components**, choose what to install:
   - **Skills**: Beutl editing know-how the agent loads on demand
   - **Subagents**: specialized agent definitions for timeline and look tasks
   - **Stdio MCP server** / **Live MCP server** entries for the agent's MCP configuration
3. Press **Install**.

If the MCP configuration cannot be written automatically for an agent, the page shows the command to register it manually (e.g. `claude mcp add --scope user`, `codex mcp add`).

## Live MCP server

The app starts the live endpoint automatically. It listens on **loopback only**:

```text
http://127.0.0.1:<port>/mcp
```

The default port is `59737`; if it is taken, the next free port is used. The actual **Live MCP URL** and the **Authentication header** are shown on the **Settings → AI Agents** page.

Every request must include the token in the standard header. Treat the token like a password:

```text
Authorization: Bearer <token>
```

Example MCP client configuration:

```json
{
  "mcpServers": {
    "beutl-live": {
      "type": "http",
      "url": "http://127.0.0.1:59737/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

After it connects, the agent calls the `attach_active_editor` tool to bind its session to the scene currently open in the editor.

## Stdio MCP server

The headless server runs as a separate process and communicates over stdio. The `BEUTL_WORKSPACE` environment variable defines the folder in which the server can create and save projects (it defaults to the current directory); the server can still read files outside that folder.

```json
{
  "mcpServers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "<path-to-stdio-server>",
      "env": { "BEUTL_WORKSPACE": "/path/to/workspace" }
    }
  }
}
```

:::note
The configuration file name and top-level property name vary by agent (most use `mcpServers`, as above, but not all). Installation from **Settings → AI Agents** writes the correct format for the selected agent, so you normally do not need to edit the file by hand.
:::

## Available tools (overview)

If an agent only has the MCP URL, it should call `get_started` first. The tool returns a compact usage guide.

| Group | Tools |
|-------|-------|
| Session | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status`, `attach_active_editor` (live server only) |
| Query / schema | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_fonts`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds` |
| Edit | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| Elements | `add_element`, `move_element`, `remove_element`, `duplicate_element`, `split_element`, `group_elements`, `ungroup_elements` |
| History | `undo`, `redo`, `read_history` |
| Render / inspection | `render_still`, `render_storyboard`, `measure_frame_differences`, `analyze_audio_rhythm`, `export_video`, `read_render_job`, `cancel_render_job` |

`apply_edit` accepts exactly one of a complete `desired` document or a partial `patch`. For targeted edits, use a JSON Merge Patch in `patch` and provide the `schemaVersion` returned by `get_schema`. A full `desired` document is authoritative: omitted child arrays can delete existing content.

## Edit and inspect

1. Call `get_started` to understand the session, then inspect its current state with `read_document_summary` or a targeted `get_schema` query.
2. Apply a patch and inspect the operation and validation results. Warnings are advisory.
3. Use `render_still` or `render_storyboard` to inspect the rendered result. Check that the appearance and motion match what you asked for before proceeding.
4. In a file-backed session, call `save_project` after major successful edits and final revisions. This tool does not save live-editor sessions; use the editor's auto-save or Beutl's save action there.

`undo` and `redo` reverse and replay edits through history. Live sessions share the user's history, so inspect `read_history` and its `nextUndo` before undoing. Save a file-backed session again after undoing.

## Source

- [`AgentHostEndpoint.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/AgentHost/AgentHostEndpoint.cs) (live server)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/AgentHost/AgentHostTools.cs)
- [`Beutl.AgentToolkit.Mcp/Program.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.AgentToolkit.Mcp/Program.cs) (stdio server)
- [`Beutl.AgentToolkit/Tools/`](https://github.com/b-editor/beutl/tree/v2.0.0-preview.8/src/Beutl.AgentToolkit/Tools) (tool implementations)
- [`AgentCatalog.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.AgentToolkit/Installation/AgentCatalog.cs) (supported agents)

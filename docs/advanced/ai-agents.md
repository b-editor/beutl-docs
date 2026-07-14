---
title: Editing with AI Agents
description: Let AI coding agents edit Beutl projects through MCP
sidebar_position: 6
---

# Editing with AI Agents

Beutl lets **AI coding agents** (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, and many others) edit projects through the **Model Context Protocol (MCP)**. Agents read the scene as a declarative document, apply changes as JSON Merge Patches through Beutl's undo history, and can render stills or storyboards to check their work.

Two MCP servers are provided:

- **Live MCP server** (recommended): runs inside the Beutl app and connects agents to the **running editor**. Edits appear live in the preview and timeline, and every change lands on the undo stack.
- **Stdio MCP server** (optional): a headless process that edits project files **without launching the GUI** — useful for automation.

## Setting up from the app

Open **Settings → AI Agents**.

1. Choose the **Agent** to install for (Claude Code, Codex, Cursor, Gemini CLI, …, or *Custom (manual paths)*) and the **Install scope** — **Project** (into a project folder) or **Global (user profile)**.
2. Under **Components**, pick what to install:
   - **Skills**: Beutl editing know-how the agent loads on demand
   - **Subagents**: specialized agent definitions for timeline, look, and quality-review tasks
   - **Stdio MCP server** / **Live MCP server** entries for the agent's MCP configuration
3. Press **Install**.

For some agents the MCP configuration cannot be written automatically; the page then shows the command to register it manually (e.g. `claude mcp add --scope user`, `codex mcp add`).

## Live MCP server

The live endpoint starts automatically with the app and listens on **loopback only**:

```
http://127.0.0.1:<port>/mcp
```

The default port is `59737`; if it is taken, the next free port is used. The actual **Live MCP URL** and the **Authentication header** are shown on the **Settings → AI Agents** page.

Every request must carry the token in the standard header — treat it like a password:

```
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

After connecting, the agent calls the `attach_active_editor` tool to bind its session to the scene currently open in the editor.

## Stdio MCP server

The headless server is a separate process that speaks MCP over stdio. The `BEUTL_WORKSPACE` environment variable defines the folder the server is allowed to create and save projects in (it defaults to the current directory); files outside it can still be read.

```json
{
  "servers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "<path-to-stdio-server>",
      "env": { "BEUTL_WORKSPACE": "/path/to/workspace" }
    }
  }
}
```

## Available tools (overview)

An agent that only knows the MCP URL should call `get_started` first — it returns a compact usage guide.

| Group | Tools |
|-------|-------|
| Session | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status`, `attach_active_editor` (live server only) |
| Query / schema | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds`, `compare_revisions`, `list_creative_directions`, `record_creative_direction`, `plan_original_scaffold` |
| Design | `derive_palette`, `get_background_grammar` |
| Edit | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| Render / quality | `render_still`, `render_storyboard`, `evaluate_motion_variation`, `analyze_audio_rhythm`, `evaluate_edit_quality`, `preview_quality_risks`, `suggest_quality_fixes`, `final_preflight`, `export_video`, `read_render_job`, `cancel_render_job` |

The central editing tool is `apply_edit`: it takes a declarative desired document (JSON Merge Patch), validates it, and applies it atomically through Beutl's history so the user can undo the agent's changes.

## Source

- [`AgentHostEndpoint.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/AgentHost/AgentHostEndpoint.cs) (live server)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/AgentHost/AgentHostTools.cs)
- [`Beutl.AgentToolkit.Mcp/Program.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.AgentToolkit.Mcp/Program.cs) (stdio server)
- [`Beutl.AgentToolkit/Tools/`](https://github.com/b-editor/beutl/tree/main/src/Beutl.AgentToolkit/Tools) (tool implementations)
- [`AgentCatalog.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.AgentToolkit/Installation/AgentCatalog.cs) (supported agents)

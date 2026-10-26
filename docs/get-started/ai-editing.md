---
title: Editing with AI Agents
description: Set up an AI coding agent and edit your project by talking to it
sidebar_position: 8
---

**AI coding agents** such as Claude Code or Codex can edit Beutl projects. Tell the agent what to change in plain language — "make the title fade in" or "add a vignette to every shot" — and it applies the changes to the project you have open. Edits appear **live in the preview and timeline**, and each change is recorded in the undo history, so you can always undo the agent's work.

## Prerequisites

- An AI coding agent installed on your machine (for example [Claude Code](https://code.claude.com/docs/) or Codex).
- A Beutl project. If you don't have one yet, see [Creating a Project](./create-project.md).

## 1. Install the integration

1. Open **Settings → AI Agents**.
2. Choose your **Agent** (Claude Code, Codex, Cursor, Gemini CLI, and many others are supported).
3. Choose the **Install scope**:
   - **Project**: installs into one project folder — useful when trying it out.
   - **Global (user profile)**: available in every folder.
4. Leave the **Components** (Skills, Subagents, MCP server) checked and press **Install**.

The installation adds instructions for editing Beutl projects and registers the agent's connection settings. Beutl writes the configuration or runs the agent's registration command. If automatic registration is unavailable or fails, follow the instructions shown on the page.

After upgrading from preview.8, reinstall the integration. The old `beutl-live` connection and token are replaced by the single `beutl-agent` server. Beutl backs up edited skill and subagent files before replacing them.

## 2. Edit with the agent

1. Open your project in Beutl.
2. Start your agent in the project folder. The built-in [Terminal tab](../reference/tool-tabs/terminal.md) already starts in that folder, so you can use it for this step. For Claude Code, run `claude`.
3. Ask for what you want, for example:

```text
Add a dark blue background and a title that fades in over the first second.
```

The installed `beutl-agent` server discovers running editors with `list_instances` and their scenes with `list_scenes`. The agent passes the chosen `instanceId` and `sceneId` with its scene edits. Tell it which project and scene to use if you have several open. Changes appear in the preview and timeline as it works.

:::tip
Enable **Follow live MCP edits (experimental)** in **Settings → AI Agents** to follow the agent's edits in the visible scene, playhead, and property editor. Without `instanceId`, the server edits project files headlessly instead of the running editor.
:::

## 3. Review the result

- Every agent edit is recorded in the **undo history**. Press `Ctrl + Z` (`Cmd + Z`) to undo anything you don't like.
- Agents can render stills and storyboards to check their work. Even so, always play the scene back yourself before [encoding](./encode.md).

## Learn more

- [Editing with AI Agents (advanced)](../advanced/ai-agents.md) — connection details, headless editing for automation, and the tool list.

## Related documents

- [Built-in AI workspace](../reference/tool-tabs/ai-workspace.md)

## Source

- [`AiAgentSettingsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/SettingsPages/AiAgentSettingsPageViewModel.cs)
- [`LiveInstanceTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Live/LiveInstanceTools.cs)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostTools.cs)
- [`AgentEditFollower.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentEditFollower.cs)

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
4. Leave the **Components** (Skills, Subagents, MCP servers) checked and press **Install**.

The installation adds instructions for editing Beutl projects and registers the agent's connection settings. For some agents, the page displays a command instead (for example `claude mcp add --scope user`); copy it and run it in a terminal.

## 2. Edit with the agent

1. Open your project in Beutl.
2. Start your agent in the project folder. The built-in [Terminal tab](../reference/tool-tabs/terminal.md) already starts in that folder, so you can use it for this step. For Claude Code, run `claude`.
3. Ask for what you want, for example:

```text
Add a dark blue background and a title that fades in over the first second.
```

The agent connects to the running editor, attaches to the scene you have open, and applies its edits. The changes appear in the preview and timeline as the agent works.

:::tip
The connection URL and its authentication header are shown in **Settings → AI Agents**. Treat the header like a password — anyone who has it can edit through your running editor.
:::

## 3. Review the result

- Every agent edit is recorded in the **undo history**. Press `Ctrl + Z` (`Cmd + Z`) to undo anything you don't like.
- Agents can render stills and storyboards to check their work. Even so, always play the scene back yourself before [encoding](./encode.md).

## Learn more

- [Editing with AI Agents (advanced)](../advanced/ai-agents.md) — connection details, the headless server for automation, and the full tool list.

---
title: Editing with AI Agents
description: Set up an AI coding agent and edit your project by talking to it
sidebar_position: 8
---

Beutl can be edited by **AI coding agents** such as Claude Code or Codex. You describe what you want in plain language — "make the title fade in", "add a vignette to every shot" — and the agent applies the changes to the project you have open. Edits show up **live in the preview and timeline**, and each change is recorded in the undo history, so you can always undo what the agent did.

## Prerequisites

- An AI coding agent installed on your machine (for example [Claude Code](https://code.claude.com/docs/) or Codex).
- A Beutl project. If you don't have one yet, see [Creating a Project](./create-project.md).

## 1. Install the integration

1. Open **Settings → AI Agents**.
2. Choose your **Agent** (Claude Code, Codex, Cursor, Gemini CLI, and many others are supported).
3. Choose the **Install scope**:
   - **Project**: installs into one project folder — good for trying it out.
   - **Global (user profile)**: available in every folder.
4. Leave the **Components** (Skills, Subagents, MCP servers) checked and press **Install**.

This teaches your agent how to edit Beutl projects and registers the connection settings for it. For some agents the page shows a command to run instead (for example `claude mcp add --scope user`) — copy and run it in a terminal.

## 2. Edit with the agent

1. Open your project in Beutl.
2. Start your agent in the project folder — the built-in [Terminal tab](../reference/tool-tabs/terminal.md) is a convenient place, since it already starts there. For Claude Code, just run `claude`.
3. Ask for what you want, for example:

```text
Add a dark blue background and a title that fades in over the first second.
```

The agent connects to the running editor, attaches to the scene you have open, and applies its edits. You will see them appear in the preview and timeline as it works.

:::tip
The connection URL and its authentication header are shown in **Settings → AI Agents**. Treat the header like a password — anyone who has it can edit through your running editor.
:::

## 3. Review the result

- Every agent edit lands in the **undo history** — press `Ctrl + Z` (`Cmd + Z`) to undo anything you don't like.
- Agents can render stills and storyboards themselves to check their work, but always play the scene back yourself before [encoding](./encode.md).

## Learn more

- [Editing with AI Agents (advanced)](../advanced/ai-agents.md) — connection details, the headless server for automation, and the full tool list.

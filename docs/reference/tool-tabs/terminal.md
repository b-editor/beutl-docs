---
title: "Terminal"
description: "Describes the role of the Terminal tab and how to use it."
sidebar_position: 14
---

# Terminal

A tab that runs a **shell inside the editor**. Because it starts in the project folder, it is a convenient place to run AI coding agents such as `claude` (Claude Code) or `codex` against the project, as well as commands like `ffmpeg` or `git` — all without leaving Beutl.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

Open it from the menu bar via **View → Tools → Terminal**.

## Shell and working directory

The shell to launch is resolved automatically from the environment — there is no setting for it.

| OS | Shell | Arguments |
|----|-------|-----------|
| Windows | `%COMSPEC%` (falls back to `cmd.exe`) | none |
| macOS | `$SHELL` (falls back to `/bin/zsh`) | `-l` (login shell) |
| Linux | `$SHELL` (falls back to `/bin/bash`) | `-l` (login shell) |

On macOS and Linux the shell is started as a **login shell**, so your profile (`PATH` and other settings) is loaded.

The working directory is the **folder of the current project**; if no project is open, the folder of the scene file is used instead.

:::info
On macOS and Linux, GUI-launched apps often have no locale in their environment, which would garble multi-byte output. If none of `LC_ALL` / `LC_CTYPE` / `LANG` are set, Beutl passes a `LANG` fallback derived from the current UI culture (e.g. `ja_JP.UTF-8`) to the shell.
:::

## Session lifecycle

- When the shell process exits, a banner saying **"The terminal session has ended."** appears at the top of the tab with a **Restart** button. Click it to start a new session with the same shell and working directory.
- The scrollback buffer holds up to 5,000 lines.
- The session is not persisted — closing the tab or the editor ends the shell process.

## Related documents

- [Tool Tabs](./index.md)
- [Project Structure](../../get-started/project-structure.md)

## Source

- [`TerminalTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/TerminalTabExtension.cs)
- [`TerminalTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/ViewModels/TerminalTabViewModel.cs)
- [`TerminalTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml.cs)
- The terminal control itself is provided by the external [`Iciclecreek.Avalonia.Terminal`](https://github.com/b-editor/beutl/tree/main/external) submodule.

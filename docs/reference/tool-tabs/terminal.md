---
title: "Terminal"
description: "Describes the role of the Terminal tab and how to use it."
sidebar_position: 16
---

# Terminal

Use this tab to run a **shell inside the editor**. It starts in the project folder, so you can run AI coding agents such as `claude` (Claude Code) or `codex` against the project without leaving Beutl. You can also run commands such as `ffmpeg` or `git`.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

Open it from the menu bar via **View → Tools → Terminal**.

## Shell and working directory

Beutl selects the shell automatically from the environment; there is no setting for it.

| OS | Shell | Arguments |
|----|-------|-----------|
| Windows | `%COMSPEC%` (falls back to `cmd.exe`) | none |
| macOS | `$SHELL` (falls back to `/bin/zsh`) | `-l` (login shell) |
| Linux | `$SHELL` (falls back to `/bin/bash`) | `-l` (login shell) |

On macOS and Linux, Beutl starts the shell as a **login shell**, which loads your profile (`PATH` and other settings).

The working directory is the **folder of the current project**; if no project is open, the folder of the scene file is used instead.

:::info
On macOS and Linux, apps launched from the GUI often have no locale in their environment, so multi-byte output would be garbled. If none of `LC_ALL` / `LC_CTYPE` / `LANG` are set, Beutl passes the shell a fallback `LANG` derived from the current UI culture (e.g. `ja_JP.UTF-8`).
:::

## Session lifecycle

- When the shell process exits, a banner saying **"The terminal session has ended."** and a **Restart** button appear at the top of the tab. Click the button to start a new session with the same shell and working directory.
- The scrollback buffer holds up to 5,000 lines.
- Switching to another tab in the same dock and back leaves the shell process and the scrollback intact.
- The session is not persisted. Closing the tab or the editor ends the shell process.

## Related documents

- [Tool Tabs](./index.md)
- [Project Structure](../../get-started/project-structure.md)

## Source

- [`TerminalTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/TerminalTabExtension.cs)
- [`TerminalTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/ViewModels/TerminalTabViewModel.cs)
- [`TerminalTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml.cs)
- The terminal control itself is provided by the external [`Iciclecreek.Avalonia.Terminal`](https://github.com/b-editor/beutl/tree/main/external) submodule.

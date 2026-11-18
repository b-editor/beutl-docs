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

Unless you choose a shell in [Settings → Terminal](#settings), Beutl selects it from the environment.

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

## Copying and pasting

Select text by dragging over it. While text is selected, `Ctrl + C` or `Ctrl + Shift + C` copies it (`Cmd + C` on macOS); with nothing selected, `Ctrl + C` goes to the shell as usual. `Ctrl + Shift + V` or `Shift + Insert` pastes (`Cmd + V` on macOS), and `Ctrl + V` alone goes to the shell.

A right-click copies the selected text, or pastes when nothing is selected. While a program in the terminal takes mouse input, hold `Shift` when you right-click.

## Settings {/* #settings */}

Open **Settings → Terminal** to change how terminals look and which shell they start. Changes under **View** apply to open terminals right away.

| Setting | Default |
|---------|---------|
| **Theme** | **Use Beutl theme** (**Dark** and **Light** are also available) |
| **Font** | **Default**: Consolas on Windows, Menlo on macOS, and DejaVu Sans Mono on Linux |
| **Font size (DIP)** | 14 (8 to 72) |
| **Scrollback lines** | 5,000 (0 to 1,000,000) |

**Use Beutl theme** takes the text and background colors from Beutl's theme, so the terminal matches the panels around it. **Font** lists the fonts installed on the computer.

Under **Shell**, **Executable** and **Arguments** choose what the terminal starts. Leave both empty to use the shell and arguments in the table above; the empty **Executable** box shows the default shell. Enter one argument per line, and spaces within a line are kept. Arguments you enter replace the default `-l`, and a shell you enter in **Executable** gets only the arguments you enter. These changes apply when a terminal opens or restarts.

## Session lifecycle

- When the shell process exits, a banner saying **"The terminal session has ended."** and a **Restart** button appear at the top of the tab. Click the button to start a new session in the same working directory, with the shell the settings now choose. The earlier output stays in the scrollback.
- If the shell cannot start, for example because **Executable** names a program that does not exist, the tab shows the error with the same banner and **Restart** button.
- The scrollback keeps as many lines as **Scrollback lines** allows.
- Switching to another tab in the same dock and back leaves the shell process and the scrollback intact.
- The session is not persisted. Closing the tab or the editor ends the shell process.

## Related documents

- [Tool Tabs](./index.md)
- [Project Structure](../../get-started/project-structure.md)

## Source

- [`TerminalTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/TerminalTabExtension.cs)
- [`TerminalTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/ViewModels/TerminalTabViewModel.cs)
- [`TerminalTabView.axaml`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml.cs) / [`ShellTerminalControl.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/ShellTerminalControl.cs)
- [`TerminalConfig.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Configuration/TerminalConfig.cs) / [`TerminalSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Pages/SettingsPages/TerminalSettingsPage.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Pages/SettingsPages/TerminalSettingsPage.axaml.cs)
- The terminal control itself is provided by [RoyalTerminal](https://github.com/royalapplications/RoyalTerminal) (`RoyalApps.RoyalTerminal.Avalonia`).

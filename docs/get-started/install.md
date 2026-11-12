---
title: Installation
description: How to install Beutl
sidebar_position: 1
---

This page covers the available ways to install Beutl.

In the instructions below, `{version}` represents the version of Beutl you are installing.

## System requirements {/* #system-requirements */}

Beutl runs on x64 and ARM64 computers. On x64, the processor must support x86-64-v2: the CX16, POPCNT, SSE3, SSSE3, SSE4.1, and SSE4.2 instructions. Every Intel and AMD processor that its maker still supports has them; the last processors without them went out of support around 2013. The .NET 11 runtime that Beutl includes [requires them](https://learn.microsoft.com/dotnet/core/compatibility/jit/11/minimum-hardware-requirements), so from 2.0.0-preview.12 on, Beutl does not start on an x64 processor without them. The requirement for ARM64 has not changed.

## For Windows

Windows supports both x64 and ARM64. For an ARM64 device, use an installer with `arm64` in its file name.

### Using the standalone installer (recommended)
1. Download and run `beutl-standalone-setup.exe` (ARM64: `beutl-standalone-arm64-setup.exe`).
2. Follow the on-screen instructions to install.
3. Launch `Beutl.exe`.

The release packages include the .NET runtime. Lightweight installers and framework-dependent archives are no longer published. When updating from an older lightweight or portable Windows installation, download the standalone installer.

## For Debian and Ubuntu

The Debian package installs on Ubuntu 22.04, 24.04, and 26.04, and on Debian 12 and 13.

### Installing from Debian package

1. Download `beutl_{version}_amd64.deb` for x64, or `beutl_{version}_arm64.deb` for ARM64. Use the matching downloaded filename in the command below.
2. Run the following commands:
```sh
sudo apt update
sudo apt install ./beutl_{version}_amd64.deb
```
3. Installation is complete.

### Manual installation
1. Download and extract `Beutl-linux-x64-standalone-{version}.zip` or `Beutl-linux-arm64-standalone-{version}.zip` for your architecture.
2. Use `chmod` to make `Beutl`, `Beutl.ExceptionHandler`, `Beutl.PackageTools.UI`, `Beutl.FFmpegWorker`, and `Beutl.AgentToolkit.Mcp` executable.
3. Launch `Beutl`.

## For Linux (Flatpak)

Flatpak lets you install Beutl on any Linux distribution without a distribution-specific package.

:::note
Requires `flatpak` with the Flathub remote configured. The bundle pulls the `org.freedesktop.Platform` runtime from Flathub on first install.
:::

1. Download `Beutl-{version}.flatpak` for x64, or `Beutl-arm64-{version}.flatpak` for ARM64, from the release page. Use the matching filename below.
2. Install the bundle for the current user:
```sh
flatpak install --user Beutl-{version}.flatpak
```
3. Launch Beutl:
```sh
flatpak run net.beditor.Beutl
```

After installation, Beutl also appears in your desktop environment's application menu.

### Updating a Flatpak installation

Beutl's built-in updater can download and install the new Flatpak bundle into the same user or system installation for the running architecture. When the update finishes, close and reopen Beutl to use the new version.

An installation for all users, which `flatpak install` and GNOME Software make by default, needs an administrator: your desktop asks for the password once. If you cancel the prompt or authentication fails, choose **Retry** to try again, or download the update from **Release notes** and install it yourself.

## For macOS

- Download and extract `Beutl.osx_arm64.app.zip` or `Beutl.osx_x64.app.zip`.
- Double-click the downloaded file to extract it.
- Double-click `Beutl.app` to launch the application.

## Updating Beutl

When a new version is available, Beutl shows a notification with **Install** and **Release notes**. **Install** downloads the update in the background while you keep editing, and the [Status](../reference/index.md#application-status) button in the title bar shows its progress. Open the status popup to see the update dialog; **Run in background** hides it again, and `Esc` cancels the update.

When the update is ready, a notification shows the version and offers:

- **Start installer** on Windows, or **Restart and update** on macOS and Linux: Beutl closes and the update starts. On macOS and Linux, Beutl starts again afterward.
- **Update on quit**: The update installs when you quit Beutl, after your work is saved, and Beutl stays closed.

A Flatpak installation installs the new bundle as soon as it is downloaded; see [Updating a Flatpak installation](#updating-a-flatpak-installation).

If the download or the preparation fails, the notification and the dialog offer **Retry**, and the message names the step that failed.

The first time a newly published version starts, a notification offers **Release notes**, which open that version's release page.

## Before updating

**2.0.0-preview.12 keeps the project file format floor of preview.11.** Projects saved by preview.12 still open in preview.11, but not in preview.10 or earlier. Keep a copy of the whole project folder before saving it in the new version if you need to return to preview.10 or earlier. See [Project Structure](./project-structure.md#version-compatibility).

**On x64, preview.12 needs a processor with x86-64-v2.** See [System requirements](#system-requirements).

Existing projects can look or sound different after updating to preview.12:

- **A sound's effects run at its file's sample rate.** When a sound's file has another sample rate than the project, such as a 44.1 kHz file in a 48 kHz project, its speed, pan, gain, and audio effects now run at the file's rate, and the conversion to the project's rate follows them. An Equalizer band above half the file's rate is held just under it, so a 10 kHz boost on 8 kHz audio now lands near 4 kHz. To run the effects at the project's rate, put a [Resampling](../reference/library/audio-effects/resampling.md) effect first in the chain.
- **A Shake at strength 0 leaves its layer as it is.** It used to draw the layer again, which softened text at a fractional position on every frame before a shake began. See [Shake](../reference/library/filter-effects/shake.md).

Times now show as timecodes, such as `00:00:02:15`, instead of seconds with hundredths. To go back, choose **Time (00:00:02.50)** in [Time Display Format](../settings/editor.md#time-display-format), or right-click the time in the preview.

If you use an AI coding agent, [reinstall its Beutl integration](../advanced/ai-agents.md) after updating.

## Source

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/FlatpakUpdater.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/AppUpdateController.cs) / [`StartupNotificationService.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupNotificationService.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)
- [`global.json`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/global.json)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Core/Serialization/FileFormat.cs)
- [`Sound.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Sound.cs)
- [`ShakeEffect.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Graphics/FilterEffects/ShakeEffect.cs)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Configuration/EditorConfig.cs)

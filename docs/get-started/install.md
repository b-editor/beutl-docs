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

When Beutl finds a new version at startup, it downloads the update in the background while you keep editing. A short **Downloading the update** notification with **Release notes** says so, and the [Status](../reference/index.md#application-status) button in the title bar shows the progress. To be asked first, turn off **Download updates automatically** on the **Info** page of the settings. Beutl then shows a notification with **Install** and **Release notes**, and **Install** starts the download. If more than one Beutl is running, only one of them downloads without asking, and the others offer **Install**. Open the status popup to see the update dialog; **Run in background** hides it again, and `Esc` cancels the update.

When the update is ready, a notification shows the version and offers:

- **Start installer** on Windows, or **Restart and update** on macOS and Linux: Beutl closes and the update starts. On macOS and Linux, Beutl starts again afterward.
- **Update on quit**: The update installs when you quit Beutl, after your work is saved, and Beutl stays closed.
- **Release notes**: Opens the release page and keeps the notification on screen.

A Flatpak installation installs the new bundle as soon as it is downloaded, so it never downloads without asking, and the settings do not show **Download updates automatically**; see [Updating a Flatpak installation](#updating-a-flatpak-installation).

If the download or the preparation fails, the notification and the dialog offer **Retry**, and the message names the step that failed.

The first time a newly published version starts, a notification offers **Release notes**, which open that version's release page.

## Before updating

**2.0.0-preview.13 keeps the project file format floor of preview.11.** Projects saved by preview.13 still open in preview.11 and preview.12, but not in preview.10 or earlier. Keep a copy of the whole project folder before saving it in the new version if you need to return to preview.10 or earlier. See [Project Structure](./project-structure.md#version-compatibility).

**On x64, Beutl needs a processor with x86-64-v2 since preview.12.** See [System requirements](#system-requirements).

Existing projects can look different after updating to preview.13:

- **SDR video tagged BT.709, BT.601, or BT.2020 shows darker shadows.** Beutl now reads these tags with the curve QuickTime uses, so a macOS screen recording looks as the screen did. The difference is largest near black, about 17 levels darker at sRGB level 13, and less than 1 level above level 128. Existing proxies are discarded and made again once. See [Color tags](../reference/tool-tabs/output.md#color-tags).
- **BT.709 exports have brighter shadows** than before, and play back in QuickTime as they look in Beutl.

Updates found at startup now download without asking. See [Updating Beutl](#updating-beutl).

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
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Core/Serialization/FileFormat.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Services/AppUpdateController.cs) / [`UpdateConfig.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Configuration/UpdateConfig.cs) / [`InformationPage.axaml`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Pages/SettingsPages/InformationPage.axaml)
- [`BitmapColorSpaceMapping.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Engine/Media/BitmapColorSpaceMapping.cs)

---
title: Installation
description: How to install Beutl
sidebar_position: 1
---

This page covers the available ways to install Beutl.

In the instructions below, `{version}` represents the version of Beutl you are installing.

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

**Projects saved by 2.0.0-preview.11 cannot be opened in preview.10 or earlier.** Keep a copy of the whole project folder before saving it in the new version if you need to return to an older Beutl. See [Project Structure](./project-structure.md#version-compatibility).

Existing projects can look or sound different after updating to preview.11:

- **Stroke and Flat Shadow outlines sit on the visible edge.** The outline is now traced at sub-pixel precision, about half a pixel further in than before. Alpha below about 3% and islands smaller than a pixel are no longer outlined, and rounded corners with a radius up to about 2.4 px are drawn sharp. See [Stroke](../reference/library/filter-effects/stroke.md).
- **A disabled transform moves nothing.** A single transform, or a group, set directly as a drawable's Transform kept applying while it was turned off. It now has no effect, as its switch says.
- **A sound whose speed keyframes all stay at 100% plays as a fixed 100% speed does**, with the input passed through instead of time-stretched.
- **The preview's tone mapping follows the display.** A tone mapping of **None** saved by an earlier version reads as the new **Auto**, so the HDR preview on an HDR display uses **Fit to display**. The SDR preview and exports are unchanged. See [Tone mapping](../settings/editor.md#tone-mapping).

After the first save of an open scene, a save writes only the elements that changed, so an element file edited outside Beutl in the meantime is no longer overwritten unless you edited that element in Beutl too. On macOS, right-click menus are now native menus; see [Use Native Context Menus](../settings/view.md#use-native-context-menus).

If you use an AI coding agent, [reinstall its Beutl integration](../advanced/ai-agents.md) after updating.

## Source

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/FlatpakUpdater.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/AppUpdateController.cs) / [`StartupNotificationService.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupNotificationService.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Core/Serialization/FileFormat.cs)
- [`AlphaOutlineTracer.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/AlphaOutlineTracer.cs)
- [`Transform.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/Transformation/Transform.cs)
- [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Media/SpeedIntegrator.cs)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Configuration/EditorConfig.cs)

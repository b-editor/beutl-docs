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

## For Ubuntu 22.04

### Installing from Debian package

1. Download `beutl_{version}ubuntu22.04_amd64.deb` for x64, or `beutl_{version}ubuntu22.04_arm64.deb` for ARM64. Use the matching downloaded filename in the command below.
2. Run the following commands:
```sh
sudo apt update
sudo apt install ./beutl_{version}ubuntu22.04_amd64.deb
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

## For macOS

- Download and extract `Beutl.osx_arm64.app.zip` or `Beutl.osx_x64.app.zip`.
- Double-click the downloaded file to extract it.
- Double-click `Beutl.app` to launch the application.

## Before updating

**Projects saved by 2.0.0-preview.9 cannot be opened in preview.8 or earlier.** Keep a copy of the whole project folder before saving it in the new version if you need to return to an older Beutl. See [Project Structure](./project-structure.md#version-compatibility).

If you use an AI coding agent, [reinstall its Beutl integration](../advanced/ai-agents.md) after updating.

## Source

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/FlatpakUpdater.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)

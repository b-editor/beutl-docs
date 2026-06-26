---
title: Installation
description: How to install Beutl
sidebar_position: 1
---

This document explains how to install Beutl.

In this document, the version of Beutl to be installed is referred to as `{version}`.

## For Windows

### Using the standalone installer (recommended)
1. Download and run `beutl-standalone-setup.exe`.
2. Follow the on-screen instructions to install.
3. Launch `Beutl.exe`.

### Using the lightweight installer
Install the [.NET Runtime](https://dotnet.microsoft.com/download/dotnet/10.0).

:::tip
Determine the version of .NET to install based on the version of Beutl you are installing.  
[Version Compatibility Table](../extensions/version-mapping.md)
:::

1. Download and run `beutl-setup.exe`.
2. Follow the on-screen instructions to install.
3. Launch `Beutl.exe`.

## For Ubuntu 22.04

### Installing from Debian package

1. Download `beutl_{version}ubuntu22.04_amd64.deb`.
2. Run the following commands:
```sh
sudo apt update
sudo apt install ./beutl_{version}ubuntu22.04_amd64.deb
```
3. Installation is complete.

### Manual installation
1. Download and extract `beutl-linux-x64-standalone-{version}.zip`.
2. Use `chmod` to make `Beutl`, `Beutl.ExceptionHandler`, `Beutl.PackageTools`, and `Beutl.WaitingDialog` executable.
3. Launch `Beutl`.

## For Linux (Flatpak)

Flatpak lets you install Beutl on any Linux distribution without a distribution-specific package.

:::note
Requires `flatpak` with the Flathub remote configured. The bundle pulls the `org.freedesktop.Platform` runtime from Flathub on first install.
:::

1. Download `Beutl-{version}.flatpak` from the release page.
2. Install the bundle for the current user:
```sh
flatpak install --user Beutl-{version}.flatpak
```
3. Launch Beutl:
```sh
flatpak run net.beditor.Beutl
```

After installation, Beutl also appears in your desktop environment's application menu.

## For macOS

- Download and extract `Beutl.osx_arm64.app.zip` or `Beutl.osx_x64.app.zip`.
- Double-click the downloaded file to extract it.
- Double-click `Beutl.app` to launch the application.

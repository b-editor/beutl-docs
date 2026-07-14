---
title: Installation
description: How to install Beutl
sidebar_position: 1
---

This document explains how to install Beutl.

In this document, the version of Beutl to be installed is referred to as `{version}`.

## For Windows

Both x64 and ARM64 are supported. On ARM64 devices, use the installers whose file names contain `arm64`.

### Using the standalone installer (recommended)
1. Download and run `beutl-standalone-setup.exe` (ARM64: `beutl-standalone-arm64-setup.exe`).
2. Follow the on-screen instructions to install.
3. Launch `Beutl.exe`.

### Using the lightweight installer
Install the [.NET Runtime](https://dotnet.microsoft.com/download/dotnet/10.0).

:::tip
Determine the version of .NET to install based on the version of Beutl you are installing.  
[Version Compatibility Table](../extensions/version-mapping.md)
:::

1. Download and run `beutl-setup.exe` (ARM64: `beutl-arm64-setup.exe`).
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

## For macOS

- Download and extract `Beutl.osx_arm64.app.zip` or `Beutl.osx_x64.app.zip`.
- Double-click the downloaded file to extract it.
- Double-click `Beutl.app` to launch the application.

---
title: Materials and Templates
description: Install materials and object templates from the package store.
sidebar_position: 10
---

The package store includes **Extensions**, **Materials**, and **Templates**. A package can contain both materials and templates.

## Install a package

1. Open the **Extensions** window.
2. Choose **Materials** or **Templates** in the category filter.
3. Open the package you want, select a release, and press **Install**.

Installed packages also offer update and uninstall actions.

## Use the installed files

Open the [Files](../reference/tool-tabs/file-browser.md) tab and choose the pinned **Materials** or **Templates** folder. Installed materials and object templates are grouped by package name.

Drag supported media or object templates to the timeline. Object templates can show thumbnails in the file browser.

## Scheduled changes

Some install, update, or uninstall actions are scheduled for application exit. When Beutl asks you to exit to apply package changes, save your work and exit the app. Pending changes are stored and restored across sessions. To withdraw a scheduled action, open the package details and choose **Cancel** before exiting.

## Extension compatibility

An extension that requires APIs absent from your installed Beutl cannot be loaded, installed, or updated. Open **Details** in the error notification to see the affected package and compatibility report. Choose an extension release compatible with your Beutl version, or update Beutl to the version the extension targets. A rejected update leaves the previously installed version in place.

## Related documents

- [Files](../reference/tool-tabs/file-browser.md)
- [Publishing packages](../extensions/publish.md)

## Source

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)
- [`PackageChangesQueue.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Api/Services/PackageChangesQueue.cs)
- [`MainViewModel.Shutdown.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/MainViewModel.Shutdown.cs)
- [`PackageOperationHandler.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/ExtensionsPages/PackageOperationHandler.cs)
- [`AfterLoadingExtensionsTask.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/StartupTasks/AfterLoadingExtensionsTask.cs)

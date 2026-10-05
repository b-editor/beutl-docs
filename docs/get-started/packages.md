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

Open the [Files](../reference/tool-tabs/file-browser.md) tab and choose the pinned **Materials** or **Templates** folder. Installed assets are grouped by package name.

Drag supported media or object templates to the timeline. Object templates can show thumbnails in the file browser.

## Related documents

- [Files](../reference/tool-tabs/file-browser.md)
- [Publishing packages](../extensions/publish.md)

## Source

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)

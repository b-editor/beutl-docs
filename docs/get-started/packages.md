---
title: Materials and Templates
description: Install materials and object templates from the package store.
sidebar_position: 10
---

The package store includes **Extensions**, **Materials**, and **Templates**. A package can contain both materials and templates.

## Install a package

Open the **Extensions** window and use the category filter to browse the store. Open a package, select a release, and press **Install**. Installed packages also offer update and uninstall actions.

## Use the installed files

Open the [Files](../reference/tool-tabs/file-browser.md) tab. Its pinned **Materials** and **Templates** folders contain the installed assets, grouped by package name:

- Materials: `materials/<packageName>` in Beutl's home directory.
- Object templates: `templates/<packageName>` in Beutl's home directory.

Drag supported media or object templates to the timeline. Object templates can show thumbnails in the file browser.

## Installation links from the web

A web installation link opens the package's details in Beutl. It can request a version using `beutl://install?package=<packageName>&version=<version>`; `version` is optional.

Opening the link does not install the package. Review the selected release and press **Install**. If a requested version is unavailable, choose an available release first.

## Related documents

- [Files](../reference/tool-tabs/file-browser.md)
- [Publishing packages](../extensions/publish.md)

## Source

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageInstallRequest.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PackageInstallRequest.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)

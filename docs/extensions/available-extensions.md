---
title: Types of Extensions You Can Develop
description: List of extension types that can be added to Beutl.
sidebar_position: 3
---

In Beutl, you can extend the following functionalities:

| Type Name | Description |
| --- | --- |
| DecodingExtension | Adds support for video and audio decoding, and input files |
| ControllableEncodingExtension | Adds support for video and audio encoding, and output files |
| EditorExtension | Adds a UI for editing files |
| OutputExtension | Adds a UI for output |
| [Extension](sample-extensions.md#sugarshaker) | Base class for extensions (override the Load method to register functionalities) |
| ToolWindowExtension | Adds a tool window that can be opened from the Window menu |
| ProjectItemExtension | Adds types of items to the project |
| PropertyEditorExtension | Adds a UI for editing specific property types |
| [ToolTabExtension](sample-extensions.md#tooltabextension) | Adds tabs to the scene editing screen |
| [ThemeExtension](implement-theme.md) | Adds a theme to the picker in Settings → Display |

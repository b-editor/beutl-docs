---
title: "Scene Reference (Audio)"
description: "References another scene's rendered audio output."
sidebar_position: 2
---

# Scene Reference (Audio)

References another scene's rendered audio output and mixes it into the current scene's audio.

## Library location

Library → Scene Reference (Audio)

## Properties

### Referenced Scene (ReferencedScene)

The scene whose rendered audio is mixed in. Use the [reference target picker](../../../get-started/edit-element.md#reference-targets) to select an existing scene in the project. Scenes that would create a reference cycle are excluded.

- **Type:** `Scene?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Sound` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Pair with `SceneDrawable` when you want both video and audio of the referenced scene. Slip, roll, slide, edge trims, and **Change to original length** use the referenced scene's length. If an expression other than a plain reference picks the scene, its length is unknown, so slip and trim are refused. The panner works on the mix in the project's speaker layout, so in a [5.1 or 7.1 project](../../../get-started/multichannel-audio.md) only `Pan` applies.

## Source

[`src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs)

- [`ReferencePropertyEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/ViewModels/ReferencePropertyEditorViewModel.cs)

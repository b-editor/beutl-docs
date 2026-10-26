---
title: "Scene Reference (Video)"
description: "References another scene's rendered video output."
sidebar_position: 1
---

# Scene Reference (Video)

References another scene's rendered video output and renders it as a drawable in the current scene. The referenced scene is re-rendered whenever its inputs change.

## Library location

Library → Scene Reference (Video)

## Properties

### Referenced Scene (ReferencedScene)

The scene whose rendered output is composited. Use the [reference target picker](../../../get-started/edit-element.md#reference-targets) to select an existing scene in the project. Scenes that would create a reference cycle are excluded.

- **Type:** `Scene?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Use to compose multi-scene projects: render reusable elements (logos, lower-thirds, intros) once and instantiate them across scenes.

## Source

[`src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs)

- [`ReferencePropertyEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/ViewModels/ReferencePropertyEditorViewModel.cs)

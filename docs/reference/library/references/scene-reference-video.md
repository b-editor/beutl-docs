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

The scene whose rendered output is composited.

- **Type:** `Scene?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Use to compose multi-scene projects: render reusable elements (logos, lower-thirds, intros) once and instantiate them across scenes.

## Source

[`src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs)

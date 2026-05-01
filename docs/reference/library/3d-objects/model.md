---
title: "Model"
description: "Loads and renders an external 3D model file."
sidebar_position: 5
---

# Model

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

Loads a 3D model from an external file (formats supported by the underlying loader) and renders it inside a `Scene3D`.

## Library location

Library → 3D (Experimental) → Model

## Properties

### Source

The 3D model file to load.

- **Type:** `ModelSource?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Group3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Models/Model3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Models/Model3D.cs)

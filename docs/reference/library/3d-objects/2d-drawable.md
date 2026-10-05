---
title: "2D Drawable"
description: "Place 2D drawables on a flat card in a 3D scene."
sidebar_position: 9
---

# 2D Drawable

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

Places preceding 2D drawables in the flow, or its own children, on a flat card in a 3D scene. With the default camera, their original 2D placement is preserved. Position, rotation, and scale transform the card about the content's center.

## Library location

Library → 3D (Experimental) → 2D Drawable

## Properties

### Children

2D drawables to place on the card when supplying content directly.

- **Type:** `IListProperty<Drawable>`
- **Default:** Empty list
- **Animatable:** No

## Common properties

Inherits the [Object3D common properties](../common-properties.md#object3d). It uses its own `UnlitMaterial`, which is hidden from the property editor. **Cast Shadows** defaults to `false`.

## Source

- [`DrawableObject3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/DrawableObject3D.cs)
- [`CoordinateSystem3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/CoordinateSystem3D.cs)
- [`LibraryRegistrar.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/LibraryRegistrar.cs)

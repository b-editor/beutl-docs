---
title: "Plane"
description: "A flat 3D plane sized in width and height with subdivision."
sidebar_position: 4
---

# Plane

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A flat 3D plane sized in width and height with adjustable subdivisions. Useful as a ground, a billboard, or a deformable surface.

## Library location

Library → 3D (Experimental) → Plane

## Properties

### Width

Plane width along the local X axis.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

### Height

Plane height along the local Y axis.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

### Width Segments (WidthSegments)

Subdivision count along the width.

- **Type:** `int`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

### Height Segments (HeightSegments)

Subdivision count along the height.

- **Type:** `int`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

## Common properties

This object inherits from `Object3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Primitives/Plane3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Primitives/Plane3D.cs)

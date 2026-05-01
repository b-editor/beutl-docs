---
title: "Sphere"
description: "A 3D sphere primitive with a configurable radius and tessellation."
sidebar_position: 3
---

# Sphere

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A 3D sphere primitive defined by `Radius`. `Segments` and `Rings` control the tessellation density (more = smoother, costlier).

## Library location

Library → 3D (Experimental) → Sphere

## Properties

### Radius

Sphere radius.

- **Type:** `float`
- **Default:** `0.5`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

### Segments

Number of horizontal subdivisions (longitude).

- **Type:** `int`
- **Default:** `32`
- **Animatable:** Yes
- **Range:** `[3, 128]`

### Rings

Number of vertical subdivisions (latitude).

- **Type:** `int`
- **Default:** `16`
- **Animatable:** Yes
- **Range:** `[2, 128]`

## Common properties

This object inherits from `Object3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Primitives/Sphere3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Primitives/Sphere3D.cs)

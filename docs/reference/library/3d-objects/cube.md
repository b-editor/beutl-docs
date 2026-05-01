---
title: "Cube"
description: "A 3D cube primitive sized in width, height and depth."
sidebar_position: 2
---

# Cube

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A 3D cube primitive sized in width, height and depth. Inherits position, rotation, scale and material from `Object3D`.

## Library location

Library → 3D (Experimental) → Cube

## Properties

### Width

Cube width along the local X axis.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

### Height

Cube height along the local Y axis.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

### Depth

Cube depth along the local Z axis.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.001, ∞)`

## Common properties

This object inherits from `Object3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Primitives/Cube3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Primitives/Cube3D.cs)

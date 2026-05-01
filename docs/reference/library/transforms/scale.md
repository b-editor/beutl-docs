---
title: "Scale"
description: "Scales the layer in X, Y and uniform direction."
sidebar_position: 3
---

# Scale

Scales the layer. `Scale` applies uniformly, while `Scale X` and `Scale Y` provide per-axis multipliers on top of the uniform value.

## Library location

Library → Transform → Scale

## Properties

### Scale

Uniform scale factor expressed as a percentage (`100` = original size).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

### Scale X (ScaleX)

Horizontal scale multiplier (multiplied with `Scale`).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

### Scale Y (ScaleY)

Vertical scale multiplier (multiplied with `Scale`).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

## Usage

Animate `Scale` from `0` to `100` for a "pop in" reveal, or use negative values on a single axis to mirror the layer.

## Source

[`src/Beutl.Engine/Graphics/Transformation/ScaleTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/ScaleTransform.cs)

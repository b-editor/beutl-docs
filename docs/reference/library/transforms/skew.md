---
title: "Skew"
description: "Skews the layer along the X and Y axes."
sidebar_position: 2
---

# Skew

Applies a horizontal and / or vertical skew to the layer. Skew angles are specified in degrees.

## Library location

Library → Transform → Skew

## Properties

### Skew X (SkewX)

Horizontal skew in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Skew Y (SkewY)

Vertical skew in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Usage

Use small angles (5–20°) for stylized type or fake-italic effects; combine with `Transform Origin` on `Drawable` to control the pivot.

## Source

[`src/Beutl.Engine/Graphics/Transformation/SkewTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/SkewTransform.cs)

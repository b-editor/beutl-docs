---
title: "Displacement Map"
description: "Distorts an image using a displacement map."
sidebar_position: 31
---

# Displacement Map

Distorts an image using the color information of a displacement map as per-pixel offsets. The channel selected by `Channel` drives horizontal and vertical displacement.

## Library location

Library → Filter Effect → Displacement Map

## Properties

### Displacement Map (DisplacementMap)

Brush whose pixels drive the displacement.

- **Type:** `Brush?`
- **Default:** `Radial Gradient Brush` (white at the center fading to transparent)
- **Animatable:** No

### Transform

Transform applied to the displacement map before sampling.

- **Type:** `DisplacementMapTransform?`
- **Default:** `Translation Transform`
- **Animatable:** No

### Spread Method (SpreadMethod)

How the map is wrapped at its edges (Pad / Reflect / Repeat).

- **Type:** `GradientSpreadMethod`
- **Default:** `GradientSpreadMethod.Pad`
- **Animatable:** Yes

### Channel

Which color channel of the map drives the displacement.

- **Type:** `DisplacementMapChannel`
- **Default:** `DisplacementMapChannel.Alpha`
- **Animatable:** No

### Signed

When `true`, treats 0.5 as zero displacement (signed mode).

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Show Displacement Map (ShowDisplacementMap)

When `true`, draws the map itself for debugging.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Displacement map transforms

The following are the types of objects that can be set for the `Transform` property.

### Translation Transform

Treats the displacement value as a 2D translation offset.

- **X:** `float`, default `0`, animatable. Maximum horizontal offset (pixels) at full displacement.
- **Y:** `float`, default `0`, animatable. Maximum vertical offset (pixels) at full displacement.

### Scale Transform

Treats the displacement value as a per-pixel scale around a pivot point.

- **Scale:** `float`, default `100`, animatable. Uniform scale percentage at full displacement.
- **Scale X (ScaleX):** `float`, default `100`, animatable. Horizontal scale percentage (multiplied with `Scale`).
- **Scale Y (ScaleY):** `float`, default `100`, animatable. Vertical scale percentage (multiplied with `Scale`).
- **Center X (CenterX):** `float`, default `0`, animatable. Pivot X offset from the image center (pixels).
- **Center Y (CenterY):** `float`, default `0`, animatable. Pivot Y offset from the image center (pixels).

### Rotation Transform

Treats the displacement value as a per-pixel rotation around a pivot point.

- **Rotation:** `float`, default `0`, animatable. Rotation amount in degrees at full displacement.
- **Center X (CenterX):** `float`, default `0`, animatable. Pivot X offset from the image center (pixels).
- **Center Y (CenterY):** `float`, default `0`, animatable. Pivot Y offset from the image center (pixels).

## Usage

Use a noise pattern, gradient, or video clip as the map. Animate the map's `Transform` for flowing distortions; toggle `ShowDisplacementMap` for debugging.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs)

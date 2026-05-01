---
title: "Color Shift"
description: "Shifts each RGB and alpha channel independently to create a chromatic aberration look."
sidebar_position: 29
---

# Color Shift

Shifts each color channel (R / G / B / A) independently to create chromatic-aberration / glitch looks. Sample positions are shifted on a per-channel basis.

## Library location

Library → Filter Effect → Color Shift

## Properties

### Red Offset (RedOffset)

Pixel offset for the red channel.

- **Type:** `PixelPoint`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Green Offset (GreenOffset)

Pixel offset for the green channel.

- **Type:** `PixelPoint`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Blue Offset (BlueOffset)

Pixel offset for the blue channel.

- **Type:** `PixelPoint`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Alpha Offset (AlphaOffset)

Pixel offset for the alpha channel.

- **Type:** `PixelPoint`
- **Default:** `(0, 0)`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs)

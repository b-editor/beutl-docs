---
title: "Chroma key"
description: "Removes a hue range to perform green/blue screen keying."
sidebar_position: 23
---

# Chroma key

Removes a hue range to perform green / blue screen keying. Compares pixels in HSV space against a target color with adjustable hue, saturation and edge boundary.

## Library location

Library → Filter Effect → Chroma key

## Properties

### Color

Key color (e.g., the green of the screen).

- **Type:** `Color`
- **Default:** `#00000000` (transparent black)
- **Animatable:** Yes

### Hue Range (HueRange)

Allowed hue distance from the key color.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Saturation Range (SaturationRange)

Allowed saturation distance from the key color.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Boundary correction (Boundary)

Softness of the matte edge.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes

## Usage

Pick the screen color, widen `HueRange` to catch shadow variations of the screen, and use `Boundary` to soften edges.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs)

---
title: "Diagonal Clipping"
description: "Clips the layer along an angled line or band."
sidebar_position: 38
---

# Diagonal Clipping

Clips the layer along an angled line or a band. The sign of `Width` determines which part of the band remains visible.

## Library location

Library → Filter Effect → Diagonal Clipping

## Properties

### Angle

Angle of the clipping line in degrees.

- **Type:** `float`
- **Default:** `45`
- **Animatable:** Yes

### Position

Offset of the clipping line from the center of the source, in pixels. Moves the line perpendicular to its angle.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Width

Signed band width in pixels. `0` clips one side of the line. A positive value clips outside the band, leaving the band visible; a negative value clips inside the band. The absolute value is the band width.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Usage

Animate `Position` for an angled reveal. Use a positive `Width` for a visible strip, or a negative `Width` to cut a strip out of the layer.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DiagonalClipping.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/DiagonalClipping.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.resx)

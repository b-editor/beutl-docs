---
title: "Hue Rotate"
description: "Rotates the colors of the layer in hue space."
sidebar_position: 10
---

# Hue Rotate

Rotates all colors of the layer in the hue circle. Saturation and luminance are preserved.

## Library location

Library → Filter Effect → Hue Rotate

## Properties

### Angle

Hue rotation in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Usage

Animate `Angle` from 0° to 360° for a continuously cycling rainbow, or use small offsets to color-correct a clip.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/HueRotate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/HueRotate.cs)

---
title: "Lens Chromatic Aberration"
description: "Separates the red and blue channels around a center, like the color fringes of a lens."
sidebar_position: 53
---

# Lens Chromatic Aberration

Gives the layer the color fringes of a real lens. The red and blue channels are scaled in opposite directions around a center point while green stays in place, so the picture stays clean at the center and the colors drift apart toward the edges. Unlike [Color Shift](./color-shift.md), which moves each channel by a fixed offset, the separation grows with the distance from the center. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Lens Chromatic Aberration

## Properties

### Amount

How far the channels separate, in percent. Red moves outward and blue moves inward by `Amount` percent of their distance from `Center`: at the default `1`, each moves 10 pixels at 1000 pixels from the center. Negative values swap the colors, moving blue outward and red inward. `0` leaves the layer unchanged.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[-10, 10]`

### Center

Point the channels are scaled around, relative to the layer's bounds. The picture has no fringes at this point. It can also be placed outside the layer.

- **Type:** `RelativePoint`
- **Default:** `(50%, 50%)`
- **Animatable:** Yes

### Repeat edge pixels (RepeatEdgePixels)

When `true`, a channel that would read past the layer's edge repeats the outermost pixels instead, so the edges keep their colors and the result stays within the layer's bounds. Keep it on for footage, pictures, and [adjustment layers](../../tool-tabs/timeline.md#right-click-menu-on-empty-area) that fill their bounds. When `false`, the fringes spread past the layer's edges, which suits an object or a title on a transparent background. On a picture that fills its bounds, the edges then get bands of color.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

## Usage

Add the effect to footage, or to an adjustment layer above it, and keep `Amount` between `1` and `3` for a subtle lens look. Move `Center` onto the subject to keep it free of fringes. For a cut-out object or a title on a transparent background, turn off `Repeat edge pixels` so the fringes can reach past its edges. Keyframe `Amount` up to `10` and back down for a quick color split on a beat.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/LensChromaticAberration.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/LensChromaticAberration.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

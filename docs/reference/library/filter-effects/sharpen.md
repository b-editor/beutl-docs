---
title: "Sharpen"
description: "Makes details stand out by strengthening the difference between each pixel and its surroundings."
sidebar_position: 43
---

# Sharpen

Makes details stand out by adding back the difference between a pixel's lightness and the blurred lightness around it (an unsharp mask). Only the lightness changes, so edges get no colored fringes. Transparent neighbors count for nothing, so the edge of a clip gets no halo and keeps its shape. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Sharpen

## Properties

### Amount

How strongly the difference is added back, in percent. At `100` the difference is added back once. `0` leaves the layer unchanged.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Radius

Radius of the blur that each pixel is compared with, in composition units. A small radius sharpens fine detail; a large one raises local contrast. `0` leaves the layer unchanged.

- **Type:** `float`
- **Default:** `3`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Threshold

Differences smaller than this are left alone, which keeps noise from standing out. It is a percentage of the full lightness range, and it means the same in the shadows and the highlights.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Start with a small `Radius` for fine detail and raise `Amount` until the edges look crisp. If grain or compression noise becomes visible, raise `Threshold` a little.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Sharpen.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/Sharpen.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.resx)

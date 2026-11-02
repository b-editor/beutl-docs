---
title: "Bloom"
description: "Adds a linear-light glow around the bright parts of the layer."
sidebar_position: 40
---

# Bloom

Extracts the layer's highlights, blurs them, and adds them back as a glow in linear light. HDR highlights keep their brightness. The glow extends past the layer's edges unless `Preserve alpha` is on. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Bloom

## Properties

### Radius

Glow radius in composition units.

- **Type:** `float`
- **Default:** `12`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Threshold

Brightness used to select highlights in linear light. `1` is reference white.

- **Type:** `float`
- **Default:** `0.5`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Softness (%) (SoftKnee)

Smooths the brightness threshold. `0` keeps a hard cutoff; `100` spreads the transition from zero to twice the threshold.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Intensity

Glow strength multiplier. `0` disables the glow; `1` is normal strength.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Preserve alpha (PreserveAlpha)

When `true`, masks the glow with the original alpha instead of extending the layer's silhouette.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Lower `Threshold` until the areas you want to glow are selected, then adjust `Radius` and `Intensity`. Raise `Softness` when the edge between glowing and non-glowing areas looks abrupt.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Bloom.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/Bloom.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.resx)

---
title: "Light rays"
description: "Stretches the layer's highlights away from a center point and composites them over the original image."
sidebar_position: 41
---

# Light rays

Stretches the layer's highlights away from a center point and composites them over the original image. The rays can extend past the layer's edges. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Light rays

## Properties

### Center

Center of the rays, relative to the complete input image. It can also be placed outside the image.

- **Type:** `RelativePoint`
- **Default:** `(50%, 50%)`
- **Animatable:** Yes

### Length (%) (Length)

Outward extension relative to the distance from the center. `100` doubles that distance; `0` disables the rays.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Decay (%) (Decay)

Fades the light along each ray. `0` keeps an even strength; higher values fade more quickly.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Intensity

Light strength multiplier. `0` disables the rays; `1` is normal strength.

- **Type:** `float`
- **Default:** `1`
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
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Put `Center` on or behind the light source, then adjust `Length` and `Decay` for how far the rays reach. Animate `Center` to follow a moving light.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/LightRays.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightRays.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.resx)

---
title: "Wave refraction"
description: "Refracts the layer through a wave field, like an image seen through rippling water."
sidebar_position: 42
---

# Wave refraction

Refracts the layer through a sine wave field, like an image seen through rippling water. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Wave refraction

## Properties

### Displacement (Amount)

Maximum displacement along either axis, in composition units.

- **Type:** `float`
- **Default:** `8`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Wavelength

Length of one wave, in composition units.

- **Type:** `float`
- **Default:** `64`
- **Animatable:** Yes
- **Range:** `(0, ∞)`

### Phase (degrees) (Phase)

Offset of the waves in degrees. Animate it to move the waves; the result at a given time is the same however you seek to it.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Usage

Set `Displacement` and `Wavelength` for the size of the ripples, then add keyframes to `Phase` to make them move.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.resx)

---
title: "Radial Blur"
description: "Blurs the layer outward from, or around, a center point."
sidebar_position: 37
---

# Radial Blur

Blurs the layer outward from a center point in `Zoom` mode, or around that point in `Spin` mode. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Radial Blur

## Properties

### Mode

Choose `Zoom` or `Spin`.

- **Type:** `RadialBlurMode`
- **Default:** `RadialBlurMode.Zoom`
- **Animatable:** No

### Center

Center of the blur, relative to the source bounds.

- **Type:** `RelativePoint`
- **Default:** `(50%, 50%)`
- **Animatable:** Yes

### Amount

Zoom expansion in percent in `Zoom` mode, or the total rotation angle in degrees in `Spin` mode. `0` leaves the image unchanged.

- **Type:** `float`
- **Default:** `10`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Samples

Number of samples combined to create the blur. Increase it for a smoother result at a higher rendering cost.

- **Type:** `int`
- **Default:** `32`
- **Animatable:** Yes
- **Range:** `[2, 128]`

## Usage

Place `Center` on the point the motion should radiate from, then adjust `Amount`. Use `Zoom` for a rush toward or away from that point, or `Spin` for rotational motion.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/RadialBlur.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/RadialBlur.cs)

- [`RadialBlurMode.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/RadialBlurMode.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.resx)

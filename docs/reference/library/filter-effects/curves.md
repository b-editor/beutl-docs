---
title: "Curves"
description: "Adjusts tone with master, RGB and HSV curves."
sidebar_position: 18
---

# Curves

Tone curves with master, per-channel RGB and HSV-vs-HSV (e.g., hue-vs-saturation) controls — the precision tool for tonal and color shaping.

## Library location

Library → Filter Effect → Curves

## Properties

### Custom (RGB) (MasterCurve)

Master tone curve applied to all channels.

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0) to (1,1))
- **Animatable:** No

### Red curve (RedCurve)

Tone curve applied to the red channel.

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0) to (1,1))
- **Animatable:** No

### Green curve (GreenCurve)

Tone curve applied to the green channel.

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0) to (1,1))
- **Animatable:** No

### Blue curve (BlueCurve)

Tone curve applied to the blue channel.

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0) to (1,1))
- **Animatable:** No

### Hue vs Hue (HueVsHue)

Hue → hue mapping (shift specific hues elsewhere on the wheel).

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0.5) to (1,0.5))
- **Animatable:** No

### Hue vs Saturation (HueVsSaturation)

Hue → saturation mapping (boost or cut the saturation of selected hues).

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0.5) to (1,0.5))
- **Animatable:** No

### Hue vs Luminance (HueVsLuminance)

Hue → luminance mapping (lighten or darken specific hues).

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0.5) to (1,0.5))
- **Animatable:** No

### Luminance vs Saturation (LuminanceVsSaturation)

Luminance → saturation mapping (e.g., desaturate the highlights).

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0.5) to (1,0.5))
- **Animatable:** No

### Saturation vs Saturation (SaturationVsSaturation)

Saturation → saturation mapping (compress or expand existing saturation).

- **Type:** `CurveMap`
- **Default:** `LinearCurve` (a straight line from (0,0.5) to (1,0.5))
- **Animatable:** No

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Curves.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Curves.cs)

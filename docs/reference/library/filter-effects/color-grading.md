---
title: "Color Grading"
description: "Performs professional color grading with curves, lift/gamma/gain, temperature and tint."
sidebar_position: 17
---

# Color Grading

Professional color grading: white balance, exposure, contrast (with pivot), saturation / vibrance, hue, plus shadows / midtones / highlights and lift / gamma / gain wheels.

## Library location

Library → Filter Effect → Color Grading

## Properties

### Temperature

White balance temperature (-100 cool ~ +100 warm).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Tint

White balance tint (-100 green ~ +100 magenta).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Exposure

Exposure compensation in stops.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-5, 5]`

### Contrast

Contrast adjustment.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Contrast Pivot (ContrastPivot)

Luminance value the contrast adjustment pivots around (0–1).

- **Type:** `float`
- **Default:** `0.5`
- **Animatable:** Yes
- **Range:** `[0, 1]`

### Saturation

Linear saturation adjustment.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Vibrance

Saturation that protects already-saturated colors and skin tones.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Hue

Global hue shift in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-180, 180]`

### Low Range (LowRange)

Upper bound of the "shadows" tonal region.

- **Type:** `float`
- **Default:** `40`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### High Range (HighRange)

Lower bound of the "highlights" tonal region.

- **Type:** `float`
- **Default:** `60`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Shadows

Shadow region color offset.

- **Type:** `GradingColor`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Midtones

Midtone region color offset.

- **Type:** `GradingColor`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Highlights

Highlight region color offset.

- **Type:** `GradingColor`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Lift

Classic color-grading "lift" (shadow color).

- **Type:** `GradingColor`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Gamma

Classic color-grading "gamma" (midtone color).

- **Type:** `GradingColor`
- **Default:** `(1, 1, 1)`
- **Animatable:** Yes

### Gain

Classic color-grading "gain" (highlight color).

- **Type:** `GradingColor`
- **Default:** `(1, 1, 1)`
- **Animatable:** Yes

### Offset

Constant offset applied to all tones.

- **Type:** `GradingColor`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs)

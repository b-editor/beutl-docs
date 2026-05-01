---
title: "High Contrast"
description: "Increases contrast with optional grayscale or invert modes."
sidebar_position: 9
---

# High Contrast

Increases image contrast and optionally desaturates or inverts the result. Useful for accessibility passes or stylized monochrome looks.

## Library location

Library → Filter Effect → High Contrast

## Properties

### Grayscale

When `true`, converts the result to grayscale.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Invert Style (InvertStyle)

Inversion mode (None / Brightness / All).

- **Type:** `HighContrastInvertStyle`
- **Default:** `HighContrastInvertStyle.NoInvert`
- **Animatable:** Yes

### Contrast

Amount of contrast added (positive = stronger contrast).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Usage

Set `Contrast` to a positive value, enable `Grayscale` for monochrome, and pick `InvertStyle` to invert all colors or only luminance.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs)

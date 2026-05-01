---
title: "Threshold"
description: "Converts the layer to two tones based on luminance threshold."
sidebar_position: 14
---

# Threshold

Two-tone the layer by comparing per-pixel luminance against `Value`, with `Smoothness` controlling the edge softness and `Strength` blending the result back to the original.

## Library location

Library → Filter Effect → Threshold

## Properties

### Amount (Value)

Luminance threshold (0–1).

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Smoothing (Smoothness)

Width of the smooth transition around the threshold.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Strength

Blend factor between the original and the thresholded result (0 = original, 1 = full threshold).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Threshold.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Threshold.cs)

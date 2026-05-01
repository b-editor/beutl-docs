---
title: "Blur"
description: "Applies a Gaussian blur to the layer."
sidebar_position: 1
---

# Blur

Applies a separable Gaussian blur with independent horizontal and vertical sigmas. Higher sigma → stronger blur.

## Library location

Library → Filter Effect → Blur

## Properties

### Sigma

Gaussian sigma in pixels (X = horizontal, Y = vertical).

- **Type:** `Size`
- **Default:** `(0, 0)`
- **Animatable:** Yes
- **Range:** `[(0, 0), (∞, ∞))`

## Usage

Use small sigmas (1–4 px) for soft focus, larger sigmas for background defocus or atmospheric haze.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Blur.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Blur.cs)

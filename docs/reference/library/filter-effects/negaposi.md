---
title: "Negaposi"
description: "Selectively inverts individual color channels."
sidebar_position: 22
---

# Negaposi

Selectively inverts each color channel. Set `Red` / `Green` / `Blue` per-channel to control which channels are inverted, with `Strength` blending the result.

## Library location

Library → Filter Effect → Negaposi

## Properties

### Red

Inversion target value for the red channel (0 / 255 = full invert).

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Green

Inversion target value for the green channel.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Blue

Inversion target value for the blue channel.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Strength

Mix between the original and the inverted result.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Negaposi.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Negaposi.cs)

---
title: "Shake"
description: "Applies a randomized shake / jitter to the layer."
sidebar_position: 30
---

# Shake

Applies a randomized shake / jitter using Perlin noise. `StrengthX` / `StrengthY` set the amplitude per axis; `Speed` controls how fast the noise evolves.

## Library location

Library → Filter Effect → Shake

## Properties

### Strength X (StrengthX)

Horizontal shake amplitude.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes

### Strength Y (StrengthY)

Vertical shake amplitude.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes

In the property panel, **Strength X** and **Strength Y** share one **Strength** row. See [Values shown in one row](../../../get-started/keyframe.md#joined-rows).

### Speed

Speed at which the underlying noise evolves over time.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

## Usage

Use for "camera shake" emphasis on impacts, explosions, or beat drops.

While `StrengthX` and `StrengthY` are both `0`, the effect leaves the layer as it is. A shake animated in from `0` therefore does not soften text or edges on the frames before it begins.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ShakeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ShakeEffect.cs)

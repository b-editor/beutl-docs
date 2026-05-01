---
title: "Delay"
description: "Adds an echo / delay effect to the audio signal."
sidebar_position: 1
---

# Delay

Adds an echo / delay effect to the audio signal: input is mixed back into itself after `Delay Time`, with `Feedback` controlling how much of the delayed signal feeds back into the next iteration.

## Library location

Library → Audio Effect → Delay

## Properties

### Delay Time (ms) (DelayTime)

Delay time in milliseconds.

- **Type:** `float`
- **Default:** `200`
- **Animatable:** Yes
- **Range:** `[0, 5000]`

### Feedback (%) (Feedback)

Fraction of the delayed signal fed back (0 = single echo, ~0.7 = many repeats).

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Dry Mix (%) (DryMix)

Dry (original) signal level.

- **Type:** `float`
- **Default:** `60`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Wet Mix (%) (WetMix)

Wet (delayed) signal level.

- **Type:** `float`
- **Default:** `40`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Set a short `Delay Time` (≤ 100 ms) for slap-back, longer for ping-pong / dub-style echoes. Balance `Dry Mix` (original) and `Wet Mix` (delayed) for the desired blend.

## Source

[`src/Beutl.Engine/Audio/Effects/DelayEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/DelayEffect.cs)

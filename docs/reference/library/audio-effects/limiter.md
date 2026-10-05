---
title: "Limiter"
description: "Brick-wall peak limiter with optional lookahead."
sidebar_position: 4
---

# Limiter

A brick-wall peak limiter that keeps the output from exceeding `Threshold`. Attack is instantaneous, `Release` controls how quickly the gain recovers, and `Lookahead` lets the limiter catch peaks slightly before they arrive at the cost of a fixed delay.

## Library location

Library → Audio Effect → Limiter

## Properties

### Threshold (dB) (Threshold)

The output ceiling. Peaks within the lookahead window are reduced so the output stays at or below this level.

- **Type:** `float`
- **Default:** `-1`
- **Animatable:** Yes
- **Range:** `[-60, 0]`

### Release (ms) (Release)

How quickly the gain recovers after a peak passes.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[1, 5000]`

### Lookahead (ms) (Lookahead)

How far ahead the limiter looks to catch peaks before they arrive. `0` ms keeps audio sample-accurate; higher values trade a fixed delay for smoother limiting.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 20]`

### Makeup Gain (dB) (MakeupGain)

Gain applied after limiting. The final peak can reach `Threshold + Makeup Gain`.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-24, 24]`

## Notes

- Detection is channel-linked: the loudest sample across all channels drives a single gain factor applied to every channel, so the phase relationship between channels is preserved.
- The default `Threshold` of `-1` dB (rather than `0`) leaves headroom against the master limiter that is always applied to the mix bus, avoiding double limiting.
- Non-zero `Lookahead` introduces a fixed delay. The audio graph reports this latency and drains the buffered tail at a natural contiguous clip end. Seeks, loops, edits, and other discontinuities can still reset and discard buffered samples. Keep the default `0` ms when sample-accurate timing and A/V sync matter.

## Usage

Place the Limiter last in the chain to limit signal peaks. Lower `Threshold` (or raise `Makeup Gain`) to push the perceived loudness up, and shorten `Release` for a tighter, more aggressive sound or lengthen it to avoid pumping.

## Source

[`src/Beutl.Engine/Audio/Effects/LimiterEffect.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Audio/Effects/LimiterEffect.cs)

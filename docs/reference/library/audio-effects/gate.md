---
title: "Gate"
description: "Noise gate that attenuates the signal while it stays below a threshold."
sidebar_position: 5
---

# Gate

A noise gate that closes and attenuates the signal while it stays below `Threshold`, and opens again once the signal rises above it. `Attack` and `Release` shape how quickly the gate opens and closes, `Hold` keeps it open for a while after the signal drops back below the threshold, and `Range` sets how much attenuation is applied while the gate is closed.

## Library location

Library → Audio Effect → Gate

## Properties

### Threshold (dB) (Threshold)

The level below which the gate closes and attenuates the signal.

- **Type:** `float`
- **Default:** `-40`
- **Animatable:** Yes
- **Range:** `[-100, 0]`

### Attack (ms) (Attack)

How quickly the gate opens once the signal rises above the threshold.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.1, 500]`

### Hold (ms) (Hold)

How long the gate stays open after the signal falls below the threshold, before releasing.

- **Type:** `float`
- **Default:** `10`
- **Animatable:** Yes
- **Range:** `[0, 5000]`

### Release (ms) (Release)

How quickly the gate closes after the hold time elapses.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[1, 5000]`

### Range (dB) (Range)

Attenuation applied while the gate is closed. `0` disables gating; more negative values attenuate harder.

- **Type:** `float`
- **Default:** `-60`
- **Animatable:** Yes
- **Range:** `[-100, 0]`

## Notes

- Detection is peak-based and channel-linked: the loudest absolute sample across all channels drives a single gain factor applied to every channel, so the stereo image is preserved.
- Peak detection is not smoothed, so `Hold` is what bridges a waveform's zero crossings. With `Hold` at `0` ms, a low-frequency signal can make the gain flutter at twice its frequency unless `Release` is slow enough.
- `Range` of `0` dB disables gating entirely: the signal passes through unchanged, with no smoothing applied.
- The gate starts closed at the `Range` floor, so a lead-in that never crosses the threshold stays at the configured attenuation instead of fading in from silence.
- Digital silence keeps the gate closed even at the lowest `Threshold` of `-100` dB.

## Usage

Set `Threshold` just above the noise floor so that only the material you want to keep opens the gate. Shorten `Attack` to preserve transients, and lengthen `Hold` and `Release` so the gate does not chatter during quiet passages. If full silence between phrases sounds unnatural, raise `Range` (closer to `0`) to leave some of the background signal audible.

## Source

[`src/Beutl.Engine/Audio/Effects/GateEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/GateEffect.cs)

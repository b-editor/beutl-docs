---
title: "Compressor"
description: "Dynamic-range compressor that attenuates the signal above a threshold."
sidebar_position: 3
---

# Compressor

A dynamic-range compressor that reduces the level of the signal once it rises above `Threshold`. The amount of reduction is set by `Ratio`, `Attack` and `Release` shape how quickly compression follows the signal, `Knee` controls how gradually it engages around the threshold, and `Makeup Gain` brings the overall level back up afterwards.

## Library location

Library → Audio Effect → Compressor

## Properties

### Threshold (dB) (Threshold)

The level above which the signal is compressed.

- **Type:** `float`
- **Default:** `-20`
- **Animatable:** Yes
- **Range:** `[-60, 0]`

### Ratio (Ratio)

The amount of compression applied above the threshold. Higher values compress more strongly (e.g. `4` means 4:1).

- **Type:** `float`
- **Default:** `4`
- **Animatable:** Yes
- **Range:** `[1, 20]`

### Attack (ms) (Attack)

How quickly compression engages after the signal crosses the threshold.

- **Type:** `float`
- **Default:** `10`
- **Animatable:** Yes
- **Range:** `[0.1, 500]`

### Release (ms) (Release)

How quickly compression releases after the signal falls back below the threshold.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[1, 5000]`

### Knee (dB) (Knee)

How gradually compression engages around the threshold. `0` is a hard knee; larger values make the transition smoother (soft knee).

- **Type:** `float`
- **Default:** `6`
- **Animatable:** Yes
- **Range:** `[0, 24]`

### Makeup Gain (dB) (MakeupGain)

Gain applied after compression to compensate for the reduced level.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-24, 24]`

## Notes

- Detection is peak-based: the loudest absolute sample across all channels drives a single gain factor that is applied to every channel, so the stereo image is preserved.
- A soft knee (`Knee > 0`) blends the transition around the threshold; setting `Knee` to `0` gives a hard knee that switches abruptly at the threshold.

## Usage

Set `Threshold` so that only the loudest parts of the signal exceed it, then dial in `Ratio` for the desired amount of gain reduction. Use a short `Attack` to catch transients or a longer one to let them through, and balance the result with `Makeup Gain`.

## Source

[`src/Beutl.Engine/Audio/Effects/CompressorEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/CompressorEffect.cs)

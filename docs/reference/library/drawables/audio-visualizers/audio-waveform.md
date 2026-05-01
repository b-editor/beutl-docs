---
title: "Audio Waveform"
description: "Visualizes the audio signal as a waveform."
sidebar_position: 1
---

# Audio Waveform

Visualizes the connected `Sound` as a time-domain waveform — the classic horizontal squiggly line that follows amplitude over time.

## Library location

Library → Audio Visualizer → Audio Waveform

## Properties

### Shape

How each sample is drawn (bars, lines, etc.).

- **Type:** `WaveformShape?`
- **Default:** Min/max bar (`MinMaxBarWaveformShape`)
- **Animatable:** No

### Bar Count (BarCount)

Number of bars / samples per visualization frame.

- **Type:** `int`
- **Default:** `256`
- **Animatable:** No
- **Range:** `[1, 10000]`

### Window (seconds) (WindowSeconds)

Length of the visible time window in seconds.

- **Type:** `float`
- **Default:** `0.1`
- **Animatable:** Yes
- **Range:** `[0.01, 3600]`

## Common properties

This object inherits from `AudioVisualizerDrawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Waveform shapes

The following are the waveform types that can be set for the `Shape` property.

### Line

Draws the upper (and optionally lower) envelope as a polyline.

- **Thickness:** `float`, default `1.5`, range `[0.5, 50]`, animatable.
- **Smoothness:** `float`, default `0`, range `[0, 100]`, animatable.
- **Mirrored:** `bool`, default `false`, animatable. When `true`, also draws the lower envelope.

### Dots

Plots samples as filled circles.

- **Dot Radius (DotRadius):** `float`, default `2`, range `[0.5, 100]`, animatable.
- **Mode:** `DotsWaveformMode` (`MinMax` / `Center`), default `MinMax`, animatable. `MinMax` draws two dots per slot (peak min/max); `Center` draws one dot at the slot's average.

### Block

Renders an LED-meter style stack of blocks per slot.

- **Block Count (BlockCount):** `int`, default `16`, range `[1, 128]`, animatable. Number of blocks per slot (per side when `Mirrored`).
- **Block Gap (BlockGap):** `float`, default `1`, range `[0, 50]`, animatable. Gap between blocks.
- **Bar Width (BarWidth):** `float`, default `0`, range `[0, 10000]`, animatable. `0` auto-derives the width from the slot.
- **Mirrored:** `bool`, default `false`, animatable. When `true`, blocks light up symmetrically above and below the center.

### Min/Max Bar

Renders a bar from each slot's minimum sample to its maximum sample.

- **Bar Width (BarWidth):** `float`, default `0`, range `[0, 10000]`, animatable. `0` auto-derives the width from the slot.
- **Corner Radius (CornerRadius):** `CornerRadius`, default `(0, 0, 0, 0)`, animatable.

### Filled Mirror

Renders symmetrical bars whose height is the larger of `|min|` and `|max|` per slot.

- **Bar Width (BarWidth):** `float`, default `0`, range `[0, 10000]`, animatable. `0` auto-derives the width from the slot.
- **Corner Radius (CornerRadius):** `CornerRadius`, default `(0, 0, 0, 0)`, animatable.

### Filled Envelope

Renders the upper (and lower) envelope as a continuous filled area.

- **Smoothness:** `float`, default `0`, range `[0, 100]`, animatable.
- **Symmetric:** `bool`, default `false`, animatable. When `true`, uses `max(|min|, |max|)` for both sides so the shape is perfectly mirrored.

### Radial

Draws bars radiating from a circle, using positive samples outward and negative samples inward.

- **Inner Radius (InnerRadius):** `float`, default `40`, range `[0, 10000]`, animatable.
- **Start Angle (StartAngle):** `float`, default `-90`, animatable.
- **Bar Width (BarWidth):** `float`, default `4`, range `[0.5, 100]`, animatable.

## Usage

Set a scene reference (audio) on `Source` and assign the current scene to display a waveform synchronized with the audio.

## Source

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs)

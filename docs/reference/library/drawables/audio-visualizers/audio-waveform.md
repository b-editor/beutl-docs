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

The available shapes are:
- Block
- Dot
- Envelope filled
- Mirrored filled
- Line
- Min/max bar
- Radial

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

## Usage

Set a scene reference (audio) on `Source` and assign the current scene to display a waveform synchronized with the audio.

## Source

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs)

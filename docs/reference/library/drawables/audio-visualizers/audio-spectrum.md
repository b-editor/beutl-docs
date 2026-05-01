---
title: "Audio Spectrum"
description: "Visualizes the audio frequency spectrum."
sidebar_position: 2
---

# Audio Spectrum

Visualizes the audio frequency spectrum at the current time using an FFT. Frequencies can be displayed on a linear, logarithmic or mel scale.

## Library location

Library → Audio Visualizer → Audio Spectrum

## Properties

### Shape

How each frequency bin is drawn.

- **Type:** `SpectrumShape?`
- **Default:** Bar (`BarSpectrumShape`)
- **Animatable:** No

The available shapes are:
- Bar
- Filled
- Line
- Mirrored bar
- Radial

### Bar Count (BarCount)

Number of frequency bars displayed.

- **Type:** `int`
- **Default:** `128`
- **Animatable:** No
- **Range:** `[1, 10000]`

### FFT Size (FftSize)

FFT size (must be a power of two; larger gives finer frequency resolution).

- **Type:** `int`
- **Default:** `1024`
- **Animatable:** No
- **Range:** `[64, 16384]`

### Frequency Scale (FrequencyScale)

Frequency-axis scale (Linear / Logarithmic / Mel).

- **Type:** `FrequencyScale`
- **Default:** `AudioVisualizers.FrequencyScale.Logarithmic`
- **Animatable:** No

### Floor (dB) (FloorDb)

Floor of the displayed level in dB; values below are clipped.

- **Type:** `float`
- **Default:** `-80`
- **Animatable:** Yes
- **Range:** `[-200, 0]`

### Smoothing

Temporal smoothing factor (0 = no smoothing, larger = more averaging).

- **Type:** `float`
- **Default:** `85`
- **Animatable:** Yes
- **Range:** `[0, 99]`

## Common properties

This object inherits from `AudioVisualizerDrawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Set a scene reference (audio) on `Source` and assign the current scene to display a spectrum synchronized with the audio.

## Source

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrumDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrumDrawable.cs)

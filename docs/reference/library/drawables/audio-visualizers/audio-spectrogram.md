---
title: "Audio Spectrogram"
description: "Visualizes the audio spectrogram over time."
sidebar_position: 3
---

# Audio Spectrogram

Visualizes the audio spectrogram (frequency × time × intensity) over the visible window. Useful for revealing patterns in music or speech.

## Library location

Library → Audio Visualizer → Audio Spectrogram

## Properties

### Window (seconds) (WindowSeconds)

Visible time window in seconds.

- **Type:** `float`
- **Default:** `4`
- **Animatable:** Yes
- **Range:** `[0.01, 3600]`

### FFT Size (FftSize)

FFT size used per time column.

- **Type:** `int`
- **Default:** `512`
- **Animatable:** No
- **Range:** `[64, 16384]`

### Floor (dB) (FloorDb)

dB floor; quieter values are mapped to the lowest color.

- **Type:** `float`
- **Default:** `-80`
- **Animatable:** Yes
- **Range:** `[-200, 0]`

### Time Columns (TimeColumns)

Number of time columns rendered across the window.

- **Type:** `int`
- **Default:** `256`
- **Animatable:** No
- **Range:** `[2, 2048]`

### Frequency Scale (FrequencyScale)

Frequency-axis scale.

- **Type:** `FrequencyScale`
- **Default:** `AudioVisualizers.FrequencyScale.Logarithmic`
- **Animatable:** No

## Common properties

This object inherits from `AudioVisualizerDrawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Set a scene reference (audio) on `Source` and assign the current scene to display a spectrogram synchronized with the audio.

## Source

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrogramDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrogramDrawable.cs)

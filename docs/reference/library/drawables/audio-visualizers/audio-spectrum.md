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

## Spectrum shapes

The following are the spectrum types that can be set for the `Shape` property.

### Bar

Renders each frequency bin as a vertical bar.

- **Bar Width (BarWidth):** `float`, default `6`, range `[0.5, 10000]`, animatable.
- **Corner Radius (CornerRadius):** `CornerRadius`, default `(0, 0, 0, 0)`, animatable.

### Line

Renders the spectrum envelope as a polyline.

- **Thickness:** `float`, default `2`, range `[0.5, 50]`, animatable.
- **Smoothness:** `float`, default `0`, range `[0, 100]`, animatable. Higher values round corners.

### Filled Area

Renders the spectrum envelope as a filled area beneath the curve.

- **Smoothness:** `float`, default `0`, range `[0, 100]`, animatable.

### Mirrored Bars

Renders each bar mirrored above and below the horizontal center.

- **Bar Width (BarWidth):** `float`, default `6`, range `[0.5, 10000]`, animatable.

### Radial

Arranges bars around a circle.

- **Inner Radius (InnerRadius):** `float`, default `40`, range `[0, 10000]`, animatable.
- **Start Angle (StartAngle):** `float`, default `-90`, animatable. Angle (degrees) of the first bar.
- **Bar Width (BarWidth):** `float`, default `4`, range `[0.5, 100]`, animatable.
- **Direction:** `RadialSpectrumDirection` (`Outward` / `Inward`), default `Outward`, animatable.

## Usage

Set a scene reference (audio) on `Source` and assign the current scene to display a spectrum synchronized with the audio.

## Source

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrumDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrumDrawable.cs)

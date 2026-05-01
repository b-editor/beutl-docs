---
title: "Equalizer"
description: "A 10-band parametric equalizer for the audio signal."
sidebar_position: 2
---

# Equalizer

A multi-band parametric equalizer that lets you boost or cut individual frequency bands.

## Library location

Library → Audio Effect → Equalizer

## Properties

### Band Count (BandCountOption)

Number of bands (preset). Higher counts give finer frequency control.

- **Type:** `BandCountPreset`
- **Default:** `BandCountPreset.Bands10`
- **Animatable:** No

## Source

[`src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs)

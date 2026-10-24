---
title: "Noise Reduction"
description: "Reduces steady background noise by learning the noise level from the audio."
sidebar_position: 7
---

# Noise Reduction

Reduces steady background noise such as hiss, hum, fans, and room tone. The effect continuously learns the noise level from the audio, so it does not require a separate noise sample.

## Library location

Library → Audio Effect → Noise Reduction

## Properties

### Reduction (dB) (Reduction)

Maximum attenuation of detected noise. `0` leaves the audio unchanged. Higher values remove more noise but can make processing artifacts more audible.

- **Type:** `float`
- **Default:** `12`
- **Animatable:** Yes
- **Range:** `[0, 48]`

### Sensitivity (dB) (Sensitivity)

How readily sound near the learned noise level is treated as noise. Raise it for fluctuating noise; lower it if quiet details such as breaths or consonants are lost.

- **Type:** `float`
- **Default:** `3`
- **Animatable:** Yes
- **Range:** `[0, 24]`

### Smoothing (%) (Smoothing)

How smoothly the reduction changes over time. Higher values reduce warbling in the remaining noise; lower values react faster to quiet sounds.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Adaptation Time (s) (Adaptation)

Length of past audio used to learn the noise level, in seconds. Sounds that sustain longer than this can also be treated as noise.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[0.5, 10]`

## Usage

Start with the defaults and listen for quiet details as you increase `Reduction`. Use a longer `Adaptation Time` for music with sustained notes, or a shorter time when the background noise changes.

## Source

[`src/Beutl.Engine/Audio/Effects/NoiseReductionEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/NoiseReductionEffect.cs)

- [`NoiseReductionParameters.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/NoiseReductionParameters.cs)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/AudioStrings.resx)

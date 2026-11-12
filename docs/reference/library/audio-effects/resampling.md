---
title: "Resampling"
description: "Converts a sound from its file's sample rate to the project's with the interpolation you choose."
sidebar_position: 11
---

# Resampling

Converts a sound from the sample rate of its file to the project's, with the interpolation you choose. Without this effect, the conversion happens after all of the sound's effects. With it, the conversion happens where the effect sits: the effects before it run at the file's sample rate, and the effects after it at the project's. Low-rate material, such as 8 kHz or 11.025 kHz game and sampler audio, can keep the steps of hardware that never interpolated, or be brought up cleanly.

## Library location

Library → Audio Effect → Resampling

## Properties

### Method

How the gaps between samples are filled when the audio is converted to the project's sample rate. `Hold` is the harshest, then `Linear`, then `Catmull–Rom` and `4-point Lagrange`. `Sinc 16` and `Sinc 64` also take out the frequencies the conversion would add or fold back, for the cleanest result.

- **Type:** `ResamplingMethod`
- **Default:** `ResamplingMethod.Hold`
- **Animatable:** No

The choices are:

- `Hold`: holds each sample until the next one, as the simplest hardware does.
- `Linear`: draws a straight line between neighboring samples.
- `Catmull–Rom`: a cubic curve through four samples whose slopes follow the neighbors on either side.
- `4-point Lagrange`: the cubic polynomial that passes through four samples.
- `Sinc 16`: a windowed sinc over 16 samples.
- `Sinc 64`: a windowed sinc over 64 samples, which cuts more steeply and more deeply than `Sinc 16`.

## Notes

- Audio that is already at the project's sample rate passes through unchanged. That includes a file at the project's rate, and a [Sound Group](../containers/sound-group.md) or a [Scene Reference (Audio)](../references/scene-reference-audio.md), which mix at the project's rate. A second Resampling effect in the same chain also passes the audio through, because the first one has converted it.
- When the conversion goes to a lower rate, such as from 96 kHz to 48 kHz, the sinc methods also cut what lies above half of the project's rate, so that little of it folds back into the sound. `Sinc 64` cuts the most.
- The effect reads its input ahead of the output instead of delaying it, so it adds no latency and the sound stays in time with the picture. A seek gives the same samples as playback.

## Usage

Put the effect first in a sound's audio effect chain to run the other effects at the project's rate. Choose `Sinc 16` or `Sinc 64` for a clean conversion, or `Hold` to keep the raw, stepped sound of low-rate material.

## Source

[`src/Beutl.Engine/Audio/Effects/ResamplingEffect.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Effects/ResamplingEffect.cs)

- [`ResamplingMethod.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Effects/ResamplingMethod.cs)
- [`ResamplingNode.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Graph/Nodes/ResamplingNode.cs) / [`ResamplingKernel.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Graph/ResamplingKernel.cs)
- [`Sound.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Sound.cs) (where the conversion goes without the effect)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Language/AudioStrings.resx)

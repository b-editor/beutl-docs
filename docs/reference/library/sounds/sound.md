---
title: "Sound"
description: "Imports an audio file as a sound source."
sidebar_position: 1
---

# Sound

Imports an audio file (WAV / MP3 / OGG / etc.) as a sound source. The signal is decoded and resampled to the project sample rate at playback time. The clip keeps the source's channels until the panner places it in the [project's speaker layout](../../../get-started/multichannel-audio.md).

Speed, the panner, gain, and audio effects run at the sample rate of the file, and the sound is converted to the project's rate after them. To convert it earlier, with the interpolation you choose, add a [Resampling](../audio-effects/resampling.md) effect: the effects after it run at the project's rate.

## Library location

Library → Sound

## Properties

### Source

The audio file to play.

- **Type:** `SoundSource?`
- **Default:** `null`
- **Animatable:** No

### Channel assignment (ChannelMap)

Which source channels this clip uses: **Auto** keeps the source's own channels, and **Mono**, **Stereo**, **5.1ch**, and **7.1ch** assign a source channel, or **None**, to each clip channel. See [Assign source channels](../../../get-started/multichannel-audio.md#assign-source-channels).

- **Type:** `AudioChannelMap`
- **Default:** `AudioChannelMap.Auto`
- **Animatable:** No

## Common properties

This object inherits from `Sound` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Audio files can be added by dropping them onto the timeline. Adjustments can be made through inherited `Gain` and `Speed`, and `Audio Effect` can be applied in sequence. Use the inherited panner properties to place the sound. To cut the clip at its silent parts, see [Auto Split by Silence](../../tool-tabs/silence-split.md).

## Source

[`src/Beutl.Engine/Audio/SourceSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SourceSound.cs)

- [`AudioChannelMap.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelMap.cs)
- [`Sound.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Sound.cs)

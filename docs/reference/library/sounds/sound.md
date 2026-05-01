---
title: "Sound"
description: "Imports an audio file as a sound source."
sidebar_position: 1
---

# Sound

Imports an audio file (WAV / MP3 / OGG / etc.) as a sound source. The signal is decoded and resampled to the project sample rate at playback time.

## Library location

Library → Sound

## Properties

### Source

The audio file to play.

- **Type:** `SoundSource?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Sound` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Audio files can be added by dropping them onto the timeline. Adjustments can be made through inherited `Gain` and `Speed`, and `Audio Effect` can be applied in sequence.

## Source

[`src/Beutl.Engine/Audio/SourceSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SourceSound.cs)

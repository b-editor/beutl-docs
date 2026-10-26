---
title: "Time Stretch"
description: "Changes playback speed while preserving pitch."
sidebar_position: 6
---

# Time Stretch

Changes the playback speed of the audio signal while preserving its pitch.

## Library location

Library → Audio Effect → Time Stretch

## Properties

### Speed (%) (Speed)

Playback speed as a percentage. `100` is normal speed, `50` is half speed, and `200` is double speed.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[25, 400]`

## Usage

Add the effect to a sound's audio effect chain and adjust `Speed` to slow down or speed up the sound without changing its pitch. Animate `Speed` with keyframes for changes over time.

## Source

[`src/Beutl.Engine/Audio/Effects/TimeStretchEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/TimeStretchEffect.cs)

- [`TimeStretchParameters.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/TimeStretchParameters.cs)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/AudioStrings.resx)

---
title: "Video"
description: "Imports a video file as a drawable."
sidebar_position: 1
---

# Video

Imports a video file and exposes it as a drawable. Frames are sampled at the current scene time. Time offset, playback speed and loop are also configurable.

## Library location

Library → Video

## Properties

### Offset Position (OffsetPosition)

Time offset within the source video at which playback starts.

- **Type:** `TimeSpan`
- **Default:** `00:00:00`
- **Animatable:** No

### Speed

Playback speed multiplier (100 = normal speed).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Source

The video file to play.

- **Type:** `VideoSource?`
- **Default:** `null`
- **Animatable:** Yes

### Loop (IsLoop)

When `true`, the video restarts from the beginning after it ends.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Drag a video file onto the timeline to add it. Adjust `Offset Position` to start from a later point, change `Speed` for slow motion or fast forward, and enable `Loop` for looped backgrounds.

## Source

[`src/Beutl.Engine/Graphics/SourceVideo.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/SourceVideo.cs)

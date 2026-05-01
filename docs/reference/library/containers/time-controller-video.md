---
title: "Time Controller (Video)"
description: "Controls playback timing (offset and rate) of a child drawable."
sidebar_position: 4
---

# Time Controller (Video)

Controls the playback timing of a single child drawable: offsets time, scales playback speed, loops, or holds the first / last frame.

## Library location

Library → Time Controller (Video)

## Properties

### Target

Drawable whose playback time is controlled.

- **Type:** `Drawable?`
- **Default:** `null`
- **Animatable:** No

### Offset Position (OffsetPosition)

Time offset added to the local clock before sampling the target.

- **Type:** `TimeSpan`
- **Default:** `00:00:00`
- **Animatable:** No

### Speed

Playback speed multiplier (100 = normal).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Adjust Time Range (AdjustTimeRange)

When `true`, automatically adjusts the time range based on the target.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Frame rate (FrameRate)

Override frame rate for sampling (when target is frame-based).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** No
- **Range:** `[0, ∞)`

### Loop

When `true`, the target loops once it reaches its end.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Reverse

Plays the target in reverse.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Hold First Frame (HoldFirstFrame)

Before the clip's start time, freezes on the first frame instead of being empty.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Hold Last Frame (HoldLastFrame)

After the clip's end time, freezes on the last frame instead of being empty.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Wrap a video or animated drawable to slow it down, freeze on a poster frame, or loop a short clip across a longer span.

## Source

[`src/Beutl.Engine/Graphics/DrawableTimeController.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/DrawableTimeController.cs)

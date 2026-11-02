---
title: "Motion blur"
description: "Averages the drawable at several times within a shutter interval to blur its motion."
sidebar_position: 39
---

# Motion blur

Blurs motion over time by drawing the drawable several times within an exposure and averaging the results. Each sample includes the drawable, its transforms, opacity, media, and the effects before this one. Effects after this one and the drawable's blend mode apply once, to the average.

## Library location

Library → Filter Effect → Motion blur

## Properties

### Shutter angle (°) (ShutterAngle)

Exposure relative to one frame: `180` is half a frame, `360` is one frame, and `720` is two frames. `3600` is the maximum (10 frames). `0` draws only the current time.

- **Type:** `float`
- **Default:** `180`
- **Animatable:** Yes
- **Range:** `[0, 3600]`

### Exposure reference (ShutterPosition)

Places the current frame at the **Center**, **Start**, or **End** of the exposure. **End** puts the trail in the past.

- **Type:** `ShutterPosition`
- **Default:** `ShutterPosition.Center`
- **Animatable:** No

### Samples

Number of samples across the exposure. More samples reduce gaps between the images but increase render time and memory use. `1` draws only the current time.

- **Type:** `int`
- **Default:** `8`
- **Animatable:** No
- **Range:** `[1, 64]`

### Source mix (%) (SourceMix)

Mixes in the current-time image: `0` is only motion blur and `100` is only the original. Static content keeps its opacity at any value.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Add this effect to a drawable with animated transforms or a moving source. Place effects that should move with the drawable before it, and effects that should apply to the blurred result after it. The sample times follow the output's frame rate, so `180` is half a frame at any rate.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/MotionBlur.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/MotionBlur.cs)

- [`ShutterPosition.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/ShutterPosition.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.resx)

---
title: "Stepped Motion"
description: "Holds each picture of the layer for a while, so it moves in steps like stop-motion."
sidebar_position: 55
---

# Stepped Motion

Makes the layer move in steps, like stop-motion or animation drawn on twos. The layer is sampled a set number of times per second, counted from the start of the element, and each picture is held until the next one. The whole layer at that moment is held, including its position, a video's frame, and the effects before Stepped Motion. Effects after it are not held and keep moving smoothly. Because the timing counts from the element's start, moving the element on the timeline keeps the same pictures held.

## Library location

Library → Filter Effect → Stepped Motion

## Properties

### Rate (fps) (FrameRate)

Number of pictures per second. Lower values hold each picture for longer: at `12` in a 24 fps project, each picture shows for two frames. A rate below `1`, such as `0.5`, holds each picture for more than a second.

When the rate has keyframes, each picture is held for one step at the rate in effect at that moment, so the stepping speeds up or slows down smoothly and never goes back to an earlier picture. A rate from an expression applies to the whole time since the element's start, so use keyframes to change the rate over time.

- **Type:** `float`
- **Default:** `12`
- **Animatable:** Yes
- **Range:** `[0.01, 240]`

## Usage

Add the effect to an animated title, shape, or video. For even steps, pick a rate that divides the project's frame rate, such as `12` or `8` at 24 fps, or `15` or `10` at 30 fps. Lower it to `4` or less for a choppier look. Keyframe `Rate` from a low value up to the project's frame rate to go from stepped to smooth motion.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/SteppedMotion.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/SteppedMotion.cs)

- [`SteppedMotion.KeyframedRate.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/SteppedMotion.KeyframedRate.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

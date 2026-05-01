---
title: "Delay Animation"
description: "Delays the application of subsequent effects."
sidebar_position: 34
---

# Delay Animation

Delays the application of the contained effect chain by a constant amount of time. Useful for staggered or echoing animations.
Because multiple draw targets are required, enable `Split Per Character` when applying this to a text object. For other objects, add `Split Equally` or `Split By Parts` to a preceding effect.

## Library location

Library → Filter Effect → Delay Animation

## Properties

### Delay

Delay in seconds.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Filter Effect (Effect)

The effect chain whose timing is delayed.

- **Type:** `FilterEffect?`
- **Default:** `null`
- **Animatable:** No

## Usage

Combine with an effect that animates over time to produce echo-like results.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs)

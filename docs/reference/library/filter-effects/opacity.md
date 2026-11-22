---
title: "Opacity"
description: "Makes the layer more transparent, as a filter effect that can fade each part on its own."
sidebar_position: 49
---

# Opacity

Makes the layer more transparent. Unlike a drawable's own [Opacity](../common-properties.md#opacity), it is a filter effect, so it can sit inside a [Delay Animation](./delay-animation.md) to fade the characters of a text or other parts one after another. It scales the colors together with the transparency, so colors brighter than white, such as those of an HDR source, are not clipped as they fade.

## Library location

Library → Filter Effect → Opacity

## Properties

### Opacity

Opacity in percent. `100` leaves the layer unchanged and `0` makes it fully transparent.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

To fade characters in one after another, add this effect inside a [Delay Animation](./delay-animation.md) on a text with `Split by characters` turned on, and keyframe `Opacity` from `0` to `100`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/OpacityEffect.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/OpacityEffect.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

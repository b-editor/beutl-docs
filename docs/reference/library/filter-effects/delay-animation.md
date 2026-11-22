---
title: "Delay Animation"
description: "Runs an effect chain on each part of the layer in turn, each part later than the one before."
sidebar_position: 34
---

# Delay Animation

Applies its effect chain to each part of the layer with the part's time held back further than the one before, so an animation in the chain runs through the parts one after another. Each part is held back by `Delay` times its place in `Order`.

The parts are separate draw targets, so the layer needs some: turn on `Split by characters` on a [Text](../drawables/shapes/text.md), put [Split equally](./split-equally.md) or [Split by parts](./split-by-parts.md) before this effect, or apply it to a [Group](../containers/group.md), whose children are its parts.

## Library location

Library → Filter Effect → Delay Animation

## Properties

### Delay

Time between one part and the next, in milliseconds.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Order

Which part starts first.

- **Type:** `DelayAnimationOrder`
- **Default:** `DelayAnimationOrder.Forward`
- **Animatable:** Yes

The choices are:

- `Forward`: in the order the parts come, such as the order of the characters. The pieces of Split by parts come in the order they are found, from the top down.
- `Reverse`: the last part first.
- `From center`: the middle part of that order first, then the parts on both sides of it together.
- `Random`: in a shuffled order that `Random seed` picks. Preview and export use the same order.
- `Left to right`, `Right to left`, `Top to bottom`, `Bottom to top`: by the position of each part's center. One `Delay` step stands for the typical size of a part, so parts level with each other start together, such as a whole line of text with `Top to bottom`.

### Random seed (RandomSeed)

Picks the shuffled order of `Random`.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Filter Effect (Effect)

The effect chain that runs on each part. Animate its properties with keyframes; each part reaches them later than the part before.

- **Type:** `FilterEffect?`
- **Default:** Empty `FilterEffectGroup`
- **Animatable:** No

## Usage

To fade the characters of a text in one after another, turn on `Split by characters`, add Delay Animation, and put an [Opacity](./opacity.md) effect inside it whose `Opacity` goes from `0` to `100` over a short time. A [Transform](./transform.md) beside it that moves each character up into place adds motion. Set `Delay` to about `80`, and choose another `Order` to change the sequence.

A text whose pen draws its stroke below the fill (**Stroke order** set to **Below fill**) draws every stroke before any fill, so it has twice as many parts, and a character's stroke and fill start at different times.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs)

- [`DelayAnimationOrder.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationOrder.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

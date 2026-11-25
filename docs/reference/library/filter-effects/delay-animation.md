---
title: "Delay Animation"
description: "Runs an effect chain on each part of the layer in turn, each part later than the one before."
sidebar_position: 34
---

# Delay Animation

Applies its effect chain to each part of the layer with the part's time held back further than the one before, so an animation in the chain runs through the parts one after another. Each part is held back by `Delay` times its place in `Order`. With `Delay mode` set to `Total`, `Delay` is instead the whole spread from the first part to the last.

The parts are separate draw targets, so the layer needs some: turn on `Split by characters` on a [Text](../drawables/shapes/text.md), put [Split equally](./split-equally.md) or [Split by parts](./split-by-parts.md) before this effect, or apply it to a [Group](../containers/group.md), whose children are its parts. On split text, `Unit` moves whole words or lines together. To change only a range of the parts rather than all of them in turn, use [Range animator](./range-animator.md).

## Library location

Library → Filter Effect → Delay Animation

## Properties

### Delay

Time in milliseconds. With `Delay mode` set to `Per step`, it is the time between one part and the next; with `Total`, the time from the first part's start to the last part's start.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Delay mode (DelayMode)

How `Delay` is measured.

- **Type:** `DelayAnimationMode`
- **Default:** `DelayAnimationMode.PerStep`
- **Animatable:** Yes

The choices are:

- `Per step`: `Delay` is the time for each step of `Order`, so the more parts there are, the longer the cascade takes.
- `Total`: `Delay` is the time from the first part's start to the last part's start, so the cascade takes the same time however many parts there are, even after you edit the text.

### Unit

What counts as one part on a text with `Split by characters` on. With `Words` or `Lines`, all the characters of one word or line start together. Parts that are not text count one by one whatever this is.

- **Type:** `TextAnimationUnit`
- **Default:** `TextAnimationUnit.Characters`
- **Animatable:** Yes

The choices are:

- `Characters`: each character. A ligature counts as one character, and spaces take no step.
- `Words`: each run of characters between spaces or line breaks, so a Japanese sentence without spaces is one word.
- `Lines`: each line, or each column in vertical text.

The orders that go across the lines take a whole line at a time whatever this is; see `Order`. A character's stroke and fill start together, even when the pen draws the stroke below the fill (**Stroke order** set to **Below fill**).

### Order

Which part starts first.

- **Type:** `DelayAnimationOrder`
- **Default:** `DelayAnimationOrder.Forward`
- **Animatable:** Yes

The choices are:

- `Forward`: in the order the parts come, such as the reading order of the characters. The pieces of Split by parts come in the order they are found, from the top down.
- `Reverse`: the last part first.
- `From center`: by distance from the center of all the parts together, so the parts nearest the center start first and parts at the same distance start together. It works for several lines of text and for the pieces of Split by parts. As with the orders by position, each typical part size of distance counts as one step. With `Per step`, the nearest parts also wait for their own distance, so when no part sits exactly at the center, such as in a line with an even number of characters, even the first ones start slightly late.
- `Random`: in a shuffled order that `Random seed` picks. Preview and export use the same order.
- `Left to right`, `Right to left`, `Top to bottom`, `Bottom to top`: by the position of each part's center. Each typical part size along the way counts as one step, so parts level with each other start together. On horizontal split text, `Top to bottom` and `Bottom to top` take a whole line at a time, so all the characters of a line start together even when they differ in height; on vertical text, `Left to right` and `Right to left` do the same with columns.

### Random seed (RandomSeed)

Picks the shuffled order of `Random`.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Filter Effect (Effect)

The effect chain that runs on each part. Animate its properties with keyframes; each part reaches them later than the part before. While the chain removes a part at its delayed time, such as when a [Transform](./transform.md) scales it to `0`, the part is not drawn.

- **Type:** `FilterEffect?`
- **Default:** Empty `FilterEffectGroup`
- **Animatable:** No

## Usage

To fade the characters of a text in one after another, turn on `Split by characters`, add Delay Animation, and put an [Opacity](./opacity.md) effect inside it whose `Opacity` goes from `0` to `100` over a short time. A [Transform](./transform.md) beside it that moves each character up into place adds motion. Set `Delay` to about `80`, and choose another `Order` to change the sequence. To bring in a word or a line at a time, set `Unit` to `Words` or `Lines`.

To have the last part start a set time after the first however long the text is, such as one second, set `Delay mode` to `Total` and `Delay` to `1000`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs)

- [`DelayAnimationOrder.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationOrder.cs) / [`DelayAnimationMode.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationMode.cs) / [`TextAnimationUnit.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/TextAnimationUnit.cs)
- [`TextAnimationOrdering.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/TextAnimationOrdering.cs) / [`TextPartLayout.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/Shapes/TextPartLayout.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

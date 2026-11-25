---
title: "Range animator"
description: "Moves, scales, rotates, fades, blurs or tints a selected range of the layer's parts, such as the characters of a split text."
sidebar_position: 57
---

# Range animator

Changes a selected range of the layer's parts: it can move them, scale and rotate them, fade them, blur them, and tint them toward a color. Parts that are not selected are left as they are. Keyframe `Offset`, `Start` or `End` to move the range across the parts, for example to bring the characters of a text in one after another, run a wave through them, or color the words of a lyric as they are sung.

The parts are separate draw targets, so the layer needs some: turn on `Split by characters` on a [Text](../drawables/shapes/text.md), put [Split by parts](./split-by-parts.md) or [Split equally](./split-equally.md) before this effect, or apply it to a [Group](../containers/group.md), whose children are its parts. Each Range animator has one range. To combine several, add more than one; each works on the result of the one before.

## Library location

Library → Filter Effect → Range animator

## How parts are selected

`Order` and `Random seed` line the parts up as they do in [Delay Animation](./delay-animation.md), and `Start`, `End` and `Offset` mark a range along that line in percent. The range runs from the smaller of `Start` and `End` to the larger one, moved by `Offset`.

With `Forward`, `Reverse` or `Random`, each part takes an equal share of the line, so with ten characters each one takes 10%. With `From center` and the orders by position, such as `Left to right`, the parts are placed by their distance or position, one share per typical part size, so parts level with each other share a place and are selected together.

`Shape` gives each part an amount from 0 (not selected) to 1 (fully selected), read at the middle of its share. A part at 0 is left as it is, and a part at 1 takes the full `Position`, `Scale`, `Rotation`, `Opacity`, `Blur` and `Color amount`. In between, it goes part of the way, such as half the `Position` offset at 0.5. While all six keep their default values, the effect changes nothing.

On a text with `Split by characters` on, the parts follow the text rather than the order it is drawn in: `Forward` goes in reading order, spaces take no share, and `Unit` can group the characters into words or lines. A character's stroke and fill always count as one, even when the pen draws the stroke below the fill. `Scale` and `Rotation` work about the center of each character's stroke and fill together, even when `Unit` groups the characters into words or lines.

Other parts, such as the pieces of Split by parts or Split equally, count one by one in the order they come, so `Unit` has no effect on them. This is also true when Split by parts is applied to a text.

## Properties

### Start (RangeStart)

Where the range begins along the line of parts, in percent.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### End (RangeEnd)

Where the range ends, in percent. When it is smaller than `Start`, the two swap roles.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Offset (RangeOffset)

Moves the whole range along the line, in percent. Keyframe it to sweep a range of a fixed length across the parts.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Unit

What counts as one part on a text with `Split by characters` on. With `Words` or `Lines`, all the characters of one word or line get the same amount. Parts that are not text count one by one whatever this is.

- **Type:** `TextAnimationUnit`
- **Default:** `TextAnimationUnit.Characters`
- **Animatable:** Yes

The choices are:

- `Characters`: each character. A ligature counts as one character, and spaces take no share.
- `Words`: each run of characters between spaces or line breaks, so a Japanese sentence without spaces is one word.
- `Lines`: each line, or each column in vertical text.

The orders that go across the lines take a whole line at a time whatever this is; see `Order`.

### Order

How the parts line up from 0% to 100%.

- **Type:** `DelayAnimationOrder`
- **Default:** `DelayAnimationOrder.Forward`
- **Animatable:** Yes

The choices are:

- `Forward`: in the order the parts come, such as the reading order of the characters. The pieces of Split by parts come in the order they are found, from the top down.
- `Reverse`: the last part first.
- `From center`: by distance from the center of all the parts together, nearest first. Parts at the same distance share a place.
- `Random`: in a shuffled order that `Random seed` picks.
- `Left to right`, `Right to left`, `Top to bottom`, `Bottom to top`: by the position of each part's center, one share per typical part size, so parts level with each other share a place. On horizontal split text, `Top to bottom` and `Bottom to top` take a whole line at a time; on vertical text, `Left to right` and `Right to left` take a whole column at a time.

### Random seed (RandomSeed)

Picks the shuffled order of `Random`.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Shape

How the amount changes across the range.

- **Type:** `RangeAnimatorShape`
- **Default:** `RangeAnimatorShape.Square`
- **Animatable:** Yes

The choices are:

- `Square`: 1 inside the range and 0 outside it. `Smoothness` softens its edges.
- `Ramp up`: rises from 0 at the start of the range to 1 at its end. Parts after the range stay at 1.
- `Ramp down`: falls from 1 at the start of the range to 0 at its end. Parts before the range stay at 1.
- `Triangle`: 0 at both ends of the range and 1 at its middle, changing in straight lines.
- `Round`: 0 at both ends of the range and 1 at its middle, following a half circle, so most of the range stays close to 1.
- `Smooth`: 0 at both ends of the range and 1 at its middle, easing in and out along a smooth curve.

### Smoothness

Softens the edges of `Square`, in percent. At `100`, a part's amount is the share of its place that the range covers, so each part changes gradually as `Offset` sweeps. At `0`, a part is fully selected when the middle of its place is in the range and not selected otherwise. The other shapes ignore it.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Position

How far a fully selected part moves, in pixels.

- **Type:** `Point`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Scale

Size of a fully selected part, in percent. `100` keeps its size. Each part scales about its own center.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

### Rotation

Rotation of a fully selected part in degrees (positive = clockwise), about the same center as `Scale`.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Opacity

Opacity of a fully selected part, in percent. `0` hides it.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Blur

Gaussian blur of a fully selected part, as the sigma in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Color

Color that `Color amount` tints the selected parts toward. Its alpha is ignored.

- **Type:** `Color`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** Yes

### Color amount (ColorAmount)

How far a fully selected part is tinted toward `Color`, in percent. At `100`, it takes the color entirely while keeping its shape and transparency.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

To bring a text in one character at a time, turn on `Split by characters`, add Range animator, and set `Opacity` to `0` and `Position` to `(0, 60)`. The default range covers every character, so the whole text disappears. Keyframe `Offset` from `0` to `100`: the characters leave the range one after another and rise into place. Set `Scale` to `50` or `Rotation` to `-30` for more motion, `Smoothness` to `0` to make each character pop in, or `Unit` to `Words` to bring in a word at a time.

To run a wave through a text, set `Shape` to `Triangle`, `End` to `30`, `Scale` to `160` and `Position` to `(0, -30)`, then keyframe `Offset` from `-30` to `100`. The crest starts before the first character and leaves after the last. Pick a `Color` and raise `Color amount` to color the crest too.

To color the words of a lyric as they are sung, set `Unit` to `Words`, `Color` to the highlight color and `Color amount` to `100`. Keep `Start` at `0` and keyframe `End` from `0` to `100` in time with the song, and each word changes color as the range reaches it. At a `Smoothness` of `100`, a word blends into the color as the end of the range passes over it; at `0`, it switches at once.

For a logo with separate shapes on a transparent background, put [Split by parts](./split-by-parts.md) before this effect, choose `Left to right`, and keyframe `Offset` as in the first example to bring the shapes in from left to right.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/RangeAnimatorEffect.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/RangeAnimatorEffect.cs)

- [`RangeAnimatorShape.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/RangeAnimatorShape.cs) / [`TextAnimationUnit.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/TextAnimationUnit.cs) / [`DelayAnimationOrder.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationOrder.cs)
- [`DelayAnimationEffect.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs) / [`TextAnimationOrdering.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/TextAnimationOrdering.cs) / [`TextPartLayout.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/Shapes/TextPartLayout.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

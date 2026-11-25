---
title: "Echo"
description: "Draws fading copies of the layer from earlier or later moments together with the current one."
sidebar_position: 54
---

# Echo

Draws copies of the layer from earlier or later moments together with the current one, each copy fainter than the one before, for trails, afterimages, and ghosting. Each copy shows the layer as it is at its own moment, including its position, a video's frame, and the effects before Echo. Effects after Echo and the layer's blend mode apply once, to the combined result. A copy from a moment outside the element is empty, so with a negative `Interval` the trail builds up after the element starts.

## Library location

Library → Filter Effect → Echo

## Properties

### Interval (s) (Interval)

Time between copies, in seconds. Negative values take the copies from earlier moments, so they trail behind a moving layer, and positive values take them from later moments, so they run ahead of it. `0` repeats the current moment.

- **Type:** `float`
- **Default:** `-0.1`
- **Animatable:** Yes
- **Range:** `[-60, 60]`

### Count

Number of copies, including the current one. More copies use more rendering time and memory.

- **Type:** `int`
- **Default:** `4`
- **Animatable:** No
- **Range:** `[1, 64]`

### Start Intensity (StartingIntensity)

Opacity of the current copy, in percent. The other copies fade from it by `Decay`. At `0`, every copy is transparent and the layer disappears.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Decay

Share of the opacity that each copy keeps from the one before it, in percent. With the defaults, the four copies have opacities of 100%, 70%, 49%, and 34.3%. At `0`, only the current copy is drawn, and at `100`, all copies have the same opacity.

- **Type:** `float`
- **Default:** `70`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Blend Mode (BlendMode)

How overlapping copies combine.

- **Type:** `EchoBlendMode`
- **Default:** `EchoBlendMode.Add`
- **Animatable:** No

The choices are:

- `Newest on top`: the copies are layered as usual, and the copy from the latest moment is drawn on top. With a negative `Interval`, that is the current copy, which hides the echoes wherever it is opaque, so this mode suits an object on a transparent background.
- `Add`: the colors of overlapping copies add up, so the trail glows where copies overlap. Parts of the picture that stay still also add up with themselves and get brighter, by the sum of the copies' opacities: about 2.5 times with the defaults.

## Usage

Add Echo to a moving title, shape, or cut-out object to leave a trail behind it. Bring `Interval` closer to `0` and raise `Count` for a smooth streak, or move `Interval` away from `0` for separate afterimages. On footage, the default `Add` brightens what stays still. To keep its brightness, lower `Start Intensity` until the copies' opacities add up to about 100%: about `40` with the default `Count` and `Decay`. Put effects that each copy should carry before Echo, and effects for the whole trail, such as a blur or a glow, after it.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Echo.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/Echo.cs)

- [`EchoBlendMode.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/EchoBlendMode.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

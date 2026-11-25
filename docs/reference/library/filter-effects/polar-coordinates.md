---
title: "Polar Coordinates"
description: "Bends the layer's horizontal bands into rings around its center, or unrolls rings into bands."
sidebar_position: 48
---

# Polar Coordinates

Wraps the layer around a circle, bending its horizontal bands into rings, or unrolls the rings of a circle into horizontal bands. The circle stays round whatever the layer's proportions, and the output grows or shrinks to fit the result unless `Clip to original bounds` is on. `Polar to rectangular` reverses the mapping, so it can unroll a circle made by `Rectangular to polar` back into a strip.

## Library location

Library → Filter Effect → Polar Coordinates

## Properties

### Direction

Which way the layer is mapped.

- **Type:** `PolarCoordinatesDirection`
- **Default:** `PolarCoordinatesDirection.RectangularToPolar`
- **Animatable:** No

The choices are:

- `Rectangular to polar`: wraps the layer around a circle centered on `Center`. The left edge starts at 12 o'clock and the layer wraps clockwise, so its right edge meets the left edge there. The top row goes to the rim and the bottom row to the center, so the letters of a line of text stand on the circle with their tops facing outward.
- `Polar to rectangular`: the reverse. It reads a circle around `Center` and unrolls it into a strip. The angle from 12 o'clock, clockwise, runs from left to right, and the rim runs along the top and the center along the bottom, so rings become horizontal bands and spokes become vertical lines.

### Amount

How far each pixel moves toward its mapped position, in percent. `0` leaves the layer unchanged and `100` applies the whole mapping.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Inner radius (InnerRadius)

Leaves a hole in the middle of the circle, so the layer forms a ring. The layer is wrapped as if an empty band this many pixels tall were added to it on the side that faces the center: the larger the value, the larger the hole, and the circle grows to make room. In `Polar to rectangular`, it is the radius in pixels of the middle part that is left out, multiplied by `Scale`, and only the ring outside it is unrolled.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Scale

Size of the circle, in percent. At `100`, the circle's radius is the layer's width plus its height, plus `Inner radius`, divided by π. A square layer then makes a circle about a quarter wider than itself, and a long line of text makes a circle about two thirds as wide as the text is long. The hole made by `Inner radius` scales too. In `Polar to rectangular`, the circle read at `100` has a radius of half the layer's shorter side, so it fits in the layer when `Center` is in the middle.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Angle

Where the wrap starts, in degrees clockwise from 12 o'clock. The left edge of the layer goes there, so animating it spins the ring. In `Polar to rectangular`, the left edge of the strip starts reading the circle there.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Swirl

Twists the ring into a spiral, in degrees. The rim stays in place, and each ring inside it turns further, up to this angle at the inner edge, which is the center when `Inner radius` is `0`. Positive values turn the inside counterclockwise. In `Polar to rectangular`, the same twist is read, so a spiral made with the same `Swirl` comes out straight.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Sweep angle (SweepAngle)

How much of the circle the layer wraps around, in degrees. Below `360`, the layer bends into an arc that starts at `Angle` and runs clockwise, and `Edge mode` decides what fills the rest of the circle. In `Polar to rectangular`, only that arc is unrolled, and the strip gets shorter to match.

- **Type:** `float`
- **Default:** `360`
- **Animatable:** Yes
- **Range:** `[0, 360]`

### Center

Center of the circle, relative to the layer's bounds. `Rectangular to polar` draws the circle around this point, and `Polar to rectangular` reads the circle around it.

- **Type:** `RelativePoint`
- **Default:** `(50%, 50%)`
- **Animatable:** Yes

### Invert radius (InvertRadius)

When `true`, the top row of the layer goes to the center, or to the inner edge of the ring, and the bottom row to the rim. In `Polar to rectangular`, the center then runs along the top of the strip and the rim along the bottom.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Reverse angle (ReverseAngle)

When `true`, the layer wraps counterclockwise instead of clockwise. In `Polar to rectangular`, the strip reads the circle counterclockwise.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Repeat

How many times the layer goes around the circle, or around the arc of `Sweep angle`. `2` puts two copies one after the other, a fractional value ends partway through a copy, and a value below `1` stretches part of the layer around the whole circle. In `Polar to rectangular`, the strip shows the unrolled circle this many times side by side.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.01, ∞)`

### Mirror

When `true`, every second copy made by `Repeat` is flipped, so neighboring copies meet without a seam.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Edge mode (EdgeMode)

What fills the places where the mapping reads outside the layer. In `Rectangular to polar`, these are the area outside the circle, the hole made by `Inner radius`, and the part of the circle beyond `Sweep angle`. In `Polar to rectangular`, they are the parts of the circle that reach past the layer's edges.

- **Type:** `PolarCoordinatesEdgeMode`
- **Default:** `PolarCoordinatesEdgeMode.Transparent`
- **Animatable:** No

The choices are:

- `Transparent`: they stay transparent.
- `Clamp`: the nearest edge pixels of the layer are stretched across them.
- `Repeat`: the layer repeats into them.
- `Mirror`: the layer repeats into them, flipped every other time.

With any choice but `Transparent`, the output of `Rectangular to polar` also covers the layer's own bounds.

### Clip to original bounds (ClipToBounds)

When `true`, the output keeps the layer's bounds, and anything outside them is cut off. When `false`, the output resizes to fit the result. In `Rectangular to polar`, it becomes the square around the circle. In `Polar to rectangular`, it becomes a strip centered on the layer, as long as the circle midway across the ring, or its arc when `Sweep angle` is below `360`, and as tall as the ring is thick.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Apply `Rectangular to polar` to a horizontal strip, such as a line of text or a gradient, to wrap it into a ring. Raise `Inner radius` to open a hole in the middle, lower `Sweep angle` to bend the strip into an arc, and animate `Angle` to spin the ring. Raise `Repeat` and turn on `Mirror` for a kaleidoscope-like pattern. Animate `Amount` from `0` to `100` to bend the layer into the ring over time.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs)

- [`PolarCoordinatesDirection.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinatesDirection.cs) / [`PolarCoordinatesEdgeMode.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinatesEdgeMode.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

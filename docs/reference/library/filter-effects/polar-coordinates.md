---
title: "Polar Coordinates"
description: "Bends the layer's horizontal bands into rings around its center, or unrolls rings into bands."
sidebar_position: 48
---

# Polar Coordinates

Bends the layer's horizontal bands into rings around its center, or unrolls rings into horizontal bands. The mapping fits the ellipse inside the layer's bounds, so a layer that is not square wraps around an ellipse. The two directions undo each other.

## Library location

Library → Filter Effect → Polar Coordinates

## Properties

### Direction

Which way the layer is mapped.

- **Type:** `PolarCoordinatesDirection`
- **Default:** `PolarCoordinatesDirection.RectangularToPolar`
- **Animatable:** No

The choices are:

- `Rectangular to polar`: the top row of the layer goes to the center and the bottom row to the rim of the ellipse. The left edge starts at 12 o'clock and the layer wraps clockwise, so its right edge meets the left edge there. The corners outside the ellipse become transparent.
- `Polar to rectangular`: the reverse. The angle from 12 o'clock, clockwise, runs from left to right, and the distance from the center runs from top to bottom, so rings become horizontal bands and spokes become vertical lines.

### Amount

How far each pixel moves toward its mapped position, in percent. `0` leaves the layer unchanged and `100` applies the whole mapping.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Apply `Rectangular to polar` to a horizontal strip, such as a line of text or a gradient, to wrap it into a ring. Animate `Amount` from `0` to `100` to bend the layer into the ring over time.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs)

- [`PolarCoordinatesDirection.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinatesDirection.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

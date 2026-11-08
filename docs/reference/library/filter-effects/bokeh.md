---
title: "Bokeh"
description: "Blurs the layer into the shape of a lens aperture, so bright points stand out as circles or polygons."
sidebar_position: 44
---

# Bokeh

Spreads each point of the layer over the shape of a lens aperture, a circle or a polygon, as an out-of-focus lens does. Unlike [Blur](./blur.md), bright points show as the shape. The samples depend only on the settings, so a frame looks the same however playback or a seek reached it. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Bokeh

## Properties

### Radius

How far a point spreads, in composition units. `0` leaves the layer unchanged.

- **Type:** `float`
- **Default:** `12`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Aperture shape (Shape)

`Circle` or `Polygon`.

- **Type:** `BokehShape`
- **Default:** `BokehShape.Circle`
- **Animatable:** No

### Sides

Number of sides of the polygon. Used when `Aperture shape` is `Polygon`.

- **Type:** `int`
- **Default:** `6`
- **Animatable:** Yes
- **Range:** `[3, 12]`

### Rotation

Clockwise rotation of the polygon in degrees. At `0`, a corner points up.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Highlight boost (Highlight)

Makes the bright parts brighter before they spread, so they stand out as shapes, in percent. `100` makes them twice as bright. The boost starts at a linear luminance of `0.5` and is full from reference white (`1`).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Quality

`Low`, `Medium`, or `High`. More samples draw the shape more cleanly and take longer. `High` takes about three times as long as `Low`.

- **Type:** `BokehQuality`
- **Default:** `BokehQuality.Medium`
- **Animatable:** No

## Usage

Set `Radius` to the size the out-of-focus points should have. Choose `Polygon` and a number of `Sides` for the look of an aperture with blades, and raise `Highlight boost` until lights and reflections stand out as shapes.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Bokeh.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/Bokeh.cs)

- [`BokehShape.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/BokehShape.cs) / [`BokehQuality.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/BokehQuality.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.resx)

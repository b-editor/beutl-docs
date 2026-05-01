---
title: "Ellipse"
description: "Draws an ellipse or circle by width and height."
sidebar_position: 1
---

# Ellipse

Draws an ellipse (or a circle when the width and height are equal) by sampling the area defined by its width and height.

## Library location

Library → Ellipse

## Properties

### Width

Horizontal extent — the bounding box width in pixels.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Height

Vertical extent — the bounding box height in pixels.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

## Common properties

This object inherits from `Shape` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Place the ellipse on the timeline and set its `Width` and `Height` (animate them to grow or shrink). Assign a brush to the fill, and optionally use a stroke to draw the outline.

## Source

[`src/Beutl.Engine/Graphics/Shapes/EllipseShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/EllipseShape.cs)

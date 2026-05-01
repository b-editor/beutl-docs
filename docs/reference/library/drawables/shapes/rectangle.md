---
title: "Rectangle"
description: "Draws a rectangle by width and height."
sidebar_position: 2
---

# Rectangle

Draws a rectangle filling the area defined by its width and height. Edges are sharp; use [Rounded rectangle](./rounded-rectangle.md) for rounded corners.

## Library location

Library → Rectangle

## Properties

### Width

Rectangle width in pixels.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Height

Rectangle height in pixels.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

## Common properties

This object inherits from `Shape` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Use rectangles for backgrounds, text backings, or as base shapes for compositing. Combine stroke for borders and fill for the interior, and apply a transform to rotate or scale.

## Source

[`src/Beutl.Engine/Graphics/Shapes/RectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs)

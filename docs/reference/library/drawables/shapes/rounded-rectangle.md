---
title: "Rounded rectangle"
description: "Draws a rectangle with rounded corners."
sidebar_position: 3
---

# Rounded rectangle

Draws a rectangle with each corner rounded according to the corner radius. Increasing `Smoothing` bends the corners toward an iOS-style squircle (superellipse) for a softer look.

## Library location

Library → Rounded rectangle

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

### Corner Radius (CornerRadius)

Per-corner radius (TopLeft / TopRight / BottomRight / BottomLeft).

- **Type:** `CornerRadius`
- **Default:** `new(25)`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Smoothing

0 = circular arc corners, 100 = fully smoothed (squircle).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Common properties

This object inherits from `Shape` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Use for buttons, cards, and chips. Set the corner radii independently for asymmetric rounding, and increase `Smoothing` for a softer transition between the curve and the straight edge.

## Source

[`src/Beutl.Engine/Graphics/Shapes/RoundedRectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RoundedRectShape.cs)

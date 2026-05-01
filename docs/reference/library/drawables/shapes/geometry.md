---
title: "Geometry"
description: "Draws an arbitrary path."
sidebar_position: 4
---

# Geometry

Renders an arbitrary path.

## Library location

Library → Geometry

## Properties

### Data

The path data to render. Define it by combining segments such as line segments and Bézier curves.

- **Type:** `Geometry?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Shape` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Build complex shapes — logos, icons, custom callouts — by composing path segments. Fill and stroke are configured the same way as on the other shape objects.

## Source

[`src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs)

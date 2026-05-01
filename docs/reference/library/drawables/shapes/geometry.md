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
- **Default:** Empty `PathGeometry`
- **Animatable:** No

## Common properties

This object inherits from `Shape` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Path geometry structure

The default `Data` value is a `PathGeometry`. A `PathGeometry` holds a list of `PathFigure` values, and each figure holds a list of `PathSegment` values.

### PathGeometry

- **Figures:** `IList<PathFigure>`, default empty list. Animatable: No.

### PathFigure

- **Start Point (StartPoint):** `Point`, default `(NaN, NaN)`, animatable. The figure's starting point.
- **Is Closed (IsClosed):** `bool`, default `false`, animatable. When `true`, the figure is closed back to the start point.
- **Segments:** `IList<PathSegment>`, default empty list.

### Path segments

The `Segments` list accepts any `PathSegment`. Each segment defines how the curve continues from the previous point.

#### Line Segment

Adds a straight line to the next point.

- **Point:** `Point`, default `(0, 0)`, animatable. End point of the line.

#### Quadratic Bézier Segment

Adds a quadratic Bézier curve.

- **Control Point (ControlPoint):** `Point`, default `(0, 0)`, animatable.
- **End Point (EndPoint):** `Point`, default `(0, 0)`, animatable.

#### Cubic Bézier Segment

Adds a cubic Bézier curve.

- **Control Point 1 (ControlPoint1):** `Point`, default `(0, 0)`, animatable.
- **Control Point 2 (ControlPoint2):** `Point`, default `(0, 0)`, animatable.
- **End Point (EndPoint):** `Point`, default `(0, 0)`, animatable.

#### Arc Segment

Adds an elliptical arc.

- **Radius:** `Size`, default `(0, 0)`, animatable. X / Y radii of the arc's ellipse.
- **Rotation Angle (RotationAngle):** `float`, default `0`, animatable. Rotation of the ellipse in degrees.
- **Is Large Arc (IsLargeArc):** `bool`, default `false`, animatable. When `true`, the longer (≥180°) arc is drawn.
- **Sweep Clockwise (SweepClockwise):** `bool`, default `true`, animatable. Sweep direction.
- **Point:** `Point`, default `(0, 0)`, animatable. End point of the arc.

#### Conic Segment

Adds a rational quadratic curve (used to express true circular / elliptical arcs).

- **Control Point (ControlPoint):** `Point`, default `(0, 0)`, animatable.
- **End Point (EndPoint):** `Point`, default `(0, 0)`, animatable.
- **Weight:** `float`, default `1`, animatable. Higher weights pull the curve closer to the control point.

## Usage

Build complex shapes — logos, icons, custom callouts — by composing path segments. Fill and stroke are configured the same way as on the other shape objects.

## Source

[`src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs)

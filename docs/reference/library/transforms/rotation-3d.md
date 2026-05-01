---
title: "Rotation 3D"
description: "Rotates the layer in 3D space (X / Y / Z axes)."
sidebar_position: 5
---

# Rotation 3D

Rotates the layer in 3D space around the given center. `Depth` controls the perspective foreshortening.

## Library location

Library → Transform → Rotation 3D

## Properties

### Rotation X (RotationX)

Rotation around the X axis (degrees).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Rotation Y (RotationY)

Rotation around the Y axis (degrees).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Rotation Z (RotationZ)

Rotation around the Z axis (degrees).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Center X (CenterX)

Pivot X coordinate.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Center Y (CenterY)

Pivot Y coordinate.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Center Z (CenterZ)

Pivot Z coordinate.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Depth

Perspective depth — larger values produce stronger foreshortening.

- **Type:** `float`
- **Default:** `500`
- **Animatable:** Yes

## Usage

Use for 3D card flips, page turns, or cube faces. Increase `Depth` to exaggerate perspective; reduce it for more orthographic-looking rotations.

## Source

[`src/Beutl.Engine/Graphics/Transformation/Rotation3DTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/Rotation3DTransform.cs)

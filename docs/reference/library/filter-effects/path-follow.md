---
title: "Path Follow"
description: "Moves along a path."
sidebar_position: 32
---

# Path Follow

Moves the layer along the specified path. `Progress` controls the position; enable `FollowRotation` to align the layer's rotation to the path.

## Library location

Library → Filter Effect → Path Follow

## Properties

### Geometry

The path geometry to follow.

- **Type:** `Geometry?`
- **Default:** `null`
- **Animatable:** No

### Progress

Position along the path (0 = start, 100 = end).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Follow Rotation (FollowRotation)

When `true`, rotates the layer to match the path tangent.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Use to animate text or images along a curve. Pair `Progress` keyframes with `FollowRotation` for natural curve-aligned motion.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/PathFollowEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PathFollowEffect.cs)

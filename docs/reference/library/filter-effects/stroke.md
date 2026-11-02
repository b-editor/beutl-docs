---
title: "Stroke"
description: "Draws an outline (stroke) around the layer."
sidebar_position: 5
---

# Stroke

Adds an outline (stroke) around the layer's opaque region. The pen's **Stroke order** chooses whether the stroke is drawn over or under the source.

## Library location

Library → Filter Effect → Stroke

## Properties

### Stroke (Pen)

Pen describing the stroke (color, thickness, dash, etc.). Its **Stroke order** (`StrokeOrder`) sets the drawing order: **Above fill** (the default) draws the stroke over the source, and **Below fill** draws the source over the stroke. See [Stroke (Pen)](../common-properties.md#stroke-pen).

- **Type:** `Pen?`
- **Default:** A new `Pen`
- **Animatable:** No

### Offset

Offset of the stroke relative to the source.

- **Type:** `Point`
- **Default:** `(0, 0)`
- **Animatable:** Yes

## Projects from earlier versions

The former **Border Style** (`Style`) property moved to the pen's **Stroke order**. A saved `Foreground` loads as **Below fill**, and a saved `Background` loads as **Above fill**, so the drawing order stays the same. **Stroke order** cannot be animated, so a `Style` driven by keyframes or an expression loads as its base value. See [Version compatibility](../../../get-started/project-structure.md#version-compatibility).

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

---
title: "Stroke"
description: "Draws an outline (stroke) around the layer."
sidebar_position: 5
---

# Stroke

Adds an outline (stroke) around the layer's opaque region. Use `Style` to choose whether the stroke is drawn behind or in front of the source.

## Library location

Library → Filter Effect → Stroke

## Properties

### Stroke (Pen)

Pen describing the stroke (color, thickness, dash, etc.).

- **Type:** `Pen?`
- **Default:** `null`
- **Animatable:** No

### Offset

Offset of the stroke relative to the source.

- **Type:** `Point`
- **Default:** (0, 0)`
- **Animatable:** Yes

### Border Style (Style)

Whether the stroke is rendered behind (Background) or in front (Foreground) of the source.

- **Type:** `StrokeStyles`
- **Default:** `StrokeStyles.Background`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

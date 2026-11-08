---
title: "Stroke"
description: "Draws an outline (stroke) around the layer."
sidebar_position: 5
---

# Stroke

Adds an outline (stroke) around the layer's opaque region. The pen's **Stroke order** chooses whether the stroke is drawn over or under the source.

The outline follows the visible edge, where the edge pixels are half covered, traced at sub-pixel precision. Translucent content is outlined at its own edge. Corners that this would cut back are put back where their sides meet, so a mitered pen keeps them, while rounded corners with a radius over about 2.4 px stay round. Alpha below about 3% and islands smaller than a pixel are not outlined.

With a mitered join, the effect's output reaches past the content up to three times as far as the pen reaches past a straight side (one and a half times the thickness for a centered pen), or as far as the pen's miter limit when that is lower. Corners of about 39° or wider are never cut. The element's selection area in the editor grows by the same margin.

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

Since 2.0.0-preview.11, the stroke sits on the visible edge, about half a pixel further in than in earlier versions, which traced the outline in whole-pixel steps.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

- [`AlphaOutlineTracer.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/AlphaOutlineTracer.cs)

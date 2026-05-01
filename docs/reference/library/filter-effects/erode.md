---
title: "Erode"
description: "Shrinks opaque regions (morphological erosion)."
sidebar_position: 8
---

# Erode

Morphological erosion: shrinks opaque regions of the layer by a per-axis radius. Effectively "thins" the visible area.

## Library location

Library → Filter Effect → Erode

## Properties

### Radius X (RadiusX)

Horizontal erosion radius in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Radius Y (RadiusY)

Vertical erosion radius in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Erode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Erode.cs)

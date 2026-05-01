---
title: "Dilate"
description: "Expands opaque regions (morphological dilation)."
sidebar_position: 7
---

# Dilate

Morphological dilation: expands opaque regions of the layer by a per-axis radius. Effectively "fattens" the visible area.

## Library location

Library → Filter Effect → Dilate

## Properties

### Radius X (RadiusX)

Horizontal dilation radius in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Radius Y (RadiusY)

Vertical dilation radius in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Dilate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Dilate.cs)

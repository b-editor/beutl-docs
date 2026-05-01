---
title: "Mosaic"
description: "Pixelates the layer into mosaic blocks."
sidebar_position: 28
---

# Mosaic

Pixelates the layer into mosaic blocks of the given `TileSize`. The `Origin` property controls the alignment of the grid.

## Library location

Library → Filter Effect → Mosaic

## Properties

### Tile size (TileSize)

Width and height of each mosaic tile.

- **Type:** `Size`
- **Default:** `(10, 10)`
- **Animatable:** Yes
- **Range:** `[(0.0001, 0.0001), (∞, ∞))`

### Origin

Origin point used to align the mosaic grid.

- **Type:** `RelativePoint`
- **Default:** `RelativePoint.Center`
- **Animatable:** Yes

## Usage

Use for privacy blurring (animate `TileSize` for "scan" reveals) or stylized 8-bit looks.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/MosaicEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/MosaicEffect.cs)

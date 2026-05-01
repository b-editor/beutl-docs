---
title: "Split equally"
description: "Splits the layer into a regular grid of tiles with spacing."
sidebar_position: 25
---

# Split equally

Splits the layer into a regular grid of tiles with the given divisions and spacing.

## Library location

Library → Filter Effect → Split equally

## Properties

### Horizontal divisions (HorizontalDivisions)

Number of columns the grid is split into.

- **Type:** `int`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

### Vertical divisions (VerticalDivisions)

Number of rows the grid is split into.

- **Type:** `int`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

### Horizontal spacing (HorizontalSpacing)

Pixel gap between columns.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Vertical spacing (VerticalSpacing)

Pixel gap between rows.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/SplitEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SplitEffect.cs)

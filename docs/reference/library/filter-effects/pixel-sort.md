---
title: "Pixel Sort"
description: "Sorts pixels by brightness or hue along a specified direction."
sidebar_position: 35
---

# Pixel Sort

Sorts pixels along a chosen `Direction` by brightness or hue. The pixels considered are filtered by `ThresholdMin` / `ThresholdMax` against the selected `SortKey`.

## Library location

Library → Filter Effect → Pixel Sort

## Properties

### Sort Direction (Direction)

Direction along which the sort runs (Horizontal / Vertical).

- **Type:** `PixelSortDirection`
- **Default:** `PixelSortDirection.Horizontal`
- **Animatable:** No

### Sort Key (SortKey)

Property used as the sort key (Hue / Luminance / etc.).

- **Type:** `PixelSortKey`
- **Default:** `PixelSortKey.Luminance`
- **Animatable:** No

### Threshold Min (ThresholdMin)

Minimum sort-key value considered for sorting.

- **Type:** `float`
- **Default:** `25`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Threshold Max (ThresholdMax)

Maximum sort-key value considered for sorting.

- **Type:** `float`
- **Default:** `80`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Ascending

When `true`, sorts low-to-high; otherwise high-to-low.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** No

## Usage

Set `Ascending = false` and `Direction = Vertical` for a "melting" downward effect. Tighten the threshold range to sort only highlights or only shadows.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/PixelSortEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PixelSortEffect.cs)

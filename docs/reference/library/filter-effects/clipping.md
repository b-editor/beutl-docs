---
title: "Clipping"
description: "Clips the layer to a rectangular region."
sidebar_position: 6
---

# Clipping

Clips the layer to a rectangular region defined by `Left` / `Top` / `Right` / `Bottom` insets. Negative values expand the region instead of clipping it.

## Library location

Library → Filter Effect → Clipping

## Properties

### Left

Distance to clip from the left edge.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Top

Distance to clip from the top edge.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Right

Distance to clip from the right edge.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Bottom

Distance to clip from the bottom edge.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Automatic Centering (AutoCenter)

When `true`, keeps the clipped region centered as insets change.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Clip transparent area (AutoClip)

When `true`, automatically clips to the bounds of the source.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Use to crop unwanted edges.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Clipping.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Clipping.cs)

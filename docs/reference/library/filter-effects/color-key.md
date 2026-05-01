---
title: "Color key"
description: "Removes a specific color range based on RGB distance."
sidebar_position: 24
---

# Color key

Removes a specific color range based on RGB distance — simpler and stricter than `ChromaKey`, suitable for solid-color keys.

## Library location

Library → Filter Effect → Color key

## Properties

### Color

Color to remove.

- **Type:** `Color`
- **Default:** `#00000000` (transparent black)
- **Animatable:** Yes

### Brightness Range (Range)

RGB distance threshold for matching pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Boundary correction (Boundary)

Soft falloff at the matte edge.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes

## Usage

Pick a target color, expand `Range` until the unwanted color disappears, and tweak `Boundary` for soft edges.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ColorKey.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorKey.cs)

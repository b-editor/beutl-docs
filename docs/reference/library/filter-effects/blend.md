---
title: "Blend"
description: "Composites the layer with a configurable blend mode."
sidebar_position: 21
---

# Blend

Composites the layer with a configurable `Brush` using a chosen `BlendMode`. Equivalent to overlaying a fill on top of the layer with that blend mode.

## Library location

Library → Filter Effect → Blend

## Properties

### Brush

Brush composited over the layer.

- **Type:** `Brush?`
- **Default:** `null`
- **Animatable:** No

### Blend Mode (BlendMode)

Compositing blend mode.

- **Type:** `BlendMode`
- **Default:** `BlendMode.SrcIn`
- **Animatable:** Yes

## Usage

Pick a brush (gradient or solid color), then a blend mode such as `Multiply`, `Screen` or `Overlay` to introduce color casts and stylized looks.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/BlendEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/BlendEffect.cs)

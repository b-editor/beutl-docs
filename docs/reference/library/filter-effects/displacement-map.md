---
title: "Displacement Map"
description: "Distorts an image using a displacement map."
sidebar_position: 31
---

# Displacement Map

Distorts an image using the color information of a displacement map as per-pixel offsets. The channel selected by `Channel` drives horizontal and vertical displacement.

## Library location

Library → Filter Effect → Displacement Map

## Properties

### Displacement Map (DisplacementMap)

Brush whose pixels drive the displacement.

- **Type:** `Brush?`
- **Default:** `Radial Gradient Brush` (white at the center fading to transparent)
- **Animatable:** No

### Transform

Transform applied to the displacement map before sampling.

- **Type:** `DisplacementMapTransform?`
- **Default:** `Translation Transform`
- **Animatable:** No

### Spread Method (SpreadMethod)

How the map is wrapped at its edges (Pad / Reflect / Repeat).

- **Type:** `GradientSpreadMethod`
- **Default:** `GradientSpreadMethod.Pad`
- **Animatable:** Yes

### Channel

Which color channel of the map drives the displacement.

- **Type:** `DisplacementMapChannel`
- **Default:** `DisplacementMapChannel.Alpha`
- **Animatable:** No

### Signed

When `true`, treats 0.5 as zero displacement (signed mode).

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

### Show Displacement Map (ShowDisplacementMap)

When `true`, draws the map itself for debugging.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Use a noise pattern, gradient, or video clip as the map. Animate the map's `Transform` for flowing distortions; toggle `ShowDisplacementMap` for debugging.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs)

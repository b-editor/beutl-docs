---
title: "Lighting"
description: "Adjusts brightness using a multiplier and an additive term."
sidebar_position: 11
---

# Lighting

Adjusts brightness with a `Multiply` color and an `Add` color: `out = src · Multiply + Add`.

## Library location

Library → Filter Effect → Lighting

## Properties

### Multiplication (Multiply)

Color multiplied with the source pixels.

- **Type:** `Color`
- **Default:** `Colors.White`
- **Animatable:** Yes

### Addition (Add)

Color added to the source pixels after multiplication.

- **Type:** `Color`
- **Default:** `#00000000` (transparent black)
- **Animatable:** Yes

## Usage

`Multiply` tints the layer (e.g., warm wash); `Add` lifts the blacks (e.g., faded film look).

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Lighting.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Lighting.cs)

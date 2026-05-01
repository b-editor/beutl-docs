---
title: "Brightness"
description: "Adjusts overall brightness."
sidebar_position: 15
---

# Brightness

Adjusts overall brightness using a single multiplier. Values above 100 brighten, below 100 darken.

## Library location

Library → Filter Effect → Brightness

## Properties

### Amount

Brightness multiplier.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

## Usage

Quick brightness pass before more elaborate grading; for non-linear control prefer `Gamma`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Brightness.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Brightness.cs)

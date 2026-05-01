---
title: "Saturate"
description: "Adjusts color saturation."
sidebar_position: 13
---

# Saturate

Adjusts color saturation. `Amount` of 100 leaves the image unchanged; values above 100 increase saturation, values below 100 desaturate.

## Library location

Library → Filter Effect → Saturate

## Properties

### Amount

Saturation multiplier (100 = identity, 0 = grayscale, >100 = oversaturated).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

## Usage

Set `Amount` to 0 for full grayscale, or above 100 for "punchy" looks. Animate to dramatically reveal or drain color.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Saturate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Saturate.cs)

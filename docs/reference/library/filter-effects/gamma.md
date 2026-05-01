---
title: "Gamma"
description: "Applies gamma correction to the layer."
sidebar_position: 16
---

# Gamma

Applies gamma correction with the given exponent. Lower gamma darkens midtones; higher gamma brightens them.

## Library location

Library → Filter Effect → Gamma

## Properties

### Amount

Gamma exponent (1 = no change).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[1, 300]`

### Strength

Mix between the corrected and original tonality (0 = original, 1 = full correction).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Use for log-to-linear / linear-to-display conversions. Tweak `Strength` to mix back toward the original tonality.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Gamma.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Gamma.cs)

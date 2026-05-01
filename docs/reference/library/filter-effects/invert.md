---
title: "Invert"
description: "Inverts the colors of the layer."
sidebar_position: 19
---

# Invert

Inverts the colors of the layer. `Amount` controls the inversion strength; `ExcludeAlphaChannel` keeps the alpha intact when enabled.

## Library location

Library → Filter Effect → Invert

## Properties

### Amount

Inversion strength (0 = original, 1 = full invert).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Exclude Alpha channel (ExcludeAlphaChannel)

When `true`, alpha is left unchanged.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Invert.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Invert.cs)

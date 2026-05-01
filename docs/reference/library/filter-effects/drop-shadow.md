---
title: "Drop Shadow"
description: "Casts a shadow behind the layer."
sidebar_position: 2
---

# Drop Shadow

Casts a Gaussian-blurred shadow behind the layer. The shadow is offset by `Position` and rendered in the specified color.

## Library location

Library → Filter Effect → Drop Shadow

## Properties

### Position

Shadow offset (X / Y) in pixels.

- **Type:** `Point`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Sigma

Blur radius of the shadow in pixels.

- **Type:** `Size`
- **Default:** `(0, 0)`
- **Animatable:** Yes
- **Range:** `[(0, 0), (∞, ∞))`

### Color

Color of the shadow.

- **Type:** `Color`
- **Default:** `#00FFFFFF` (transparent white)
- **Animatable:** Yes

### Shadow Only (ShadowOnly)

When `true`, outputs only the shadow (the original layer is hidden).

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/DropShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DropShadow.cs)

---
title: "Inner Shadow"
description: "Adds a shadow inside the edges of the layer."
sidebar_position: 3
---

# Inner Shadow

Renders a shadow inside the edges of the layer, as if light came from outside and cast shadows into the shape.

## Library location

Library → Filter Effect → Inner Shadow

## Properties

### Position

Inner-shadow offset (X / Y) in pixels.

- **Type:** `Point`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Sigma

Blur radius of the inner shadow.

- **Type:** `Size`
- **Default:** `(0, 0)`
- **Animatable:** Yes
- **Range:** `[(0, 0), (∞, ∞))`

### Color

Color of the inner shadow.

- **Type:** `Color`
- **Default:** `#00FFFFFF` (transparent white)
- **Animatable:** Yes

### Shadow Only (ShadowOnly)

Output only the shadow.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Great for inset / pressed-in UI states, embossed type, and rounded recesses. Pair with a soft drop shadow for added depth.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/InnerShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/InnerShadow.cs)

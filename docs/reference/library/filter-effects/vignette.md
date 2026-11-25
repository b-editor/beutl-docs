---
title: "Vignette"
description: "Darkens or lightens the layer toward its edges."
sidebar_position: 51
---

# Vignette

Darkens or lightens the layer toward its edges. The shape follows the layer's bounds, so on an [adjustment layer](../../tool-tabs/timeline.md#right-click-menu-on-empty-area), whose bounds are the whole frame, the vignette frames the picture. Transparency is unchanged.

## Library location

Library → Filter Effect → Vignette

## Properties

### Amount

Strength of the vignette. Positive values darken the edges and negative values lighten them toward white. `0` leaves the layer unchanged.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Midpoint

Where the vignette reaches half its strength, as a percentage of the way from the center to the corners. Lower values bring it closer to the center.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Roundness

Shape of the vignette. At `0` it follows the layer's proportions, so a wide layer gets a wide ellipse. Positive values make it rounder, up to a circle at `100`. Negative values make it squarer, toward a rounded rectangle at `-100`.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Feather

Width of the transition between the untouched middle and the full strength, as a percentage of the way from the center to the corners. The transition is centered on `Midpoint`. Only the part that would reach past the center or the corners is cut off, so a wide `Feather` stays soft even when `Midpoint` is near `0` or `100`, and the vignette still reaches half its strength at `Midpoint`. `0` gives a hard edge.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Center

Center of the vignette, relative to the layer's bounds.

- **Type:** `RelativePoint`
- **Default:** `(50%, 50%)`
- **Animatable:** Yes

## Usage

Add the effect to an adjustment layer to darken the corners of everything beneath it, and lower `Midpoint` or raise `Amount` for a stronger look. Move `Center` toward the subject to draw the eye there.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Vignette.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/Vignette.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

---
title: "Film Grain"
description: "Adds film-like grain that shows most in the midtones."
sidebar_position: 50
---

# Film Grain

Adds film-like grain to the layer. The grain is strongest in the midtones and fades out toward black and white, which keep their color. Transparency is unchanged, and transparent pixels get no grain. The grain is sized in the layer's own pixels, so a preview at a reduced resolution looks as grainy as the export.

## Library location

Library → Filter Effect → Film Grain

## Properties

### Amount

Strength of the grain. `0` adds none.

- **Type:** `float`
- **Default:** `25`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Size

Size of each grain, in the layer's pixels. Larger values give coarser grain.

- **Type:** `float`
- **Default:** `1.5`
- **Animatable:** Yes
- **Range:** `[0.1, ∞)`

### Softness

How smoothly neighboring grains blend into each other. `0` gives hard square grains.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Color

At `0`, all channels share the same grain, so the grain has no color. At `100`, each channel has its own grain. Values in between mix the two, and the grain stays as strong as at either end.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Seed

Picks another grain pattern.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Animate

When `true`, the pattern changes on every frame, counted from the element's start. When `false`, the pattern stays still.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

## Usage

Add the effect to footage, or to an [adjustment layer](../../tool-tabs/timeline.md#right-click-menu-on-empty-area) above it, and raise `Amount` until the grain shows. Raise `Size` for coarser grain and `Color` for grain that varies in color. Turn off `Animate` for grain that stays still, as on a photo.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/FilmGrain.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/FilmGrain.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

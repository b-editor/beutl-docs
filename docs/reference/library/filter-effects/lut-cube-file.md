---
title: "LUT (Cube File)"
description: "Applies a 3D LUT loaded from a .cube file."
sidebar_position: 20
---

# LUT (Cube File)

Applies a 3D LUT (Look-Up Table) loaded from a `.cube` file to the layer. `Strength` blends the LUT with the original.

## Library location

Library → Filter Effect → LUT (Cube File)

## Properties

### Source

The `.cube` LUT file to apply.

- **Type:** `CubeSource?`
- **Default:** `null`
- **Animatable:** No

### Strength

How much of the LUT is mixed in (0 = original, 100 = full LUT).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Assign a `.cube` file to `Source`. Starting with a `Strength` of 50–80% rather than full intensity often looks more natural.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/LutEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/LutEffect.cs)

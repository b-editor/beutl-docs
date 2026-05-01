---
title: "LumaColor"
description: "Maps the layer's luminance to alpha to produce a luma matte."
sidebar_position: 12
---

# LumaColor

Maps the layer's per-pixel luminance to alpha, producing a luminance matte. Bright pixels become opaque; dark pixels become transparent.

## Library location

Library → Filter Effect → LumaColor

## Properties

_This object has no properties of its own._

## Usage

Useful for screen / multiply-style mattes from white-on-black artwork, or to drive an alpha track from a luminance pass.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/LumaColor.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/LumaColor.cs)

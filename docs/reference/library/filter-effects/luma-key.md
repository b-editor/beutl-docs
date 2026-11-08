---
title: "Luma key"
description: "Keeps the parts of the layer whose brightness lies between two limits and makes the rest transparent."
sidebar_position: 46
---

# Luma key

Keeps the parts of the layer whose brightness lies between `Lower Limit` and `Upper Limit` and makes the rest transparent. Use it to remove the dark parts of a picture, or to keep only a range of brightness. Brightness is the luminance of linear light, as [Threshold](./threshold.md) reads it, and highlights above full scale count as full scale. What is kept keeps its color.

## Library location

Library → Filter Effect → Luma key

## Properties

### Lower Limit (%) (Lower)

Parts darker than this become transparent.

- **Type:** `float`
- **Default:** `25`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Upper Limit (%) (Upper)

Parts brighter than this become transparent.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Softness (%) (Softness)

Width of the soft edge outside each limit. Brightness within this distance below `Lower Limit` or above `Upper Limit` fades out instead of being cut. `0` gives a hard edge.

- **Type:** `float`
- **Default:** `5`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Invert

When `true`, keeps what lies outside the limits and makes the range between them transparent.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

To remove a dark background, raise `Lower Limit` until the background disappears, then raise `Softness` if the edge looks harsh. To remove a white background instead, set `Lower Limit` to `0` and lower `Upper Limit`. Turn on `Invert` to make the range between the limits transparent.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/LumaKey.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/LumaKey.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.resx)

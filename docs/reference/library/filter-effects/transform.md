---
title: "Transform"
description: "Applies a 2D transform as a filter effect, independent of the object's own Transform property."
sidebar_position: 27
---

# Transform

Applies a 2D transform on the effect chain, independently of the drawable's own `Transform` property. This lets you stack multiple transforms within the effect chain.

## Library location

Library → Filter Effect → Transform

## Properties

### Transform

The transform to apply.

- **Type:** `Transform?`
- **Default:** `null`
- **Animatable:** No

### Transform Origin (TransformOrigin)

Pivot of the transform.

- **Type:** `RelativePoint`
- **Default:** `RelativePoint.Center`
- **Animatable:** Yes

### Bitmap Interpolation Mode (BitmapInterpolationMode)

Pixel sampling mode used during the transform.

- **Type:** `BitmapInterpolationMode`
- **Default:** `Media.BitmapInterpolationMode.Default`
- **Animatable:** Yes

### ApplyToTarget

Controls how the transform behaves when the effect chain holds multiple targets (for example after `Split Equally`, `Split By Parts`, or `Split Per Character` on a text object).

- `true`: each target is transformed individually around its own origin.
- `false`: a single transform is applied to the combined output around the shared origin.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

## Usage

Useful when you need to interleave transforms with other filter effects.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/TransformEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/TransformEffect.cs)

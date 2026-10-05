---
title: "Directional Light"
description: "A directional light source that illuminates the scene from a single direction."
sidebar_position: 6
---

# Directional Light

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A light that illuminates the entire scene from a single direction, like sunlight. Has no falloff with distance.

## Library location

Library → 3D (Experimental) → Directional Light

## Properties

### Direction

Direction the light shines toward.

- **Type:** `Vector3`
- **Default:** `(0.5, 1, 1)`
- **Animatable:** Yes

### Shadow Distance (ShadowDistance)

Maximum distance from which shadows are sampled.

- **Type:** `float`
- **Default:** `5000`
- **Animatable:** Yes
- **Range:** `[1, 100000]`

### Shadow Map Size (ShadowMapSize)

Width and height of the shadow map’s orthographic projection. Larger values cover more area but reduce shadow quality.

- **Type:** `float`
- **Default:** `2000`
- **Animatable:** Yes
- **Range:** `[1, 50000]`

## Common properties

This object inherits from `Light3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs)

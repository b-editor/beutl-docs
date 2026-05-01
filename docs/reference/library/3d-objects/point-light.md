---
title: "Point Light"
description: "A point light that radiates from a single point in all directions."
sidebar_position: 7
---

# Point Light

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A light that radiates from a single point in all directions, with attenuation based on distance.

## Library location

Library → 3D (Experimental) → Point Light

## Properties

### Position

World-space position of the light.

- **Type:** `Vector3`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Constant Attenuation (ConstantAttenuation)

Constant term in the `1 / (kc + kl·d + kq·d²)` falloff.

- **Type:** `float`
- **Default:** `1.0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Linear Attenuation (LinearAttenuation)

Linear term in the falloff equation.

- **Type:** `float`
- **Default:** `0.09`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Quadratic Attenuation (QuadraticAttenuation)

Quadratic term in the falloff equation.

- **Type:** `float`
- **Default:** `0.032`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Range

Maximum distance the light reaches.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

## Common properties

This object inherits from `Light3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Lighting/PointLight3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/PointLight3D.cs)

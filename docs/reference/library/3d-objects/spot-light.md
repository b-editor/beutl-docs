---
title: "Spot Light"
description: "A cone-shaped spotlight with adjustable inner and outer angles."
sidebar_position: 8
---

# Spot Light

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A cone-shaped spotlight defined by inner and outer cone angles. Brightness fades from full inside the inner cone to zero outside the outer cone.

## Library location

Library → 3D (Experimental) → Spot Light

## Properties

### Position

World-space position of the spotlight.

- **Type:** `Vector3`
- **Default:** `(0, 5, 0)`
- **Animatable:** Yes

### Direction

Direction the cone is aimed toward.

- **Type:** `Vector3`
- **Default:** `(0, -1, 0)`
- **Animatable:** Yes

### Inner Cone Angle (InnerConeAngle)

Half-angle of the fully lit inner cone (degrees).

- **Type:** `float`
- **Default:** `12.5`
- **Animatable:** Yes
- **Range:** `[0, 90]`

### Outer Cone Angle (OuterConeAngle)

Half-angle of the outer cone where the light fades to zero (degrees).

- **Type:** `float`
- **Default:** `17.5`
- **Animatable:** Yes
- **Range:** `[0, 90]`

### Constant Attenuation (ConstantAttenuation)

Constant term of the distance falloff.

- **Type:** `float`
- **Default:** `1.0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Linear Attenuation (LinearAttenuation)

Linear term of the distance falloff.

- **Type:** `float`
- **Default:** `0.09`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Quadratic Attenuation (QuadraticAttenuation)

Quadratic term of the distance falloff.

- **Type:** `float`
- **Default:** `0.032`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Range

Maximum distance the spotlight reaches.

- **Type:** `float`
- **Default:** `50`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

## Common properties

This object inherits from `Light3D` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Lighting/SpotLight3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/SpotLight3D.cs)

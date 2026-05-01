---
title: "Particle Emitter"
description: "Emits and animates particles with configurable physics and appearance."
sidebar_position: 1
---

# Particle Emitter

Spawns and animates particles using configurable emission, motion and appearance parameters. Each particle inherits the look of `ParticleDrawable` and is integrated through gravity, air resistance and turbulence forces.

## Library location

Library → Particle Emitter

## Properties

### Seed

Seed for the random number generator (changing it produces a different pattern with the same parameters).

- **Type:** `int`
- **Default:** `0`
- **Animatable:** Yes

### Emitter Shape (EmitterShape)

Shape of the area particles are emitted from (Point / Line / Rect / Ellipse).

- **Type:** `EmitterShape`
- **Default:** `Particles.EmitterShape.Point`
- **Animatable:** No

### Emitter Width (EmitterWidth)

Width of the emitter shape.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Emitter Height (EmitterHeight)

Height of the emitter shape.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Max Particles (MaxParticles)

Hard cap on the number of simultaneously alive particles.

- **Type:** `int`
- **Default:** `5000`
- **Animatable:** No
- **Range:** `[1, 50000]`

### Emission Rate (EmissionRate)

Particles emitted per second.

- **Type:** `float`
- **Default:** `60`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Lifetime

Average lifetime of a particle in seconds.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Lifetime Random (LifetimeRandom)

Random variation added to / subtracted from the lifetime.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Speed

Initial speed of newly spawned particles.

- **Type:** `float`
- **Default:** `200`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Speed Random (SpeedRandom)

Random variation of the initial speed.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Direction

Mean emission direction in degrees (0 = right, 90 = down).

- **Type:** `float`
- **Default:** `-90`
- **Animatable:** Yes

### Spread

Angle range (degrees) over which the direction is randomized.

- **Type:** `float`
- **Default:** `30`
- **Animatable:** Yes
- **Range:** `[0, 360]`

### Gravity

Constant downward acceleration applied to each particle.

- **Type:** `float`
- **Default:** `200`
- **Animatable:** Yes

### Air Resistance (AirResistance)

Velocity damping factor (higher = particles slow down faster).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Turbulence Strength (TurbulenceStrength)

Strength of the noise-based turbulent force.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Turbulence Scale (TurbulenceScale)

Spatial scale of the turbulence noise.

- **Type:** `float`
- **Default:** `0.01`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Turbulence Speed (TurbulenceSpeed)

How fast the turbulence pattern evolves over time.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Particle Drawable (ParticleDrawable)

Drawable used to render each particle.

- **Type:** `Drawable?`
- **Default:** `null`
- **Animatable:** No

### Particle Size (ParticleSize)

Initial size of each particle.

- **Type:** `float`
- **Default:** `10`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Size Random (SizeRandom)

Random variation added to the initial size.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Color (ParticleColor)

Initial particle color tint.

- **Type:** `Color`
- **Default:** `Colors.White`
- **Animatable:** Yes

### Particle Opacity (ParticleOpacity)

Initial opacity (0 – 100).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Initial Rotation (InitialRotation)

Initial rotation in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Initial Rotation Random (InitialRotationRandom)

Random variation of the initial rotation.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Angular Velocity (AngularVelocity)

Continuous rotation speed (degrees per second).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### End Size Multiplier (EndSizeMultiplier)

Size multiplier at the end of a particle's life.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### End Opacity Multiplier (EndOpacityMultiplier)

Opacity multiplier at the end of a particle's life.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### End Color (EndColor)

Color the particle interpolates to over its lifetime (when `UseEndColor` is on).

- **Type:** `Color`
- **Default:** `Colors.White`
- **Animatable:** Yes

### Use End Color (UseEndColor)

Enables color interpolation from `ParticleColor` to `EndColor`.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics/Particles/ParticleEmitter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Particles/ParticleEmitter.cs)

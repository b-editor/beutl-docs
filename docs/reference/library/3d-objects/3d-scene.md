---
title: "3D Scene"
description: "A 3D rendering container with camera and lighting."
sidebar_position: 1
---

# 3D Scene

:::caution Experimental

This 3D feature is under development and the API may change without notice.

:::

A 3D rendering container that hosts cameras, lights and 3D objects, and renders the result as a 2D drawable. The 3D feature set is experimental.

## Library location

Library → 3D (Experimental) → 3D Scene

## Properties

### Camera

Camera used to render the scene.

- **Type:** `Camera3D?`
- **Default:** `null`
- **Animatable:** No

### Ambient Color (AmbientColor)

Color of the global ambient light.

- **Type:** `Color`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** Yes

### Ambient Intensity (AmbientIntensity)

Strength of the ambient light.

- **Type:** `float`
- **Default:** `0.1`
- **Animatable:** Yes
- **Range:** `[0, 1]`

### Render Width (RenderWidth)

Width in pixels at which the scene is rasterized.

- **Type:** `float`
- **Default:** `1920`
- **Animatable:** Yes
- **Range:** `[1, 8192]`

### Render Height (RenderHeight)

Height in pixels at which the scene is rasterized.

- **Type:** `float`
- **Default:** `1080`
- **Animatable:** Yes
- **Range:** `[1, 8192]`

### Background Color (BackgroundColor)

Background fill color of the rendered scene.

- **Type:** `Color`
- **Default:** `#FF000000` (black)
- **Animatable:** Yes

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.Engine/Graphics3D/Scene3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Scene3D.cs)

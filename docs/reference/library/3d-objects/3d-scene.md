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
- **Default:** `PerspectiveCamera`
- **Animatable:** No

### Ambient Color (AmbientColor)

Color of the global ambient light.

- **Type:** `Color`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** Yes

### Ambient Intensity (AmbientIntensity)

Strength of the ambient light.

- **Type:** `float`
- **Default:** `0.2`
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

In the property panel, **Render Width** and **Render Height** share one **Render Size** row. See [Values shown in one row](../../../get-started/keyframe.md#joined-rows).

### Background Color (BackgroundColor)

Background fill color of the rendered scene.

- **Type:** `Color`
- **Default:** `Colors.Transparent`
- **Animatable:** Yes

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

When you add a **3D Scene** on its own from the Library, by dropping it on the timeline or the preview or with **Add Element**, Beutl also adds a **Cube** on the layer just below it, so the scene shows something right away. The 3D Scene's element takes in the 3D objects and lights on the five layers below it through its [portal](../portal/portal-object.md), so you can add more of them on the next layers. Both elements are added in one undo step, on neighboring layers; when a layer there is taken or locked, they go to free layers together. When no 3D object on those layers overlaps the scene in time, its element shows a [warning](../../tool-tabs/timeline.md#element-warnings).

## Source

[`src/Beutl.Engine/Graphics3D/Scene3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/Scene3D.cs)

- [`LibraryElementDescription.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/Helpers/LibraryElementDescription.cs) (the sample cube and the portal)

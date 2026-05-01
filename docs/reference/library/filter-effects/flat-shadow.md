---
title: "Flat Shadow"
description: "Projects a flat (long) shadow from the layer."
sidebar_position: 4
---

# Flat Shadow

Projects a flat (long) shadow at the given angle and length.

## Library location

Library → Filter Effect → Flat Shadow

## Properties

### Angle

Direction of the shadow in degrees.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Length

How far the shadow extends.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Brush

Brush used to fill the shadow.

- **Type:** `Brush?`
- **Default:** `null`
- **Animatable:** No

### Shadow Only (ShadowOnly)

Output only the shadow.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Usage

Use for retro / flat-design "long-shadow" looks.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs)

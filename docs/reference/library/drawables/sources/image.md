---
title: "Image"
description: "Imports a still image file as a drawable."
sidebar_position: 2
---

# Image

Imports a still image (PNG / JPEG / WebP / etc.) as a drawable. The image is rendered at its native resolution; use `Transform` properties to scale or position it.

## Library location

Library → Image

## Properties

### Source

The image file to display.

- **Type:** `ImageSource?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Drop an image onto the timeline.

## Source

[`src/Beutl.Engine/Graphics/SourceImage.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/SourceImage.cs)

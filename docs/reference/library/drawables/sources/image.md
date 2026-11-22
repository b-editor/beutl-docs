---
title: "Image"
description: "Imports a still image file as a drawable."
sidebar_position: 2
---

# Image

Imports a still image (PNG / JPEG / WebP / SVG / etc.) as a drawable. The image is rendered at its native resolution; use `Transform` properties to scale or position it.

## Library location

Library → Image

## Properties

### Source

The image file to display.

- **Type:** `ImageSource?`
- **Default:** `null`
- **Animatable:** No

## SVG files

An Image also takes an `.svg` file, from the file picker or by dropping it on the timeline. The SVG stays a drawing and is drawn again at the density it is shown at, so it stays sharp when scaled up. An image brush also draws the SVG at the density it is shown at, and a 3D texture rasterizes it at the density of the 3D surface, up to the largest texture the GPU takes and 64 megapixels. Both stay sharp when scaled up, also for an SVG that declares more than 64 megapixels.

A project and its media can come from anyone, so an SVG is opened the way a browser's `<img>` opens one:

- Images, stylesheets, and fonts it refers to elsewhere are not fetched. A blocked image draws a gray placeholder.
- `data:` images and references within the document are drawn.
- An SVG that declares a size over 16384 pixels per side shows as offline media.

Gradients and opacity inside the SVG are calculated in Beutl's linear working space, so midtones can differ from a browser's. `.svgz` files are not offered, and SVG animation does not play.

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Drop an image onto the timeline.

## Source

[`src/Beutl.Engine/Graphics/SourceImage.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/SourceImage.cs)

- [`LoadedImage.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Media/Source/LoadedImage.cs)
- [`BrushConstructor.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/BrushConstructor.cs) / [`ImageTextureSource.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics3D/Textures/ImageTextureSource.cs) (SVGs in image brushes and 3D textures)

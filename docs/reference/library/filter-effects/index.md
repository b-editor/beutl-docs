---
title: "Filter Effects"
description: "Filter effects that post-process a drawable's rendered output. Effects can be chained, animated, and combined with the script subgroup for custom shaders."
---

# Filter Effects

Filter effects that post-process a drawable's rendered output. Effects can be chained, animated, and combined with the script subgroup for custom shaders.

- [**Blur**](./blur.md) — Applies a Gaussian blur to the layer.
- [**Drop Shadow**](./drop-shadow.md) — Casts a shadow behind the layer.
- [**Inner Shadow**](./inner-shadow.md) — Adds a shadow inside the edges of the layer.
- [**Flat Shadow**](./flat-shadow.md) — Projects a flat (long) shadow from the layer.
- [**Stroke**](./stroke.md) — Draws an outline (stroke) around the layer.
- [**Clipping**](./clipping.md) — Clips the layer to a rectangular region.
- [**Dilate**](./dilate.md) — Expands opaque regions (morphological dilation).
- [**Erode**](./erode.md) — Shrinks opaque regions (morphological erosion).
- [**High Contrast**](./high-contrast.md) — Increases contrast with optional grayscale or invert modes.
- [**Hue Rotate**](./hue-rotate.md) — Rotates the colors of the layer in hue space.
- [**Lighting**](./lighting.md) — Adjusts brightness using a multiplier and an additive term.
- [**LumaColor**](./lumacolor.md) — Maps the layer's luminance to alpha to produce a luma matte.
- [**Saturate**](./saturate.md) — Adjusts color saturation.
- [**Threshold**](./threshold.md) — Converts the layer to two tones based on luminance threshold.
- [**Brightness**](./brightness.md) — Adjusts overall brightness.
- [**Gamma**](./gamma.md) — Applies gamma correction to the layer.
- [**Color Grading**](./color-grading.md) — Performs professional color grading with curves, lift/gamma/gain, temperature and tint.
- [**Curves**](./curves.md) — Adjusts tone with master, RGB and HSV curves.
- [**Invert**](./invert.md) — Inverts the colors of the layer.
- [**LUT (Cube File)**](./lut-cube-file.md) — Applies a 3D LUT loaded from a .cube file.
- [**Blend**](./blend.md) — Composites the layer with a configurable blend mode.
- [**Negaposi**](./negaposi.md) — Selectively inverts individual color channels.
- [**Chroma key**](./chroma-key.md) — Removes a hue range to perform green/blue screen keying.
- [**Color key**](./color-key.md) — Removes a specific color range based on RGB distance.
- [**Split equally**](./split-equally.md) — Splits the layer into a regular grid of tiles with spacing.
- [**Split by parts**](./split-by-parts.md) — Splits the layer into separate sub-targets per connected part.
- [**Transform**](./transform.md) — Applies a 2D transform as a filter effect (separately from the layer's own Transform).
- [**Mosaic**](./mosaic.md) — Pixelates the layer into mosaic blocks.
- [**Color Shift**](./color-shift.md) — Shifts each RGB and alpha channel independently to create a chromatic aberration look.
- [**Shake**](./shake.md) — Applies a randomized shake / jitter to the layer.
- [**Displacement Map**](./displacement-map.md) — Distorts the layer using another layer as a displacement map.
- [**Path Follow**](./path-follow.md) — Warps the layer so that it follows a path geometry.
- [**Layer**](./layer.md) — Applies a chain of filter effects to a referenced layer instead of the current one.
- [**Delay Animation**](./delay-animation.md) — Delays the application of subsequent effects.
- [**Pixel Sort**](./pixel-sort.md) — Sorts pixels by brightness or hue along a specified direction.
- [**Node Graph (Effect)**](./node-graph-effect.md) — Uses a node graph as a custom filter effect.

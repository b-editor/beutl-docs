---
title: "SKSL Script"
description: "Defines a custom filter effect with a SkiaSharp Shading Language (SKSL) shader."
sidebar_position: 2
---

# SKSL Script

Defines a custom filter effect using a SkiaSharp Shading Language (SKSL) shader. Runs as a per-pixel program through Skia.

## Library location

Library → Filter Effect → Script → SKSL Script

## Properties

### Script

The SKSL shader source.

- **Type:** `string`
- **Default:**
    ```sksl
    uniform shader src;
    uniform float progress;  // 0.0 - 1.0
    uniform float duration;  // seconds
    uniform float time;      // seconds
    uniform float width;     // render target width (device px)
    uniform float height;    // render target height (device px)
    // Also available:
    // uniform float2 iResolution;  // (width, height) in device px
    // uniform float  iScale;       // working density (device px per logical px)
    // uniform float  iTime;

    half4 main(float2 fragCoord) {
        half4 c = src.eval(fragCoord);
        return c;
    }
    ```
- **Animatable:** No

## Usage

Provide a `main(float2 coord) → half4` shader. The source layer is provided through `src` and animatable parameters are passed as uniforms.

## Resolution scaling

Beutl can render at a working density that differs from the project resolution — for example a downscaled preview or a supersampled export. `width` / `height` / `iResolution` report the **device-pixel** size of the render target at that density, and `iScale` is the working density in device pixels per logical pixel (`1.0` when unscaled).

A shader that works in normalized coordinates (for example `fragCoord / iResolution`) is automatically resolution-independent and needs no changes. If your shader uses **absolute pixel literals** — a fixed radius, offset, or border width measured in pixels — multiply them by `iScale` so they keep the same on-screen size at any density. A shader that never reads `iScale` renders exactly as before at scale `1.0`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs)

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
    uniform float width;     // render target width
    uniform float height;    // render target height
    // Also available:
    // uniform float2 iResolution;
    // uniform float iTime;

    half4 main(float2 fragCoord) {
        half4 c = src.eval(fragCoord);
        return c;
    }
    ```
- **Animatable:** No

## Usage

Provide a `main(float2 coord) → half4` shader. The source layer is provided through `src` and animatable parameters are passed as uniforms.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs)

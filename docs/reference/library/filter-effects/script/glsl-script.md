---
title: "GLSL Script"
description: "Defines a custom filter effect with a GLSL shader."
sidebar_position: 3
---

# GLSL Script

Defines a custom filter effect using a GLSL fragment shader. Runs through the GPU rendering backend.

## Library location

Library → Filter Effect → Script → GLSL Script

## Properties

### Script (FragmentShader)

The GLSL fragment shader source.

- **Type:** `string`
- **Default:**
    ```glsl
    #version 450

    layout(location = 0) in vec2 fragCoord; // 0.0 - 1.0
    layout(location = 0) out vec4 outColor;

    layout(set = 0, binding = 0) uniform sampler2D srcTexture;

    layout(push_constant) uniform PushConstants {
        float progress;   // 0.0 - 1.0
        float duration;   // seconds
        float time;       // seconds
        float width;      // render target width (device px)
        float height;     // render target height (device px)
        float scale;      // working scale w (1.0 = unscaled); multiply absolute-px literals by this
    } pc;

    void main() {
        vec4 c = texture(srcTexture, fragCoord);
        outColor = c;
    }
    ```
- **Animatable:** No

## Usage

Provide a fragment shader that writes the output color from the input source texture and any animatable uniforms.

## Resolution scaling

Beutl can render at a working density that differs from the project resolution — for example a downscaled preview or a supersampled export. `width` / `height` report the **device-pixel** size of the render target at that density, and `scale` is the working density in device pixels per logical pixel (`1.0` when unscaled).

The default `fragCoord` input is already normalized to `0.0 – 1.0`, so a shader that samples with it is automatically resolution-independent and needs no changes. If your shader uses **absolute pixel literals** — a fixed radius, offset, or border width measured in pixels — multiply them by `scale` so they keep the same on-screen size at any density. A shader that never reads `scale` renders exactly as before at scale `1.0`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs)

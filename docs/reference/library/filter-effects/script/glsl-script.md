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
        float width;      // render target width
        float height;     // render target height
    } pc;

    void main() {
        vec4 c = texture(srcTexture, fragCoord);
        outColor = c;
    }
    ```
- **Animatable:** No

## Usage

Provide a fragment shader that writes the output color from the input source texture and any animatable uniforms.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs)

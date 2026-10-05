---
title: "C# Script"
description: "Defines a custom filter effect in C#."
sidebar_position: 1
---

# C# Script

Defines a custom filter effect in C# script. The script has access to the rendering context and can produce arbitrary post-processing.

## Library location

Library → Filter Effect → Script → C# Script

## Properties

### Script

The C# script source.

- **Type:** `string`
- **Default:**
    ```csharp
    // Available variables:
    // Context - FilterEffectContext
    // Progress - 0.0 to 1.0
    // Duration - total duration in seconds
    // Time - current time in seconds

    // Example: Apply a blur effect
    // Context.Blur(new Size(10, 10));

    // Prefer built-in composition and declarative shaders when they express the required effect.
    // Low-level GLSL fallback (inside a Context.CustomEffect callback; requires C#):
    // using var shader = CreateGlslShader(fragmentSource, inputCount: 2);
    // CreateGlslShader reuses compiled programs within this effect; dispose each returned wrapper.
    // shader.Render(execution, new[] { source, mask }, outputBounds, pushConstants)
    // returns an owned EffectTarget without changing its inputs. Dispose intermediate targets;
    // return the final target from execution.ForEach. If IsEmpty, dispose it and keep the source.
    // Use the Render overload with a destination callback for size/scale-dependent constants.
    // GLSL sampler2D inputs use set=0, bindings 0..inputCount-1; constants use layout(push_constant).
    // Constants must match the GLSL layout and occupy a multiple of 4 bytes, at most 128 bytes.
    ```
- **Animatable:** No

## Usage

Treat as an escape hatch for behaviors that the built-in filters can't cover.

### Custom GLSL passes

Use `CreateGlslShader(fragmentSource, inputCount: ...)` inside a `Context.CustomEffect` callback for multiple shader inputs or a chain of passes where one pass feeds the next.

Compiled programs are reused within the effect, but dispose each returned shader wrapper and intermediate `EffectTarget`. `Render` returns a new target without modifying or disposing its inputs. Output is linear premultiplied RGBA. For constants that depend on output size or working density, use the overload with a destination callback.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs)

- [`CSharpScriptEffectGlobals.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffectGlobals.cs)
- [`GLSLShader.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Shaders/GLSLShader.cs)

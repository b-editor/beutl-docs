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
    ```
- **Animatable:** No

## Usage

Treat as an escape hatch for behaviors that the built-in filters can't cover.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs)

---
title: Rendering Process
description: Explanation of the rendering flow in Beutl
sidebar_position: 1
---

## Elements
Elements are placed on the timeline and evaluated in order from the top.

When evaluated, elements create drawing objects or transform those drawing objects.

The created drawing objects are then passed to the drawing layer after applying animations.

## Drawing Objects
Drawing objects include ellipses, rectangles, rounded rectangles, videos, etc.

Properties include:
- Transform (move, rotate, scale, etc.)
- Pen
- Fill
- Effects

## Drawing Scene / Drawing Layer
A scene or layer that does not consider the timeline.
A drawing layer can contain multiple drawing objects, and similarly, a drawing scene can contain multiple drawing layers.

When a drawing layer receives drawing objects from elements, it creates drawing nodes as follows:

The drawing layer tracks changes to the drawing objects and recreates drawing nodes if changes occur.
```
1. Drawing Node
2. └ Transform Node
3. 　 └ Effect Node
4. 　 　 └ Shape Node
```

These nodes describe the drawing content, effects, and transforms that produce the image.

This structure is very useful for caching drawing content.
For example, applying a heavy effect to an object and animating it to appear from off-screen would normally apply the heavy effect every frame.

By caching the object after the effect is applied, the effect only needs to be applied a few times.
```
1. Drawing Node
2. └ Transform Node
3. 　 └ Draw cached image
```

## Resolution-independent rendering

Changing the preview's rendering resolution does not change the scene's dimensions or object positions. Because of this, the editor can render the preview at a reduced **working density** — Half, Quarter, or fit-to-previewer — to play back and scrub faster. Vector shapes, text, and most effects are re-rasterized at that density instead of being upscaled, so they stay sharp at the smaller size. Encoding always renders at the project resolution (scale 1.0).

The preview density is chosen from the [Preview Settings](../reference/tool-tabs/preview-settings.md) tab. Custom shaders receive the working density through their uniforms; see [GLSL Script](../reference/library/filter-effects/script/glsl-script.md) and [SKSL Script](../reference/library/filter-effects/script/sksl-script.md) for how to keep a shader resolution-independent.

## Source

- [`RenderNodeRenderer.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/RenderNodeRenderer.cs)

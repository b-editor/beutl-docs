---
title: Cache
description: Explanation of render cache generation in Beutl
sidebar_position: 4
---

## Cache
Consider the following nodes.
```
1. Render Node
2. └ Transform Node
3. 　 └ Effect Node (Drop Shadow, with animation)
4. 　 　 └ Effect Node (Outline)
5. 　 　 　 └ Shape Node
```
Transform Node and Shape Node have no animation.

In conclusion,
In this example, after a few frames are rendered,
Beutl will cache up to the 4th effect node.  
Below is an explanation of why this happens.

## Determining Cacheability

An unchanged node becomes eligible for capture after three successfully completed stable frame or cache-warmup requests. Bounds measurement and hit testing alone do not advance this count. Changes reset the warmup count and cache.

The execution plan selects cache lookup and capture according to the cache settings, requested regions, and working density.

## Source

- [`RenderNodeCache.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCache.cs)
- [`RenderNodeCacheLifecycle.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCacheLifecycle.cs)

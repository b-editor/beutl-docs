---
title: Cache
description: How render caching can improve preview performance and where to configure it
sidebar_position: 4
---

## Cache

Reusing results for drawing content that has not changed can reduce the cost of calculating heavy effects on every frame.

For example, when a shape has a static outline and an animated shadow, the shape and outline can be reused while the shadow is updated. Caching is most useful when only part of the drawing changes.

## Settings

Enable **Settings → Editor → Node Cache**. Increasing the maximum pixel count lets larger drawing content be cached, at the cost of more memory. See [Editor settings](../settings/editor.md#node-cache).

## Determining Cacheability

Beutl manages the cache automatically. Editing drawing content or effects, or animating their values, redraws the affected parts. Content outside the configured size limits is not cached, so enabling caching does not make every scene faster.

## Source

- [`RenderNodeCache.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCache.cs)
- [`RenderNodeCacheLifecycle.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCacheLifecycle.cs)

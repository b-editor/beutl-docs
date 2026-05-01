---
title: "Backdrop"
description: "Captures the rendered backdrop and exposes it as a drawable for blending."
sidebar_position: 3
---

# Backdrop

Snapshots the rendered backdrop (everything drawn so far on the canvas) and exposes it as a drawable, so subsequent layers can blend with the existing composition.

## Library location

Library → Backdrop

## Properties

### Clear Buffer (Clear)

When `true`, clears the captured backdrop after sampling so subsequent draw calls start from a transparent canvas.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Place the backdrop above the elements you want to capture, then apply filter effects (such as `Blur`) to it to create frosted-glass or glass-pane looks.

## Source

[`src/Beutl.Engine/Graphics/SourceBackdrop.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/SourceBackdrop.cs)

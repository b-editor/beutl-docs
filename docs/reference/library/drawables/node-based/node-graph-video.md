---
title: "Node Graph (Video)"
description: "Renders the output of a node graph as a drawable."
sidebar_position: 1
---

# Node Graph (Video)

A drawable whose pixel output is produced by a node graph. The graph is edited in the dedicated node graph editor and re-computed whenever its inputs change.

## Library location

Library → Node Graph (Video)

## Properties

### Model

The node graph model to compute.

- **Type:** `GraphModel?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Open the graph editor from the property panel and wire nodes to build a rendering pipeline; the resulting pixels become this drawable's output. Useful for building reusable rendering pipelines.

## Source

[`src/Beutl.NodeGraph/NodeGraphDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.NodeGraph/NodeGraphDrawable.cs)

---
title: "Node Graph (Effect)"
description: "Uses a node graph as a custom filter effect."
sidebar_position: 36
---

# Node Graph (Effect)

Uses a node graph as a custom filter effect. The graph receives the source layer and emits the filtered output.

## Library location

Library → Filter Effect → Node Graph (Effect)

## Properties

### Model

Node graph model that defines the filter.

- **Type:** `GraphModel?`
- **Default:** Empty `GraphModel`
- **Animatable:** No

## Usage

Open the node graph editor and design the post-process pipeline visually.

## Source

[`src/Beutl.NodeGraph/NodeGraphFilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.NodeGraph/NodeGraphFilterEffect.cs)

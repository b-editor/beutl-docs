---
title: "Portal"
description: "Captures elements placed below it on the timeline so container objects can adopt them as children."
sidebar_position: 1
---

# Portal

A non-visual object placed on the timeline that captures the elements directly underneath it (those with a greater Z-index) and feeds them into the composition flow. Container objects — such as **Group**, **Decorator**, **Sound Group**, and **3D Scene** — consume that flow and treat the captured elements as their own children, letting you build a parent/child relationship from neighbouring timeline elements.

## Library location

Library → Portal

## Properties

### Count

Number of elements directly below the portal (with the next consecutive Z-indexes) that will be captured into the flow. The container that follows the portal will receive these elements as its children.

- **Type:** `int`
- **Default:** `0`
- **Animatable:** No

### Clear

When `true`, clears any pending flow content before this portal contributes its elements. Use this to discard upstream flow output that should not reach the following container.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** No

## Common properties

This object inherits from `EngineObject` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Source

[`src/Beutl.ProjectSystem/ProjectSystem/PortalObject.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/PortalObject.cs)

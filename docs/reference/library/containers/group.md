---
title: "Group"
description: "Groups multiple drawables and treats them as a single layer."
sidebar_position: 2
---

# Group

Groups multiple child drawables and treats them as a single unit. Transforms, blends and effects on the group cascade to all children.
It can be used in conjunction with [Portal](../portal/portal-object.md). In this case, the objects flowing from the portal are rendered in the background, while the objects set in `Children` are rendered in the foreground.

## Library location

Library → Group

## Properties

### Children

The drawables that belong to the group. Transforms, blends and effects applied to the group cascade to every child in this list.

- **Type:** `IList<Drawable>`
- **Default:** Empty list
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes. `Alignment X` and `Alignment Y` are hidden from the editor for this object.

## Usage

Add children, then apply transforms or effects to the group itself to move/animate everything together.

## Source

[`src/Beutl.Engine/Graphics/DrawableGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/DrawableGroup.cs)

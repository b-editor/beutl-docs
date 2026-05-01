---
title: "Group"
description: "Groups multiple drawables and treats them as a single layer."
sidebar_position: 2
---

# Group

Groups multiple child drawables and treats them as a single unit. Transforms, blends and effects on the group cascade to all children.

## Library location

Library → Group

## Properties

_This object has no properties of its own. Only the inherited common properties are available._

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Add children, then apply transforms or effects to the group itself to move/animate everything together.

## Source

[`src/Beutl.Engine/Graphics/DrawableGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/DrawableGroup.cs)

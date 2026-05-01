---
title: "Decorator"
description: "Wraps another drawable and applies extra transforms or effects to it."
sidebar_position: 1
---

# Decorator

Wraps a single child drawable so that you can apply transforms, filter effects, or blend modes to it as a whole, without touching the child.
It can be used in conjunction with [Portal](../portal/portal-object.md). In this case, the objects flowing from the portal are rendered in the background, while the objects set in `Children` are rendered in the foreground.

## Library location

Library → Decorator

## Properties

### Children

The drawables that the decorator wraps and applies its styling to.

- **Type:** `IList<Drawable>`
- **Default:** Empty list
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes. `Alignment X` and `Alignment Y` are hidden from the editor for this object.

## Usage

Use to encapsulate styling so the same wrapper can be reused, or to apply a unique animation to a child without affecting siblings.

## Source

[`src/Beutl.Engine/Graphics/DrawableDecorator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/DrawableDecorator.cs)

---
title: "Decorator"
description: "Wraps another drawable and applies extra transforms or effects to it."
sidebar_position: 1
---

# Decorator

Wraps a single child drawable so that you can apply transforms, filter effects, or blend modes to it as a whole, without touching the child.

## Library location

Library → Decorator

## Properties

_This object has no properties of its own. Only the inherited common properties are available._

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Use to encapsulate styling so the same wrapper can be reused, or to apply a unique animation to a child without affecting siblings.

## Source

[`src/Beutl.Engine/Graphics/DrawableDecorator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/DrawableDecorator.cs)

---
title: "Sound Group"
description: "Groups multiple sound sources and mixes them as a single output."
sidebar_position: 3
---

# Sound Group

Groups multiple sound sources and mixes them into a single output, allowing common gain / speed / effects to be applied to the entire group.

## Library location

Library → Sound Group

## Properties

### Children

The sound sources that belong to the group. They are mixed together and shared processing is applied to the result.

- **Type:** `IList<Sound>`
- **Default:** Empty list
- **Animatable:** No

## Common properties

This object inherits from `Sound` and exposes the [common properties](../common-properties.md) declared on its base classes. `Offset Position` and `Speed` are hidden from the editor for this object.

## Usage

Use as a sub-mix bus: stem-bouncing dialog, music or SFX with shared processing.

## Source

[`src/Beutl.Engine/Audio/SoundGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SoundGroup.cs)

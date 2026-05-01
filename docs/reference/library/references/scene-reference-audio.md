---
title: "Scene Reference (Audio)"
description: "References another scene's rendered audio output."
sidebar_position: 2
---

# Scene Reference (Audio)

References another scene's rendered audio output and mixes it into the current scene's audio.

## Library location

Library → Scene Reference (Audio)

## Properties

### Referenced Scene (ReferencedScene)

The scene whose rendered audio is mixed in.

- **Type:** `Scene?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Sound` and exposes the [common properties](../common-properties.md) declared on its base classes.

## Usage

Pair with `SceneDrawable` when you want both video and audio of the referenced scene.

## Source

[`src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs)

---
title: "Split by parts"
description: "Splits the layer into separate sub-targets per connected part."
sidebar_position: 26
---

# Split by parts

Splits the layer into separate targets per connected opaque part. Each connected component becomes its own target that subsequent effects can transform independently.

## Library location

Library → Filter Effect → Split by parts

## Properties

_This object has no properties of its own. Only the inherited common properties are available._

## Usage

Use to animate per-glyph or per-shape independently after applying a single transform that knows about each part.

Put [Delay Animation](./delay-animation.md) or [Range animator](./range-animator.md) after it to animate the parts one after another or a range of them. They count each part made here on its own, even on a text, so their `Unit` has no effect on these parts.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/PartsSplitEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PartsSplitEffect.cs)

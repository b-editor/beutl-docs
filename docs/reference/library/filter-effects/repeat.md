---
title: "Repeat"
description: "Repeats the layer in a grid of copies, with spacing, an offset, and flipping every other copy."
sidebar_position: 47
---

# Repeat

Repeats the layer in a grid of copies around where it is. Its place in the effect chain decides what is repeated: effects before it are repeated with the picture, while effects after it and the object's transform apply to the grid as one picture. Every pixel of the grid reads one place in the picture, so more copies cost nothing more per frame, and only the part of the grid a frame shows is drawn. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Repeat

## Properties

### Columns

Number of copies across.

- **Type:** `int`
- **Default:** `3`
- **Animatable:** Yes
- **Range:** `[1, 400]`

### Rows

Number of copies down.

- **Type:** `int`
- **Default:** `3`
- **Animatable:** Yes
- **Range:** `[1, 400]`

### Spacing

The gap between the copies, horizontally and vertically. At `0` they touch and show no seam. The spacing cannot be negative, so copies never overlap.

- **Type:** `Size`
- **Default:** `(0, 0)`
- **Animatable:** Yes
- **Range:** `[(0, 0), (∞, ∞))`

### Offset

Moves the copies inside the grid. A copy that leaves at one end comes back at the other, so animating this scrolls without end. The grid's bounds do not move.

- **Type:** `Point`
- **Default:** `(0, 0)`
- **Animatable:** Yes

### Mirror

Flips every other copy: `None`, `Every other column`, `Every other row`, or `Both`. Flipped copies keep alternating while the offset scrolls them.

- **Type:** `RepeatEffectMirror`
- **Default:** `RepeatEffectMirror.None`
- **Animatable:** Yes

## Usage

Place a small tile, such as a shape or a logo, and set `Columns` and `Rows` until the grid fills the frame. Animate `Offset` for a scrolling background, and use `Mirror` for patterns that should meet at their edges. A fractional offset filters the copies between pixels, which softens them slightly.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/RepeatEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/RepeatEffect.cs)

- [`RepeatEffectMirror.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/RepeatEffectMirror.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.resx)

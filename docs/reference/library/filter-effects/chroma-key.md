---
title: "Chroma key"
description: "Removes a hue range to perform green/blue screen keying."
sidebar_position: 23
---

# Chroma key

Removes a hue range to perform green / blue screen keying. Compares pixels in HSV space against a target color with adjustable hue, saturation and edge boundary, and can remove the screen's color that spills onto the parts it keeps.

## Library location

Library → Filter Effect → Chroma key

## Properties

### Color

Key color (e.g., the green of the screen).

- **Type:** `Color`
- **Default:** `#FF000000` (black)
- **Animatable:** Yes

### Hue Range (HueRange)

Allowed hue distance from the key color.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Saturation Range (SaturationRange)

Allowed saturation distance from the key color.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Boundary correction (Boundary)

Softness of the matte edge.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes

### Spill suppression (SpillSuppression)

How strongly to remove, in percent, the key color that the screen reflects onto the parts that are kept, such as a green fringe on hair. The strongest channel of the key color, green for a green screen, is lowered toward the average of the other two channels: at `100` it goes no higher than that average, and at `50` it moves halfway there. The other channels and the transparency do not change. A key color without a clear hue, such as black or gray, gets no suppression, and `0` leaves the colors as they are.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

Pick the screen color, widen `HueRange` to catch shadow variations of the screen, and use `Boundary` to soften edges. If the edges of the subject still look tinted with the screen's color, raise `Spill suppression`.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs)

- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

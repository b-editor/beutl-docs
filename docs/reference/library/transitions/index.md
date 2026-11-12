---
sidebar_position: 3
title: "Transitions"
description: "Built-in transitions for the beginning and end of timeline elements."
---

# Transitions

Transitions blend the video at the beginning or end of an element. They are set on an element's boundaries, separately from its filter effects. See [Timeline](../../tool-tabs/timeline.md) for adding and editing them. The **Transition** tab of the [Library](../../tool-tabs/library.md#filter-effect-and-transition) shows each one as a moving thumbnail.

## Library location

Library → Transition

| Transition | Appearance | Additional property |
| --- | --- | --- |
| Cross Dissolve | Fades between the two elements while keeping opaque elements opaque. | None |
| Fade | Fades the outgoing element to transparent, then fades the incoming element in. Lower layers show through at the midpoint. | None |
| Wipe | Reveals the incoming element behind a moving edge: a straight line, a growing box or diamond, or a sweeping clock hand. | Shape, Linear direction, Clockwise |
| Dip to Color | Fades through a chosen solid color. | Color, default black (`Colors.Black`) |
| Dip to White | Fades through white. | None |
| Push | Moves both elements together as the incoming element pushes the outgoing element out. | Direction |
| Slide | Slides the incoming element over the stationary outgoing element. | Direction |
| Cross Zoom | Zooms the outgoing element while the incoming element zooms to full size and the two dissolve. | Direction, Tile Mode |
| Iris | Reveals the incoming element through a circle growing from the frame center, or outside a circle closing toward the center. | Direction |
| Split | Reveals the incoming element through a band widening from the frame center. | Orientation |
| Blinds | Reveals the incoming element through parallel slats that widen together. | Angle, Slats |
| Checkerboard | Reveals the incoming element through a grid of squares, opening alternate squares first. | Columns, Rows |
| Zoom Blur | Blends the elements through a zoom with a radial blur. | Strength, Direction, Tile Mode |
| Whip Pan | Slides the elements across the frame with a directional blur, like a fast camera pan. | Strength, Direction |
| Glitch | Cuts between the elements in shifted scan bands with a color split. | Strength |
| Light Leak | Blends the elements under a warm band of light that sweeps across the frame. | Strength |

## Properties

### Duration

The span contributed by this side of the boundary. At a cut between adjacent elements on the same layer, the outgoing element's exit duration lies before the cut, and the incoming element's enter duration lies after it. Both elements hold their edge frame outside their own time ranges during the transition.

- **Type:** `MediaTime`
- **Default:** `00:00:00.5` (0.5 seconds)
- **Animatable:** No
- **Range:** `[00:00:00, 01:00:00]`

When adding a transition at a shared element boundary, the editor divides this initial duration equally between the two sides (0.25 seconds each). A lone edge uses the full 0.5 seconds. See [Transition](../../tool-tabs/transition.md).

### Easing

Controls how transition progress changes over its duration. Overshooting easing curves are clamped to the start or end of the transition.

- **Type:** `Easing`
- **Default:** `LinearEasing`
- **Animatable:** No

### Direction

Available for Push, Slide, Whip Pan, and Wipe, where it is called **Linear direction** and applies to the **Linear** shape. Choose **Left to Right**, **Right to Left**, **Top to Bottom**, or **Bottom to Top**.

- **Type:** `ClipTransitionDirection`
- **Default:** `LeftToRight`
- **Animatable:** No

For Iris, **Direction** chooses **Iris In (open)** or **Iris Out (close)**.

- **Type:** `IrisTransitionDirection`
- **Default:** `In`
- **Animatable:** No

For Cross Zoom and Zoom Blur, **Direction** chooses **Zoom in** or **Zoom out**.

- **Type:** `ZoomTransitionDirection`
- **Default:** `In`
- **Animatable:** No

### Shape

Available for Wipe. **Linear** moves a straight edge along **Linear direction**. **Box** and **Diamond** grow from the frame center. **Clock** sweeps around the frame center from the top.

- **Type:** `WipeTransitionShape`
- **Default:** `Linear`
- **Animatable:** No

### Clockwise (clock wipe) (Clockwise)

Available for Wipe. Sets the direction of the **Clock** shape's sweep.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** No

### Tile Mode (TileMode)

Available for Cross Zoom and Zoom Blur. Fills the frame edges that a shrinking element leaves empty: `Pad` extends the edge, `Reflect` mirrors the frame, `Repeat` tiles it, and `Decal` leaves them transparent.

- **Type:** `GradientSpreadMethod`
- **Default:** `Decal`
- **Animatable:** No

### Angle

Available for Blinds. The direction each slat opens in, in degrees. `0` opens left to right; diagonal and negative angles are allowed.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** No

### Slats (Count)

Available for Blinds.

- **Type:** `int`
- **Default:** `8`
- **Animatable:** No
- **Range:** `[1, 64]`

### Columns / Rows

Available for Checkerboard.

- **Type:** `int`
- **Default:** `8` columns, `6` rows
- **Animatable:** No
- **Range:** `[1, 64]`

### Strength (%) (Strength)

Available for Zoom Blur, Whip Pan, Glitch, and Light Leak. `0` is a plain cross dissolve.

- **Type:** `float`
- **Default:** `65` for Zoom Blur and Glitch, `75` for Whip Pan, `70` for Light Leak
- **Animatable:** No
- **Range:** `[0, 100]`

### Color

Available for Dip to Color.

- **Type:** `Color`
- **Default:** `Colors.Black`
- **Animatable:** No

### Orientation

Available for Split. **Horizontal** widens a vertical band left and right; **Vertical** widens a horizontal band up and down.

- **Type:** `ClipTransitionOrientation`
- **Default:** `Horizontal`
- **Animatable:** No

## Usage

If both sides of a cut have a transition, the incoming element's enter transition determines the appearance; the outgoing element contributes its exit duration. Without an adjacent element, the transition blends against transparency and reveals lower layers.

## Source

- [`LibraryRegistrar.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/LibraryRegistrar.cs)
- [`ClipTransition.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/Transitions/ClipTransition.cs)
- [`Built-in transitions`](https://github.com/b-editor/beutl/tree/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/Transitions)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.resx)
- [`ElementAttributeService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/ElementAttributeService.cs)

---
sidebar_position: 3
title: "Transitions"
description: "Built-in transitions for the beginning and end of timeline elements."
---

# Transitions

Transitions blend the video at the beginning or end of an element. They are set on an element's boundaries, separately from its filter effects. See [Timeline](../../tool-tabs/timeline.md) for adding and editing them.

## Library location

Library → Transition

| Transition | Appearance | Additional property |
| --- | --- | --- |
| Cross Dissolve | Fades between the two clips while keeping opaque clips opaque. | None |
| Fade | Fades the outgoing clip to transparent, then fades the incoming clip in. Lower layers show through at the midpoint. | None |
| Wipe | Reveals the incoming clip behind a straight moving edge. | Direction |
| Dip to Color | Fades through a chosen solid color. | Color, default black (`Colors.Black`) |
| Dip to White | Fades through white. | None |
| Push | Moves both clips together as the incoming clip pushes the outgoing clip out. | Direction |
| Slide | Slides the incoming clip over the stationary outgoing clip. | Direction |
| Cross Zoom | Zooms the outgoing clip in while the incoming clip zooms out and the two dissolve. | None |
| Iris | Reveals the incoming clip through a circle growing from the frame center. | None |
| Split | Reveals the incoming clip through a band widening from the frame center. | Orientation |

## Properties

### Duration

The span contributed by this side of the boundary. At a cut between adjacent elements on the same layer, the outgoing element's exit duration lies before the cut, and the incoming element's enter duration lies after it. Both clips hold their edge frame outside their own time ranges during the transition.

- **Type:** `MediaTime`
- **Default:** `00:00:00.5` (0.5 seconds)
- **Animatable:** No
- **Range:** `[00:00:00, 01:00:00]`

When adding a transition at a shared clip boundary, the editor divides this initial duration equally between the two sides (0.25 seconds each). A lone edge uses the full 0.5 seconds. See [Transition](../../tool-tabs/transition.md).

### Easing

Controls how transition progress changes over its duration. Overshooting easing curves are clamped to the start or end of the transition.

- **Type:** `Easing`
- **Default:** `LinearEasing`
- **Animatable:** No

### Direction

Available for Wipe, Push, and Slide. Choose **Left to Right**, **Right to Left**, **Top to Bottom**, or **Bottom to Top**.

- **Type:** `ClipTransitionDirection`
- **Default:** `LeftToRight`
- **Animatable:** No

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

- [`LibraryRegistrar.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/LibraryRegistrar.cs)
- [`ClipTransition.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Transitions/ClipTransition.cs)
- [`Built-in transitions`](https://github.com/b-editor/beutl/tree/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Transitions)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.resx)
- [`ElementAttributeService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/ElementAttributeService.cs)

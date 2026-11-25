---
title: "Corner Pin"
description: "Moves the layer's four corners and stretches the picture between them in perspective."
sidebar_position: 58
---

# Corner Pin

Moves the four corners of the layer to any four points and stretches the picture between them in perspective, the way a flat card looks when seen at an angle. Use it to fit a picture into a screen or a sign in the footage, or to tilt a title back. You can drag the corners in the preview or enter their positions in the property panel. With the corners at their defaults, the layer is unchanged.

The corners must outline a convex shape. When a corner crosses the line between two others, so that the shape caves in or twists, or when three corners line up, the layer disappears until you move the corner back. Moving the left corners to the right side and the right corners to the left mirrors the layer.

## Library location

Library → Filter Effect → Corner Pin

## Editing the corners in the preview

1. In the Properties tab, click **Edit in frame**, the crosshair button left of the effect's eye. See [Editing an effect's handles in the preview](../../tool-tabs/element-property.md#effect-handles).
2. The preview shows a blue dot at each corner, joined by lines. The object's own transform handles hide meanwhile. When effects come after Corner Pin, the preview hides them while you edit, so the corners stay on the picture Corner Pin makes, and a note at the bottom of the preview says so. They show again when you play back or select the element.
3. Drag a corner. A corner can go outside the layer's bounds, and the picture stretches out to it. Each drag is one undo step, and `Esc` cancels it. If a drag makes the layer disappear, the dots stay, so you can drag the corner back.

When a corner has keyframes, a drag changes its keyframe at the current frame, or adds one there with spline easing. When its X and Y are animated with [Separate components](../../../get-started/keyframe.md#separate-components), a drag changes both, except one that has an expression. While a corner has an expression, dragging it does nothing.

## Properties

### Top left (TopLeft)

Where the layer's top-left corner goes, relative to the layer's bounds. A value in percent is a share of the layer's size and follows the layer when its size changes. A value in pixels is measured from the top-left corner of the layer's bounds. A drag in the preview keeps the unit the corner has.

- **Type:** `RelativePoint`
- **Default:** `(0%, 0%)`
- **Animatable:** Yes

### Top right (TopRight)

Where the layer's top-right corner goes, set the same way as `Top left`.

- **Type:** `RelativePoint`
- **Default:** `(100%, 0%)`
- **Animatable:** Yes

### Bottom right (BottomRight)

Where the layer's bottom-right corner goes, set the same way as `Top left`.

- **Type:** `RelativePoint`
- **Default:** `(100%, 100%)`
- **Animatable:** Yes

### Bottom left (BottomLeft)

Where the layer's bottom-left corner goes, set the same way as `Top left`.

- **Type:** `RelativePoint`
- **Default:** `(0%, 100%)`
- **Animatable:** Yes

## Usage

To put a picture onto a screen in a video, place the picture's element on a layer above the video, add Corner Pin to the picture, click **Edit in frame**, and drag each corner onto the matching corner of the screen. If the screen moves, add keyframes to the corners, then go to other frames and drag the corners again. To tilt a title back in perspective, move `Top left` and `Top right` toward each other.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/CornerPin.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/CornerPin.cs)

- [`CornerPin.Rendering.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/CornerPin.Rendering.cs) / [`TransformHandlesOverlay.EditingHandles.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Views/TransformHandlesOverlay.EditingHandles.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

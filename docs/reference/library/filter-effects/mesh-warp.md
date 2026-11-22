---
title: "Mesh warp"
description: "Deforms the layer by dragging the control points of a grid in the preview."
sidebar_position: 52
---

# Mesh warp

Deforms the layer by moving the control points of a grid laid over it. You drag the points in the preview, and the picture stretches with them. The whole mesh is one value, so keyframes on `Mesh` change the layer from one shape to the next.

## Library location

Library → Filter Effect → Mesh warp

## Editing the mesh in the preview

1. In the Properties tab, click **Edit in frame**, the crosshair button left of the effect's eye. See [Editing an effect's handles in the preview](../../tool-tabs/element-property.md#effect-handles).
2. The preview shows the grid over the layer: lines between the points, orange dots at the four corners, and blue dots for the other points. The object's own transform handles hide meanwhile.
3. Drag a point. A point can go outside the layer's bounds, and the picture stretches out to it. Each drag is one undo step, and `Esc` cancels it.

The handles show the mesh as you shaped it whatever the `Strength`, even at `0`. When `Mesh` has keyframes, a drag changes the keyframe at the current frame, or adds one there with spline easing. While `Mesh` has an expression, dragging does nothing.

In the property panel, the **Mesh** row shows the size of the grid, such as `4 × 4`, and a **Reset mesh** button. The button returns the mesh to an even grid. When `Mesh` has keyframes, it resets the keyframe at the current frame, adding one there if needed.

## Properties

### Rows

Number of rows of cells. Changing it resamples the mesh and all of its keyframes, so the shape stays as close as the new grid allows.

- **Type:** `int`
- **Default:** `4`
- **Animatable:** No
- **Range:** `[1, 32]`

### Columns

Number of columns of cells. Changing it resamples the mesh and all of its keyframes, as `Rows` does.

- **Type:** `int`
- **Default:** `4`
- **Animatable:** No
- **Range:** `[1, 32]`

### Strength

How much of the deformation applies, in percent. `0` leaves the layer unchanged and `100` applies the mesh as it is.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes

### Interpolation

How the picture bends between the control points.

- **Type:** `MeshWarpInterpolation`
- **Default:** `MeshWarpInterpolation.Smooth`
- **Animatable:** Yes

The choices are:

- `Linear`: each cell stretches between its four points with straight edges.
- `Smooth`: the picture bends in smooth curves through the points.

### Mesh

The positions of the control points. Edit them by dragging in the preview.

- **Type:** `MeshWarpGrid`
- **Default:** An even 4 × 4 grid
- **Animatable:** Yes

## Usage

Click **Edit in frame**, then drag the points to bend a logo, bulge a face, or fit a picture to a surface. For a moving deformation, add keyframes to `Mesh` and drag the points at each keyframe, or animate `Strength` to fade a fixed deformation in and out.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/MeshWarp.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/MeshWarp.cs)

- [`MeshWarpGrid.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/MeshWarpGrid.cs) / [`MeshWarpInterpolation.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/MeshWarpInterpolation.cs)
- [`MeshWarpGridEditor.axaml`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Editor.Components/PropertyEditors/Views/MeshWarpGridEditor.axaml) / [`TransformHandlesOverlay.EditingHandles.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/Views/TransformHandlesOverlay.EditingHandles.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.resx)

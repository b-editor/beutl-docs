---
title: "Curves"
description: "Describes the role and primary usage of the Curves tab."
sidebar_position: 11
---

# Curves

This tab adjusts the tone and color balance of footage using **tone curves**.
In addition to editing the curve for each RGB channel, you can also apply HSL-style curve corrections that change hue, saturation, or luminance for specific hue ranges. The background overlays a histogram or gradient calculated from the preview image, so you can visually identify the area you want to affect while you adjust.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

There are two ways to open this tab.

- From the menu bar, choose **View → Tools → Curves**.
- From the property panel of a **Curves** filter effect added to a drawable object, click the **Curves** button (pencil icon) next to the curve property.

If you only open the tab directly, it has no associated effect to operate on, and the message **"No Color Curves effect is selected."** is shown. Opening the tab from the filter effect's property panel binds it to that effect so its values can be edited.

When the associated color curves effect is removed, this tab closes automatically.

## Layout

The tab is divided into two main areas.

- **Header (top)**: The tab title and dropdowns for switching the curve type and channel.
- **Edit area (bottom)**: A curve editor for editing control points. The background renders a histogram or gradient overlay.

## Header dropdowns

There are two dropdowns on the right side of the header.

### Curve type

The rightmost dropdown switches the curve being edited.

| Item | Horizontal Axis | Vertical Axis / Effect |
|------|-----------------|------------------------|
| **Custom (RGB)** | Input value | Output value (a standard tone curve) |
| **Hue vs Hue** | Source hue | Resulting hue (shifts a specific hue to a different hue) |
| **Hue vs Saturation** | Source hue | Saturation multiplier (boosts or reduces saturation for a specific hue) |
| **Hue vs Luminance** | Source hue | Luminance multiplier (brightens or darkens a specific hue) |
| **Luminance vs Saturation** | Source luminance | Saturation multiplier (varies saturation by brightness) |
| **Saturation vs Saturation** | Source saturation | Saturation multiplier (varies saturation by saturation range) |

### Channel

The dropdown on the left, shown only when the curve type is **Custom (RGB)**, switches the channel being edited.

- **Master**: Applies the same curve to all RGB channels (the background shows a luminance histogram).
- **Red / Green / Blue**: Edits each channel's curve individually (the background shows the histogram for that channel).

## Edit area background

The background of the edit area is rendered from the current preview image. What it shows depends on the curve type.

- **Custom (RGB)**: A per-channel **histogram** (the master view uses a luminance-based histogram).
- **Hue vs ...**: A **rainbow gradient** representing hue, plus a hue histogram.
- **Luminance vs Saturation**: A black-to-white **luminance gradient**, plus a luminance histogram.
- **Saturation vs Saturation**: A black-to-white **saturation gradient**, plus a saturation histogram.

The histograms are recalculated automatically each time the preview updates. They are not refreshed while the tab is hidden.

## Working with control points

A curve is shaped by multiple control points. Each control point has a left and right Bezier handle.

### Add, move, delete

- **Left-click** an empty area of the edit region to add a new control point. You can drag while pressing to set its position.
- **Left-drag** a control point to move it.
  - Endpoints (the leftmost and rightmost points) **can only be moved vertically**; their horizontal positions are fixed.
- **Right-click** a control point to delete it (endpoints cannot be deleted).

### Bezier handles

Selecting a control point with a **left-click** reveals its left and right handles.

- **Left-drag** a handle to adjust the curvature.
  - The left handle stays to the left of its point and the right handle stays to the right (X-axis constraint).
- **Right-click** a handle to reset it to its default state (a straight line).

When a new control point is added, its handles are configured automatically based on its position relative to the neighboring points.

### Committing an edit

The curve updates in real time while you drag, and the change is recorded to the undo/redo history when you release the mouse.

## Persisted tab state

Even after closing the tab, the following are restored the next time it is opened.

- The curve type that was selected
- The channel that was selected (when the curve type is Custom (RGB))
- The associated color curves effect

:::tip
To edit an animation's **time curve**, use the [Graph Editor](./graph-editor.md) instead.
:::

## Related documents

- [Scopes](./color-scopes.md)
- [Color Grading](./color-grading.md)

## Source

- [`CurvesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/CurvesTabExtension.cs)
- [`CurvesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/ViewModels/CurvesTabViewModel.cs)
- [`CurvePresenterViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/ViewModels/CurvePresenterViewModel.cs)
- [`CurvesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/Views/CurvesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/Views/CurvesTabView.axaml.cs)
- [`CurveEditor.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Curves/CurveEditor.cs) (control point and handle interaction logic)
- [`CurveVisualizationRenderer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Curves/CurveVisualizationRenderer.cs) (background histogram/gradient rendering)
- [`Curves.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Curves.cs) (the filter effect itself)
- [`CurveMapEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/CurveMapEditor.axaml.cs) (the "Curves" button on the property side)

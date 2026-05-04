---
title: "Path editor"
description: "What the Path editor tab is for and how to use it."
sidebar_position: 13
---

# Path editor

A tab for editing a **path (the outline of a shape made up of Bezier curves and similar segments)** by manipulating its control points directly.
It is only meaningful while you are editing a shape that uses a path.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Path editor**.

In the property editor, click the fountain pen button next to a shape's path entry and choose
**Edit in tab** to automatically open this tab and start editing that shape.
Performing the same action again ends editing.
Choosing **Edit in frame** instead enters a separate mode where you edit directly on the preview (the Path editor tab is not used).

## Layout

- **Editing canvas (center)**: The work area where the path is shown and edited. The background shows a grid that follows the current zoom level, along with horizontal and vertical lines marking the scene origin.
- **Drag mode toggles (top-left)**: Choose how a control point behaves when dragged, from **Symmetry / Asymmetry / Separately**.
- **Visibility toggles (top-left)**: Show or hide the path's **stroke** and **fill** independently.

While a shape is being edited, the canvas displays each segment's **anchor (endpoint)** plus the **control points (handles)** belonging to the selected segment and the next segment.
Dotted guides are drawn from the selected segment's handles toward their anchors.

## Working with the path

### Manipulating control points (anchors) and handles

- Anchors and handles can be moved with **left drag**.
- The change is recorded in the undo/redo history when you release the drag.
- **Clicking** an anchor selects the segment it belongs to and shows the related handles.

### Selecting anchors

- **`Ctrl` + click** an anchor to toggle its selection (multi-select supported).
- **`Ctrl` + drag** an empty area of the canvas to make a rectangular range selection.
- Press **`Ctrl + A`** (**`Cmd + A`** on macOS) to select every anchor.
- Press **`Esc`** to clear the selection.
- When multiple anchors are selected, dragging one of them moves all selected anchors together.

### Fine-tuning with the keyboard

Use the **arrow keys (`←` `↑` `→` `↓`)** to nudge the anchors of the selected segment by one unit at a time.
The change is committed to history when the key is released.

### Control point drag modes

Choose how the opposite handle responds when you drag a handle (control point).

- **Symmetry**: The opposite handle moves with the same angle and length, mirrored around the anchor.
- **Asymmetry**: The opposite handle follows the angle only; its length is preserved.
- **Separately**: The opposite handle is left untouched (edited independently).

You can switch the drag mode from the radio buttons in the top-left of the canvas, or from the right-click menu on the canvas.

### Adding a segment

**Right-click** an empty area of the canvas to add a new segment at the click position.

- **Cubic Bezier curve**
- **Quadratic Bezier curve**
- **Line**
- **Elliptical arc**
- **Conic**

The added segment is appended to the end of the current path, and its control points are placed automatically near the midpoint between it and the previous anchor.

### Deleting a segment

**Right-click** an anchor or a control point to bring up the **Delete** menu.
This removes the segment from the path.

### Right-click menu on the canvas

Right-clicking an empty area exposes the following options in addition to segment creation above.

- Drag mode toggle: **Symmetry / Asymmetry / Separately**
- **Reset zoom**

### Visibility toggles (stroke and fill)

The toggle buttons in the top-left of the canvas let you show or hide the **stroke** and **fill** of the shape being edited independently.
Show only what you need depending on how you want to inspect the shape.

## Panning and zooming the canvas

- **Mouse wheel**: Zoom in / out, centered on the wheel position.
- **Left drag (empty area)**: Pan (translate) the entire canvas.
- **Right-click menu → Reset zoom**: Reset the zoom level and position.

The background grid spacing follows the zoom level. Zoom only affects how the canvas is displayed; it does not change the actual size of the scene.

## Animation and playback

- The position of each control point reflects its value at the current time on the timeline playhead.
- During playback, editing on the canvas is disabled and the canvas switches to a shape preview.
- When you drag a control point that has animation in **Symmetry** or **Asymmetry** mode, the handles on adjacent keyframes are also adjusted automatically so they remain consistent.

## Related documents

- [Timeline](./timeline.md)

## Source

- [`PathEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/PathEditorTabExtension.cs)
- [`PathEditorTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/ViewModels/PathEditorTabViewModel.cs)
- [`PathEditorTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml.cs)
- [`PathPointDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathPointDragBehavior.cs)
- [`PathEditorHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorHelper.cs)
- [`PathGeometryControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathGeometryControl.cs)
- [`PathEditorGrid.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorGrid.cs)
- [`ControlPointVisibilityHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/ControlPointVisibilityHelper.cs)
- [`PathFigureListItemEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PathFigureListItemEditor.axaml.cs) (entry point for opening the tab)

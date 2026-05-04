---
title: "Library"
description: "Role of the Library tab and how to use it."
sidebar_position: 2
---

# Library

A tab for browsing the available **drawables, effects, transforms, easings, nodes**, and other items, and dragging them onto the timeline or element properties to add them.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Library**.

## Layout

The top of the tab shows the tab switcher and the bottom shows the contents of the selected tab. There are four tabs:

| Tab | Role |
|-----|------|
| **Search** | Search across the entire library by keyword |
| **Easings** | List easing functions used to interpolate animations |
| **Library** | Browse drawables, effects, and other items in a category tree (selected by default) |
| **Node Graph** | List nodes used in node-based rendering (hidden by default) |

When the tabs do not fit on screen, you can scroll horizontally with the mouse wheel.

### Showing or hiding tabs

You can toggle the visibility of each tab from the right-click context menu on a tab, or from the **"…" button** at the right edge of the tab strip (each entry is the **Always display** toggle).

- **Search / Easings / Library**: Shown by default
- **Node Graph**: Hidden by default. Show it when you want to use the node graph

## Tab contents

### Search

Type a keyword into the input box to search across the items in every tab. Results show the item name, description, and type (drawable, effect, etc.), sorted by relevance.

When the input box is empty, all registered items are listed in a flat view.

### Easings

A list of easing functions used to interpolate between animation keyframes. Each tile shows a preview of the curve shape.

- The first tile in the list is **spline interpolation** (a Bezier-style icon with four control points),
- followed by the standard Linear / Quad / Cubic / Quart / Quint / Sine / Expo / Circ / Back / Elastic / Bounce easings, and **Hold**
- Drag a tile to assign it to a keyframe in the graph editor

### Library

Drawables, effects, and similar items are shown in a **tree**. Hovering over an item shows its description.

Representative categories:

- **Shapes, text, and media**: Ellipse, rectangle, rounded rectangle, geometry, text, video, image, backdrop, and more
- **Audio**: Sound, scene sound, sound group, and more
- **3D (experimental)**: 3D scene, cube, sphere, plane, model, and various lights
- **Particles, node-graph rendering, scene rendering, groups, decorators, time control**, and other objects used for compositing and control
- **Audio visualizers**: Audio waveform, spectrum, spectrogram
- **Transforms**: Translate, scale, rotate, 3D rotate, skew
- **Filter effects**: Blur, drop shadow, stroke, color correction, curves, LUT, blend, mosaic, displacement map, scripted effects (C# / SKSL / GLSL), and more
- **Audio effects**: Delay, equalizer, and more

For details on each item, see the [Library reference](../library/index.md).

### Node Graph

A category tree of nodes available for node-based rendering. Nodes are grouped by type, and you place them by dragging onto the node graph.

## Related documents

- [Adding elements](../../get-started/add-element.md)
- [Editing elements](../../get-started/edit-element.md)
- [Keyframes](../../get-started/keyframe.md)
- [Graph Editor](./graph-editor.md)
- [Library reference](../library/index.md) — Details for each object

## Source

- [`LibraryTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/LibraryTabExtension.cs)
- [`LibraryTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/ViewModels/LibraryTabViewModel.cs)
- [`LibraryTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryTabView.axaml.cs)
- [`SearchView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/SearchView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/SearchView.axaml.cs)
- [`EasingsView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/EasingsView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/EasingsView.axaml.cs)
- [`LibraryView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/LibraryView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/LibraryView.axaml.cs)
- [`NodesView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/NodesView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/LibraryTab/Views/LibraryViews/NodesView.axaml.cs)

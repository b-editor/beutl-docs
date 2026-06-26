---
title: "Element Property"
description: "Explains the role of the Element Property tab and how it is typically used."
sidebar_position: 4
---

# Element Property

This tab stacks the **drawables, sounds, and other engine objects** contained in the element selected on the timeline (the unit corresponding to a `*.belm` file) and lets you edit them vertically.
The element's own name, color, start time, and other timeline-level attributes are managed from the timeline; this tab is where you build out the element's contents.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Element Property**.

When you click an element on the timeline to select it, that element's contents appear in this tab. Nothing is shown when no element is selected.

## Layout

The objects contained in the selected element are listed vertically as **expandable panels**.
Each panel consists of the following parts.

- **Reorder handle** (dots at the far left): Drag vertically to change the object's order
- **Visibility toggle**: Enable or disable the object
- **Name label**: The object's type name (hover to see a tooltip with its description)
- **Expand/collapse button**: Click to open or close the property area
- **Property area**: Shows a dedicated editor for each property when expanded

If the element contains many objects, scroll the tab vertically to browse them all.

## Working with objects

### Reordering

Drag the handle on the left edge of a panel up or down to rearrange objects within the same element. The order directly affects the order in which drawing and effects are applied.

### Toggling enabled / disabled

Use the eye icon in the header (the visibility toggle) to enable or disable the object. Disabled objects are excluded from drawing and processing.

### Expanding / collapsing

Click the button at the right end of the header to open or close the property area. The expand/collapse state is saved per element and restored the next time you open the same element.

### Right-click menu (on a panel header)

| Item | Action |
|------|--------|
| **Remove** | Removes this object from the element |
| **Save as Template** | Names the object and registers it in the library as a template |

## Adding objects

### Drag and drop from the library

Drop items (drawables, sounds, etc.) from the [Library](./library.md) onto this tab to add objects to the selected element. The drop position determines where the new object is inserted.

## Editing properties

Expanding an object reveals a per-property editor.

For animated properties, use the **vertical three-dot menu (⋮)** on the right side of the property to open the [Graph Editor](./graph-editor.md) or to inline-expand the animation onto the timeline.

### Scrubbing number values

Drag horizontally on a number field to scrub its value up or down. Hold **`Shift`** while scrubbing for coarse steps (10×) or **`Alt`** for fine steps (0.1×).

## Objects of unknown type

When the object's type cannot be resolved — for example because the providing extension is not installed — the view falls back to a placeholder. It shows the original type name along with a command bar for editing and saving the JSON directly, so you can still inspect and make minimal fixes on the spot.

## Related documents

- [Edit an element](../../get-started/edit-element.md)
- [Project structure](../../get-started/project-structure.md)
- [Library](./library.md)
- [Graph Editor](./graph-editor.md)

## Source

- [`ElementPropertyTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ElementPropertyTabExtension.cs)
- [`ElementPropertyTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ViewModels/ElementPropertyTabViewModel.cs)
- [`EngineObjectPropertyViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ViewModels/EngineObjectPropertyViewModel.cs)
- [`ElementPropertyTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/ElementPropertyTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/ElementPropertyTabView.axaml.cs)
- [`EngineObjectPropertyView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/EngineObjectPropertyView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/EngineObjectPropertyView.axaml.cs)
- [`FallbackObjectView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/Views/FallbackObjectView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/Views/FallbackObjectView.axaml.cs)

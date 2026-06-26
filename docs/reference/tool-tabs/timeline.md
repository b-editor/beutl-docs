---
title: "Timeline"
description: "Explains the role of the Timeline tab and its main operations."
sidebar_position: 1
---

# Timeline

A tab for **arranging and editing the elements in a scene along the time axis**.
You can add, move, split, and group elements layer by layer, control the playback position, and manage the frame cache and markers.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Timeline**.

## Layout

- **Timeline scale (top)**: The time-axis ruler. Shows the playback position, scene start/end bars, markers, and the frame cache.
- **Layer headers (left)**: Toggle each layer's visibility, color, and name.
- **Timeline panel (center)**: The work area where elements are laid out across time and layers.

You can drag the splitters between the columns to change their widths.

## Working with elements

### Placing, moving, and resizing

- Drag an element's body to move it across layers or along the time axis.
- Hover near the left or right edge of an element to resize it (drag the edge to change the start time or duration).
- Hold **`Alt`** while dragging an element's body to drop a **duplicate** at the new position; the original stays in place. (When you drag an element's edge to resize it, holding **`Alt`** disables snapping instead.)
- If an element is so small that only the resize handles are visible, hold **`Ctrl`** while dragging to move it without resizing.
- While dragging, the edges snap to other elements, the scene start/end, the playhead, and the timeline origin. Toggle snapping from the empty-area right-click menu (**Snap**).

### Selection

- Click an element to select it; `Ctrl` (or `Cmd` on macOS) + click to add to or remove from the selection.
- `Ctrl` (`Cmd`) + drag on an empty area to select with a rectangular marquee.

### Keyboard shortcuts

| Action | Windows / Linux | macOS |
|------|------|------|
| Copy | `Ctrl + C` | `Cmd + C` |
| Cut | `Ctrl + X` | `Cmd + X` |
| Paste | `Ctrl + V` | `Cmd + V` |
| Duplicate selected elements | `Ctrl + D` | `Cmd + D` |
| Exclude (remove from timeline) | `Delete` | `Back` |
| Delete (also delete the element file from disk) | `Ctrl + Delete` | `Cmd + Back` |
| Split by current frame | `Ctrl + K` | `Cmd + K` |
| Toggle group / ungroup | `Ctrl + G` | `Cmd + G` |
| Rename element | `F2` | `Enter` |
| Snap scene start time to current frame | `[` | `[` |
| Snap scene end time to current frame | `]` | `]` |
| Switch to Razor Tool | `C` | `C` |
| Exit Razor Tool | `V` or `Esc` | `V` or `Esc` |
| Add / remove marker | `M` | `M` |
| Nudge element 1 frame left / right | `,` / `.` | `,` / `.` |
| Nudge element 10 frames left / right | `Shift + ,` / `Shift + .` | `Shift + ,` / `Shift + .` |
| Nudge element 1 second left / right | `Alt + ,` / `Alt + .` | `Alt + ,` / `Alt + .` |

You can also rename an element by double-clicking it.

### Playback and playhead navigation

| Action | Windows / Linux | macOS |
|------|------|------|
| Play / pause | `Space` | `Space` |
| Step one frame back / forward | `←` / `→` | `←` / `→` |
| Jump to start / end | `Home` / `End` | `Cmd + ←` / `Cmd + →` |
| Shuttle backward / stop / forward | `J` / `K` / `L` | `J` / `K` / `L` |
| Shuttle backward / forward (fine) | `Shift + J` / `Shift + L` | `Shift + J` / `Shift + L` |
| Toggle loop playback | `/` | `/` |
| Previous / next marker | `Ctrl + ←` / `Ctrl + →` | `Alt + ←` / `Alt + →` |
| Previous / next keyframe (selected element) | `Ctrl + Shift + ←` / `Ctrl + Shift + →` | `Cmd + Shift + ←` / `Cmd + Shift + →` |

Press **`J`** / **`L`** to shuttle backward / forward — press again to go faster — and **`K`** to stop; add **`Shift`** for finer speed steps. Toggle looped playback with **`/`**.

Press **`G`** to open the **Goto timecode** dialog and jump the playhead to an exact position. It accepts a timecode (`hh:mm:ss.fff` or `mm:ss.fff`), an absolute frame (`#120` or `120f`), a relative offset (`+5s`, `-10f`, `+2m`), or a marker-name prefix (`@intro`).

### Command palette

Press **`Ctrl + Shift + P`** (`Cmd + Shift + P` on macOS) to open a searchable command palette that lists the available editor and tool-tab commands, so you can find and run an action — and see its shortcut — without hunting through the menus.

### Element right-click menu

- Toggle **Enable element**
- Toggle **Razor Tool**
- **Split** / **Split by current frame**
- **Cut** / **Copy** / **Delete** / **Exclude**
- **Group selected elements** / **Ungroup selected elements**
- **Rename**
- **Change to original length** (restore media elements and the like to their original duration)
- **Change color**
- Toggle **Disable Thumbnails**
- **Save as Template**
- **Animation** submenu: **Finish editing** / **Bring to the top**

## Working in the timeline panel

### Mouse wheel

- Wheel scrolls along the time axis.
- `Ctrl` (`Cmd`) + wheel zooms in and out.
- `Shift` + wheel scrolls vertically.

### Right-click menu on empty area

- Toggle **Razor Tool**
- **Add Element** / **Add from Template** (pick from items registered in the library)
- **Add Adjustment Layer** (adds a [Backdrop](../library/drawables/sources/backdrop.md)-based element; filter effects you add to it apply to the layers below it)
- **Paste** (elements, files, or images on the clipboard)
- **Set start time** / **Set end time** (snap to the click position)
- Toggle **Automatically adjusts scene duration**
- Toggle **Snap**
- **Settings** (open the Scene settings tab)
- **BPM Grid** (configure BPM, beat, and offset)
- **Zoom**: 20% / 50% / 70% / 100% / 120% / 150% / 170% / 200%

### Drag and drop

- Drop an item from the Library (drawables, templates, etc.) to add an element.
- Drop a file (image, video, audio, or template JSON) to add an element.

## Inline animation editing

This feature shows a property-specific lane directly under an element so you can edit keyframe animations on the timeline without opening the Graph Editor tab.

### Opening and closing

- Click the **vertical three-dot menu (⋮)** to the right of a property and choose **Edit animation in inline view** to add an inline lane below that element.
- The same property's animation cannot be opened inline twice at once.
- Close it with the **× button** in the inline lane's header (the property's animation itself remains).
- The element's right-click menu → **Animation → Finish editing** closes all of that element's inlines at once.

### Inline lane layout

- **Header (layer-header side)**
  - Reorder handle (drag vertically to change the order of inlines within the same element)
  - **× (close)** button
  - **Open** button: open the same animation in the Graph Editor tab
  - Property name text box (read-only)
- **Timeline side**
  - A border showing the element's frame
  - The **easing curve** between adjacent keyframes (drawn upward or downward depending on whether the next value is higher, lower, or the same)
  - A **diamond icon** for each keyframe

### Working with keyframes

- **Left-drag** to change a keyframe's time.
  - On release, the time is snapped (rounded) to the scene's frame rate.
  - The post-drop value is recorded in the undo/redo history.
- **`Shift` + drag** moves the other keyframes in the same inline along with the dragged one (preserving their relative offsets).
- Keyframe right-click menu:
  - **Copy** — copies just that keyframe to the clipboard as JSON.
  - **Paste** — pastes at that keyframe's position (if the type doesn't match, only the easing is applied).
  - **Delete** — deletes that keyframe.

### Inline lane right-click menu

Right-clicking an empty area of the lane (not on a keyframe) shows the following:

- **Copy All** — copy this property's entire animation as JSON.
- **Paste** — paste a keyframe or animation at the mouse position.
  - If the clipboard holds a keyframe: insert the keyframe at the mouse position. If a keyframe already exists at the same time, its value and easing are overwritten.
  - If the clipboard holds an entire animation: replace the existing animation in its entirety.
  - If the pasted keyframe's property type doesn't match, only the easing is applied.
- **Delete** — delete this property's animation in its entirety (the property reverts to a static value).

### Drag-and-dropping easings

Dropping a Library easing item onto an inline lane behaves differently depending on the drop position:

- If there is an existing keyframe near the drop position, it **changes that keyframe's easing**.
- If there is no nearby keyframe, it **inserts a new keyframe** at the drop position and applies the specified easing to that transition.

### Reordering and display order

- When multiple inlines are open on the same layer, drag the reorder handle on the header vertically to change the order.
- The element's right-click menu → **Animation → Bring to the top** moves all of that element's inlines to the top of the layer at once.

### Global clock and element clock

When an animation's **Use the Global Clock** is enabled, moving the element does not change where keyframes appear — they are always drawn at the same time position regardless of the element's start time.

## Timeline scale (top ruler)

- Drag the red scene start/end bars to change the scene's start time and duration.
- Click a marker on the upper part of the scale to edit it; drag to move it.
- Right-click the frame-cache display along the bottom edge for **Delete All / Delete / Lock / Unlock**.

## Layer headers

- Drag the handle at the left edge up or down to change the layer's height.
- Toggle visibility with the eye icon.
- Change the layer color with the color picker.
- Change the layer name in the text box.

## Auto-scroll during playback

Depending on the **Settings > Editor > Timeline auto-scroll during playback** setting, the timeline scrolls automatically to follow the playback position during playback.

## Related documents

- [Add Elements](../../get-started/add-element.md)
- [Edit Elements](../../get-started/edit-element.md)
- [Keyframes](../../get-started/keyframe.md)
- [Scene settings](./scene-settings.md)
- [Graph Editor](./graph-editor.md)

## Source

- [`TimelineTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/TimelineTabExtension.cs)
- [`TimelineTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/TimelineTabViewModel.cs)
- [`TimelineTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/TimelineTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/TimelineTabView.axaml.cs)
- [`ElementView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml.cs)
- [`InlineAnimationLayerViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/InlineAnimationLayerViewModel.cs)
- [`InlineKeyFrameViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/InlineKeyFrameViewModel.cs)
- [`InlineAnimationLayer.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayer.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayer.axaml.cs)
- [`InlineAnimationLayerHeader.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayerHeader.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayerHeader.axaml.cs)
- [`InlineEasingGraphControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineEasingGraphControl.cs)
- [`PropertyEditorMenu.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PropertyEditorMenu.axaml.cs) (entry point for the inline view)

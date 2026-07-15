---
title: "Timeline"
description: "Explains the role of the Timeline tab and its main operations."
sidebar_position: 1
---

# Timeline

Use this tab to **arrange and edit the elements in a scene along the time axis**.
You can add, move, split, and group elements on each layer. The tab also lets you control the playback position and manage the frame cache and markers.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Timeline**.

## Layout

- **Timeline scale (top)**: The time-axis ruler. Shows the playback position, scene start/end bars, markers, and the frame cache.
- **Layer headers (left)**: Toggle each layer's lock / video mute / audio mute / solo state, and change its color and name.
- **Timeline panel (center)**: The work area where elements are laid out across time and layers.

You can drag the splitters between the columns to change their widths.

## Working with elements

### Placing, moving, and resizing

- Drag an element's body to move it across layers or along the time axis.
- Hover near the left or right edge of an element to resize it (drag the edge to change the start time or duration).
- Hold **`Alt`** while dragging to temporarily disable snapping.
- If an element is so small that only the resize handles are visible, hold **`Ctrl`** while dragging to move it without resizing.

### Selection

- Click an element to select it; `Ctrl` (or `Cmd` on macOS) + click to add to or remove from the selection.
- `Ctrl` (`Cmd`) + drag on an empty area to select with a rectangular marquee.

### Keyboard shortcuts

| Action | Windows / Linux | macOS |
|------|------|------|
| Copy | `Ctrl + C` | `Cmd + C` |
| Cut | `Ctrl + X` | `Cmd + X` |
| Paste | `Ctrl + V` | `Cmd + V` |
| Exclude (remove from timeline) | `Delete` | `Back` |
| Delete (also delete the element file from disk) | `Ctrl + Delete` | `Cmd + Back` |
| Split by current frame | `Ctrl + K` | `Cmd + K` |
| Toggle group / ungroup | `Ctrl + G` | `Cmd + G` |
| Rename element | `F2` | `Enter` |
| Snap scene start time to current frame | `[` | `[` |
| Snap scene end time to current frame | `]` | `]` |
| Switch to Razor Tool | `C` | `C` |
| Switch to Slip Tool | `S` | `S` |
| Switch to Roll Tool | `R` | `R` |
| Switch to Slide Tool | `D` | `D` |
| Exit the current tool mode | `V` or `Esc` | `V` or `Esc` |
| Toggle Ripple Edit | `B` | `B` |
| Close gap after the selected element | `;` | `;` |
| Close all gaps | `Shift + Alt + ;` | `Shift + Alt + ;` |
| Go to next gap | `Shift + ;` | `Shift + ;` |
| Go to previous gap | `Alt + ;` | `Alt + ;` |
| Add / remove marker | `M` | `M` |

You can also rename an element by double-clicking it.

### Element right-click menu

- Toggle **Enable element**
- Toggle **Lock** (a locked element cannot be moved, trimmed, split, or deleted)
- Toggle **Razor Tool**
- Toggle **Ripple Edit**
- **Split** / **Split by current frame**
- **Cut** / **Copy** / **Delete** / **Exclude**
- **Group selected elements** / **Ungroup selected elements**
- **Rename**
- **Change to original length** (restore media elements and the like to their original duration)
- **Change color**
- Toggle **Disable Thumbnails**
- **Save as Template**
- **Animation** submenu: **Finish editing** / **Bring to the top**

## Editing modes

Choose a tool mode from the **Editing Mode** submenu in the empty-area right-click menu, or use one of the keyboard shortcuts above. Only one tool mode can be active at a time. The timeline shows a colored border and the mode's name while it is active; press `V` or `Esc` to return to the normal selection tool.

- **Razor Tool** (`C`): Click an element to split it at that position.
- **Slip Tool** (`S`): Drag a clip to shift its source-media window (in/out points) without moving the clip on the timeline.
- **Roll Tool** (`R`): Drag a clip edge to move the boundary with its neighbor while preserving the total length.
- **Slide Tool** (`D`): Drag a clip to move it while the neighboring clips compensate, preserving the total length.

### Ripple Edit

**Ripple Edit** (`B`) is an on/off setting, not a tool mode. It stays enabled until you turn it off, and Beutl remembers its state between sessions. When enabled, the following operations shift later clips on the same layer to close (or open) the resulting space:

- **Delete** / **Exclude** / **Cut**
- Trimming an element's edge

Locked layers stay in place. A locked clip acts as an anchor, so the ripple does not propagate past it.

## Closing and navigating gaps

Empty spaces between clips on the same layer are treated as **gaps**. Use the **Gaps** submenu in the empty-area right-click menu or the keyboard shortcuts below:

- **Close Gap**: closes one gap. The menu command uses the gap at the right-click position; the shortcut (`;`) uses the gap after the selected element.
- **Close All Gaps** (`Shift + Alt + ;`): closes every gap on every layer. Locked layers are skipped.
- **Go to Next Gap** (`Shift + ;`) / **Go to Previous Gap** (`Alt + ;`): moves the playback position to the next or previous gap from the current frame.

## Locking, muting, and soloing

### Locking elements

Use **Lock** in an element's right-click menu to lock or unlock it. A locked element appears semi-transparent with a lock icon and cannot be moved, trimmed, split, renamed, or deleted. It also acts as an anchor for ripple and gap operations.

### Layer toggles

Each layer header includes four toggle buttons:

- **Lock**: locks every clip on the layer. Locked layers are also excluded from ripple and gap operations.
- **Video** (video mute): the layer is skipped when compositing video; its audio still plays.
- **Audio** (audio mute): the layer is skipped when compositing audio; its video is still shown.
- **Solo**: when at least one layer is soloed, layers that are not soloed are neither shown nor heard. You can solo multiple layers at the same time.

## Working in the timeline panel

### Mouse wheel

- Wheel scrolls along the time axis.
- `Ctrl` (`Cmd`) + wheel zooms in and out.
- `Shift` + wheel scrolls vertically.

### Right-click menu on empty area

- **Editing Mode** submenu: toggle **Razor Tool** / **Slip Tool** / **Roll Tool** / **Slide Tool** / **Ripple Edit**
- **Add Element** / **Add from Template** (pick from items registered in the library)
- **Paste** (elements, files, or images on the clipboard)
- **Set start time** / **Set end time** (snap to the click position)
- **Gaps** submenu: **Close Gap** (the gap at the click position) / **Close All Gaps** / **Go to Next Gap** / **Go to Previous Gap**
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
- Toggle **Lock** / **Video** (video mute) / **Audio** (audio mute) / **Solo** with the four buttons (see [Locking, muting, and soloing](#locking-muting-and-soloing)).
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
- [`LayerHeader.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/LayerHeader.axaml) / [`LayerHeaderViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/LayerHeaderViewModel.cs) (layer lock / mute / solo)
- [`RippleHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/RippleHelper.cs) (ripple edit)
- [`ElementGapService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementGapService.cs) (gap operations)
- [`ElementSlipService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementSlipService.cs) / [`ElementResizeService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementResizeService.cs) (slip / roll / slide trims)

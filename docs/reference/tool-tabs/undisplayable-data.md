---
title: "Undisplayable data"
description: "Find and locate the data this build of Beutl keeps but cannot show, such as objects from extensions that are not installed."
sidebar_position: 26
---

# Undisplayable data

Use this tab to find the data in a project that this build of Beutl keeps but cannot show or use: objects whose type comes from an extension that is not installed or from a newer version of Beutl, data that could not be loaded, Beutl 1.x content that was not migrated, and values that this build does not know. Each row says what kind of data it is and where it is, and **Locate** takes you there.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

- From the menu bar via **Scene → Undisplayable data** or **View → Tools → Undisplayable data**. The command palette also lists **Undisplayable data**.
- Choose **Show details** in a notice that Beutl shows when a project or scene opens with such data: **Some data is kept but not shown**, **Node trees from Beutl 1.x were not migrated**, or **Some elements could not be fully loaded**. Beutl switches to a scene that holds such data, starting with the current one, and opens the tab there.

## What it lists

The list covers the whole project. Turn on the switch under the title, which reads **Whole project**, to list only the **Current scene**. The number beside the title counts the rows. The list follows your edits, undo, and redo, and **Refresh** scans again.

Each row shows a label for the kind of data and where the data is: the scene, then the element with its layer and time range, or the layer or marker, then the object and property inside it. **Recovery protected** under a row means that its element is read-only until that content is repaired, replaced, or removed; see [Recovering damaged elements](../../get-started/edit-element.md#recovering-damaged-elements).

| Label | What it means |
|-------|---------------|
| **Missing type** | An object whose type this build does not have, usually because the extension that provides it is not installed or a newer version of Beutl saved it |
| **Load failed** | An object whose saved data could not be read |
| **Unreadable clip file** | An element whose file could not be read |
| **Beutl 1.x node tree** / **Beutl 1.x operator** | Content made in Beutl 1.x that was not migrated, so it is not drawn |
| **Unknown members** | Values saved on an object that this build does not read, such as settings from a newer version |
| **Unknown animations** / **Unknown expressions** | Animations or expressions of properties that this build does not have |
| **Substituted easing** | A keyframe whose easing could not be loaded. It plays with linear easing, and saving writes the original easing back unless you change it |
| **Dropped value** | A value that could not be kept when its element was loaded |

Expand **Details** on a row to see the **Serialized type ($type)**, the **Unknown keys**, the **Error**, the **File** that the data was read from, and the **Original JSON**, or the **Original file contents** of a file that could not be read. **Copy** puts that text on the clipboard.

## Locating an item

**Locate** shows where the item is. For an item in another scene, Beutl switches to that scene first.

- **In an element**: Beutl selects the element, moves the playhead into it unless the preview is playing, and scrolls the timeline to the element, which flashes. Then it opens the place inside the element: the [Transition](./transition.md) tab for a transition, the [Graph Editor](./graph-editor.md) on the animation for a keyframe, with the playhead on the keyframe, or the [Node Graph](./node-graph.md) tab centered on the node for an item in a node graph. For anything else, the [Element Property](./element-property.md) tab opens and the property's row flashes.
- **On a layer or a marker**: The timeline scrolls to the layer, or the playhead moves to the marker.
- **Elsewhere in the scene**: The [Scene settings](./scene-settings.md) tab opens.

Rows that belong to the project rather than to a scene have no **Locate** button.

On the timeline, an element that holds such data shows a document icon with an error mark, and its tooltip counts each kind; see [Element warnings](./timeline.md#element-warnings).

## Related documents

- [Timeline](./timeline.md)
- [Element Property](./element-property.md)
- [Editing Elements](../../get-started/edit-element.md)
- [Relink missing media](./missing-media.md)

## Source

- [`UndisplayableDataTabExtension.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/UndisplayableDataTabExtension.cs)
- [`UndisplayableDataViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/ViewModels/UndisplayableDataViewModel.cs)
- [`UndisplayableDataView.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/Views/UndisplayableDataView.axaml)
- [`UndisplayableDataScanner.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/UndisplayableDataScanner.cs)
- [`EditViewModel.UndisplayableData.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/EditViewModel.UndisplayableData.cs) / [`EditorService.UndisplayableData.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/EditorService.UndisplayableData.cs) (opening and **Locate**)
- [`KeptUnknownDataNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/KeptUnknownDataNotice.cs) / [`RecoveryProtectionNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/RecoveryProtectionNotice.cs) / [`UnmigratedNodeTreeNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/UnmigratedNodeTreeNotice.cs) (notices)
- [`MainViewModel.Menu.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/MainViewModel.Menu.cs)
- [`UndisplayableDataStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/UndisplayableDataStrings.resx)

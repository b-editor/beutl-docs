---
title: "Dock layout"
description: "Save the current tab arrangement under a name and re-apply it to any scene."
sidebar_position: 18
---

# Dock layout

A tab that saves the **current arrangement of tool tabs** under a name so you can re-apply it later. Saved layouts are stored per user, not per scene, so a layout you save while editing one scene can be applied to any other scene in any project.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Manage dock layouts**, or via **View → Tools → Dock layout**.

## Layout

- **Save the current layout (`+` button, top)**: Opens a name field prefilled with a suggested name and saves the current arrangement under it. Saving with the name of an existing layout overwrites it.
- **Reset dock layout (top)**: Restores the tab arrangement of the current scene to its initial state, the same as **View → Reset dock layout**.
- **Layout list**: One row per saved layout. Hover a row (or select it) to reveal the **Apply**, **Rename**, and **Remove** buttons.

## Apply a layout

Click the row's **Apply dock layout** button, or double-click the row. Saved layouts also appear under **View → Apply dock layout**, so you can switch without opening this tab; that menu entry is hidden while no layouts have been saved.

Applying a layout replaces the tabs of the current editor: the tabs that were open are closed and the ones the layout names are opened fresh.

:::note
Only the arrangement is stored — which tabs are open, where they are docked, and how the panes are split. Per-tab state such as the selected element or a search box's contents belongs to the scene it was captured from and is not saved with the layout.
:::

## Storage

Saved layouts are written to `dock-layout-presets.json` in the Beutl home directory (`~/.beutl` by default), so they are shared by every project on the machine.

## Default layout

A new scene starts from one of two default arrangements, chosen from the scene's frame size: a landscape layout, or a portrait-specific one when the frame is taller than it is wide.

## Source

- [`DockLayoutTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/DockLayoutTabExtension.cs)
- [`DockLayoutViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/DockLayoutViewModel.cs)
- [`DockLayoutPresetService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/DockLayoutPresetService.cs)
- [`DockLayoutView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/DockLayoutView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/DockLayoutView.axaml.cs)

---
title: "History"
description: "Browse the edit history and jump back to any earlier step."
sidebar_position: 15
---

# History

A tab that lists the **edit history of the current scene** and lets you jump back to any earlier step. It is the visual counterpart to undo/redo: instead of pressing undo repeatedly, you can click the exact step you want to return to.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → History**.

## Layout

- **Undo / Redo buttons (top)**: Step one entry back or forward, the same as `Ctrl + Z` / `Ctrl + Y`.
- **Current index (top)**: Shows the position of the current state in the history as `#N`.
- **Entry list**: Each entry shows a label describing the operation and the time it was recorded (`HH:mm:ss`).

The entry for the current state is highlighted, and the steps after it — the ones you can redo into — are shown as upcoming entries.

## Jump to a step

Click any entry to **jump directly to that point** in the history. Jumping backward is equivalent to undoing every operation up to that entry; jumping forward redoes them. If you make a new edit after jumping back, the steps that were ahead are discarded, just like normal undo/redo.

## Source

- [`HistoryTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/HistoryTabExtension.cs)
- [`HistoryViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/HistoryViewModel.cs)
- [`HistoryView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/HistoryView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/HistoryView.axaml.cs)

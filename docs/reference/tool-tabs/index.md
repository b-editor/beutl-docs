---
title: "Tool Tabs"
description: "Overview of the tool tabs available in the Beutl editor."
sidebar_position: 2
---

# Tool Tabs

Tool tabs are workspaces that dock around the scene editor.
They are split into purpose-specific tabs such as Timeline, Library, and Properties,
and you can drag them to rearrange, stack, or tile them as needed.

## Opening and resetting tabs

- Currently closed tabs can be reopened from the menu bar via **View → Tools**.
- Drag a tab's header to move it to a different dock area.
- Choose **View → Reset Dock Layout** to restore the tab arrangement to its initial state.

The **Scene settings** and **Graph Editor** tabs do not appear in the **View → Tools** menu.
How to open each is described on its respective page.

## Tab list

| Tab | Overview |
|-----|----------|
| [Timeline](./timeline.md) | Arrange, split, and group elements on the time axis |
| [Library](./library.md) | Drag drawables and effects into the scene |
| [File Browser](./file-browser.md) | Browse files in the project folder or any folder |
| [Element Property](./element-property.md) | Edit the element itself (start time, duration, color, etc.) |
| [Output](./output.md) | Manage encoding settings and output profiles |
| [Scene settings](./scene-settings.md) | Configure scene size, start time, length, and layer count |
| [Graph Editor](./graph-editor.md) | Edit time curves of animations |
| [Node Graph](./node-graph.md) | Show the structure of the node graph as a tree (labeled "GraphNode Tree" in the menu) |
| [Scopes](./color-scopes.md) | Waveform / Histogram / Vectorscope / False Color / Zebra displays for video |
| [Color Grading](./color-grading.md) | Perform color correction and color grading |
| [Curves](./curves.md) | Adjust tones with tone curves |
| [Audio Visualizer](./audio-visualizer.md) | Waveform / Spectrum / Meter / Spectrogram / Phase Scope displays for audio |
| [Path editor](./path-editor.md) | Edit control points of path shapes |
| [Preview Settings](./preview-settings.md) | Preview render quality, onion skin, and the render caches |
| [History](./history.md) | Browse the edit history and jump back to any step |

The source of truth for this document is `src/Beutl/Services/StartupTasks/LoadPrimitiveExtensionTask.cs` and the `*TabExtension.cs` files under `src/Beutl.Editor.Components/` in the [Beutl repository](https://github.com/b-editor/beutl).

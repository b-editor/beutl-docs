---
title: "Reference"
description: "API and library reference for Beutl 2.x."
sidebar_position: 4
---

# Reference

Reference documentation for Beutl.

- [Library](./library/index.md) — every object registered in the editor's Library panel
- [Tool Tabs](./tool-tabs/index.md) — list of tool tabs available in the editor

## Application status

Open **Status** beside **Feedback** in the title bar to inspect rendering capabilities, memory and frame-cache usage, background tasks, Live MCP status and endpoint, and your Beutl account. Choose **Open AI jobs** to open the job center. While nothing runs in the background, the button shows a pulse icon. While a task runs, the icon shows an animation of its own:

- **Startup**: a light runs along the pulse icon.
- **Export**: a grid of dots fills one by one, then fades out and starts over.
- **AI job**: a band of light crosses the same grid of dots from corner to corner.
- **[App update](../get-started/install.md#updating-beutl)**: a ring fills around a download arrow as the download progresses, or spins while its size is unknown, and the arrow turns into a spinning gear while the update installs.

When several tasks run at once, they take turns of 2.4 seconds each. The update's ring shows its progress on its turn even while other tasks run, and the popup and the tooltip show the percentage and the sizes.

## Source

- [`TitleBarStatusView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/TitleBarStatusView.axaml)
- [`TitleBarStatusViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/TitleBarStatusViewModel.cs)
- [`StatusStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/StatusStrings.resx)
- [`TitleBarActivityIndicator.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/Views/TitleBarActivityIndicator.cs) / [`TitleBarStatusViewModel.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/ViewModels/TitleBarStatusViewModel.cs)

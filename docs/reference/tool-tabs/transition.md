---
title: "Transition"
description: "Edit transitions at element boundaries."
sidebar_position: 23
---

# Transition

Use this tab to choose the type, duration, easing, and other properties of an element's start or end transition.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

Right-click a timeline element and choose **Transition → Start Transition** or **End Transition**. If that edge has no transition, Beutl adds a cross dissolve before opening the tab. The tab is not listed in **View → Tools**.

You can also double-click an existing transition ramp on the timeline to edit it. Double-clicking a shared boundary between adjacent elements on the same layer adds a cross dissolve if none exists there.

## Editing a transition

- Use the type picker at the top to change the transition. Changing the type preserves its timing and easing.
- Edit **Duration**, **Easing**, and the selected type's other properties below it. When adding a transition between two adjacent elements, Beutl splits its initial duration equally across the boundary; each element's side has its own duration.
- Drag the transition ramp's handle on the timeline to change that side's duration.
- Use **Delete** beside the type picker to remove the transition from both sides of a shared boundary.
- Use **Pin Tab** in the tab header's right-click menu to keep this edge open while editing another transition.

The type picker shows the transitions as tiles. Each tile's moving thumbnail plays the transition between the elements on either side of this edge, or brings the one element in or out when the edge has no neighbor. See [Picking from tiles](./element-property.md#picking-from-tiles).

## Related documents

- [Timeline](./timeline.md)
- [Transition types](../library/transitions/index.md)
- [Tool Tabs](./index.md)

## Source

- [`TransitionTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/TransitionTabExtension.cs)
- [`TransitionTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/ViewModels/TransitionTabViewModel.cs)
- [`TransitionTabView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/Views/TransitionTabView.axaml)
- [`ElementView.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml.cs)
- [`ElementAttributeService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/ElementAttributeService.cs)
- [`TransitionTabView.axaml.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Editor.Components/TransitionTab/Views/TransitionTabView.axaml.cs) / [`LibraryThumbnailCapture.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Editor.Components/LibraryThumbnails/LibraryThumbnailCapture.cs)

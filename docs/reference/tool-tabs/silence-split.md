---
title: "Auto Split by Silence"
description: "Find the silent parts of an audio clip, then split or remove them."
sidebar_position: 25
---

# Auto Split by Silence

Use this tab to **find the silent parts of an audio element** and split the clip at them, delete them, or delete them and close the gaps. It is useful for trimming pauses out of narration.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Right-click an element on the [Timeline](./timeline.md) and choose **Auto Split by Silence**. The command is available for an unlocked element with a [Sound](../library/sounds/sound.md), a [Scene Reference (Audio)](../library/references/scene-reference-audio.md), or a [Sound Group](../library/containers/sound-group.md) with audio. The tab is not listed in **View → Tools** or the empty-tab picker. Choosing the command on another element retargets the tab.

## Detecting silence

The tab analyzes the element's composed audio, including sound group processing and the referenced scene, and shows the waveform with the detected intervals. It reads both stereo channels, so opposite-phase audio and brief peaks are not mistaken for silence. If a source cannot be read, analysis stops rather than treating that part as silence.

| Setting | Default | Meaning |
|---------|---------|---------|
| **Threshold (dB)** | `-40` | Audio at or below this peak level counts as silence. Must be from `-120` to `0`. |
| **Minimum silence (ms)** | `300` | Shorter silences are ignored. Must be positive. |
| **Padding per side (ms)** | `100` | Audio kept beside each interval, so speech is not cut off. Must not be negative. Not kept at the clip's own start and end. |

The status line shows the number of intervals and their total length. Changing a setting updates the intervals right away without analyzing the audio again.

To inspect the waveform, zoom around the pointer with `Ctrl` (`Cmd` on macOS) + wheel, or use the zoom buttons. Navigation only changes the view; applying always uses the plan for the whole clip.

## Applying

Choose an **Apply mode**, then press **Apply to entire clip**:

- **Split only**: cuts the clip at each interval and keeps the silent pieces.
- **Delete silence**: also removes the silent pieces.
- **Delete silence and ripple**: also moves the remaining pieces left to close the space.

**Include grouped elements**, shown for a clip in a group, applies the same cuts and deletions to the rest of the group. With ripple, the group's layers close the same intervals, so they stay in sync. A locked clip in the group stops the operation until you unlock it or turn the option off.

Applying pauses playback, uses frame-aligned cuts, keeps each piece's source position, and is one undo step. If the scene changes after the analysis, press **Refresh** to analyze again before applying.

## Related documents

- [Timeline](./timeline.md)
- [Editing Elements](../../get-started/edit-element.md)

## Source

- [`SilenceSplitTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/SilenceSplitTabExtension.cs)
- [`SilenceSplitTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/ViewModels/SilenceSplitTabViewModel.cs)
- [`SilenceSplitTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/Views/SilenceSplitTabView.axaml)
- [`SilenceSplitViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/TimelineTab/ViewModels/SilenceSplitViewModel.cs)
- [`SilenceDetector.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SilenceDetector.cs)
- [`SilenceSplitService.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SilenceSplitService.cs)

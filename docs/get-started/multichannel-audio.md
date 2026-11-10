---
title: Multichannel Audio
description: Mix in mono, stereo, 5.1, or 7.1, place sounds with the panner, assign source channels, and export surround audio.
sidebar_position: 11
---

Every project mixes in one speaker layout. Stereo is the default, and a stereo project with the panner at its defaults sounds exactly as it did before multichannel audio was added.

## Choose the speaker layout

| Layout | Channels | Channel order |
|--------|----------|---------------|
| Mono | 1 | C |
| Stereo | 2 | L, R |
| 5.1 surround | 6 | L, R, C, LFE, Ls, Rs |
| 7.1 surround | 8 | L, R, C, LFE, Lrs, Rrs, Ls, Rs |

Choose the layout with **Audio channels** when you [create a project](./create-project.md). To change it later, open [Scene settings](../reference/tool-tabs/scene-settings.md), choose **Project audio channels**, and press **Apply**. The change is one undoable edit, pauses playback, and is written to the project file immediately because the layout belongs to the project, not to the scene.

## Place a sound with the panner

Each sound has a **Panner** section below its audio effects in the [Element Property](../reference/tool-tabs/element-property.md) tab. Expand it to see a speaker diagram for the project's layout and a puck.

- Drag the puck to change **Pan** and **Front / back** together in one undo step. Double-click the diagram to reset both to 0.
- Use the number editors below the diagram for exact values, keyframes, and expressions. An expression on **Pan** or **Front / back** disables dragging. With keyframes, a drag edits the keyframe at or after the current time.

| Property | Range | Default | What it does |
|----------|-------|---------|--------------|
| **Pan** | `-100` to `100` | `0` | Balance between the left and right sides. Both sides stay at full level at `0`; `100` silences the left side. |
| **Front / back** | `0` to `100` | `0` | Moves a sound from the front speakers to the surrounds at equal power. In 7.1, `50` is the side speakers and `100` is the rear speakers. |
| **Center** | `0` to `100` | `0` | Moves part of the front image into the center speaker, less as **Pan** moves off-center. |
| **LFE** | `0` to `100` | `0` | Sends a 120 Hz low-pass of the sound to the LFE channel. |

What the panner can do depends on the project and the element:

| Project | Element | Available |
|---------|------|-----------|
| Mono | Any | Nothing. The panner has no effect, so its controls are disabled. |
| Stereo | Any | **Pan** |
| 5.1 or 7.1 | One or two channels | All four properties |
| 5.1 or 7.1 | Three or more channels, or a sound group or scene reference | **Pan** only. The element's channels keep their own speaker positions. |

[Audio effects](../reference/library/audio-effects/index.md) run after the panner, so in a surround project they process all of the project's channels. The master output holds every sample within full scale, so a large gain or a delay fed back at 100% cannot exceed 0 dBFS.

## Assign source channels

The built-in decoders read a source's own channels, and an element keeps them until the panner places it in the project's layout. [Sound](../reference/library/sounds/sound.md) elements also have a **Channel assignment** section, which is collapsed until you expand it. It takes any channels from a source, for example stereo from channels 3 and 4 of a four-channel camera file.

1. Choose a **Format**: **Auto**, **Mono**, **Stereo**, **5.1ch**, or **7.1ch**. **Auto** uses the source's own channels and is the default.
2. Beutl fills in a default assignment for that format. Mono takes channel 1. Stereo takes channels 1 and 2, or channel 1 on both sides of a one-channel source. 5.1 and 7.1 take the channel that matches each speaker.
3. Change a row to pick a different source channel for that element channel, or choose **None** for silence. Source channels read like `3 (Ls)`, or as plain numbers when the source has no speaker positions. Each selection is one undo step.

A missing or unreadable source only offers **Auto**. An assignment records the layout of the source it was made for. If the file is replaced by one with different channels, the element uses **Auto** until you assign it again, so a saved "channel 3" never reads a different channel silently.

## Play it back

Mono and stereo projects are always sent to the device as stereo. On Windows and Linux they stay on the front pair of a surround output.

How a 5.1 or 7.1 project plays depends on the platform:

- **Windows** (XAudio2) and **Linux** (the bundled OpenAL Soft): the project goes to the device as is when the device has all of its speakers, with each channel sent straight to its speaker. Otherwise Beutl folds it to the device's layout. On a stereo device you hear the same fold as a stereo export: the ITU-R BS.775 downmix, with center and surrounds at 0.7071 and the LFE dropped.
- **macOS**: the project plays through `AVSampleBufferAudioRenderer`, which hands the whole layout to macOS, so Spatial Audio can be selected on AirPods. If the renderer cannot start within two seconds, playback falls back to OpenAL Soft.

The [Audio Visualizer](../reference/tool-tabs/audio-visualizer.md#meter) tab's Meter view shows one bar per channel in surround projects, with BS.1770 multichannel loudness. Timeline waveforms, [audio visualizer drawables](../reference/library/drawables/audio-visualizers/index.md), and the [mobile preview](../reference/tool-tabs/mobile-preview.md) use a stereo fold.

## Export it

**Channels** in the [Output](../reference/tool-tabs/output.md#audio-channels) tab selects what an export writes: mono, stereo, 5.1 surround, or 7.1 surround. A new export starts with the project's layout, and a different choice is folded with the same downmix as playback. A 5.1 project can therefore be exported as stereo.

Some encoders and destinations limit the channel count:

| Encoder | Limit |
|---------|-------|
| FFmpeg | 7.1 AAC cannot be written to `.aac` (ADTS) or MPEG-TS. Use MP4, MOV, or MKV, or another codec such as PCM. |
| AVFoundation | AAC accepts 1, 2, or 6 channels. Use Linear PCM or the FFmpeg encoder for other counts. |
| Media Foundation | AAC accepts 1, 2, or 6 channels (6 on Windows 10 and later). PCM and float accept any count. |

An export that exceeds a limit stops with an error message instead of writing a file with misplaced channels.

## Related documents

- [Creating a Project](./create-project.md)
- [Scene settings](../reference/tool-tabs/scene-settings.md)
- [Output](../reference/tool-tabs/output.md)
- [Audio Visualizer](../reference/tool-tabs/audio-visualizer.md)
- [Common properties](../reference/library/common-properties.md#sound)

## Source

- [`SpeakerLayout.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Core/SpeakerLayout.cs)
- [`AudioChannelLayout.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelLayout.cs)
- [`AudioChannelMap.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelMap.cs)
- [`PannerNode.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/Graph/Nodes/PannerNode.cs)
- [`AudioPlaybackOutput.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioPlaybackOutput.cs)
- [`SoundPannerViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SoundPannerProperties/ViewModels/SoundPannerViewModel.cs)
- [`ChannelMapEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/ChannelMapProperties/ViewModels/ChannelMapEditorViewModel.cs)
- [`SceneSettingsService.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SceneSettingsService.cs)
- [`AVFEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.AVFoundation/Encoding/AVFEncodingController.cs)
- [`MFEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingController.cs)
- [`FFmpegEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.FFmpegWorker/Encoding/FFmpegEncodingController.cs)

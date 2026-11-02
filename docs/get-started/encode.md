---
title: Encoding
description: Explains how to export a project created in Beutl to a video file
sidebar_position: 7
---

:::note
Work in progress
:::

This page explains how to export a project created in Beutl to a video file.

1. Click __View > Tools > Output__.
2. The export settings tab will open.
3. Select the file to save.
4. Specify the encoder and change the detailed settings if necessary.
5. Click the encode button.

New encoder settings start with your project's frame rate, audio sample rate, and audio channels, so a 5.1 or 7.1 project [exports its surround channels](./multichannel-audio.md#export-it) by default. FFmpeg offers a searchable codec picker and codec-specific option editors, and Windows also provides Media Foundation encoding. See [Output](../reference/tool-tabs/output.md) for these options and presets.

## Source

- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`MFEncodingExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingExtension.cs)
- [`EncoderOptionsEditor.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.FFmpeg/PropertyEditors/EncoderOptionsEditor.cs)
- [`CodecPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.FFmpeg/PropertyEditors/CodecPickerViewModel.cs)
- [`AudioEncoderSettings.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Media/Encoding/AudioEncoderSettings.cs)

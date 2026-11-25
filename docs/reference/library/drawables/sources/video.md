---
title: "Video"
description: "Imports a video file as a drawable."
sidebar_position: 1
---

# Video

Imports a video file and exposes it as a drawable. Frames are sampled at the current scene time. Time offset, playback speed and loop are also configurable.

## Library location

Library → Video

## Properties

### Offset Position (OffsetPosition)

Time offset within the source video at which playback starts.

- **Type:** `MediaTime`
- **Default:** `00:00:00`
- **Animatable:** No

### Speed

Playback speed multiplier (100 = normal speed). When `Speed` has keyframes, the video moves at the speed that the curve gives at each moment, worked out exactly between keyframes, including eased ones: a linear ramp from `100` to `300` over one second plays two seconds of video. Editing the keyframes moves the position right away. With **Use the Global Clock**, the keyframes keep their scene times, and the position still counts from the element's start. **Change to original length** on the timeline measures the same way, so the element ends where the video ends.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Source

The video file to play. The ⋮ menu of the **Source** row also holds [**Transfer Curve**](#transfer-curve) and [**Deinterlace**](#deinterlacing), which set how this element reads the file.

- **Type:** `VideoSource?`
- **Default:** `null`
- **Animatable:** Yes

### Loop (IsLoop)

When `true`, the video restarts from the beginning of the source after it ends. `Offset Position` only sets where the first pass starts; every later pass plays the whole source.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

## Transfer curve {/* #transfer-curve */}

**Transfer Curve** in the ⋮ menu of the **Source** row chooses the curve that turns the code values of an SDR video into light. Use it when a video's color tags are missing or wrong.

| Option | Reads the video with |
|--------|----------------------|
| **Auto (Follow Tags)** *(default)* | The curve that its color tags name. BT.709, BT.601, and BT.2020 SDR video use the curve that QuickTime shows them with, and untagged video uses sRGB; see [Color tags](../../../tool-tabs/output.md#color-tags) |
| **QuickTime** | The BT.709 display curve that QuickTime uses |
| **BT.1886** | A BT.1886 reference display with gamma 2.4 |
| **sRGB** | The sRGB curve |
| **BT.709 (Scene)** | The inverse of the BT.709 camera curve, which recovers the light of the scene |

The setting changes SDR video only; HDR video (PQ or HLG) keeps its own curve. For a video with an embedded ICC profile, only the curve changes and the profile's color primaries stay, so **sRGB** looks the same as **Auto (Follow Tags)** when the profile already uses the sRGB curve. The setting also applies while the preview plays a proxy, and in exports. With several elements selected, a choice applies to all of them as one undo step.

## Deinterlacing {/* #deinterlacing */}

Interlaced video stores each frame as two fields captured at different moments, so moving parts show combing when both fields are drawn together. **Deinterlace** in the ⋮ menu of the **Source** row turns them into whole frames:

- **Off** *(default)*: Draws the frames as they are stored.
- **Auto**: Deinterlaces only the frames that the video marks as interlaced. It checks every frame, so footage that switches between progressive and interlaced plays correctly.
- **On**: Deinterlaces every frame.

While **Auto** or **On** is selected, three submenus set how:

- **Field Order**: **Auto** *(default)* follows the order that each frame records. **Top Field First (TFF)** and **Bottom Field First (BFF)** set the order for footage whose flags are wrong.
- **Method**: **BWDIF** *(default)* or **YADIF**.
- **Frame Rate**: **Frame (1×)** *(default)* makes one frame from each stored frame. **Field (2×)** makes one frame from each field, which doubles the frame rate for smoother motion; progressive frames then last two field intervals.

The first line of the **Deinterlace** submenu reports what Beutl finds in the file:

- With **Off**, the scan type at the start of the video: **Progressive**, **Top Field First (TFF)**, or **Bottom Field First (BFF)**.
- With **Auto**, **Checking each frame**.
- With **On**, the scan type with **Deinterlacing applied**, such as **Top Field First (TFF) · Deinterlacing applied**. **Mixed scan** means that the first frames differ.
- **Progressive · No deinterlacing needed** with **Auto** when the video is progressive and is read by a decoder that does not deinterlace.
- **Decoder does not support deinterlacing** when no available decoder can deinterlace the file.

Only the FFmpeg decoder deinterlaces. While deinterlacing is on, Beutl reads the video with it even when another decoder comes first in the [decoder priority](../../../../settings/extension.md). A [proxy](../../../tool-tabs/proxies.md) is generated with the element's deinterlacing settings, so an element with other settings needs a proxy of its own.

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Drag a video file onto the timeline to add it. Adjust `Offset Position` to start from a later point, change `Speed` for slow motion or fast forward, and enable `Loop` for looped backgrounds.

## Source

[`src/Beutl.Engine/Graphics/SourceVideo.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/SourceVideo.cs)

- [`SourceVideo.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/SourceVideo.cs) / [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/SpeedIntegrator.cs) (keyframed speed and **Change to original length**)
- [`PropertyEditorMenu.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PropertyEditorMenu.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PropertyEditorMenu.axaml.cs) (the **Source** menu)
- [`VideoTransferInterpretation.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/VideoTransferInterpretation.cs) / [`ImmediateCanvas.Drawing.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/ImmediateCanvas.Drawing.cs) (transfer curve)
- [`VideoDeinterlaceOptions.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/Decoding/VideoDeinterlaceOptions.cs) / [`DecoderRegistry.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/Decoding/DecoderRegistry.cs) / [`FFmpegReader.Deinterlace.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.FFmpegWorker/Decoding/FFmpegReader.Deinterlace.cs) (deinterlacing)

---
title: "Output"
description: "Describes the role of the Output tab and its main usage."
sidebar_position: 5
---

# Output

This tab handles the settings and presets used to **encode the scene as a video file**.
You add, select, and edit output profiles and start encoding from here.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Output**.

## Layout

A header for selecting the profile sits at the top of the tab, with the editing area for the currently selected profile stacked below it.

- **Profile selector button (left)**: Shows the name of the currently selected profile. Click it to open the profile picker.
- **Add button (+)**: Adds a new profile. If the scene has more than one matching output extension, a dialog is shown so you can choose which extension to use. If only one is available, a profile is added immediately.
- **More menu (...)**: Performs **Delete / Rename / Convert to preset** actions on the current profile.
- **Editing area**: Shows the contents of the selected profile (destination, encoder, video/audio settings, and so on). Nothing is shown when no profile is selected.

The first time you open the tab, if the scene has no existing profile and only one matching output extension is available, a profile named "Default" is created automatically.

## Profiles and presets

The Output tab manages encoding settings in two forms: **profiles** and **presets**.

- **Profile**: A set of settings saved per scene. It is stored in the Beutl folder created next to the scene and is restored the next time you open the same scene, including after you move or rename the project.
- **Preset**: A settings template shared across all of your work. It is stored in the application's home directory and can be applied to any scene.

A profile includes the destination path and the full encoder state, while a preset only carries **items that make sense to share** — the encoder type and the video/audio settings. Applying a preset does not overwrite values that belong to the current profile, such as the destination and the audio channels. Resolution, frame rate, and sample rate also stay as they are, except with the built-in platform presets, which apply the ones they are named after.

## Profile picker

Pressing the profile selector button opens a dialog for choosing a profile or preset.

### Layout

- **Search button**: Toggles the visibility of the search box.
- **Profiles tab**: Lists profiles saved in the current scene.
- **Presets tab**: Lists shared presets.
- **Search box**: Fuzzy search by name (space-separated terms are AND'd together).
- **Item list**: Hovering an item reveals a **pin button** and a **more menu (...)**.
- **Check / cross buttons**: Confirm or cancel the selection and close the dialog.
- **X button**: Closes the dialog without applying any change. Pressing the profile selector button again does the same.

### Behavior

- **Confirming on the Profiles tab**: The selected profile becomes the active profile.
- **Confirming on the Presets tab**: The selected preset's contents are applied to the **currently selected profile** (only when the extension type matches).
- If you close the dialog without confirming, the current profile and settings are kept as-is.

### Keyboard shortcuts

| Action | Behavior |
|------|------|
| `Tab` / `Shift + Tab` | Switch between the Profiles tab and the Presets tab |
| `Ctrl + F` (`Cmd + F`) | Show the search box and focus it |
| `↑` / `↓` | Move the selection in the list |
| `Enter` | Confirm the selection |
| `Esc` | Close the search box / close the flyout |

### Pinning

You can pin a list item using the **pin icon**. Pinned items are kept at the top of the list, and the pinned state persists across sessions (profiles and presets are tracked separately).

### Per-item more menu (...)

| Type | Menu Items |
|------|------|
| Profile | **Delete** / **Rename** / **Convert to preset** |
| Preset | **Delete** / **Rename** |

## Working with profiles

### Adding

Press the **+** button in the header. If the scene has more than one matching output extension, a dialog appears so you can pick the type (extension) of the new profile. If only one is available, the profile is added directly. A newly added profile is named "Default" or "Profile N".

### Deleting

Choose **Delete** from the **...** menu in the tab header, or from the **...** menu on the right side of an item in the profile picker.

### Renaming

Choosing **Rename** from the **...** menu opens an in-place flyout for editing the name.

### Converting to a preset

Choosing **Convert to preset** from the **...** menu registers the contents of the current profile as a new preset. The preset's name is the original profile name with "(Preset)" appended.

## Encoding settings

The editing area for the selected profile lists everything required for encoding.

### Destination to save to

Specifies the file path to write to. You can type directly into the text box or pick a file from the dialog opened by the button on the right end. The dialog offers extension filters for each available encoder.

### Encoder

Selects the encoder to use. The list only shows encoders that **match the destination's extension**. Changing the destination updates the list accordingly.
When you change only the destination while keeping the same encoder, the current video/audio settings are preserved as much as possible.

### Video / Audio

Each encoder provides its own editor for video and audio settings. Each property is edited with a dedicated editor matching its type.

- The video's **source resolution** is linked to the scene's frame size.
- A newly created encoder configuration starts with the project's frame rate, audio sample rate, and audio channels, and the scene's frame size.
- The audio sample rate determines the rate to which audio is mixed down at encode time.
- A preset keeps the source resolution and the audio channels. The built-in platform presets set the output size, frame rate, and sample rate they are named after; other presets keep those too.

### Audio channels {/* #audio-channels */}

**Channels** selects the speaker layout the export writes: **Mono**, **Stereo**, **5.1 surround**, or **7.1 surround**. A new export starts with the project's layout, and a layout that differs from the project's is folded with the same downmix as playback. See [Multichannel Audio](../../get-started/multichannel-audio.md#export-it) for the limits of each encoder.

Changing the channel count scales the audio bitrate with it, so 128 kbps at stereo becomes 384 kbps at 5.1 and 512 kbps at 7.1. An automatic bitrate stays automatic. Applying a preset keeps the current channel count and converts the preset's bitrate to it. A saved channel count outside this list appears as an extra item and exports as before.

### FFmpeg codec picker

The FFmpeg encoder's video and audio **Codec** fields open a searchable picker. Codecs are listed by their long names, with the short name (`libx264`) on a second line. A search matches either name and ignores case, full-width and half-width forms, and punctuation, so `h264` finds `H.264`. Pin the codecs you use often to keep them at the top; video and audio codecs are pinned separately.

The codec changes when you confirm the picker, not while an item is highlighted. Pressing the field again closes the picker without changing the codec. Media Foundation codecs stay in a drop-down list.

### FFmpeg encoding options

For FFmpeg encoders, **Encoding options** shows controls based on the selected codec's supported options. Available fields, choices, and ranges therefore vary by encoder. Use **Automatic** to clear an explicit option and return to the encoder's default.

Expand **Advanced options** to add or edit option names and values directly. This also remains available if Beutl cannot retrieve the codec's option descriptions.

New FFmpeg video settings and the built-in presets pair a bitrate with `crf`. H.264 and H.265 then encode at `crf`'s quality and do not use the bitrate, and a note under the options says so while both are set. Remove `crf` to export at the bitrate.

### Color tags

Color settings you leave unspecified get the same tags with every encoder. SDR video is tagged BT.709 with limited range. HDR video uses BT.2020. JPEG-family codecs use sRGB code values with the BT.601 matrix at full range, and RGB output is tagged sRGB. An SDR output that cannot record tags, such as AVI, WMV, or FLV, stays untagged. Settings you choose are kept.

### Media Foundation on Windows

**Media Foundation Encoding** uses Windows' built-in encoders. Choose a supported destination such as MP4, WMV, AVI, WAV, MP3, or FLAC. **Auto** chooses a codec for the destination extension; HEVC requires an available Windows HEVC encoder. Audio-only destinations do not output video, and AVI uses uncompressed RGB32 video.

**Use hardware acceleration** is enabled by default. The codecs available in practice depend on the Windows installation and hardware.

With FFmpeg too, an audio-only destination such as `.wav` or `.mp3` renders no frames, and a missing video file does not stop the export.

## Running an encode

### Starting

Press the **Encode** button at the top of the editing area to start encoding. The button is disabled until both the destination and the encoder are set.
When encoding starts, the render cache and frame cache are cleared up front to save memory.

You can continue editing while the encode runs. Export uses a snapshot of the scene and settings taken when you start it; subsequent edits apply to future exports, not the running one.

### Progress

The progress shows in the tab rather than in a dialog, so nothing covers the editor. When encoding starts, **Cancel** takes the place of **Encode**, and the following appear below it:

- **Status text** ("Encoding...", "Completed", "Canceled.", and so on)
- **Progress bar**
- **Elapsed time**
- **Remaining** time (estimated from the elapsed time and the progress)
- **Frames** (current / total)
- **Size** (current output size / estimated total size)

The figures stay in the tab after the run. When an encoder writes several files, such as an image sequence, **Size** counts all of them.

### Cancelling

You can stop the encode with the **Cancel** button, which takes the place of **Encode** while the encode runs. Beutl writes to a temporary file and publishes it only after encoding succeeds. Cancelling or failing an encode leaves an existing destination file intact and cleans up the temporary output.

### Completion notification

When encoding finishes successfully a notification is shown, and its **Open Folder** button opens the destination folder.

## Presets

Presets are saved to the home directory and shared across every scene.

### Built-in presets

#### Quality-based presets (H.264 / H.265)

- **High Quality** — Higher bitrate, lower CRF for a high-quality encode
- **Medium Quality** — A balance between quality and encode speed
- **Low Quality** — Lower bitrate, faster encode
- **HDR10 (PQ)** — 10-bit HDR using BT.2020 / SMPTE 2084 (PQ)
- **HLG** — 10-bit HDR using BT.2020 / ARIB STD-B67 (HLG)

#### Platform presets

- **YouTube 1080p 60fps**
- **YouTube 4K 60fps**
- **Twitter (X) 1080p (max 2:20)**
- **Instagram Reels 9:16 (max 90s)**
- **Instagram Feed 1:1**
- **TikTok 9:16**
- **Discord 8MB (~1 min)**

These are reasonable starting points. Adjust bitrate, length, and other parameters on the profile after applying a preset, based on each platform's actual specifications and your intended use.

## Related documents

- [Export as a video](../../get-started/encode.md)

## Source

- [`OutputTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/OutputTabExtension.cs)
- [`SceneOutputExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/PrimitiveImpls/SceneOutputExtension.cs)
- [`OutputTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/ViewModels/OutputTabViewModel.cs)
- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`OutputPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/ViewModels/OutputPickerViewModel.cs)
- [`OutputTabView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputTabView.axaml.cs)
- [`OutputView.axaml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Views/Tools/OutputView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Views/Tools/OutputView.axaml.cs)
- [`OutputPickerFlyout.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputPickerFlyout.cs)
- [`OutputPickerFlyoutPresenter.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Controls/PropertyEditors/OutputPickerFlyoutPresenter.cs)
- [`AddOutputProfileDialog.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/AddOutputProfileDialog.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/AddOutputProfileDialog.axaml.cs)
- [`OutputService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/OutputService.cs)
- [`OutputPresetService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/OutputPresetService.cs)
- [`MFEncodingExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingExtension.cs)
- [`EncoderOptionsEditor.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.FFmpeg/PropertyEditors/EncoderOptionsEditor.cs)
- [`StagedOutputFile.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/IO/StagedOutputFile.cs)
- [`AudioChannelsEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/OutputTab/AudioChannelsEditorViewModel.cs) / [`AudioEncoderSettings.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Media/Encoding/AudioEncoderSettings.cs)
- [`CodecEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.FFmpeg/PropertyEditors/CodecEditorViewModel.cs) / [`CodecPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.FFmpeg/PropertyEditors/CodecPickerViewModel.cs)
- [`VideoColorDefaults.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Media/VideoColorDefaults.cs)

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

- **Profile**: A set of settings saved per scene. It is stored in the Beutl folder created next to the scene and is restored the next time you open the same scene.
- **Preset**: A settings template shared across all of your work. It is stored in the application's home directory and can be applied to any scene.

A profile includes the destination path and the full encoder state, while a preset only carries **items that make sense to share** — the encoder type and the video/audio settings. Applying a preset does not overwrite values that belong to the current profile, such as the destination, resolution, frame rate, or sample rate.

## Profile picker

Pressing the profile selector button opens a dialog for choosing a profile or preset.

### Layout

- **Search button**: Toggles the visibility of the search box.
- **Profiles tab**: Lists profiles saved in the current scene.
- **Presets tab**: Lists shared presets.
- **Search box**: Fuzzy search by name (space-separated terms are AND'd together).
- **Item list**: Hovering an item reveals a **pin button** and a **more menu (...)**.
- **Check / cross buttons**: Confirm or cancel the selection and close the dialog.
- **X button**: Closes the dialog without applying any change.

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
- The audio sample rate determines the rate to which audio is mixed down at encode time.
- Even when a preset is applied, **scene-specific values** such as resolution, frame rate, and sample rate are kept.

## Running an encode

### Starting

Press the **Encode** button at the top of the editing area to start encoding. The button is disabled until both the destination and the encoder are set.
When encoding starts, the render cache and frame cache are cleared up front to save memory.

### Progress dialog

While encoding is in progress a dedicated dialog is shown, displaying:

- **Status text** ("Encoding...", "Completed", "Cancel", and so on)
- **Progress bar**
- **Elapsed time**
- **Remaining** time (estimated from the elapsed time and the progress)
- **Frames** (current / total)
- **Size** (current output size / estimated total size)

The tab's editing area also shows the elapsed time, remaining time, and frame progress while encoding is in progress.

### Cancelling

You can stop the encode with the **Cancel** button on the progress dialog. If a partially written file is left at the destination when you cancel, it is removed automatically.

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

- [`OutputTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/OutputTabExtension.cs)
- [`SceneOutputExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/SceneOutputExtension.cs)
- [`OutputTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/OutputTabViewModel.cs)
- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`OutputPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/OutputPickerViewModel.cs)
- [`OutputTab.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/OutputTab.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/OutputTab.axaml.cs)
- [`OutputView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/OutputView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/OutputView.axaml.cs)
- [`OutputPickerFlyout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/OutputPickerFlyout.cs)
- [`OutputPickerFlyoutPresenter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/OutputPickerFlyoutPresenter.cs)
- [`OutputProgressDialog.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Dialogs/OutputProgressDialog.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Dialogs/OutputProgressDialog.axaml.cs)
- [`AddOutputProfileDialog.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Dialogs/AddOutputProfileDialog.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Dialogs/AddOutputProfileDialog.axaml.cs)
- [`OutputService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/OutputService.cs)
- [`OutputPresetService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/OutputPresetService.cs)

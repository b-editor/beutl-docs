---
title: "Relink missing media"
description: "Repair references to moved or missing media files and fonts."
sidebar_position: 22
---

# Relink missing media

Use this tab when a scene cannot find or read its video, audio, image, 3D model, LUT, or font files.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Choose **Open repair tool** in the missing-media notification. This tab is not listed in **View → Tools**.

## Relinking files

1. Choose **Replace file** on a missing item and select a replacement. Beutl checks that it can read the file.
2. After choosing a replacement, Beutl searches its folder for candidates for the other missing items. Review a candidate and choose **Use this candidate**, or choose **Use all candidates**.
3. Choose **Apply and save** to update the scene's references and save the repairs. These reference repairs are saved directly rather than recorded as ordinary undoable property edits.

Expand **Show details** to inspect the original reference, replacement file, and elements that use it. A candidate is not applied until you accept it and choose **Apply and save**.

Use **Keep offline** in an item's more menu to leave that item unresolved while repairing other files. **Refresh** checks again after a file has been restored to its original location.

## Related documents

- [Editing Elements](../../get-started/edit-element.md)
- [Project Structure](../../get-started/project-structure.md)

## Source

- [`MissingMediaTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/MissingMediaTabExtension.cs)
- [`MissingMediaViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/ViewModels/MissingMediaViewModel.cs)
- [`MissingMediaView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/Views/MissingMediaView.axaml)
- [`EditViewModel.MissingMedia.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/EditViewModel.MissingMedia.cs)
- [`MissingMediaStrings.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/MissingMediaStrings.resx)

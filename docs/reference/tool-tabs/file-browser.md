---
title: "File Browser"
description: "Describes the role of the File Browser tab and how to use it."
sidebar_position: 3
---

# File Browser

A tab for **browsing and organizing files** in the project folder or any other folder, and **dragging them onto the timeline** to import them.
You can also bookmark favorites, search for media files within a project, view thumbnails, and perform file operations such as renaming, deleting, and creating new folders.

## Tab characteristics

- **Open by default**: Yes
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → File Browser**.

## Layout

The tab switches between two views.

- **Home view** (default): Stacks three sections vertically — **Favorites**, **Project Directory**, and **Media Files**.
- **Directory browse view**: Lists the contents of a folder. Opening any folder switches to this view.

A toolbar is shown at the top regardless of which view is active.

### Toolbar buttons

| Button | When shown | Action |
|--------|-----------|--------|
| **Open Folder** | Browse view only | Opens a folder picker dialog and shows the contents of the selected folder |
| **Breadcrumb** | Browse view only | Shows the current folder path as a hierarchy. Click any segment to jump to that level |
| **Display mode toggle** | Browse view only | Each press cycles through **List → Tree → Icon** |
| **New Folder** | Browse view only | Creates a new folder inside the current folder |
| **Refresh** | Always | Reloads the current view |
| **Home** | Always | Returns to the home view |

The file system is monitored automatically: when files or folders are added, removed, renamed, or modified, the view updates on its own. Project-related files (paths containing `.bep` / `.scene` / `.belm` / `.beutl`) are excluded from monitoring because they change frequently.

## Home view

Each section can be **collapsed or expanded** with the toggle in its header, and the small button to the right of the header switches between **icon view** and **list view**.

### Favorites

A place for bookmarking any folder or file. The **Templates** folder (the destination for elements saved via "Save as Template" on the timeline) is always pinned at the top.

- The favorites list is persisted as a setting and preserved across launches.
- To add: right-click an item and choose **Add to Favorites**, or drag and drop onto this section.
- To remove: right-click a registered item and choose **Remove from Favorites**.
- A guide message is shown when nothing is registered.

### Project directory

Lists the contents of the project folder that owns the currently open scene. If no project is open, the parent folder of the scene file is used instead.

### Media files

**Recursively searches** the project folder and lists up to 200 image, video, and audio files that it finds.

## Directory browse view

Lists the contents of the selected folder using the display mode chosen in the toolbar.

### Display modes

- **Icon View**: Tiles items as 64x64 thumbnails or icons with their file names.
- **List View**: Lays items out one per row with 24x24 thumbnails or icons and their file names.
- **Tree View**: Lets you traverse the folder hierarchy by expanding folders.

### Thumbnails and tooltips

Thumbnails are generated automatically for images (png / jpg / jpeg / gif / bmp / webp / ico / tiff / tif) and videos (mp4 / avi / mov / mkv / wmv / flv / webm). Files for which a thumbnail cannot be generated are shown with an icon based on their extension.

Hovering an item shows a tooltip with media information.

- **Video**: resolution, frame rate, codec, duration, file size
- **Audio** (mp3 / wav / ogg / flac / aac / wma / m4a): codec, sample rate, channel count, duration, file size
- **Other files**: file size and last modified date

## Item operations

### Mouse operations

- **Single click**: Select (use `Ctrl` / `Shift` for multi-selection)
- **Double click**: Enter the folder if it is a folder, or open the file with the OS's default application
- **Drag**: Hand off the file or folder to the timeline, another tab, or an external application (Finder / Explorer, etc.)

### Context menu

| Item | Action |
|------|--------|
| **Open** | Enters the folder if it is a folder, or opens the file with the default application |
| **Rename** | Enter a new name in a flyout (an error is shown if a file or folder with the same name exists) |
| **Delete** | Permanently deletes the item after confirmation — it does not go to the trash. Multiple selections are deleted in one go |
| **Add to Favorites / Remove from Favorites** | The label changes depending on whether the item is already a favorite |

## Drag and drop

### From the File Browser to the outside

Drag items from the File Browser onto the **Timeline**, **Element Property** tab, or **Finder / Explorer**, etc. Multiple selected items can also be dragged together. Dropping a video, image, or audio file onto the timeline adds it as the corresponding element.

### Within the File Browser

Dragging items between folders or sections inside the File Browser performs a **move** (not a copy).

- Drop on a folder item -> moves into that folder
- Drop on the empty area of the browse view -> moves into the currently shown folder
- Drop on the **Project Directory** section in the home view -> moves into the project folder
- Drop on the **Media Files** section in the home view -> moves into the `resources` folder inside the project folder (created automatically if missing)
- Drops into the same folder, or moving a folder onto itself or one of its descendants, are skipped

### From outside into the File Browser

Dropping items from an OS file manager performs a **copy** (existing files with the same name are not overwritten).

- Drop on a folder item -> copies into that folder
- Drop on the **Favorites** section -> registers the path as a favorite
- Drop on the **Project Directory** section -> copies into the project folder
- Drop on the **Media Files** section -> copies into the `resources` folder inside the project folder

## Related documents

- [Project Structure](../../get-started/project-structure.md)
- [Adding Elements](../../get-started/add-element.md)
- [Timeline](./timeline.md)

## Source

- [`FileBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/FileBrowserTabExtension.cs)
- [`FileBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/ViewModels/FileBrowserTabViewModel.cs)
- [`FileSystemItemViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/ViewModels/FileSystemItemViewModel.cs)
- [`FileBrowserTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileBrowserTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileBrowserTabView.axaml.cs)
- [`FileItemDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileItemDragBehavior.cs)
- [`FileSelectionBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileSelectionBehavior.cs)
- [`MediaFileSearcher.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/MediaFileSearcher.cs)
- [`FileThumbnailService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/FileThumbnailService.cs)
- [`FavoritesManager.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/FavoritesManager.cs)
- [`DirectoryWatcherService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/DirectoryWatcherService.cs)

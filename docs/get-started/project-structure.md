---
title: Project Structure
description: Explanation of the files generated in a Beutl project
sidebar_position: 3
---

When you create a project named `MyProject`, Beutl creates this directory structure:

```text
MyProject/
├── MyProject.bep
└── MyProject/
    └── MyProject.scene
```

Project, scene, and element data are JSON. Media and Git metadata have their own formats.

## `MyProject.bep`

The project file records the scenes in the project and shared settings such as frame rate and sample rate.

## `MyProject.scene`

The scene file stores the scene size, timing, and the elements on its timeline.

## `*.belm`

Each element file stores its timeline position, duration, layer, name, and settings for drawing, sound, and effects.

## `.beutl`

Beutl stores local UI state here, including the dock arrangement and editor view state.

## Git files

When [version control](../reference/tool-tabs/version-control.md) is enabled, the project uses a standard Git repository. A repository created for the project has a `.git` directory; a project inside an existing repository can use that enclosing repository.

The local UI state in `.beutl` is excluded from project history. See [Version Control](../reference/tool-tabs/version-control.md) for recording and restoring versions.

## Version compatibility {/* #version-compatibility */}

**Saving with 2.0.0-preview.9 raises the project file format floor to 2.0.0-preview.9. Projects saved by preview.9 do not open in preview.8 or earlier.** Back up the whole project folder before upgrading if you need to keep an older version usable.

Project, scene, and element files record the minimum Beutl version needed to open them. Preview.9 stores timeline and media times as integer flick counts. Older time strings are converted when loaded; the editor still shows readable time values. Project frame rate and sample rate are stored as project settings, with fractional frame rates preserved as rational values.

## Related documents

- [Creating a Project](./create-project.md)
- [Version Control](../reference/tool-tabs/version-control.md)
- [Recovering damaged elements](./edit-element.md#recovering-damaged-elements)

## Source

- [`ProjectService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/ProjectService.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/Project.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`Element.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Element.cs)
- [`EditorConstants.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/EditorConstants.cs)
- [`GitCliVersionControlService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitCliVersionControlService.cs)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/Serialization/FileFormat.cs)
- [`MediaTimeJsonConverter.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/JsonConverters/MediaTimeJsonConverter.cs)

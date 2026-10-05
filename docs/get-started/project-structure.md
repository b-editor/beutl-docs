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

The project file records its scenes (`items`), application and minimum-compatible versions (`appVersion` and `minAppVersion`), and variables such as frame rate and sample rate (`variables`).

## `MyProject.scene`

The scene file stores scene dimensions and timing. Its `Elements` entry includes element files with the `**/*.belm` pattern.

## `*.belm`

Element files store timeline placement, duration, layer, name, and enabled state, plus the element's `Objects` collection. These objects supply drawing, sound, effects, and other processing.

The current format uses `Objects`; legacy `Operation` content is migrated when loaded.

## `.beutl`

Beutl stores local UI state here, including the dock arrangement and editor view state.

## Git files

When [version control](../reference/tool-tabs/version-control.md) is enabled, the project uses a standard Git repository. A repository created for the project has a `.git` directory; a project inside an existing repository can use that enclosing repository.

Beutl adds ignore rules for `.beutl` directories and temporary files, and text attributes for `.bep`, `.scene`, and `.belm` files. Git LFS can track media when available.

## Related documents

- [Creating a Project](./create-project.md)
- [Version Control](../reference/tool-tabs/version-control.md)
- [Recovering damaged elements](./edit-element.md#recovering-damaged-elements)

## Source

- [`ProjectService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/ProjectService.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Core/Project.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`Element.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Element.cs)
- [`EditorConstants.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/EditorConstants.cs)
- [`GitCliVersionControlService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitCliVersionControlService.cs)

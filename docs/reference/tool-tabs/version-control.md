---
title: "Version Control"
description: "Record, compare, and restore project versions with Git."
sidebar_position: 19
---

# Version Control

Record project versions in Git, inspect changed files, restore a previous project state, and synchronize with a remote repository.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open **View → Tools → Version Control**. Git 2.36 or later must be installed and available to Beutl.

For a new project, enable **Track history with Git** in the creation dialog. For an existing project, choose **Enable Version Control…** in this tab. Beutl asks for a commit name and email if they are missing.

## Record and compare versions

- Enter a **Commit message** and press **Commit** to record the current project state.
- Select a commit in **Version History**, then a file in **Changed Files**, to inspect its diff.
- By default, explicit saves and project closure also record versions when there are changes. Auto-saving edits and recording Git versions are separate operations.

## Restore and branches

Select a version and choose **Restore**. Beutl saves current changes, records a safety snapshot when needed, closes the project, and reopens it with the selected project state recorded in a new commit. Existing Git history is preserved; the editor's current undo history is cleared.

**Restore to New Branch…** creates a branch from the current tip and applies the selected project state there. The branch selector at the top of the window also lets you create and switch branches.

When the project is inside a larger repository, branch switching affects that entire repository. Review the confirmation before switching.

## Remote synchronization

Use **Set remote…** to enter the URL of an existing remote repository. **Push** sends local versions; **Pull** brings in fast-forward updates and reopens the project. **Publish branch…** sets the remote and pushes the branch.

Configure authentication through Git's credential helper or SSH agent. Resolve diverged histories or unresolved conflicts with an external Git tool before continuing in Beutl.

## Settings

**Settings → Editor** includes version-control settings:

| Setting | Default |
|---------|---------|
| Track new projects with Git | On |
| Record versions on explicit save | On |
| Record versions on project close | On |
| Use Git LFS when available | On |
| Git executable path | Automatic discovery |
| Large-media warning threshold | 50 MB |

Git LFS stores large media separately from ordinary Git objects. Remote LFS storage and bandwidth quotas still apply.

## Related documents

- [Creating a Project](../../get-started/create-project.md)
- [Project Structure](../../get-started/project-structure.md)

## Source

- [`VersionControlTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PrimitiveImpls/VersionControlTabExtension.cs)
- [`VersionControlTabViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlTabViewModel.cs)
- [`VersionControlCoordinator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/VersionControlCoordinator.cs)
- [`VersionControlConfig.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Configuration/VersionControlConfig.cs)
- [`GitInstallationLocator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitInstallationLocator.cs)

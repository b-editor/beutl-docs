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

For a new project, enable **Track history with Git** in the creation dialog. For an existing project, choose **Enable Version Control…** in this tab. Beutl asks for a commit name and email if they are missing. To start from an existing repository, [clone it](#cloning-a-repository).

## Record and compare versions

- Enter a **Commit message** and press **Commit** to record the current project state.
- Select a commit in **Version History**, then a file in **Changed Files**, to inspect its diff.
- By default, explicit saves and project closure also record versions when there are changes. Auto-saving edits and recording Git versions are separate operations.

## Restore and branches

Select a version and choose **Restore**. Beutl saves current changes, records a safety snapshot when needed, closes the project, and reopens it with the selected project state recorded in a new commit. Existing Git history is preserved; the editor's current undo history is cleared.

**Restore to New Branch…** creates a branch from the current tip and applies the selected project state there. The branch selector at the top of the window also lets you create and switch branches.

When the project is inside a larger repository, branch switching affects that entire repository. Review the confirmation before switching.

## Remote synchronization

**Set remote…** in the menu of the action button under the commit message opens **Connect a Git remote**, which connects the project in one of three ways:

- **Create on Beutl** creates a Beutl repository named by **Repository name**, the project's name by default, and connects it. A name can have up to 80 characters, without slashes, backslashes, or control characters.
- **Existing** lists the Beutl repositories in your account. Search for one and select it.
- **Git URL** takes the **Remote URL** of any Git repository.

Beutl repositories need you to be signed in to Beutl; otherwise the dialog offers **Sign in to Beutl**. When the project already has a remote, the dialog shows its URL with the warning **This will replace the current origin.** When the project has no remote and nothing is left to commit, the action button reads **Publish branch…**. It opens the same dialog, and its **Create and publish** or **Connect and publish** connects the remote and then pushes the branch.

**Push** sends local versions; **Pull** brings in fast-forward updates and reopens the project. For a Beutl repository, **Open on Web** in the action button's menu and in the branch selector opens the repository in your browser, and **Open Commit on Web** in a version's right-click menu opens that version.

For a Beutl repository, Beutl issues an access token and saves it with a secure Git credential helper, so you do not set up credentials yourself. If authentication to the repository fails while you are signed in to Beutl, the error notification offers **Reconnect Beutl remote**, which issues a new token; then try the operation again. For other remotes, configure authentication through Git's credential helper or SSH agent. Resolve diverged histories or unresolved conflicts with an external Git tool before continuing in Beutl.

When you push to a Beutl repository while signed in, Beutl also uploads the project's thumbnail to it. The start screen shows that thumbnail for a repository that is not on this computer.

### Progress

While Beutl pushes, pulls, or publishes a branch, the area under the action button shows the current step and a progress bar. The bar shows a percentage when Git reports one, and moves without one while Beutl waits, such as for the remote. Git LFS transfers also show the amount transferred and the speed. The action button reads **Cancel** until the operation ends.

While Beutl creates a commit, restores a version, switches branches, or applies pulled changes and reopens the project, the editor area shows what it is doing: **Creating commit…**, **Restoring version…**, **Switching branch…**, or **Applying remote changes…**.

## Cloning a repository {/* #cloning-a-repository */}

Choose **File → Clone Repository…**, or **Clone Repository** on the start screen.

1. Choose **Beutl Repositories** and select one of your repositories, or choose **Clone from URL** and enter the **Remote URL**. Beutl repositories need you to be signed in to Beutl.
2. Under **Destination to save to**, set the **Parent folder** and the **Folder name**. The folder name follows the repository's name until you change it. The destination must be empty or must not exist yet.
3. Press **Clone**. The dialog shows the progress, and **Cancel** stops the clone. If Git is missing or too old, the dialog says so and offers **Download Git**.

Beutl downloads the repository's Git LFS files before it opens the project. If the repository has Git LFS files and Git LFS is not installed, the clone stops and asks you to install Git LFS. When the clone holds one project, Beutl opens it. When it holds several, pick one under **Choose a project to open**. When it holds none, choose **Create New** to make a project in the cloned folder, or **Open folder**.

A repository link on the Beutl website opens this dialog with that repository selected, together with the branch, tag, or commit that the link names, shown as **Revision** and its name. When that repository's project is already open, Beutl says so instead. When one of your recent projects comes from that repository, Beutl first offers **Open local copy** or **Clone a new copy**.

While you are signed in, the start screen also lists your Beutl repositories; see [Creating a Project](../../get-started/create-project.md).

## Settings

**Settings → Editor** includes version-control settings:

| Setting | Default |
|---------|---------|
| Track new projects by default | On |
| Record versions on save | On |
| Record a version on close | On |
| Use Git LFS when available | On |
| Git executable | Automatic |
| Large media warning threshold (MB) | 50 |

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
- [`VersionControlTabView.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/Views/VersionControlTabView.axaml) / [`VersionControlTabViewModel.Remote.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlTabViewModel.Remote.cs) / [`VersionControlRemoteProgress.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlRemoteProgress.cs) (remotes and progress)
- [`ConnectRemoteDialog.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/Views/ConnectRemoteDialog.axaml) / [`ConnectRemoteDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/ConnectRemoteDialogViewModel.cs) / [`HostedGitRepositoryConnection.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/VersionControl/HostedGitRepositoryConnection.cs)
- [`CloneRepositoryDialog.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Views/Dialogs/CloneRepositoryDialog.axaml) / [`RepositoryCloneWorkflow.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/RepositoryCloneWorkflow.cs) / [`GitRepositoryCloner.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/VersionControl/GitRepositoryCloner.cs) (cloning)
- [`EditorHostViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/EditorHostViewModel.cs) (progress in the editor area) / [`ProjectThumbnailService.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/ProjectThumbnailService.cs) (thumbnails)
- [`EditorSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Pages/SettingsPages/EditorSettingsPage.axaml) (settings)

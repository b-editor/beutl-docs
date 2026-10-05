---
title: プロジェクトの構造
description: Beutlのプロジェクトで生成されるファイルについて説明します。
sidebar_position: 3
---

`MyProject` というプロジェクトを作成すると、次のフォルダー構成が生成されます。

```text
MyProject/
├── MyProject.bep
└── MyProject/
    └── MyProject.scene
```

プロジェクト・シーン・要素のデータはJSONです。メディアとGitの管理データにはそれぞれの形式があります。

## `MyProject.bep`

プロジェクトファイルは、含まれるシーン（`items`）、アプリケーションと最低互換バージョン（`appVersion`、`minAppVersion`）、フレームレートやサンプルレートなどの変数（`variables`）を記録します。

## `MyProject.scene`

シーンファイルは寸法や時間の設定を保存します。`Elements` は `**/*.belm` のパターンで要素ファイルを含めます。

## `*.belm`

要素ファイルは、タイムライン上の配置、長さ、レイヤー、名前、有効状態と、要素の `Objects` コレクションを保存します。これらのオブジェクトが描画、音声、エフェクトなどの処理を担います。

現在の形式は `Objects` を使用し、旧形式の `Operation` は読み込み時に移行されます。

## `.beutl`

ドックの配置やエディターの表示状態など、ローカルのUI状態を保存します。

## Gitの管理ファイル

[バージョン管理](../reference/tool-tabs/version-control.md)を有効にすると、通常のGitリポジトリを使用します。プロジェクト用に作成されたリポジトリには `.git` ディレクトリがあり、既存のリポジトリ内にあるプロジェクトは親リポジトリを使用できます。

Beutlは `.beutl` ディレクトリと一時ファイルの除外設定、`.bep`・`.scene`・`.belm` のテキスト属性を追加します。利用可能な場合は、Git LFSでメディアを管理できます。

## 関連ドキュメント

- [プロジェクトを作成する](./create-project.md)
- [バージョン管理](../reference/tool-tabs/version-control.md)
- [破損した要素の復旧](./edit-element.md#破損した要素の復旧)

## ソース

- [`ProjectService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/ProjectService.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Core/Project.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`Element.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Element.cs)
- [`EditorConstants.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/EditorConstants.cs)
- [`GitCliVersionControlService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitCliVersionControlService.cs)

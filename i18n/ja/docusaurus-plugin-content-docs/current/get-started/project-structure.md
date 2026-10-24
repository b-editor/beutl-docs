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

プロジェクトに含まれるシーンと、フレームレートやサンプルレートなどの共通設定を記録します。

## `MyProject.scene`

シーンのサイズや時間の設定、タイムライン上の要素を保存します。

## `*.belm`

要素ごとに、タイムライン上の位置、長さ、レイヤー、名前、描画・音声・エフェクトの設定を保存します。

## `.beutl`

ドックの配置やエディターの表示状態など、ローカルのUI状態を保存します。

## Gitの管理ファイル

[バージョン管理](../reference/tool-tabs/version-control.md)を有効にすると、通常のGitリポジトリを使用します。プロジェクト用に作成されたリポジトリには `.git` ディレクトリがあり、既存のリポジトリ内にあるプロジェクトは親リポジトリを使用できます。

`.beutl` に保存されるローカルのUI状態は、プロジェクトの履歴から除外されます。バージョンの記録と復元については[バージョン管理](../reference/tool-tabs/version-control.md)を参照してください。

## バージョン間の互換性 {/* #version-compatibility */}

**2.0.0-preview.9 で保存すると、プロジェクト形式の最低対応バージョンが 2.0.0-preview.9 になります。preview.9 で保存したプロジェクトは、preview.8 以前では開けません。** 古いバージョンでも使う必要がある場合は、更新前にプロジェクトフォルダー全体をバックアップしてください。

プロジェクト・シーン・要素のファイルには、開くために必要な最低バージョンが記録されます。preview.9 ではタイムラインとメディアの時刻を整数の flick 数で保存します。以前の時刻文字列は読み込み時に変換され、エディター上では引き続き読みやすい時間表示を使います。フレームレートとサンプルレートはプロジェクトの設定として保存され、分数のフレームレートは有理数のまま保持されます。

## 関連ドキュメント

- [プロジェクトを作成する](./create-project.md)
- [バージョン管理](../reference/tool-tabs/version-control.md)
- [破損した要素の復旧](./edit-element.md#破損した要素の復旧)

## ソース

- [`ProjectService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/ProjectService.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/Project.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`Element.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.ProjectSystem/ProjectSystem/Element.cs)
- [`EditorConstants.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/EditorConstants.cs)
- [`GitCliVersionControlService.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitCliVersionControlService.cs)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/Serialization/FileFormat.cs)
- [`MediaTimeJsonConverter.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/JsonConverters/MediaTimeJsonConverter.cs)

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

プロジェクトに含まれるシーンと、フレームレートやサンプルレート、[スピーカー配置](./multichannel-audio.md)などの共通設定を記録します。

## `MyProject.palettes.json` {/* #palettes-file */}

**このプロジェクトに保存** を選んだ[カラーパレット](../reference/tool-tabs/element-property.md#色の選択とパレット)を記録します。プロジェクトファイルには描画結果に関わる内容だけを保存するので、パレットはプロジェクトファイルの隣にあるこのファイルに分けています。最初のパレットを保存したときに作られ、最後のパレットを削除すると消えます。

## `MyProject.scene`

シーンのサイズや時間の設定、タイムライン上の要素を保存します。

## `*.belm`

要素ごとに、タイムライン上の位置、長さ、レイヤー、名前、描画・音声・エフェクトの設定を保存します。

## `.beutl`

ドックの配置やエディターの表示状態など、ローカルのUI状態を保存します。スタート画面に表示するプロジェクトのサムネイルも `.beutl/thumbnails` に保存します。

## Gitの管理ファイル

[バージョン管理](../reference/tool-tabs/version-control.md)を有効にすると、通常のGitリポジトリを使用します。プロジェクト用に作成されたリポジトリには `.git` ディレクトリがあり、既存のリポジトリ内にあるプロジェクトは親リポジトリを使用できます。

`.beutl` に保存されるローカルのUI状態は、プロジェクトの履歴から除外されます。バージョンの記録と復元については[バージョン管理](../reference/tool-tabs/version-control.md)を参照してください。

## バージョン間の互換性 {/* #version-compatibility */}

**2.0.0-preview.11 で保存すると、プロジェクト形式の最低対応バージョンが 2.0.0-preview.11 になります。preview.11 で保存したプロジェクトは、preview.10 以前では開けません。** 古いバージョンでも使う必要がある場合は、更新前にプロジェクトフォルダー全体をバックアップしてください。

プロジェクト・シーン・要素のファイルには、開くために必要な最低バージョンが記録されます。preview.11 で最低対応バージョンが上がるのは、移動の X と Y のように 2 つや 3 つの値をまとめて表示する行が、式を新しい種類の式として保存するためです。古いバージョンはそこに式を見つけられず、次に保存するときに失ってしまうため、そのようなプロジェクトを開かないようにしています。この最低対応バージョンは、そうした式を使っているかどうかにかかわらず、preview.11 で保存したすべてのプロジェクトに適用されます。[1 行にまとめて表示される値](./keyframe.md#joined-rows)を参照してください。

preview.10 で最低対応バージョンが上がったのは、[ストローク](../reference/library/filter-effects/stroke.md)エフェクトの描画順が `Style` プロパティからペンの **重ね順** に移ったためです。保存済みの `Style` は読み込み時に変換されますが、古いバージョンは新しい設定を無視し、ストロークを内容の上に描画してしまいます。引き継がれるのは保存された値だけです。**重ね順** はアニメーションできないので、キーフレームや式で変化する `Style` は基準の値で読み込まれます。

preview.9 ではタイムラインとメディアの時刻を整数の flick 数で保存します。以前の時刻文字列は読み込み時に変換され、エディター上では引き続き読みやすい時間表示を使います。フレームレートとサンプルレートはプロジェクトの設定として保存され、分数のフレームレートは有理数のまま保持されます。

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
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Core/Serialization/FileFormat.cs)
- [`ComponentExpression.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Engine/Expressions/ComponentExpression.cs)
- [`ProjectColorPaletteFile.cs`](https://github.com/b-editor/beutl/blob/48658e4918efab9d95204015c41a36864ca60dbc/src/Beutl.Core/ProjectColorPaletteFile.cs) / [`ProjectColorPaletteHost.cs`](https://github.com/b-editor/beutl/blob/48658e4918efab9d95204015c41a36864ca60dbc/src/Beutl/Services/ProjectColorPaletteHost.cs) / [`ProjectThumbnailService.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/ProjectThumbnailService.cs)
- [`MediaTimeJsonConverter.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/JsonConverters/MediaTimeJsonConverter.cs)
- [`StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

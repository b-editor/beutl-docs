---
title: "表示できないデータ"
description: "未インストールの拡張機能のオブジェクトなど、このビルドの Beutl が保持していても表示できないデータを探し、その場所を表示します。"
sidebar_position: 26
---

# 表示できないデータ

このタブでは、プロジェクトの中で、このビルドの Beutl が保持していても表示や使用ができないデータを探せます。インストールされていない拡張機能や新しいバージョンの Beutl の型を持つオブジェクト、読み込めなかったデータ、移行されていない Beutl 1.x の内容、このビルドが知らない値などです。各行にデータの種類と場所が表示され、**場所を表示** でその場所に移動できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

- メニューバーの **「シーン」→「表示できないデータ」** または **「表示」→「ツール」→「表示できないデータ」** から開きます。コマンドパレットにも **表示できないデータ** があります。
- プロジェクトやシーンを開いたときに表示される通知（**表示できないデータを保持しています**、**Beutl 1.x のノードツリーは移行されていません**、**一部の要素を完全には読み込めませんでした**）で **詳細を表示** を選びます。現在のシーンを優先して、該当するデータのあるシーンに切り替えてからタブを開きます。

## 一覧の内容

一覧の対象はプロジェクト全体です。タイトルの下にある **プロジェクト全体** と表示されたスイッチをオンにすると、**現在のシーン** だけを一覧します。タイトルの横の数字は行数です。一覧は編集や元に戻す・やり直しに合わせて更新され、**更新** でもう一度検出します。

各行には、データの種類を示すラベルと、データの場所が表示されます。場所は、シーン、レイヤーと時間範囲を含む要素（またはレイヤーやマーカー）、その中のオブジェクトとプロパティの順に並びます。行の下に **復旧保護中** と表示される場合、その内容を修復・置き換え・削除するまで、要素は読み取り専用です。[破損した要素の復旧](../../get-started/edit-element.md#破損した要素の復旧)を参照してください。

| ラベル | 意味 |
|--------|------|
| **欠落した型** | このビルドにない型のオブジェクトです。多くの場合、その型を提供する拡張機能がインストールされていないか、新しいバージョンの Beutl で保存されたものです |
| **読み込み失敗** | 保存されたデータを読み込めなかったオブジェクトです |
| **クリップファイルの読み込み失敗** | ファイルを読み込めなかった要素です |
| **Beutl 1.x のノードツリー** / **Beutl 1.x のオペレーター** | Beutl 1.x で作られ、移行されていないため描画されない内容です |
| **不明なメンバー** | オブジェクトに保存されている、このビルドが読み込まない値です。新しいバージョンで追加された設定などです |
| **不明なアニメーション** / **不明な式** | このビルドにないプロパティのアニメーションや式です |
| **代替イージング** | イージングを読み込めなかったキーフレームです。線形のイージングで再生され、変更しない限り、保存すると元のイージングが書き戻されます |
| **読み込み時に失われた値** | 要素の読み込み時に保持できなかった値です |

行の **詳細** を開くと、**保存された型 ($type)**、**不明なキー**、**エラー**、データを読み込んだ **ファイル**、**元の JSON**（読み込めなかったファイルの場合は **元のファイル内容**）を確認できます。**コピー** でその内容をクリップボードにコピーします。

## 場所を表示する

**場所を表示** で、その項目の場所に移動します。別のシーンの項目の場合は、先にそのシーンに切り替えます。

- **要素の中**: 要素を選択し、再生中でなければ再生位置を要素の中に移動して、タイムラインを要素までスクロールし、要素を点滅させます。続けて、要素の中の場所を開きます。トランジションなら[トランジション](./transition.md)タブ、キーフレームなら再生位置をキーフレームに合わせてそのアニメーションの[グラフエディタ](./graph-editor.md)、ノードグラフの中の項目ならノードを中央に表示した[ノードグラフ](./node-graph.md)タブを開きます。それ以外は[要素プロパティ](./element-property.md)タブを開き、プロパティの行を点滅させます。
- **レイヤーやマーカー**: タイムラインをそのレイヤーまでスクロールするか、再生位置をマーカーに移動します。
- **シーンのその他の場所**: [シーン設定](./scene-settings.md)タブを開きます。

シーンではなくプロジェクトに属する行には、**場所を表示** ボタンがありません。

タイムラインでは、このようなデータを含む要素にエラーマーク付きの文書アイコンが表示され、ツールチップに種類ごとの件数が表示されます。[要素の警告](./timeline.md#element-warnings)を参照してください。

## 関連ドキュメント

- [タイムライン](./timeline.md)
- [要素プロパティ](./element-property.md)
- [要素の編集](../../get-started/edit-element.md)
- [欠損メディアを再リンク](./missing-media.md)

## ソース

- [`UndisplayableDataTabExtension.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/UndisplayableDataTabExtension.cs)
- [`UndisplayableDataViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/ViewModels/UndisplayableDataViewModel.cs)
- [`UndisplayableDataView.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/UndisplayableDataTab/Views/UndisplayableDataView.axaml)
- [`UndisplayableDataScanner.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/UndisplayableDataScanner.cs)
- [`EditViewModel.UndisplayableData.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/EditViewModel.UndisplayableData.cs) / [`EditorService.UndisplayableData.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/EditorService.UndisplayableData.cs)（開き方と **場所を表示**）
- [`KeptUnknownDataNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/KeptUnknownDataNotice.cs) / [`RecoveryProtectionNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/RecoveryProtectionNotice.cs) / [`UnmigratedNodeTreeNotice.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/Services/UnmigratedNodeTreeNotice.cs)（通知）
- [`MainViewModel.Menu.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/MainViewModel.Menu.cs)
- [`UndisplayableDataStrings.ja.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/UndisplayableDataStrings.ja.resx)

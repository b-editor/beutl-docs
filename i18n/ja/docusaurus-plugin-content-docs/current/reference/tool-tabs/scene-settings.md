---
title: "シーン設定"
description: "シーン設定タブの役割と主な使い方を説明します。"
sidebar_position: 6
---

# シーン設定

開いているシーンの **解像度・開始時間・長さ・レイヤー数** など、シーン全体に関わる設定を行うタブです。
入力した値はそのままシーンに反映されるのではなく、**「適用」ボタンを押したタイミング** でまとめて反映されます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

シーン設定タブは「表示」→「ツール」のメニューには現れません。次のいずれかの方法で開きます。

- メニューバーの **「シーン」→「シーン設定」**
- タイムラインの何もない場所を右クリックして表示されるメニューの **「シーン設定」**

すでに開いている場合は、そのタブが選択された状態になります。

## 画面構成

設定項目が縦に並び、最下部に **「適用」** と **「破棄」** のボタンが配置されています。

- **サイズ**: シーンの幅と高さ（ピクセル単位）。
- **開始時間**: シーンの開始時刻。`hh:mm:ss` 形式の文字列で指定します。
- **長さ**: シーンの尺。`hh:mm:ss` 形式の文字列で指定します。
- **レイヤー数**: タイムラインで使用できるレイヤーの最大数。
- **適用**: 入力中の値をシーンに反映します。すべての項目が有効な値になっているときだけ押せます。
- **破棄**: 入力中の値を、現在シーンに保存されている値に戻します。

## 入力値の制約

各項目には次の制約があります。条件を満たさないとエラー表示になり、「適用」ボタンが押せません。

- **幅 / 高さ / レイヤー数**: 1 以上の整数
- **開始時間**: `hh:mm:ss` 形式で解釈できる時間。0 以上であること。
- **長さ**: `hh:mm:ss` 形式で解釈できる時間。0 より大きいこと。

## 適用と履歴

「適用」を押したときに、サイズ・開始時間・長さのいずれかが変更されていれば、その変更は **取り消し（Undo）/ やり直し（Redo）** の履歴に記録されます。レイヤー数の変更は履歴には残らず、即座に反映されます。

## 関連ドキュメント

- [プロジェクトを作成する](../../get-started/create-project.md)
- [プロジェクトの構造](../../get-started/project-structure.md)
- [タイムライン](./timeline.md)

## ソース

- [`SceneSettingsTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/SceneSettingsTab/SceneSettingsTabExtension.cs)
- [`SceneSettingsTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/SceneSettingsTab/ViewModels/SceneSettingsTabViewModel.cs)
- [`SceneSettingsTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/SceneSettingsTab/Views/SceneSettingsTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/SceneSettingsTab/Views/SceneSettingsTabView.axaml.cs)
- [`MenuBarViewModel.Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/MenuBarViewModel.Scene.cs)（メニューからの起動）

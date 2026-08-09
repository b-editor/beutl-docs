---
title: "ドックレイアウト"
description: "現在のタブ配置に名前を付けて保存し、任意のシーンに適用します。"
sidebar_position: 18
---

# ドックレイアウト

**現在のツールタブの配置** に名前を付けて保存し、あとから呼び出せるタブです。保存したレイアウトはシーンごとではなくユーザーごとに保存されるため、あるシーンで保存したレイアウトを、別のプロジェクトの別のシーンにも適用できます。

## タブの特徴

- **初期状態で開く**: いいえ
- **複数インスタンスを許可**: いいえ

## 開き方

メニューバーの **「表示」→「ドックレイアウトを管理」**、または **「表示」→「ツール」→「ドックレイアウト」** から開きます。

## レイアウト

- **現在のレイアウトを保存（上部の `+` ボタン）**: 名前の入力欄が開き（候補があらかじめ入力されています）、その名前で現在の配置を保存します。既存のレイアウトと同じ名前で保存すると上書きされます。
- **ドックレイアウトをリセット（上部）**: 現在のシーンのタブ配置を初期状態に戻します。**「表示」→「ドックレイアウトをリセット」** と同じです。
- **レイアウト一覧**: 保存済みレイアウトが 1 行ずつ並びます。行にマウスを乗せる（または選択する）と、**「ドックレイアウトを適用」「名前を変更」「削除」** のボタンが現れます。

## レイアウトを適用する

行の **「ドックレイアウトを適用」** ボタンをクリックするか、行をダブルクリックします。保存済みレイアウトは **「表示」→「ドックレイアウトを適用」** にも並ぶので、このタブを開かずに切り替えられます。このメニュー項目は、レイアウトが 1 つも保存されていない間は表示されません。

レイアウトを適用すると、現在のエディターのタブが置き換わります。開いていたタブは閉じられ、レイアウトが指定するタブが新しく開かれます。

:::note
保存されるのは配置だけです。どのタブが開いていて、どこにドッキングし、ペインがどう分割されているか、が対象になります。選択中の要素や検索ボックスの内容といったタブごとの状態は、取得元のシーンに属する情報なので、レイアウトには保存されません。
:::

## 保存場所

保存したレイアウトは、Beutl のホームディレクトリ（既定では `~/.beutl`）の `dock-layout-presets.json` に書き込まれ、同じマシンのすべてのプロジェクトで共有されます。

## 既定のレイアウト

新しいシーンは 2 種類の既定配置のいずれかから始まります。どちらになるかはシーンのフレームサイズで決まり、横長なら横向き用のレイアウト、幅より高さが大きい場合は縦長専用のレイアウトが使われます。

## ソース

- [`DockLayoutTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/DockLayoutTabExtension.cs)
- [`DockLayoutViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/DockLayoutViewModel.cs)
- [`DockLayoutPresetService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/DockLayoutPresetService.cs)
- [`DockLayoutView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/DockLayoutView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/DockLayoutView.axaml.cs)

---
title: "要素プロパティ"
description: "要素プロパティタブの役割と主な使い方を説明します。"
sidebar_position: 4
---

# 要素プロパティ

タイムラインで選択している要素（`*.belm` ファイルに対応する単位）に含まれる **描画オブジェクト、サウンドなど** を縦に並べて編集するタブです。
要素そのものの名前や色、開始時刻といったタイムライン上での扱いはタイムライン側で操作し、ここでは要素の中身を組み立てます。

## タブの特性

- **デフォルトで開く**: はい
- **複数同時に開く**: できない

## 開き方

メニューバーの **「表示」→「ツール」→「要素プロパティ」** から開けます。

タイムラインで要素をクリックして選択すると、その要素の中身がこのタブに表示されます。要素を選択していないときは何も表示されません。

## 画面構成

選択中の要素に含まれるオブジェクトが、**展開可能なパネル** として縦に並びます。
各パネルは以下の要素で構成されます。

- **並び替えハンドル**（左端のドット）: 縦方向にドラッグしてオブジェクトの順序を変更
- **表示/非表示トグル**: そのオブジェクトの有効 / 無効を切り替え
- **名前のラベル**: オブジェクトの種類名（カーソルを乗せると説明がツールチップで表示）
- **展開/折りたたみボタン**: クリックでプロパティの表示を開閉
- **プロパティ領域**: 展開時に各プロパティの専用エディタが表示される

オブジェクトの数が多い場合は、タブ全体を縦スクロールして一覧します。

## オブジェクトの操作

### 並び替え

各パネルの左端にあるドラッグハンドルを上下にドラッグすると、同じ要素内でオブジェクトの順序を入れ替えられます。順序は描画やエフェクトの適用順に直結します。

### 有効 / 無効の切り替え

ヘッダーの目アイコン（表示/非表示トグル）で、そのオブジェクトの有効 / 無効を切り替えます。無効化したオブジェクトは描画や処理から除外されます。

### 展開 / 折りたたみ

ヘッダー右端のボタンをクリックすると、プロパティ領域を開閉できます。開閉状態は要素ごとに保存され、次回以降同じ要素を開いたときに復元されます。

### 右クリックメニュー（パネルのヘッダー上）

| 項目 | 動作 |
|------|------|
| **削除** | このオブジェクトを要素から取り除く |
| **テンプレートとして保存** | 名前を付けて、このオブジェクトをテンプレートとしてライブラリに登録 |

## オブジェクトの追加

### ライブラリからのドラッグ&ドロップ

[ライブラリ](./library.md) の項目（描画オブジェクト、サウンドなど）をこのタブにドロップして、選択中の要素にオブジェクトを追加できます。ドロップ位置によって挿入場所が変わります。

## プロパティの編集

各オブジェクトを展開すると、プロパティごとのエディタが表示されます。

アニメーションされているプロパティは、プロパティ右側の **︙（三点リーダ縦）メニュー** から [グラフエディタ](./graph-editor.md) を開いたり、タイムライン上にインライン展開したりできます。

## 不明な型のオブジェクト

拡張機能の未インストールなどでオブジェクトの型を解決できないときは、フォールバック表示に切り替わります。元の型名と、JSON を直接編集して保存するためのコマンドバーが表示されるため、最低限の確認や修正をその場で行えます。

## 関連ドキュメント

- [要素を編集する](../../get-started/edit-element.md)
- [プロジェクトの構造](../../get-started/project-structure.md)
- [ライブラリ](./library.md)
- [グラフエディタ](./graph-editor.md)

## ソース

- [`ElementPropertyTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ElementPropertyTabExtension.cs)
- [`ElementPropertyTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ViewModels/ElementPropertyTabViewModel.cs)
- [`EngineObjectPropertyViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/ViewModels/EngineObjectPropertyViewModel.cs)
- [`ElementPropertyTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/ElementPropertyTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/ElementPropertyTabView.axaml.cs)
- [`EngineObjectPropertyView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/EngineObjectPropertyView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ElementPropertyTab/Views/EngineObjectPropertyView.axaml.cs)
- [`FallbackObjectView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/Views/FallbackObjectView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/Views/FallbackObjectView.axaml.cs)

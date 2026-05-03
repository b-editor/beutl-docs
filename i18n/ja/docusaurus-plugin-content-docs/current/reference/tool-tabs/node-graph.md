---
title: "ノードグラフ"
description: "ノードグラフタブの役割と主な使い方を説明します。"
sidebar_position: 8
---

# ノードグラフ

ノードベースの描画オブジェクト（ノードグラフ系の描画オブジェクトやフィルターエフェクト）の **ノードを配置・接続して編集** するためのタブです。
ノードを追加・移動・削除し、ポート同士を線で繋いで処理の流れを組み立てます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる（編集対象のグラフごとに別タブとして開けます）

## 開き方

開き方は 2 通りあります。

- メニューバーの **「表示」→「ツール」→「GraphNode Tree」** から、現在選択している要素のノードグラフを開きます。
- プロパティタブで、ノードベースの描画オブジェクトやフィルターエフェクトが持つグラフプロパティの **「タブで開く」** ボタンからも、同じグラフをこのタブで開けます。

## 画面構成

- **パンくずバー（上部）**: 現在編集しているグラフの階層を表示します。グループノードに入った後、項目をクリックすると親のグラフへ戻れます。
- **グラフパネル（中央）**: ドット模様の背景の上にノードと接続線を配置する作業領域です。背景はパンとズームに合わせてスクロールします。
- **選択範囲オーバーレイ**: 矩形選択中だけ、半透明の青い枠が表示されます。

## ノードの追加

### 右クリックメニューから追加

グラフパネル上の何もない場所を右クリックすると、以下が表示されます。

- **ノードを追加**: 登録済みのノードがカテゴリ別のサブメニューで一覧表示されます。選んだ位置にノードが配置されます。
- **ズームをリセット**: グラフパネルの拡大率を 100% に戻します。

### ドラッグ&ドロップで追加

ライブラリのノード項目をグラフパネルへドロップすると、ドロップ位置にそのノードが追加されます。

## ノードの操作

各ノードは、上部に色付きのヘッダーがあり、その下にポートやプロパティエディタ、モニター項目が並びます。

### ヘッダー

- **展開トグル**（左の矢印）: ノードの中身（ポートとプロパティ）の表示/非表示を切り替えます。畳んだ状態では、接続線はノードの中央左右からまとめて出ます。
- **名前**: 中央にノード名を表示します。名前が空のときは登録時の表示名が使われます。
- **開く**ボタン（右、グループノードのみ）: グループノードの内側のグラフへ移動します。パンくずバーが更新され、戻るときはパンくずをクリックします。

### 移動

- ヘッダーを左ドラッグでノードを移動します。
- 複数のノードを選択していれば、選択中のすべてのノードが一緒に動きます。
- ドラッグ中のノードは前面に持ち上がり、リリース後に元の重なり順に戻ります。

### 選択

- ヘッダーをクリックするとそのノードが単一選択になります。
- **`Ctrl` + クリック**で選択を追加/解除できます。
- グラフパネルの何もない場所を **`Ctrl` + ドラッグ** すると、矩形範囲で複数のノードを一括選択します。

### 右クリックメニュー（ヘッダー）

- **削除** (`Delete`): ノードと、そのノードに繋がる接続をすべて削除します。
- **リネーム**: ノード名を編集するフライアウトを開きます。

## ポートと接続の操作

ノード内の各行の左右端にある小さい円形がポートです。色は値の型に応じて変わり、何かに繋がっているときは塗りつぶされ、未接続のときは薄い色で表示されます。

### 接続する

- ポートを左ドラッグして、相手ポートまで線を引いて離すと接続されます。
- 入力と出力の組み合わせのみ繋がります。型が違っても自動変換が試みられ、変換できないときは接続線がエラー色になります。

### 切断する

- ポートを **ダブルクリック** すると、そのポートに繋がっているすべての接続を切断します。
- ポートの右クリックメニューから **切断**（接続をすべて削除）を選べます。

### 接続線の色

接続線は接続状態に応じて色が変わります。

- **未接続**（ドラッグ中のみ）: 通常色
- **接続済み・成功**: 緑系
- **型変換あり**: 黄色系
- **エラー**: 赤系

### 動的ポート（追加可能なポート）

グループノードや一部のノードには、動的に増減できるポートがあります。空のプレースホルダーポートが用意されており、相手ポートからドラッグして接続するとポートが新しく追加されます。

ポートの右クリックメニュー（動的ポートのとき）

- **削除**: そのポートを削除します。繋がっていた接続も切れます。
- **リネーム**: ポート名を変更します。

### リスト型のポート

複数の接続を順序付きで受け取るリスト型のポートでは、接続ごとに別々のポイントが縦に並びます。

- **縦方向のドラッグ**で、リスト内の接続スロットの順序を入れ替えます。
- **横方向のドラッグ**で、その接続を別のポートに繋ぎ直します。
- **ダブルクリック**で、その接続だけを切断します。

## モニターノード

実行結果を可視化するモニター系のノードでは、編集中のグラフの値が次のように表示されます。

- **テキスト表示**: 等幅フォントで現在の値をそのまま表示します。
- **画像表示**: ノード内に最大 200×200 のサムネイルとして描画されます。

再生中はパフォーマンスのためにモニターの更新は止まり、ノードを **展開している** ときだけ更新されます。

## グラフパネルの操作

### マウス

- 何もない場所を **左ドラッグ** でグラフ全体をパンします。
- ホイールでズームイン/アウト（ポインタ位置を中心に拡大）します。

### キーボード

- ノード選択中に `Delete` キーで選択ノードを削除します（コンテキストメニューと同じ動作）。

## グループノードのナビゲーション

グループノードは、内側に独自のノードグラフを持ちます。

- ノードヘッダー右の **開く**ボタンでグループの内側に入ります。タブ上部のパンくずバーが 1 段深くなります。
- パンくずバーの上位項目をクリックすると、その階層へ戻ります。それより下の階層は閉じられます。
- グループの内側には、グループの入力・出力に対応する専用ノードがあり、それぞれ 1 個までしか配置できません。

## 状態の保存

ノードの位置・展開状態・グラフのパン/ズーム位置は、シーンを閉じても保持されます。次回タブを開いたときに、最後に表示していたグラフ階層と表示状態が復元されます。

## 関連ドキュメント

- [ライブラリリファレンス: ノードベース](../library/drawables/index.md)

## ソース

- [`NodeGraphTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/NodeGraphTabExtension.cs)
- [`NodeGraphTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeGraphTabViewModel.cs)
- [`NodeGraphViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeGraphViewModel.cs)
- [`GraphNodeViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/GraphNodeViewModel.cs)
- [`NodePortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodePortViewModel.cs)
- [`InputPortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/InputPortViewModel.cs) / [`OutputPortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/OutputPortViewModel.cs)
- [`ConnectionViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/ConnectionViewModel.cs)
- [`NodeMemberViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeMemberViewModel.cs) / [`NodeMonitorViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeMonitorViewModel.cs)
- [`NodeGraphTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphTabView.axaml.cs)
- [`NodeGraphView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphView.axaml.cs)
- [`GraphNodeView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/GraphNodeView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/GraphNodeView.axaml.cs)
- [`NodePortView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortView.axaml.cs)
- [`NodeGraphBackground.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphBackground.cs) / [`NodeGraphOverlay.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphOverlay.cs)
- [`ConnectionLine.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/ConnectionLine.cs) / [`NodePortPoint.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortPoint.cs)
- [`ListPortDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/ListPortDragBehavior.cs)
- [`GraphModelEditor.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/GraphModelEditor.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/GraphModelEditor.axaml.cs)（プロパティ側からタブを開く起点）

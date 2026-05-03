---
title: "グラフエディタ"
description: "グラフエディタタブの役割と主な使い方を説明します。"
sidebar_position: 7
---

# グラフエディタ

アニメーションの **時間カーブ** を 2D グラフ上で編集するためのタブです。
キーフレームの位置・値・補間カーブを直接ドラッグして、動きの加減速を細かく調整できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる（編集対象ごとに別タブとして開けます）

## 開き方

グラフエディタタブは「表示」→「ツール」のメニューには現れません。
プロパティタブで、編集したいプロパティの **︙（三点リーダ縦）メニュー** から **「アニメーションを編集」** を選ぶと開きます。

タイムライン上のインラインアニメーションのヘッダーにある **「開く」ボタン** からも、同じアニメーションをグラフエディタタブで開けます。

## 画面構成

- **アニメーションリスト（左側）**: 編集対象の要素に含まれるアニメーション付きプロパティの一覧。クリックで編集対象を切り替えます。
- **ハンドル操作モードのツールバー（リスト上部）**: スプラインイージングのハンドルをドラッグするときの挙動を 3 種から選びます。
- **タイムラインスケール（中央上部）**: 時間軸の目盛り。再生位置・シーン開始/終了バーを表示します。
- **垂直スケール（中央左）**: 値の目盛り。基準線（0 の位置）を起点に上下方向の値を読み取れます。
- **グラフパネル（中央）**: キーフレームと補間カーブを 2D グラフで描画する作業領域です。

## アニメーションリストの操作

- リフレッシュボタンで一覧を再取得します（タブにマウスを乗せたときも自動で更新されます）。
- 一覧には、描画オブジェクト・エフェクト・トランスフォームなどに含まれる、キーフレーム形式のアニメーションがすべて表示されます。
- 要素やアニメーションそのものが削除された場合は、対応する項目が一覧から外れ、すべて消えるとタブも自動で閉じます。

## ハンドル操作モード

スプラインイージング（ベジェ曲線）のコントロールポイントをドラッグするときに、隣接するキーフレーム側のハンドルをどう扱うかを切り替えます。

- **対称**: 反対側のハンドルを、操作したハンドルと点対称（同じ角度・同じ長さ）に動かします。
- **非対称**: 反対側のハンドルの長さは保ったまま、角度だけを揃えます。
- **別々**: 反対側のハンドルは動かさず、操作中のハンドルだけを変更します。

## キーフレームの操作

各キーフレームは ◆ ダイヤモンドアイコンで表示されます。

### 移動

- 左ドラッグで時刻と値を同時に変更します。
- リリース時にシーンのフレームレートにスナップ（丸め）されます。
- **`Shift` + ドラッグ**で、同じビュー内の他のキーフレームも一緒に移動します（相対関係を維持）。
- ドラッグ中にマウスがスクロール領域の外に出ると、自動でスクロールします。
- 隣接するキーフレームを横断してドラッグすることもでき、その際もスプラインイージングのハンドル位置は表示上の位置を保ちます。

### 右クリックメニュー

- **コピー** — そのキーフレーム単体を JSON としてクリップボードへ
- **貼り付け** — そのキーフレームの位置に貼り付け（型が一致しない場合はイージングのみ適用）
- **削除** — そのキーフレームを削除

## コントロールポイントの操作（スプラインイージング）

イージングがスプライン形式のときだけ、各キーフレーム区間の前後に **コントロールポイント** が表示されます。

- 左ドラッグでコントロールポイントを移動し、ベジェ曲線の形を変更します。
- 反対側のハンドルの動きは、上記の **ハンドル操作モード** に従います。
- `Alt` を押しながらドラッグするとキーフレーム側のヒット判定を無視できます。

## グラフパネルの操作

### マウスホイール

- ホイールで時間軸方向にスクロールします。
- `Shift` + ホイールで縦方向にスクロールします。
- `Ctrl` (`Cmd`) + ホイールで時間軸方向にズームイン/アウト（ポインタ位置を中心に拡大）します。
- `Ctrl` + `Shift` (`Cmd` + `Shift`) + ホイールで縦方向にズームイン/アウトします。
- 垂直スケール上のホイールでも同様に縦スクロールでき、`Ctrl` (`Cmd`) を押すと縦ズームになります。

設定で **タイムラインのスクロール方向を入れ替える** が有効な場合は、縦/横の挙動が入れ替わります。

### 再生位置とシーン開始/終了の操作

- タイムラインスケール上をクリックすると、その時刻に再生位置（シークバー）が移動します。
- 上部の赤いシーン開始/終了バーをドラッグすると、シーンの開始時刻・尺を変更できます。

### 何もない場所の右クリックメニュー

- **すべてコピー** — このプロパティのアニメーション全体を JSON としてコピー
- **貼り付け** — マウス位置にキーフレームまたはアニメーションを貼り付け
  - クリップボードがキーフレームのとき: マウス位置にキーフレームを挿入します。同じ時刻に既存のキーフレームがあれば、その値とイージングを上書きします。
  - クリップボードがアニメーション全体のとき: 既存のアニメーションを丸ごと置き換えます。
  - プロパティの型が一致しないキーフレームを貼り付けた場合は、イージングのみが適用されます。
- **拡大率**: 1% / 5% / 10% / 20% / 50% / 70% / 100% / 120% / 150% / 170% / 200% / 350% / 700% / 875%（縦方向の拡大率）
- **表示**: 値の成分を切り替えるサブメニュー（複数の成分を持つプロパティ専用、後述）
- **BPMグリッド**（BPM・拍子・オフセットの設定）
- **グローバル時計を使う** のトグル

### ドラッグ&ドロップ

ライブラリのイージング項目をグラフパネルへドロップすると、ドロップ位置を基準に動作が変わります。

- ドロップ位置の近くに既存のキーフレームがある場合は、そのキーフレームの **イージングを変更** します。
- 近くにキーフレームがない場合は、ドロップ位置に **新しいキーフレームを挿入** し、その遷移区間に指定したイージングを設定します。

## 複数の成分を持つプロパティ

座標・サイズ・色など、複数の値を内側に持つプロパティでは、各成分が別々のグラフとして同時に描画されます。

- 例えば 2 次元の点なら **X / Y**、3 次元のベクトルなら **X / Y / Z**、矩形なら **X / Y / Width / Height**、色なら **Alpha / Red / Green / Blue** といった具合です。
- 右クリックメニューの **「表示」** から、編集対象の成分を切り替えます。選択中の成分のキーフレームとハンドルだけが操作可能になり、ほかの成分はガイドとして薄く描画されます。
- 色のグラフは各チャンネルを赤・緑・青で色分けして表示します。

## グローバル時計と要素クロック

アニメーションの **グローバル時計を使う** が有効なとき、要素を移動してもキーフレームの表示位置は変わりません（要素の開始時刻に関係なく、常にプロジェクトの時刻基準で表示されます）。
無効のときは、要素の開始時刻からの相対時間としてキーフレームが描画されます。

要素の枠は、グラフパネル上にレイヤーカラーの細い縦線として重ねて表示されます。

## 再生中の自動スクロール

**設定 > エディタ > 再生時のタイムライン自動スクロール** の設定に応じて、再生中は再生位置に合わせて自動でスクロールします。

## 関連ドキュメント

- [キーフレーム](../../get-started/keyframe.md)
- [タイムライン](./timeline.md) — インラインでキーフレームを編集するレーンの解説
- [カーブ](./curves.md) — 色調補正用のトーンカーブを編集するタブ

## ソース

- [`GraphEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/GraphEditorTabExtension.cs)
- [`GraphEditorTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorTabViewModel.cs)
- [`GraphEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorViewModel.cs)
- [`GraphEditorViewViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorViewViewModel.cs)
- [`GraphEditorViewViewModelFactory.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorViewViewModelFactory.cs)
- [`GraphEditorKeyFrameViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorKeyFrameViewModel.cs)
- [`GraphEditorTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorTabView.axaml.cs)
- [`GraphEditorView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorView.axaml.cs)
- [`GraphEditorBackground.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorBackground.cs) / [`GraphEditorScale.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorScale.cs)
- [`KeyTimeBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/KeyTimeBehavior.cs) / [`ControlPointBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/ControlPointBehavior.cs)
- [`GraphEditorDragDropBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorDragDropBehavior.cs)
- [`EaseLine.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Views/EaseLine.cs)
- [`GraphEditorResources.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/GraphEditorTab/Resources/GraphEditorResources.axaml)
- [`PropertyEditorMenu.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PropertyEditorMenu.axaml.cs)（タブを開く起点）

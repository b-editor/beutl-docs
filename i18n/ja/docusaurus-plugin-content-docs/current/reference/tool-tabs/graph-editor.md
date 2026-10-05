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

- **プロパティツリー（左側）**: 描画オブジェクト・エフェクト・トランスフォームと、その下のプロパティや成分を階層表示します。項目を選ぶと編集対象を切り替えます。
- **ツールバー（グラフ下部）**: 値グラフ／速度グラフ、スナップ、変形枠、高さの自動調整、イージング、キーフレーム速度、ハンドルの連動を設定します。
- **タイムラインスケール（中央上部）**: 時間軸の目盛り。再生位置・シーン開始/終了バーを表示します。
- **垂直スケール（中央左）**: 値の目盛り。基準線（0 の位置）を起点に上下方向の値を読み取れます。
- **グラフパネル（中央）**: キーフレームと補間カーブを 2D グラフで描画する作業領域です。

## プロパティツリーの操作

- 描画オブジェクトから、エフェクト・トランスフォーム・入れ子のプロパティや値の成分へ展開します。
- タイマーのボタンでアニメーションを有効にし、ダイヤモンドのボタンで現在の再生位置にキーフレームを追加／削除します。
- 右クリックメニューからアニメーションを削除できます。アニメーションがなくなってもタブは残り、編集対象の要素を削除した場合は閉じます。

## グラフと選択のツール

**値グラフ** はプロパティの値、**速度グラフ** は1秒あたりの変化量を表示します。**変形枠** で選択したキーフレーム群を移動・拡大縮小できます。**高さを自動調整** が有効な間は、縦方向のズームとスクロールは自動管理されます。

ツールバーからリニア、ホールド、イージーイーズ、イーズイン、イーズアウトを適用し、**キーフレーム速度** で入側・出側の速度と影響度を調整できます。

## ハンドル操作モード

スプラインイージング（ベジェ曲線）のコントロールポイントをドラッグするときに、隣接するキーフレーム側のハンドルをどう扱うかを切り替えます。

- **対称**: 反対側のハンドルを、操作したハンドルと点対称（同じ角度・同じ長さ）に動かします。
- **非対称**: 反対側のハンドルの長さは保ったまま、角度だけを揃えます。
- **別々**: 反対側のハンドルは動かさず、操作中のハンドルだけを変更します。

## キーフレームの操作

各キーフレームは ◆ ダイヤモンドアイコンで表示されます。

### 移動

- 左ドラッグで時刻と値を同時に変更します。
- **スナップ** スイッチで時刻・値のスナップを切り替えます。**`Alt`** を押すと一時的に無効になります。
- **`Shift` + クリック** で選択を追加／解除します。ドラッグは選択したキーフレームに作用し、**`Shift` + ドラッグ** は水平または垂直方向に移動を制限します。
- ドラッグ中にマウスがスクロール領域の外に出ると、自動でスクロールします。
- 隣接するキーフレームを横断してドラッグすることもでき、その際もスプラインイージングのハンドル位置は表示上の位置を保ちます。

### 右クリックメニュー

- **コピー** — 選択中のキーフレームを右クリックした場合は選択全体をコピーし、それ以外はそのキーフレームをコピー
- **貼り付け** — そのキーフレームの位置に貼り付け（型が一致しない場合はイージングのみ適用）
- **削除** — 選択中のキーフレームを右クリックした場合は選択全体を削除し、それ以外はそのキーフレームを削除

## コントロールポイントの操作（スプラインイージング）

イージングがスプライン形式のときだけ、各キーフレーム区間の前後に **コントロールポイント** が表示されます。

- 左ドラッグでコントロールポイントを移動し、ベジェ曲線の形を変更します。
- 反対側のハンドルの動きは、上記の **ハンドル操作モード** に従います。
- `Alt` を押しながらドラッグするとキーフレーム側のヒット判定を無視できます。

## グラフパネルの操作

### マウスホイール

- ホイールで時間軸方向にスクロールします。
- `Shift` + ホイールで縦方向にスクロールします。
- `Alt` または `Ctrl` (`Cmd`) + ホイールで時間軸方向にズームイン/アウト（ポインタ位置を中心に拡大）します。
- `Ctrl` + `Shift` (`Cmd` + `Shift`) + ホイールで縦方向にズームイン/アウトします。
- 垂直スケール上のホイールでも同様に縦スクロールでき、`Alt` または `Ctrl` (`Cmd`) を押すと縦ズームになります。

設定で **タイムラインのスクロール方向を入れ替える** が有効な場合は、縦/横の挙動が入れ替わります。

### 再生位置とシーン開始/終了の操作

- タイムラインスケール上をクリックすると、その時刻に再生位置（シークバー）が移動します。
- 上部の赤いシーン開始/終了バーをドラッグすると、シーンの開始時刻・尺を変更できます。

### 何もない場所の右クリックメニュー

- **すべてコピー** — このプロパティのアニメーション全体を JSON としてコピー
- **貼り付け** — マウス位置にキーフレームまたはアニメーションを貼り付け
  - クリップボードがキーフレームまたは選択のとき: マウス位置にキーフレームを挿入します。同じ時刻に既存のキーフレームがあれば、その値とイージングを上書きします。
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

## 選択とキーボード操作

`Ctrl`（macOSでは `Cmd`）を押しながら空白をドラッグすると矩形選択し、さらに `Shift` を押すと選択を追加します。`Space` + 左ドラッグまたは中ボタンドラッグでパンできます。

| 操作 | キー |
|------|------|
| 全選択 | `Ctrl/Cmd + A` |
| 選択解除 | `Ctrl/Cmd + Shift + A` または `Shift + F2` |
| 選択のコピー／切り取り／貼り付け | `Ctrl/Cmd + C/X/V` |
| 削除 | `Delete` / `Backspace` |
| 全体を表示／選択範囲を表示 | `F` / `Shift + F` |
| イージーイーズ／イーズイン／イーズアウト | `F9` / `Shift + F9` / `Ctrl/Cmd + F9` |
| 1フレーム／10フレーム移動 | `Alt + ←/→` / `Alt + Shift + ←/→` |
| 前／次のキーフレームへ移動 | `J` / `K` |

ショートカットで貼り付ける場合は、キーフレーム間の相対的な時間差を保って再生位置へ挿入します。空白部分の右クリックメニューの貼り付けは、マウス位置へ挿入します。空白部分の右クリックメニューの **貼り付け** で、**すべてコピー** したアニメーション全体を貼り付ける場合は、既存のアニメーションを置き換えます。

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

- [`GraphEditorView.Interaction.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/GraphEditorTab/Views/GraphEditorView.Interaction.cs)
- [`GraphEditorTabViewModel.Tree.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/GraphEditorTab/ViewModels/GraphEditorTabViewModel.Tree.cs)

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

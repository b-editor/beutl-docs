---
title: "パスエディタ"
description: "パスエディタタブの役割と主な使い方を説明します。"
sidebar_position: 13
---

# パスエディタ

**パス（ベジェ曲線などで構成される図形の輪郭）** の制御点を直接操作して編集するためのタブです。
パスを使う図形を編集しているときだけ意味を持ちます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

メニューバーの **「表示」→「ツール」→「パスエディタ」** から開けます。

プロパティエディタで図形のパス項目に並ぶ万年筆のボタンをクリックし、
**「タブで編集」** を選ぶと、自動的にこのタブが開いてその図形の編集を開始します。
同じ操作をもう一度行うと編集を終了できます。
**「フレームで編集」** を選んだ場合はプレビュー上で直接編集する別モードに入ります（パスエディタタブは使いません）。

## 画面構成

- **編集キャンバス（中央）**: パスを表示・編集する作業領域。背景には現在の拡大率に応じたグリッドと、シーン原点を示す水平線・垂直線が表示されます。
- **ツールバー**: **選択 (`V`)**、**ペン (`P`)**、**曲線 (`B`)**、**手のひら (`H`)** を切り替え、拡大・縮小やパスの全体表示を行います。
- **ポイント設定（右側）**: 選択したアンカーの位置と、入側・出側の制御点を編集します。複数選択時は **選択範囲の位置** で選択全体を移動できます。ハンドルの連動と線・塗りの表示もここで設定します。

タブの幅が狭い場合は、ツールバーの **ポイント設定** から同じ設定をポップアップで開けます。

パスを編集中の図形には、各セグメントの **アンカー（端点）** と、選択中のセグメントとその次のセグメントに属する **コントロールポイント（ハンドル）** がキャンバス上に表示されます。
選択中のセグメントのハンドルからアンカーへ向けて、点線のガイドが描画されます。

## パスの操作

### 制御点（アンカー）・ハンドルの操作

- アンカーやハンドルは **左ドラッグ** で移動できます。
- ドラッグを離すと、変更が履歴（Undo/Redo）に記録されます。
- アンカーを **クリック** すると、そのアンカーが属するセグメントが選択状態になり、関連するハンドルが表示されます。

### アンカーの選択

- **`Shift`、`Ctrl`、`Cmd` + クリック** で、アンカーを選択に追加／選択から解除。
- **選択** ツールでキャンバスの何もない場所をドラッグして矩形選択。**`Shift`** を押すと選択を追加できます。
- **`Ctrl + A`**（macOS では **`Cmd + A`**）で全アンカーを選択。
- **`Esc`** で選択をすべて解除。
- 複数選択した状態で 1 つのアンカーをドラッグすると、選択中のアンカーが一緒に移動します。

### キーボードによる微調整

選択中のアンカーを **矢印キー（`←` `↑` `→` `↓`）** で 1 単位ずつ動かせます。**`Shift`** を押すと 10 単位ずつ動きます。
キーを離した時点で履歴に記録されます。

アンカーのドラッグ中に **`Shift`** を押すと、水平方向または垂直方向に移動を制限します。ハンドルのドラッグ中は **`Shift`** で角度をスナップし、**`Alt`**（macOSでは **`Option`**）で一時的に独立して動かせます。

### コントロールポイントのドラッグモード

ハンドル（コントロールポイント）をドラッグしたときに、つながっている隣のハンドルをどう連動させるかを選びます。

- **対称**: 反対側のハンドルが、アンカーを基準に同じ角度・同じ長さで動きます。
- **非対称**: 反対側のハンドルは角度だけ追従し、長さは保持されます。
- **別々**: 反対側のハンドルを動かしません（独立に編集）。

ドラッグモードはポイント設定、またはキャンバス上の右クリックメニューから切り替えられます。

### パスを描く・曲線を編集する

- **ペン (`P`)**: クリックで点を追加し、ドラッグで曲線のハンドルを作成します。既存の形状が対応している場合、始点をクリックしてパスを閉じられます。
- **曲線 (`B`)**: アンカーをクリックしてハンドルを追加／削除します。選択ツールでアンカーをダブルクリックしても同じ操作ができます。
- 選択ツールでパスの辺をダブルクリックすると、アンカーを挿入します。
- **`Enter`** で描画を終了します。**`Esc`** は進行中の操作を取り消して選択を解除します。

### セグメントの追加

キャンバスの何もない場所を **右クリック** すると、現在のクリック位置に新しいセグメントを追加できます。

- **3次ベジェ曲線**
- **2次ベジェ曲線**
- **直線**
- **円弧**
- **円錐**

追加したセグメントは現在のパスの末尾に連結され、コントロールポイントは前のアンカーとの中間付近に自動配置されます。

### セグメントの削除

アンカーまたはコントロールポイントを **右クリック** すると **削除** メニューが表示されます。
そのセグメントをパスから取り除きます。

**`Delete`** または **`Backspace`** で選択中のアンカーを削除できます。

### キャンバス上の右クリックメニュー

何もない場所を右クリックすると、上記のセグメント追加に加えて以下が利用できます。

- **対称 / 非対称 / 別々** のドラッグモード切替
- **拡大率をリセット**

### 表示切替（ストローク・塗りつぶし）

ポイント設定で、編集中の図形の **線（ストローク）** と **塗りつぶし** の表示を個別に切り替えられます。
形状の確認方法に応じて、必要なものだけを残せます。

## キャンバスのパン・ズーム

- **マウスホイール**: ホイール位置を中心にズームイン／ズームアウト
- **手のひら (`H`)、`Space` + ドラッグ、中ボタンドラッグ**: キャンバスをパン
- **`+` / `-`**: 拡大／縮小。**`0`** で表示をリセット
- **`Shift + 1`**: パス全体を表示。**`Shift + 2`**: 選択範囲を表示
- **右クリックメニュー → 拡大率をリセット**: 表示倍率と位置をリセット

ズームすると背景グリッドの間隔も追従します。表示倍率はキャンバス内部の表示にのみ影響し、シーンの実寸には影響しません。

## アニメーションと再生

- タイムラインの再生位置に応じて、各コントロールポイントの位置が現在時刻の値で表示されます。
- 再生中はキャンバス上の編集が無効化され、形状のプレビューに切り替わります。
- アニメーションが設定されているコントロールポイントを **対称 / 非対称** モードでドラッグすると、隣接するキーフレームでも整合する位置にハンドルが自動調整されます。

## 関連ドキュメント

- [タイムライン](./timeline.md)

## ソース

- [`PathEditorInteraction.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorInteraction.cs)
- [`PathPointProperties.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/PathEditorTab/Services/PathPointProperties.cs)

- [`PathEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/PathEditorTabExtension.cs)
- [`PathEditorTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/ViewModels/PathEditorTabViewModel.cs)
- [`PathEditorTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml.cs)
- [`PathPointDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathPointDragBehavior.cs)
- [`PathEditorHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorHelper.cs)
- [`PathGeometryControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathGeometryControl.cs)
- [`PathEditorGrid.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorGrid.cs)
- [`ControlPointVisibilityHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/ControlPointVisibilityHelper.cs)
- [`PathFigureListItemEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PathFigureListItemEditor.axaml.cs)（パスエディタタブを開く起点）

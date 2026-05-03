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
- **ドラッグモード切替ボタン（左上）**: コントロールポイントをドラッグしたときの挙動を **対称 / 非対称 / 別々** から選択します。
- **表示切替ボタン（左上）**: パスの **線（ストローク）** と **塗りつぶし** の表示／非表示を切り替えます。

パスを編集中の図形には、各セグメントの **アンカー（端点）** と、選択中のセグメントとその次のセグメントに属する **コントロールポイント（ハンドル）** がキャンバス上に表示されます。
選択中のセグメントのハンドルからアンカーへ向けて、点線のガイドが描画されます。

## パスの操作

### 制御点（アンカー）・ハンドルの操作

- アンカーやハンドルは **左ドラッグ** で移動できます。
- ドラッグを離すと、変更が履歴（Undo/Redo）に記録されます。
- アンカーを **クリック** すると、そのアンカーが属するセグメントが選択状態になり、関連するハンドルが表示されます。

### アンカーの選択

- アンカーの **`Ctrl` + クリック** で選択状態をトグル（複数選択可能）。
- キャンバスの何もない場所を **`Ctrl` + ドラッグ** で矩形範囲選択。
- **`Ctrl + A`**（macOS では **`Cmd + A`**）で全アンカーを選択。
- **`Esc`** で選択をすべて解除。
- 複数選択した状態で 1 つのアンカーをドラッグすると、選択中のアンカーが一緒に移動します。

### キーボードによる微調整

選択中のセグメントのアンカーを **矢印キー（`←` `↑` `→` `↓`）** で 1 単位ずつ動かせます。
キーを離した時点で履歴に記録されます。

### コントロールポイントのドラッグモード

ハンドル（コントロールポイント）をドラッグしたときに、つながっている隣のハンドルをどう連動させるかを選びます。

- **対称**: 反対側のハンドルが、アンカーを基準に同じ角度・同じ長さで動きます。
- **非対称**: 反対側のハンドルは角度だけ追従し、長さは保持されます。
- **別々**: 反対側のハンドルを動かしません（独立に編集）。

ドラッグモードはキャンバス左上のラジオボタン、またはキャンバス上の右クリックメニューから切り替えられます。

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

### キャンバス上の右クリックメニュー

何もない場所を右クリックすると、上記のセグメント追加に加えて以下が利用できます。

- **対称 / 非対称 / 別々** のドラッグモード切替
- **拡大率をリセット**

### 表示切替（ストローク・塗りつぶし）

キャンバス左上のトグルボタンで、編集中の図形の **線（ストローク）** と **塗りつぶし** の表示を個別に切り替えられます。
形状の確認方法に応じて、必要なものだけを残せます。

## キャンバスのパン・ズーム

- **マウスホイール**: ホイール位置を中心にズームイン／ズームアウト
- **左ドラッグ（何もない場所）**: キャンバス全体をパン（平行移動）
- **右クリックメニュー → 拡大率をリセット**: 表示倍率と位置をリセット

ズームすると背景グリッドの間隔も追従します。表示倍率はキャンバス内部の表示にのみ影響し、シーンの実寸には影響しません。

## アニメーションと再生

- タイムラインの再生位置に応じて、各コントロールポイントの位置が現在時刻の値で表示されます。
- 再生中はキャンバス上の編集が無効化され、形状のプレビューに切り替わります。
- アニメーションが設定されているコントロールポイントを **対称 / 非対称** モードでドラッグすると、隣接するキーフレームでも整合する位置にハンドルが自動調整されます。

## 関連ドキュメント

- [タイムライン](./timeline.md)

## ソース

- [`PathEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/PathEditorTabExtension.cs)
- [`PathEditorTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/ViewModels/PathEditorTabViewModel.cs)
- [`PathEditorTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorTabView.axaml.cs)
- [`PathPointDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathPointDragBehavior.cs)
- [`PathEditorHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorHelper.cs)
- [`PathGeometryControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathGeometryControl.cs)
- [`PathEditorGrid.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/PathEditorGrid.cs)
- [`ControlPointVisibilityHelper.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PathEditorTab/Views/ControlPointVisibilityHelper.cs)
- [`PathFigureListItemEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PathFigureListItemEditor.axaml.cs)（パスエディタタブを開く起点）

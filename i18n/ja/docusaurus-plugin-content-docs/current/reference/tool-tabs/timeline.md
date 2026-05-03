---
title: "タイムライン"
description: "タイムラインタブの役割と主な操作を説明します。"
sidebar_position: 1
---

# タイムライン

シーンに含まれる要素を **時間軸上で並べ替え・編集** するためのタブです。
レイヤーごとに要素を追加・移動・分割・グループ化したり、再生位置を操作したり、フレームキャッシュやマーカーを管理したりできます。

## タブの特性

- **デフォルトで開く**: はい
- **複数同時に開く**: できない

## 開き方

メニューバーの **「表示」→「ツール」→「タイムライン」** から開けます。

## 画面構成

- **タイムラインスケール（上部）**: 時間軸の目盛り。再生位置・シーン開始/終了バー・マーカー・フレームキャッシュを表示します。
- **レイヤーヘッダー（左側）**: 各レイヤーの表示/非表示・色・名前を操作します。
- **タイムラインパネル（中央）**: 要素を時間×レイヤーで配置する作業領域です。

左右の境界はスプリッタでドラッグして幅を変えられます。

## 要素の操作

### 配置・移動・リサイズ

- 要素本体をドラッグしてレイヤーや時間位置を移動
- 要素の左右端付近にカーソルを合わせるとリサイズ可能（端をドラッグして開始時刻・尺を変更）
- ドラッグ中は **`Alt`** を押すとスナップを一時的に無効化
- 要素が極端に小さく、リサイズのハンドルのみが表示される場合は、**`Ctrl`** を押しながらドラッグしてリサイズせずに移動が可能

### 選択

- 要素のクリックで単一選択、`Ctrl` (macOS では `Cmd`) + クリックで選択の追加/解除
- 何もない場所を `Ctrl` (`Cmd`) + ドラッグで矩形範囲選択

### キーボードショートカット

| 機能 | Windows / Linux | macOS |
|------|------|------|
| コピー | `Ctrl + C` | `Cmd + C` |
| 切り取り | `Ctrl + X` | `Cmd + X` |
| 貼り付け | `Ctrl + V` | `Cmd + V` |
| 除外（タイムラインから外す） | `Delete` | `Back` |
| 削除（ファイルごと削除） | `Ctrl + Delete` | `Cmd + Back` |
| 現在のフレームで分割 | `Ctrl + K` | `Cmd + K` |
| グループ化 / 解除のトグル | `Ctrl + G` | `Cmd + G` |
| 要素のリネーム | `F2` | `Enter` |
| シーンの開始時刻を現在のフレームに合わせる | `[` | `[` |
| シーンの終了時刻を現在のフレームに合わせる | `]` | `]` |
| レーザーモードに切替 | `C` | `C` |
| レーザーモードを解除 | `V` または `Esc` | `V` または `Esc` |
| マーカーの追加 / 削除 | `M` | `M` |

要素のダブルクリックでもリネームできます。

### 要素の右クリックメニュー

- **要素を有効化** のトグル
- **レーザーモード** のトグル
- **分割 / 現在のフレームで分割**
- **切り取り / コピー / 削除 / 除外**
- **選択した要素をグループ化 / グループ化を解除**
- **リネーム**
- **オリジナルの長さに変更**（メディア要素などで元の長さに戻す）
- **色を変更**
- **サムネイルを無効化** のトグル
- **テンプレートとして保存**
- **アニメーション**サブメニュー: **編集を終了する** / **一番上に持ってくる**

## タイムラインパネルの操作

### マウスホイール

- ホイールで時間軸方向にスクロール
- `Ctrl` (`Cmd`) + ホイールでズームイン/アウト
- `Shift` + ホイールで縦スクロール

### 何もない場所の右クリックメニュー

- **レーザーモード** のトグル
- **要素を追加** / **テンプレートから追加**（ライブラリの登録項目から選択）
- **貼り付け**（要素・ファイル・クリップボードの画像）
- **開始時間を設定 / 終了時間を設定**（クリック位置に合わせる）
- **自動でシーンの長さを調整** のトグル
- **スナップ** のトグル
- **シーン設定**（シーン設定タブを開く）
- **BPMグリッド**（BPM・拍子・オフセットの設定）
- **拡大率**: 20% / 50% / 70% / 100% / 120% / 150% / 170% / 200%

### ドラッグ&ドロップ

- ライブラリの項目（描画オブジェクト・テンプレートなど）をドロップして要素を追加
- ファイル（画像・動画・音声・テンプレート JSON）をドロップして要素を追加

## インラインアニメーション編集

要素直下にプロパティ専用のレーンを表示し、グラフエディタタブを開かずにキーフレームアニメーションをタイムライン上で編集する機能です。

### 開き方・閉じ方

- プロパティの右側にある **︙（三点リーダ縦）メニュー** から **「インライン表示でアニメーションを編集」** を選ぶと、その要素の下にインラインレイヤーが追加されます。
- 同じプロパティのアニメーションを二重に開くことはできません。
- インラインレイヤーのヘッダーにある **× ボタン** で閉じられます（プロパティのアニメーション自体は残ります）。
- 要素の右クリックメニュー → **アニメーション → 編集を終了する** で、その要素のインラインをすべてまとめて閉じられます。

### インラインレイヤーの構成

- **ヘッダー（レイヤーヘッダー側）**
  - 並び替えハンドル（縦ドラッグで同じ要素内のインラインの順序を変更）
  - **×（閉じる）** ボタン
  - **開く** ボタン: 同じアニメーションをグラフエディタタブで開く
  - プロパティ名のテキストボックス（読み取り専用）
- **タイムライン側**
  - 要素の枠を示すボーダー
  - 隣接キーフレーム間の **イージング曲線**（値が大きい/小さい/同じに応じて上下方向に描画）
  - 各キーフレームの **◆ ダイヤモンドアイコン**

### キーフレームの操作

- **左ドラッグ**でキーフレームの時刻を変更します。
  - リリース時にシーンのフレームレートにスナップ（丸め）されます。
  - ドロップ後の値は履歴（Undo/Redo）に記録されます。
- **`Shift` + ドラッグ**で、同じインライン内の他のキーフレームも一緒に移動します（相対関係を維持）。
- キーフレーム上の右クリックメニュー
  - **コピー** — そのキーフレーム単体を JSON としてクリップボードへ
  - **貼り付け** — そのキーフレームの位置に貼り付け（型が一致しない場合はイージングのみ適用）
  - **削除** — そのキーフレームを削除

### インラインレイヤーの右クリックメニュー

レーン上のキーフレーム以外の領域を右クリックすると以下が表示されます。

- **すべてコピー** — このプロパティのアニメーション全体を JSON としてコピー
- **貼り付け** — マウス位置にキーフレームまたはアニメーションを貼り付け
  - クリップボードがキーフレームのとき: マウス位置にキーフレームを挿入。同じ時刻に既存のキーフレームがあれば、その値とイージングを上書きします。
  - クリップボードがアニメーション全体のとき: 既存のアニメーションを丸ごと置き換えます。
  - プロパティの型が一致しないキーフレームを貼り付けた場合は、イージングのみが適用されます。
- **削除** — このプロパティのアニメーションを丸ごと削除（プロパティは静的な値に戻ります）

### イージングのドラッグ&ドロップ

ライブラリのイージング項目をインラインレイヤーへドロップすると、ドロップ位置を基準に動作が変わります。

- ドロップ位置の近くに既存のキーフレームがある場合は、そのキーフレームの **イージングを変更** します。
- 近くにキーフレームがない場合は、ドロップ位置に **新しいキーフレームを挿入** し、その遷移区間に指定したイージングを設定します。

### 並び替えと表示順

- 同じレイヤー上で複数のインラインを開いている場合、ヘッダーの並び替えハンドルを縦にドラッグして順序を変更できます。
- 要素の右クリックメニュー → **アニメーション → 一番上に持ってくる** で、その要素のインラインをまとめてレイヤー内の最上部に並び替えます。

### グローバルクロックと要素クロック

アニメーションの **グローバル時計を使う** が有効なとき、要素を移動してもキーフレームの表示位置は変わりません（要素の開始時刻に関係なく、常に同じ時間に同じ位置に表示されます）。

## タイムラインスケール（上部目盛り）

- 赤いシーン開始/終了バーをドラッグでシーンの開始時間・尺を変更
- スケール上端のマーカーをクリックで編集、ドラッグで移動
- 下端のフレームキャッシュ表示を右クリックで **すべて削除 / 削除 / ロック / ロック解除**

## レイヤーヘッダー

- 左端のハンドルを上下にドラッグしてレイヤーの高さを変更
- 目アイコンで表示/非表示を切替
- カラーピッカーでレイヤー色を変更
- テキストボックスでレイヤー名を変更

## 再生中の自動スクロール

**設定 > エディタ > 再生時のタイムライン自動スクロール** の設定に応じて、再生中は再生位置に合わせて自動でスクロールします。

## 関連ドキュメント

- [要素を追加する](../../get-started/add-element.md)
- [要素を編集する](../../get-started/edit-element.md)
- [キーフレーム](../../get-started/keyframe.md)
- [シーン設定](./scene-settings.md)
- [グラフエディタ](./graph-editor.md)

## ソース

- [`TimelineTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/TimelineTabExtension.cs)
- [`TimelineTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/TimelineTabViewModel.cs)
- [`TimelineTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/TimelineTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/TimelineTabView.axaml.cs)
- [`ElementView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml.cs)
- [`InlineAnimationLayerViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/InlineAnimationLayerViewModel.cs)
- [`InlineKeyFrameViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/ViewModels/InlineKeyFrameViewModel.cs)
- [`InlineAnimationLayer.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayer.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayer.axaml.cs)
- [`InlineAnimationLayerHeader.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayerHeader.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineAnimationLayerHeader.axaml.cs)
- [`InlineEasingGraphControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TimelineTab/Views/InlineEasingGraphControl.cs)
- [`PropertyEditorMenu.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/PropertyEditorMenu.axaml.cs)（インライン表示の起点）

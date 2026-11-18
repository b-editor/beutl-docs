---
title: "カーブ"
description: "カーブタブの役割と主な使い方を説明します。"
sidebar_position: 11
---

# カーブ

**トーンカーブ** を使って映像の階調・色味を調整するためのタブです。
RGB 各チャンネルのカーブ編集に加えて、特定の色相だけ色相・彩度・輝度を変える HSL 系のカーブ補正も行えます。背景にはプレビュー画像から計算したヒストグラムやグラデーションが重ねて表示されるため、変化させたい領域を視覚的に確認しながら調整できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる

## 開き方

タブを開く方法は次の 2 通りです。

- メニューバーの **「表示」→「ツール」→「カーブ」** から開く
- 描画オブジェクトのフィルターエフェクトに追加した **カーブ** フィルターエフェクトのプロパティ欄にあるカーブの **「カーブ」ボタン**（鉛筆アイコン）から開く

タブを直接開いただけではどのエフェクトに対する操作なのかが決まらず、**「カラーカーブエフェクトが選択されていません。」** というメッセージが表示されます。フィルターエフェクトのプロパティ側からタブを開くと、そのエフェクトの値を編集できるようになります。

カラーカーブエフェクトが削除された場合、このタブは自動的に閉じます。

## 画面構成

タブは大きく 2 つのエリアに分かれています。

- **ヘッダー（上部）**: タブ名と、カーブ種類・チャンネルを切り替えるドロップダウン。色相のカーブではスポイトのボタンもあり、その下の行に選んだ色と範囲が表示されます（[色相のカーブで色を選ぶ](#picking-a-color)を参照）。
- **編集領域（下部）**: 制御点を編集するカーブエディタ。背景にはヒストグラムやグラデーションが重ねて描画されます。

## ヘッダーのドロップダウン

ヘッダーの右側には 2 つのドロップダウンがあります。

### カーブ種類

右端のドロップダウンで編集対象のカーブを切り替えます。

| 項目 | 横軸 | 縦軸 / 効果 |
|------|------|------|
| **カスタム(RGB)** | 入力値 | 出力値（一般的なトーンカーブ） |
| **色相 vs 色相** | 元の色相 | 移動後の色相（特定の色相を別の色相にずらす） |
| **色相 vs 彩度** | 元の色相 | 彩度の倍率（特定の色相だけ彩度を上げ下げ） |
| **色相 vs 輝度** | 元の色相 | 輝度の倍率（特定の色相だけ明るくする/暗くする） |
| **輝度 vs 彩度** | 元の輝度 | 彩度の倍率（明るさに応じて彩度を変える） |
| **彩度 vs 彩度** | 元の彩度 | 彩度の倍率（彩度域別に彩度を変える） |

### チャンネル

カーブ種類が **「カスタム(RGB)」** のときだけ表示される左側のドロップダウンで、編集対象のチャンネルを切り替えます。

- **マスター**: RGB 全チャンネルに同じカーブを適用（輝度ヒストグラムが背景に表示）
- **赤 / 緑 / 青**: 各チャンネル個別のカーブ（チャンネルごとのヒストグラムが背景に表示）

## 編集領域の背景表示

編集領域の背景には、現在のプレビュー画像から計算した内容が描画されます。背景の内容はカーブ種類によって変わります。

- **カスタム(RGB)**: チャンネル別の **ヒストグラム**（マスターは輝度ベース）
- **色相 vs ◯◯**: 色相を表す **虹色のグラデーション**＋色相ヒストグラム
- **輝度 vs 彩度**: 黒→白の **輝度グラデーション**＋輝度ヒストグラム
- **彩度 vs 彩度**: 黒→白の **彩度グラデーション**＋彩度ヒストグラム

ヒストグラムはプレビューが更新されるたびに自動で再計算されます。タブが非表示になっているあいだは更新されません。フレームのすべてのピクセルをバックグラウンドで数えるので、小さな部分や細い部分も反映されます。再生中のように数えきれない速さでフレームが届くときは、待っているフレームを飛ばします。

## 制御点の操作

カーブは複数の制御点で形作られています。各制御点にはベジエ曲線用の左右のハンドルが付随します。

### 追加・移動・削除

- 編集領域の **何もない場所を左クリック** で新しい制御点を追加。そのままドラッグして位置を決められます。
- 制御点を **左ドラッグ** で移動します。
  - 端点（一番左と一番右）は **縦方向にしか動かせません**（横位置は固定）。
- 制御点を **右クリック** で削除します（端点は削除できません）。

### ベジエハンドル

制御点を **左クリックで選択** すると、その点に左右のハンドルが表示されます。

- ハンドル上を **左ドラッグ** すると、カーブの曲がり方を調整できます。
  - 左ハンドルは点より左側、右ハンドルは点より右側にしか出せません（X 方向の制限）。
- ハンドル上を **右クリック** で、そのハンドルを既定状態（直線）にリセットします。

新しく追加した制御点には、隣接する制御点との位置関係から自動的にハンドルが設定されます。

### 編集の確定

ドラッグ中はリアルタイムでカーブが反映され、マウスを離したタイミングで履歴（Undo / Redo）に記録されます。

## 色相のカーブで色を選ぶ {/* #picking-a-color */}

**色相 vs 色相**、**色相 vs 彩度**、**色相 vs 輝度** では、ヘッダーにスポイトのボタン **プレビューから色を選ぶ（このエフェクトをかける前の色）** があります。これを使うと、ある色がカーブのどこにあるかを見つけ、制御点を 1 つずつ置かなくても、その周りの色相を変えられます。

1. スポイトをクリックします。ヘッダーの下の行に **プレビューで色をクリックしてください。Escで取り消します。** と表示されます。
2. プレビューにポインターを乗せます。ポインターの下の色がカーブのどこにあるかが、カーブ上の破線で示されます。
3. 色をクリックします。右クリックか `Esc` で取り消せます。再生を始めたときも取り消されます。透明な場所をクリックしたときは、次のクリックを待ちます。

色は、このカーブエフェクトが受け取るフレームから読み取ります。ほかのレイヤーは含まれますが、このエフェクトも、その後に掛かる色相調整などの色のエフェクトも色を変えないので、編集後に同じ場所を選び直しても同じ色になります。**色相 vs 彩度** と **色相 vs 輝度** では、エフェクトの読み取り方に合わせて、**色相 vs 色相** で色相を回した後の位置に色が示されます。

続いてカーブには、色の位置に線が、その周りの範囲に帯が表示され、ヘッダーの下の行には次の項目が並びます。

- 色の見本と、カーブ上の位置（度）。見本にポインターを乗せると、色の色相・彩度・明度が表示されます。
- **範囲**: 選んだ色を中心に、変化が及ぶ色相の幅です。1° から 300° までで、最初は 60° です。
- 表示中のカーブに応じた **色相**、**彩度**、**輝度**: 選んだ色での変化量です。**色相** は -180° から 180°、**彩度** と **輝度** は 0% から 200% までで、100% では色は変わりません。
- **選んだ色を解除**（× のボタン）。

変化量を設定すると、範囲の中のカーブが、両端でのカーブ自身の値から選んだ色での設定値へとなめらかにふくらむ形に作り直されます。範囲の外の色は値が変わりません。範囲の中にあった制御点はこの形に置き換わり、**元に戻す** で戻せます。赤をまたぐ範囲は、カーブの反対側の端に続きます。範囲を狭めると、広い範囲で変えていた部分は元に戻ります。変化量の変更は 1 回ごとに 1 つの取り消し単位です。範囲の端が、ハンドルで折り返すように曲がった区間の中に来るときは、カーブはそのまま変わらず、入力欄はカーブの値に戻ります。

## タブの状態保存

タブを閉じても、次回開いたときに以下の状態は復元されます。

- 選択していたカーブ種類
- 選択していたチャンネル（カスタム(RGB) のとき）
- 関連付けられているカラーカーブエフェクト

:::tip
アニメーションの **時間カーブ** を編集したい場合は、こちらではなく [グラフエディタ](./graph-editor.md) を使用します。
:::

## 関連ドキュメント

- [スコープ](./color-scopes.md)
- [カラーグレーディング](./color-grading.md)

## ソース

- [`CurvesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/CurvesTabExtension.cs)
- [`CurvesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/ViewModels/CurvesTabViewModel.cs)
- [`CurvePresenterViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/ViewModels/CurvePresenterViewModel.cs)
- [`CurvesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/Views/CurvesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/CurvesTab/Views/CurvesTabView.axaml.cs)
- [`CurveEditor.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Curves/CurveEditor.cs)（制御点とハンドルの操作ロジック）
- [`CurveVisualizationRenderer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Curves/CurveVisualizationRenderer.cs)（背景のヒストグラム/グラデーション描画）
- [`Curves.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Curves.cs)（フィルターエフェクト本体）
- [`CurveMapEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/Views/CurveMapEditor.axaml.cs)（プロパティ側の「カーブ」ボタン）
- [`CurvesTabViewModel.ColorRange.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/CurvesTab/ViewModels/CurvesTabViewModel.ColorRange.cs) / [`HueRangeCurve.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/CurvesTab/Services/HueRangeCurve.cs) / [`CurvesTabView.axaml`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/CurvesTab/Views/CurvesTabView.axaml)（スポイトと色の範囲）
- [`PlayerView.axaml.Eyedropper.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Views/PlayerView.axaml.Eyedropper.cs) / [`PlayerViewModel.Eyedropper.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/ViewModels/PlayerViewModel.Eyedropper.cs)（プレビューでの色の選択）

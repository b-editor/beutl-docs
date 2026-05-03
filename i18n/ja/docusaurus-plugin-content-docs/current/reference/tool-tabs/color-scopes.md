---
title: "スコープ"
description: "スコープタブの役割と主な使い方を説明します。"
sidebar_position: 9
---

# スコープ

プレビュー映像の輝度・色情報を **ウェーブフォーム・ヒストグラム・ベクトルスコープ・フォルスカラー・ゼブラ** として可視化するタブです。
カラーコレクションやカラーグレーディングの結果を客観的に確認したり、露出オーバー/アンダーや色被りを発見するための診断ツールとして使います。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる（異なるスコープ種別を同時に並べて表示できます）

## 開き方

メニューバーの **「表示」→「ツール」→「スコープ」** から開けます。

## 画面構成

- **ツールバー（上部）**: 左から、スコープ種別の選択、種別ごとのモード切替、設定ボタン（ゼブラのみ）、色空間切替が並びます。
- **表示エリア（下部）**: 選択したスコープの内容が表示されます。波形・ヒストグラムには軸ラベルが、ベクトルスコープには円形のグリッドと色ターゲットが描画されます。

## スコープ種別

ツールバー左端のドロップダウンで切り替えます。

### ウェーブフォーム

画像を横方向にサンプリングし、各列ごとの輝度/色分布を縦軸に展開して表示します。
ハイライトやシャドウの偏り、ホワイトバランスの傾向を確認するのに使います。

モード切替（ツールバー）:

- **輝度**: 輝度のみを表示
- **RGBオーバーレイ**: 赤・緑・青のチャンネルを重ねて表示
- **RGBパレード**: 赤・緑・青を左から横に並べて表示

### ヒストグラム

各チャンネルの輝度分布をバーで表示します。クリッピングの有無や全体のコントラストを確認できます。

モード切替（ツールバー）:

- **RGBオーバーレイ**: 赤・緑・青を重ねて表示
- **RGBパレード**: 赤・緑・青を上から縦に分けて並べて表示

### ベクトルスコープ

CbCr 色空間での色分布を円形に表示します。色相と彩度の偏りを確認したり、肌色のラインを確認するのに使います。

- 中央のクロスヘアと外側の円、75% 内円のグリッドが表示されます。
- 赤・緑・青・シアン・マゼンタ・イエローの各色ターゲットが小さな枠で表示されます。

### フォルスカラー

輝度を 9 段階のカラーランプ（紫～青～緑～灰～ピンク～黄～橙～赤～白）に置き換えた露出マップを表示します。
肌の露出基準（およそ灰色帯）に合わせたり、ハイライトのクリッピング箇所を一目で確認したりするのに使います。

### ゼブラ

輝度が **高閾値以上**、または **低閾値以下** のピクセルに、斜めの縞模様を重ねて表示します。
オーバー露出は黒/白のストライプ、アンダー露出は黒/赤のストライプで示されます。

ツールバーの **設定ボタン**（歯車アイコン）から、以下の閾値を 0.00～1.00 の範囲で変更できます。

- **高閾値**: これ以上の輝度をオーバー露出として扱う
- **低閾値**: これ以下の輝度をアンダー露出として扱う

## 共通の操作

### 色空間の切替

ツールバー右端のドロップダウンで、計測に使う色空間を切り替えます。

- **ガンマ**: sRGB（ガンマ補正後）の値で集計
- **リニア**: リニア光（ガンマ補正前）の値で集計

### HDR レンジの調整

ウェーブフォーム・ヒストグラム・フォルスカラー・ゼブラでは、表示の上限値（HDR レンジ）を変更できます。
HDR 素材の確認時に、SDR の `1.0` を超える領域まで表示範囲を広げる用途に使います。

- **ドラッグ**: スコープ上を左ドラッグで調整します。ウェーブフォーム・フォルスカラー・ゼブラは縦方向、ヒストグラムは横方向にドラッグします。
- **マウスホイール**: スコープ上で回すと拡大/縮小されます。
- **ダブルクリック**: HDR レンジを `1.0x` にリセットします。
- 操作中は右上に **「HDR: ◯◯x」** のオーバーレイが一時的に表示されます。

HDR レンジが `1.0x` を超えると、ウェーブフォームにはオリジナルの SDR 基準ライン（`1.0`）も追加表示されます。

### 自動更新

- プレビューがレンダリングされるたびに、表示中のスコープが自動更新されます。
- タブが選択されていないときは更新を停止し、負荷を抑えます。

### 状態の保存

選択中のスコープ種別、各スコープのモード、HDRレンジ、ゼブラの閾値、色空間の設定はプロジェクトのレイアウトと一緒に保存され、次回起動時に復元されます。

## 関連ドキュメント

- [カラーグレーディング](./color-grading.md)
- [カーブ](./curves.md)

## ソース

- [`ColorScopesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/ColorScopesTabExtension.cs)
- [`ColorScopesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/ViewModels/ColorScopesTabViewModel.cs)
- [`ColorScopesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/ColorScopesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/ColorScopesTabView.axaml.cs)
- [`ScopeControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ScopeControlBase.cs)
- [`HdrScopeControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/HdrScopeControlBase.cs)
- [`ImageOverlayScopeBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ImageOverlayScopeBase.cs)
- [`WaveformControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/WaveformControl.cs)
- [`HistogramControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/HistogramControl.cs)
- [`VectorscopeControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/VectorscopeControl.cs)
- [`FalseColorControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/FalseColorControl.cs)
- [`ZebraControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ZebraControl.cs)

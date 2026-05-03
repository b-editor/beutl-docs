---
title: "カラーグレーディング"
description: "カラーグレーディングタブの役割と主な使い方を説明します。"
sidebar_position: 10
---

# カラーグレーディング

映像の **色調補正・色味の調整** を行うためのタブです。
カラーホイールと数値ボックスを使って、トーン領域別（シャドウ・ミッドトーン・ハイライトなど）に色味と明るさを調整できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる

## 開き方

タブを開く方法は次の 2 通りです。

- メニューバーの **「表示」→「ツール」→「カラーグレーディング」** から開く
- 描画オブジェクトのフィルターエフェクトに追加した **カラーグレーディング** フィルターエフェクトのプロパティ上にある **「タブで編集」** ボタンから開く

タブを直接開いただけではどのエフェクトに対する操作なのかが決まらず、**「カラーグレーディングエフェクトが選択されていません。」** というメッセージが表示されます。フィルターエフェクトのプロパティ側からタブを開くと、そのエフェクトの値を編集できるようになります。

## 画面構成

タブは大きく 3 つのエリアに分かれています。

- **ヘッダー（上部）**: タブ名、数値エディタの表示切替ボタン、ホイールモード切替
- **数値エディタ列（中段）**: 各種補正値を数値で入力するエリア（折り返し配置）
- **カラーホイール（下部）**: ドラッグ操作で色味を調整するホイールが並ぶエリア

カラーグレーディングのエフェクトが削除された場合、このタブは自動的に閉じます。

## ヘッダー

### 数値エディタの表示切替

ヘッダー右側のえんぴつアイコンのトグルボタンで、数値エディタ列の表示/非表示を切り替えられます。
ホイールでざっくり調整するときは数値エディタを隠して画面を広く使い、細かい数値調整が必要なときだけ表示する、といった使い分けができます。

### ホイールモード切替

ヘッダー右端のプルダウンで、下段のカラーホイールの構成を切り替えます。

- **シャドウ / ミッドトーン / ハイライト**: 輝度の領域別に 3 つのホイールを表示
- **リフト / ガンマ / ゲイン / オフセット**: トーンカーブの底上げ・中間域の伸び・最大値・全体オフセットを 4 つのホイールで操作

## 数値エディタ

数値エディタの表示が有効な場合、以下の項目が折り返し配置で表示されます。値はドラッグやキー入力で変更できます。
値をアニメーションさせたい場合は、このタブではなくプロパティタブから操作してください。

| 項目 | 範囲 | 説明 |
|------|------|------|
| 色温度 | -100 〜 100 | 寒色 / 暖色のバランス |
| 色合い | -100 〜 100 | 緑 / マゼンタのバランス |
| 露出 | -5 〜 +5 EV | 全体の明るさ（指数的に効く） |
| コントラスト | -100 〜 100 | コントラストの強弱 |
| コントラストの中心点 | 0 〜 1 | コントラストをかける際の基準輝度 |
| 彩度 | -100 〜 100 | 全体の彩度 |
| 自然な彩度 | -100 〜 100 | 彩度が低い色を優先的に持ち上げる |
| 色相 | -180 〜 180 | 全体の色相回転（度） |
| 低域範囲 | 0 〜 100 | シャドウとミッドトーンの境界 |
| 高域範囲 | 0 〜 100 | ミッドトーンとハイライトの境界 |

低域範囲・高域範囲は、ホイールモードが「シャドウ / ミッドトーン / ハイライト」のときの領域分割に使われます。

## カラーホイール

### 共通操作

- **ホイール上をドラッグ**: ドラッグした方向に色味を移動
- **ホイール下のスライダーをドラッグ**: 明るさを変更

### モード別のホイール

- **シャドウ / ミッドトーン / ハイライト** モード
  - **シャドウ**: 暗部の色味
  - **ミッドトーン**: 中間調の色味
  - **ハイライト**: 明部の色味
  - 各領域の境界は数値エディタの「低域範囲」「高域範囲」で調整します。
- **リフト / ガンマ / ゲイン / オフセット** モード
  - **リフト**: 暗部を持ち上げる調整
  - **ガンマ**: 中間調のカーブ調整
  - **ゲイン**: 明部のスケーリング
  - **オフセット**: 全体への加算

## タブの状態保存

タブを閉じても、次回開いたときに以下の状態は復元されます。

- ホイールモードの選択
- 数値エディタの表示状態
- 関連付けられているカラーグレーディングエフェクト

## 関連ドキュメント

- [スコープ](./color-scopes.md)
- [カーブ](./curves.md)
- [タイムライン](./timeline.md)

## ソース

- [`ColorGradingTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ColorGradingTabExtension.cs)
- [`ColorGradingTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ViewModels/ColorGradingTabViewModel.cs)
- [`ColorGradingTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml.cs)
- [`ColorGradingResources.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Resources/ColorGradingResources.axaml)
- [`ColorGrading.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs)（フィルターエフェクト本体）
- [`ColorGradingWheel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/ColorGradingWheel.cs) / [`GradingColorPicker.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/GradingColorPicker.cs)（ホイールの操作ロジック）
- [`ColorGradingPropertiesEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingProperties/Views/ColorGradingPropertiesEditor.axaml.cs)（プロパティ側の「タブを開く」ボタン）

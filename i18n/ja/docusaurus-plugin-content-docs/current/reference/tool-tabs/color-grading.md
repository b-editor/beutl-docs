---
title: "カラーグレーディング"
description: "カラーグレーディングタブの役割と主な使い方を説明します。"
sidebar_position: 10
---

# カラーグレーディング

映像の **色調補正・色味の調整** を行うためのタブです。
[ベクトルスコープ](./color-scopes.md)と同じ配置のカラーホイールでトーン領域別（シャドウ・ミッドトーン・ハイライトなど）の色味を動かし、スライダーでホワイトバランス、トーン、カラーを調整できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる

## 開き方

タブを開く方法は次の 2 通りです。

- メニューバーの **「表示」→「ツール」→「カラーグレーディング」** から開く
- 描画オブジェクトのフィルターエフェクトに追加した **カラーグレーディング** フィルターエフェクトのプロパティ上にある **「タブで編集」** ボタンから開く

タブを直接開いただけではどのエフェクトに対する操作なのかが決まらず、**「カラーグレーディングエフェクトが選択されていません。」** というメッセージが表示されます。フィルターエフェクトのプロパティ側からタブを開くと、そのエフェクトの値を編集できるようになります。

## 画面構成

タブは 3 つの部分でできています。

- **ツールバー（上部）**: タブ名、**調整スライダーを表示**、**すべてリセット**、ホイールモード切替
- **調整スライダー**: **ホワイトバランス**、**トーン**、**カラー** の 3 つのグループに分かれたスライダー
- **カラーホイール**: 選んだモードのホイール。**シャドウ / ミッドトーン / ハイライト** モードでは、下に **輝度範囲** のバーが付きます。

配置はタブの形に合わせて変わります。

- 下部にドッキングしたときのような横長で低いタブでは、スライダーはホイールの横にスクロールできる列として並び、ホイールは 1 行のままです。
- 低いタブでその列を置く幅がないときは、スライダーの名前と数値ボックスだけをホイールの横に並べます。
- それ以外では、スライダーはホイールの上に並びます。

ホイールは使える高さの中央に配置されます。パッドが大きくなる場合は、操作部をパッドの横に移したり、列数を減らしたりします。表示される数値が配置を変えることはないので、ドラッグ中にホイールが動くことはありません。

いちばん小さいホイールでもタブの高さに収まらないときは、ツールバーの下の内容全体が 1 本のスクロールバーでまとめてスクロールし、ツールバーはその位置に残ります。

カラーグレーディングのエフェクトが削除された場合、このタブは自動的に閉じます。

## ツールバー

### 調整スライダーを表示

トグルボタンで調整スライダーの表示/非表示を切り替えます。ホイールを大きく表示したいときはスライダーを隠します。

### すべてリセット

エフェクトのすべての値を既定値に戻します。元に戻す操作 1 回で取り消せます。各プロパティのリセットと同じく、既定値を値、または編集中のキーフレームに書き込み、式やほかのキーフレームはそのまま残します。

### ホイールモード切替

ツールバー右端のプルダウンで、カラーホイールの構成を切り替えます。

- **シャドウ / ミッドトーン / ハイライト**: 輝度の領域別に 3 つのホイールを表示
- **リフト / ガンマ / ゲイン / オフセット**: トーンカーブの底上げ・中間域の伸び・最大値・全体オフセットを 4 つのホイールで操作

## 調整スライダー

| グループ | スライダー | 範囲 |
|----------|------------|------|
| ホワイトバランス | 色温度 | -100 〜 100 |
| ホワイトバランス | 色かぶり補正 | -100 〜 100 |
| トーン | 露出 | -5 〜 5 EV |
| トーン | コントラスト | -100 〜 100 |
| トーン | ピボット | 0 〜 1 |
| カラー | 彩度 | -100 〜 100 |
| カラー | バイブランス | -100 〜 100 |
| カラー | 色相 | -180 〜 180 |

**ピボット** はエフェクトの **コントラストのピボット** で、コントラストをかける際の基準輝度です。色温度は寒色と暖色、色かぶり補正は緑とマゼンタのバランスを調整し、バイブランスは彩度の低い色を優先的に持ち上げます。

各スライダーはプロパティの範囲全体にわたり、塗りは既定値から始まります。レールを押すとその位置の値になり、つまみを押すとその位置のまま掴みます。ドラッグはポインターに追従し、`Alt`（macOS では `Command`）を押すと 10 分の 1 の速さになります。ダブルクリックで既定値に戻ります。横の数値ボックスに値や計算式を入力することもできます。[計算式の入力](./element-property.md#typing-calculations)を参照してください。

ドラッグ中に `Esc` を押すか元に戻す操作をすると、値はドラッグを始めたときの値に戻ります。再生を始めると、ドラッグはその時点の値のまま終わります。これは、スライダー、ホイールとその R、G、B のボックス、**輝度範囲** のバーのどのドラッグでも同じです。

各スライダーにはプロパティタブと同じ **⋮** メニューがあり、ここからキーフレームの追加、アニメーションの編集、式の設定ができます。式で値が決まるスライダーは式の結果を表示し、動かすと式の下の値を編集します。[式の下の値を編集する](../../get-started/keyframe.md#editing-under-an-expression)を参照してください。

## カラーホイール

各ホイールは、ベクトルスコープと同じ配置の円盤上のパックです。Cb 軸が右、Cr 軸が上を向いているので、パックをある色相へ動かすと、スコープの軌跡も同じ方向に動きます。

- **円盤をドラッグ**: 輝度を保ったまま色の彩度成分（クロマ）を動かします。`Alt`（macOS では `Command`）を押すと 10 分の 1 の距離だけ動きます。数値のボックスのドラッグと同じく、ドラッグが 3 ピクセル動いてからカーソルを隠すので、クリックやダブルクリックではカーソルは隠れません。[エディター設定](../../settings/editor.md#プロパティエディター)の **ポインターロックを有効化** を参照してください。
- **円盤をダブルクリック**: 輝度を保ったままクロマを取り除きます。
- **円盤の下のジョグをドラッグ**: R、G、B に同じ量を加え、その領域を明るく、または暗くします。
- **数値ボックス**: R、G、B を個別に `0.01` 刻みで設定します。
- **リセットボタン**: ホイールをニュートラルに戻します。ガンマとゲインは `1`、それ以外は `0` です。

各ホイールにも、キーフレームと式を扱う **⋮** メニューがあり、式のあるホイールはスライダーと同じく式の下の値を編集します。このとき R、G、B のボックスの 1 つに入力したりドラッグしたりすると、そのチャンネルだけが変わります。

### モード別のホイール

- **シャドウ / ミッドトーン / ハイライト** モード
  - **シャドウ**: 暗部の色味
  - **ミッドトーン**: 中間調の色味
  - **ハイライト**: 明部の色味
  - **輝度範囲** のバーで、各領域の境界である **ローレンジ** と **ハイレンジ** を設定します。2 つのハンドル（互いを越えずに止まります）をドラッグするか、横のボックスに値を入力します。
- **リフト / ガンマ / ゲイン / オフセット** モード
  - **リフト**: 暗部を持ち上げる調整
  - **ガンマ**: 中間調のカーブ調整
  - **ゲイン**: 明部のスケーリング
  - **オフセット**: 全体への加算

## タブの状態保存

タブを閉じても、次回開いたときに以下の状態は復元されます。

- ホイールモードの選択
- 調整スライダーの表示状態
- 関連付けられているカラーグレーディングエフェクト

## 関連ドキュメント

- [スコープ](./color-scopes.md)
- [カーブ](./curves.md)
- [タイムライン](./timeline.md)

## ソース

- [`ColorGradingTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ColorGradingTabExtension.cs)
- [`ColorGradingTabViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/ViewModels/ColorGradingTabViewModel.cs)
- [`ColorGradingTabView.axaml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml.cs)
- [`ColorGradingResources.axaml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Resources/ColorGradingResources.axaml)
- [`ColorGrading.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs)（フィルターエフェクト本体）
- [`ColorGradingWheel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/ColorGradingWheel.cs) / [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs)（ホイールの操作ロジック）
- [`NumberSliderEditor.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/NumberSliderEditor.cs) / [`TonalRangeSlider.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/TonalRangeSlider.cs)（スライダー）
- [`ColorGradingPropertiesEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingProperties/Views/ColorGradingPropertiesEditor.axaml.cs)（プロパティ側の「タブで編集」ボタン）
- [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs) / [`HeaderScrubGesture.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Controls/PropertyEditors/HeaderScrubGesture.cs)（ホイールのドラッグが始まるタイミング）
- [`NumberEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Editor.Components/PropertyEditors/ViewModels/NumberEditorViewModel.cs) / [`GradingColorEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Editor.Components/PropertyEditors/ViewModels/GradingColorEditorViewModel.cs)（式の下の値の編集）
- [`GradingContentPanel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/ColorGradingTab/Views/GradingContentPanel.cs) / [`ColorGradingWheel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Controls/PropertyEditors/ColorGradingWheel.cs) / [`DragSession.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/Helpers/DragSession.cs)（低いタブのスクロール、式の下での 1 チャンネルの編集、ドラッグの終わり方）

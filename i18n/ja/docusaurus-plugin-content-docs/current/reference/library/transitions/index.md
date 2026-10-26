---
sidebar_position: 3
title: "トランジション"
description: "タイムラインの要素の先頭と末尾に設定する組み込みトランジション。"
---

# トランジション

要素の先頭や末尾で映像を切り替えます。フィルターエフェクトとは別に、要素の境界に設定します。追加・編集の操作は[タイムライン](../../tool-tabs/timeline.md)を参照してください。

## ライブラリでの場所

「ライブラリ」 → トランジション

| トランジション | 表示 | 追加のプロパティ |
| --- | --- | --- |
| クロスディゾルブ | 不透明なクリップの不透明度を保ちながら、2 つの映像を徐々に切り替えます。 | なし |
| フェード | 前の映像を透明にしてから、次の映像を表示します。中間点では下のレイヤーが見えます。 | なし |
| ワイプ | 直線状の境界を動かし、その後ろに次の映像を表示します。 | 方向 |
| カラーへのディップ | 指定した単色を経由して切り替えます。 | 色。既定値は黒 (`Colors.Black`) |
| ホワイトへのディップ | 白を経由して切り替えます。 | なし |
| プッシュ | 次の映像が入ると同時に、前の映像を画面外へ押し出します。 | 方向 |
| スライド | 静止した前の映像の上に、次の映像が滑り込みます。 | 方向 |
| クロスズーム | 前の映像を拡大し、次の映像を縮小しながら、両者を徐々に切り替えます。 | なし |
| アイリス | 画面中央から広がる円の内側に、次の映像を表示します。 | なし |
| スプリット | 画面中央から広がる帯の内側に、次の映像を表示します。 | 向き |

## プロパティ

### 長さ (Duration)

境界の片側が受け持つ時間です。同じレイヤーで隣接する要素の切り替えでは、前の要素の終了のトランジションは境界より前、次の要素の開始のトランジションは境界より後に配置されます。トランジション中に各要素の時間範囲を超える部分では、その端のフレームを保持します。

- **型:** `MediaTime`
- **既定値:** `00:00:00.5`（0.5 秒）
- **アニメーション:** 不可
- **範囲:** `[00:00:00, 01:00:00]`

クリップ間の共有境界に追加すると、エディターは初期の長さを両側に等分します（各0.25秒）。隣接クリップのない端では0.5秒を使います。[トランジション](../../tool-tabs/transition.md)も参照してください。

### イージング (Easing)

トランジションの進み方を指定します。始点や終点を超えるイージング曲線は、その端で止まります。

- **型:** `Easing`
- **既定値:** `LinearEasing`
- **アニメーション:** 不可

### 方向 (Direction)

ワイプ・プッシュ・スライドで使用します。**左から右**・**右から左**・**上から下**・**下から上** から選択します。

- **型:** `ClipTransitionDirection`
- **既定値:** `LeftToRight`（左から右）
- **アニメーション:** 不可

### 色 (Color)

カラーへのディップで使用します。

- **型:** `Color`
- **既定値:** `Colors.Black`
- **アニメーション:** 不可

### 向き (Orientation)

スプリットで使用します。**水平** は縦の帯を左右に広げ、**垂直** は横の帯を上下に広げます。

- **型:** `ClipTransitionOrientation`
- **既定値:** `Horizontal`（水平）
- **アニメーション:** 不可

## 使い方

境界の両側にトランジションがある場合、見た目は次の要素の開始のトランジションで決まり、前の要素は終了のトランジションの長さを加えます。隣接する要素がない場合は透明な状態との間で切り替わり、下のレイヤーが見えます。

## ソース

- [`LibraryRegistrar.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/LibraryRegistrar.cs)
- [`ClipTransition.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Transitions/ClipTransition.cs)
- [`組み込みトランジション`](https://github.com/b-editor/beutl/tree/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Transitions)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.ja.resx)
- [`Strings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/Strings.ja.resx)
- [`ElementAttributeService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/ElementAttributeService.cs)

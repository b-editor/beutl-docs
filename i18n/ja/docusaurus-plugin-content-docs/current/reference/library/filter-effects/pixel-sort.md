---
title: "ピクセルソート"
description: "指定した方向に沿って、明度や色相でピクセルをソートします。"
sidebar_position: 35
---

# ピクセルソート

指定した `ソート方向` に沿って、明度や色相（`ソートキー`）でピクセルを並べ替えます。並べ替えの対象は `閾値最小` / `閾値最大` でフィルタされます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ピクセルソート

## プロパティ

### ソート方向 (Direction)

ソートを実行する方向（水平 / 垂直）。

- **型:** `PixelSortDirection`
- **既定値:** `PixelSortDirection.Horizontal`
- **アニメーション:** 不可

### ソートキー (SortKey)

ソートキーに使う属性（色相 / 輝度 など）。

- **型:** `PixelSortKey`
- **既定値:** `PixelSortKey.Luminance`
- **アニメーション:** 不可

### 閾値最小 (ThresholdMin)

ソート対象とするキー値の下限。

- **型:** `float`
- **既定値:** `25`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 閾値最大 (ThresholdMax)

ソート対象とするキー値の上限。

- **型:** `float`
- **既定値:** `80`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 昇順 (Ascending)

`true` のとき昇順、`false` のとき降順でソートします。

- **型:** `bool`
- **既定値:** `true`
- **アニメーション:** 不可

## 使い方

`昇順 = false`、`ソート方向 = 垂直` で下方向に「溶ける」表現になります。しきい値範囲を狭めるとハイライトのみ・シャドウのみのソートに絞れます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/PixelSortEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PixelSortEffect.cs)

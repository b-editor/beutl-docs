---
title: "均等に分割"
description: "レイヤーを等間隔のタイルに分割します。"
sidebar_position: 25
---

# 均等に分割

指定した分割数と間隔で、レイヤーを規則的なタイル状に分割します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 均等に分割

## プロパティ

### 水平分割数 (HorizontalDivisions)

グリッドの列分割数。

- **型:** `int`
- **既定値:** `2`
- **アニメーション:** 可
- **範囲:** `[1, ∞)`

### 垂直分割数 (VerticalDivisions)

グリッドの行分割数。

- **型:** `int`
- **既定値:** `2`
- **アニメーション:** 可
- **範囲:** `[1, ∞)`

### 水平方向の間隔 (HorizontalSpacing)

列間の隙間（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 垂直方向の間隔 (VerticalSpacing)

行間の隙間（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/SplitEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SplitEffect.cs)

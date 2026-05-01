---
title: "二階調化"
description: "輝度のしきい値で 2 階調化します。"
sidebar_position: 14
---

# 二階調化

ピクセルごとの輝度を `量` と比較して 2 階調化します。`なめらかさ` でエッジの滑らかさを、`強さ` で原画と二値画の混合比を制御します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 二階調化

## プロパティ

### 量 (Value)

輝度のしきい値（0〜1）。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### なめらかさ (Smoothness)

しきい値付近の滑らかな遷移の幅。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 強さ (Strength)

原画と二値画の混合比（0 で原画、1 で完全二値）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Threshold.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Threshold.cs)

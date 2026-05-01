---
title: "ネガポジ"
description: "色チャンネルごとに反転処理を行います。"
sidebar_position: 22
---

# ネガポジ

色チャンネルごとに反転処理を行います。`赤` / `緑` / `青` でチャンネル単位の反転、`強さ` で結果のミックス比を指定します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ネガポジ

## プロパティ

### 赤 (Red)

赤チャンネルの反転対象値（0 / 255 で完全反転）。

- **型:** `int`
- **既定値:** `0`
- **アニメーション:** 可

### 緑 (Green)

緑チャンネルの反転対象値。

- **型:** `int`
- **既定値:** `0`
- **アニメーション:** 可

### 青 (Blue)

青チャンネルの反転対象値。

- **型:** `int`
- **既定値:** `0`
- **アニメーション:** 可

### 強さ (Strength)

原画と反転結果のミックス比。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Negaposi.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Negaposi.cs)

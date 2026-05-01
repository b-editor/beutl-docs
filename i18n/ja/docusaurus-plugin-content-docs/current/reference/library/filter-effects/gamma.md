---
title: "ガンマ"
description: "レイヤーにガンマ補正を適用します。"
sidebar_position: 16
---

# ガンマ

指定した指数でガンマ補正を適用します。ガンマが小さいと中間調が暗く、大きいと明るくなります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ガンマ

## プロパティ

### 量 (Amount)

ガンマ指数（1 で変化なし）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[1, 300]`

### 強さ (Strength)

補正後と原画のミックス比（0 で原画、1 で完全補正）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

log → linear や linear → display 変換に使います。`強さ` で原画とのミックス比を調整できます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Gamma.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Gamma.cs)

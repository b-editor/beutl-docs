---
title: "反転"
description: "レイヤーの色を反転します。"
sidebar_position: 19
---

# 反転

レイヤーの色を反転します。`量` で反転強度を、`Alphaチャンネルを除外` を有効にするとアルファは反転されません。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 反転

## プロパティ

### 量 (Amount)

反転強度（0 で原画、1 で完全反転）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### Alphaチャンネルを除外 (ExcludeAlphaChannel)

`true` のとき、アルファは変更しません。

- **型:** `bool`
- **既定値:** `true`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Invert.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Invert.cs)

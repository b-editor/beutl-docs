---
title: "ハイコントラスト"
description: "コントラストを強調します。グレースケールや反転モードも併用できます。"
sidebar_position: 9
---

# ハイコントラスト

コントラストを強調し、オプションで彩度を落としたり反転させたりします。アクセシビリティ用のチェックや、スタイライズされたモノクロ表現に便利です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ハイコントラスト

## プロパティ

### グレースケール (Grayscale)

`true` のとき、結果をグレースケール化します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

### 反転モード (InvertStyle)

反転モード（None / Brightness / All）。

- **型:** `HighContrastInvertStyle`
- **既定値:** `HighContrastInvertStyle.NoInvert`
- **アニメーション:** 可

### コントラスト (Contrast)

加算するコントラスト量（正で強調）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## 使い方

`コントラスト` を正の値にして、`グレースケール` でモノクロ化、`反転モード` で全色反転または輝度のみの反転を選びます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs)

---
title: "波紋屈折"
description: "水面越しに見たように、レイヤーを波の場で屈折させます。"
sidebar_position: 42
---

# 波紋屈折

水面越しに見たように、レイヤーを正弦波の場で屈折させます。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 波紋屈折

## プロパティ

### 変位量 (Amount)

各軸方向の最大の変位量（コンポジション単位）。

- **型:** `float`
- **既定値:** `8`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 波長 (Wavelength)

波 1 つ分の長さ（コンポジション単位）。

- **型:** `float`
- **既定値:** `64`
- **アニメーション:** 可
- **範囲:** `(0, ∞)`

### 位相（度） (Phase)

波のずれを度で指定します。アニメーションさせると波が動きます。ある時刻の結果は、どのようにシークしても同じです。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## 使い方

`変位量` と `波長` で波紋の大きさを決め、`位相（度）` にキーフレームを追加して動かします。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs)

- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.ja.resx)

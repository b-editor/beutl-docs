---
title: "色ずれ"
description: "RGB とアルファの各チャンネルを個別にずらして色収差風の演出を行います。"
sidebar_position: 29
---

# 色ずれ

色チャンネル（R / G / B / A）ごとに独立してずらし、色収差やグリッチ風の表現を作ります。サンプル位置をチャンネル単位でシフトします。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 色ずれ

## プロパティ

### 赤オフセット (RedOffset)

赤チャンネルのピクセルオフセット。

- **型:** `PixelPoint`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### 緑オフセット (GreenOffset)

緑チャンネルのピクセルオフセット。

- **型:** `PixelPoint`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### 青オフセット (BlueOffset)

青チャンネルのピクセルオフセット。

- **型:** `PixelPoint`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### 透明度オフセット (AlphaOffset)

アルファチャンネルのピクセルオフセット。

- **型:** `PixelPoint`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs)

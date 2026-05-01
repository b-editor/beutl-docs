---
title: "クロマキー"
description: "色相範囲を抜いてグリーン / ブルーバックを除去します。"
sidebar_position: 23
---

# クロマキー

色相範囲を抜いてグリーン / ブルーバックを除去します。HSV 空間で各ピクセルを目標色と比較し、色相幅・彩度幅・境界の柔らかさを調整できます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → クロマキー

## プロパティ

### 色 (Color)

キーとなる色（例：スクリーンの緑）。

- **型:** `Color`
- **既定値:** `#00000000` (透明)
- **アニメーション:** 可

### 色相範囲 (HueRange)

キー色から許容する色相の差。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 彩度範囲 (SaturationRange)

キー色から許容する彩度の差。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 境界補正 (Boundary)

マットエッジの柔らかさ。

- **型:** `float`
- **既定値:** `2`
- **アニメーション:** 可

## 使い方

スクリーンの色を取得し、影の色のばらつきまで拾うために `色相範囲` を広げ、`境界補正` でエッジを柔らかくします。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ChromaKey.cs)

---
title: "フラットシャドウ"
description: "レイヤーから平面（ロング）シャドウを投影します。"
sidebar_position: 4
---

# フラットシャドウ

指定した角度と長さでフラット（ロング）シャドウを投影します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → フラットシャドウ

## プロパティ

### 角度 (Angle)

シャドウの方向（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 長さ (Length)

シャドウの伸びる長さ。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### ブラシ (Brush)

シャドウを塗るブラシ。

- **型:** `Brush?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 影のみ (ShadowOnly)

シャドウのみを出力します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 使い方

レトロ / フラットデザイン風の「ロングシャドウ」演出に使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs)

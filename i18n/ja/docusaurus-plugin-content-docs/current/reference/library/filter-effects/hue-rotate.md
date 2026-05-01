---
title: "色相調整"
description: "レイヤーの色相を回転させます。"
sidebar_position: 10
---

# 色相調整

レイヤーのすべての色を色相環上で回転させます。彩度と輝度は保たれます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 色相調整

## プロパティ

### 角度 (Angle)

色相の回転角度（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## 使い方

角度 を 0° → 360° にアニメーションすると色がレインボーに循環します。小さなオフセットでカラーコレクションにも使えます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/HueRotate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/HueRotate.cs)

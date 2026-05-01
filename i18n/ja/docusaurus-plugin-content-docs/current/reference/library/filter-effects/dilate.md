---
title: "膨張"
description: "不透明な領域を膨張させます（モルフォロジーの膨張処理）。"
sidebar_position: 7
---

# 膨張

モルフォロジー処理の膨張。軸ごとの半径だけ不透明領域を拡張します。見える領域を太らせる効果があります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 膨張

## プロパティ

### 半径X (RadiusX)

水平方向の膨張半径（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 半径Y (RadiusY)

垂直方向の膨張半径（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Dilate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Dilate.cs)

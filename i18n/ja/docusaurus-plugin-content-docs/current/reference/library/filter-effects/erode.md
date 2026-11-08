---
title: "収縮"
description: "不透明な領域を収縮させます（モルフォロジーの収縮処理）。"
sidebar_position: 8
---

# 収縮

モルフォロジー処理の収縮。軸ごとの半径だけ不透明領域を縮めます。見える領域を細らせる効果があります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 収縮

## プロパティ

### 半径X (RadiusX)

水平方向の収縮半径（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 半径Y (RadiusY)

垂直方向の収縮半径（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

プロパティパネルでは、**半径X** と **半径Y** が 1 つの **半径** の行にまとめて表示されます。[1 行にまとめて表示される値](../../../get-started/keyframe.md#joined-rows)を参照してください。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Erode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Erode.cs)

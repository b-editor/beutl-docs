---
title: "ドロップシャドウ"
description: "レイヤーの背後に影を落とします。"
sidebar_position: 2
---

# ドロップシャドウ

レイヤーの後ろにガウスぼかしを掛けたシャドウを描画します。シャドウは `位置` で指定した分オフセットされ、指定した色で描画されます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ドロップシャドウ

## プロパティ

### 位置 (Position)

シャドウのオフセット（X / Y、ピクセル）。

- **型:** `Point`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### シグマ (Sigma)

シャドウのぼかし半径（ピクセル）。

- **型:** `Size`
- **既定値:** `(0, 0)`
- **アニメーション:** 可
- **範囲:** `[(0, 0), (∞, ∞))`

### 色 (Color)

シャドウの色。

- **型:** `Color`
- **既定値:** `#00FFFFFF` (透明な白)
- **アニメーション:** 可

### 影のみ (ShadowOnly)

`true` のとき、シャドウのみを出力（元レイヤーは非表示）。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/DropShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DropShadow.cs)

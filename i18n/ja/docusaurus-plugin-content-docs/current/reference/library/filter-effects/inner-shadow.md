---
title: "内側シャドウ"
description: "レイヤーの内側にシャドウを追加します。"
sidebar_position: 3
---

# 内側シャドウ

レイヤーの内側にシャドウを描画します。形状の外から光が当たり、内側に影が落ちるような表現です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 内側シャドウ

## プロパティ

### 位置 (Position)

内側シャドウのオフセット（X / Y、ピクセル）。

- **型:** `Point`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### シグマ (Sigma)

内側シャドウのぼかし半径。

- **型:** `Size`
- **既定値:** `(0, 0)`
- **アニメーション:** 可
- **範囲:** `[(0, 0), (∞, ∞))`

### 色 (Color)

内側シャドウの色。

- **型:** `Color`
- **既定値:** `#00FFFFFF` (透明)
- **アニメーション:** 可

### 影のみ (ShadowOnly)

シャドウのみを出力します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 使い方

凹みのある UI 状態・浮き彫り文字・くぼんだ形状などに最適です。控えめなドロップシャドウと併用すると立体感が増します。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/InnerShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/InnerShadow.cs)

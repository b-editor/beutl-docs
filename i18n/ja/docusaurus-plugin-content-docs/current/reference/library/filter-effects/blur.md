---
title: "ぼかし"
description: "レイヤーにガウスぼかしを適用します。"
sidebar_position: 1
---

# ぼかし

水平・垂直のシグマを独立に指定できる、可分形ガウスぼかしを適用します。シグマが大きいほどぼけが強くなります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ぼかし

## プロパティ

### シグマ (Sigma)

ガウスのシグマ（ピクセル。X が水平、Y が垂直）。

- **型:** `Size`
- **既定値:** `(0, 0)`
- **アニメーション:** 可
- **範囲:** `[(0, 0), (∞, ∞))`

## 使い方

1〜4 px 程度ならソフトフォーカス、より大きい値で背景ボケや靄の表現になります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Blur.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Blur.cs)

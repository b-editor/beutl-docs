---
title: "モザイク"
description: "レイヤーをモザイク状のブロックにピクセル化します。"
sidebar_position: 28
---

# モザイク

指定した `タイルサイズ` のブロックでレイヤーをモザイク化します。`起点` でグリッドの位置揃えを制御します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → モザイク

## プロパティ

### タイルサイズ (TileSize)

各モザイクタイルの幅と高さ。

- **型:** `Size`
- **既定値:** `(10, 10)`
- **アニメーション:** 可
- **範囲:** `[(0.0001, 0.0001), (∞, ∞))`

### 起点 (Origin)

モザイクグリッドの整列に使う基準点。

- **型:** `RelativePoint`
- **既定値:** `RelativePoint.Center`
- **アニメーション:** 可

## 使い方

プライバシー保護のぼかし（`タイルサイズ` をアニメーションするとスキャン風の出現になります）や、8 ビット調のスタイライズに使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/MosaicEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/MosaicEffect.cs)

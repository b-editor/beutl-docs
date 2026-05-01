---
title: "カラーキー"
description: "RGB 距離をもとに特定の色範囲を除去します。"
sidebar_position: 24
---

# カラーキー

RGB 距離に基づいて特定の色範囲を除去します。`クロマキー` よりも単純で厳格な手法で、単色のキーに向きます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → カラーキー

## プロパティ

### 色 (Color)

除去する色。

- **型:** `Color`
- **既定値:** `#00000000` (透明)
- **アニメーション:** 可

### 輝度範囲 (Range)

ピクセル一致判定に使う RGB 距離のしきい値。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 境界補正 (Boundary)

マットエッジでの滑らかな減衰幅。

- **型:** `float`
- **既定値:** `2`
- **アニメーション:** 可

## 使い方

対象の色を選び、不要な色が消えるまで `輝度範囲` を広げ、`境界補正` でエッジを柔らかく整えます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/ColorKey.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorKey.cs)

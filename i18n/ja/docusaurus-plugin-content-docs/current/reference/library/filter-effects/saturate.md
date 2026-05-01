---
title: "彩度調整"
description: "色の彩度を調整します。"
sidebar_position: 13
---

# 彩度調整

色の彩度を調整します。`量` が 100 で素のまま、100 より大きいと彩度が上がり、100 より小さいと低下します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 彩度調整

## プロパティ

### 量 (Amount)

彩度の倍率（100 が原寸、0 でグレースケール、>100 で過彩度）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

## 使い方

`量` を 0 にするとフルグレースケール、100 より大きいと派手な「パンチ」のある絵になります。アニメーションで色の出現 / 消失を強調できます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Saturate.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Saturate.cs)

---
title: "平行光源"
description: "一方向からシーンを照らす平行光源です。"
sidebar_position: 6
---

# 平行光源

:::caution 試験的な機能

この 3D 機能は開発中であり、API は予告なく変更される可能性があります。

:::

太陽光のようにシーン全体を一方向から照らすライトです。距離による減衰はありません。

## ライブラリでの場所

「ライブラリ」 → 3D（実験的） → 平行光源

## プロパティ

### 方向 (Direction)

ライトの照射方向。

- **型:** `Vector3`
- **既定値:** `(0.5, 1, 1)`
- **アニメーション:** 可

### 影の距離 (ShadowDistance)

シャドウをサンプリングする最大距離。

- **型:** `float`
- **既定値:** `5000`
- **アニメーション:** 可
- **範囲:** `[1, 100000]`

### シャドウマップサイズ (ShadowMapSize)

シャドウマップの正投影範囲の幅・高さ。大きくすると広い領域を覆いますが、影の品質は低下します。

- **型:** `float`
- **既定値:** `2000`
- **アニメーション:** 可
- **範囲:** `[1, 50000]`

## 共通プロパティ

このオブジェクトは `3Dライト` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## ソース

[`src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs)

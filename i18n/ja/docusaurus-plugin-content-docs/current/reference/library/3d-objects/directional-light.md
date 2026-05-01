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
- **既定値:** `(0, -1, 0)`
- **アニメーション:** 可

### 影の距離 (ShadowDistance)

シャドウをサンプリングする最大距離。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[1, 1000]`

### シャドウマップサイズ (ShadowMapSize)

シャドウマップの解像度（大きいほど鮮明だが負荷も高い）。

- **型:** `float`
- **既定値:** `20`
- **アニメーション:** 可
- **範囲:** `[1, 500]`

## 共通プロパティ

このオブジェクトは `3Dライト` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## ソース

[`src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/DirectionalLight3D.cs)

---
title: "点光源"
description: "一点から全方向に光を放つ点光源です。"
sidebar_position: 7
---

# 点光源

:::caution 試験的な機能

この 3D 機能は開発中であり、API は予告なく変更される可能性があります。

:::

一点から全方向に光を放つライトで、距離に応じて減衰します。

## ライブラリでの場所

「ライブラリ」 → 3D（実験的） → 点光源

## プロパティ

### 位置 (Position)

ライトのワールド座標。

- **型:** `Vector3`
- **既定値:** `(0, 0, 0)`
- **アニメーション:** 可

### 定数減衰 (ConstantAttenuation)

減衰式 `1 / (kc + kl·d + kq·d²)` の定数項。

- **型:** `float`
- **既定値:** `1.0`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 線形減衰 (LinearAttenuation)

減衰式の線形項。

- **型:** `float`
- **既定値:** `0.09`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 二次減衰 (QuadraticAttenuation)

減衰式の二次項。

- **型:** `float`
- **既定値:** `0.032`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 範囲 (Range)

ライトが届く最大距離。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

## 共通プロパティ

このオブジェクトは `3Dライト` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## ソース

[`src/Beutl.Engine/Graphics3D/Lighting/PointLight3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/PointLight3D.cs)

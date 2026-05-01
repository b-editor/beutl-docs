---
title: "振動"
description: "レイヤーにランダムな振動（シェイク）を加えます。"
sidebar_position: 30
---

# 振動

パーリンノイズを使ったランダムなシェイクを適用します。`強さX` / `強さY` で軸ごとの振幅、`スピード` でノイズの時間進行を制御します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 振動

## プロパティ

### 強さX (StrengthX)

水平方向のシェイク振幅。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可

### 強さY (StrengthY)

垂直方向のシェイク振幅。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可

### スピード (Speed)

ベースノイズの時間進行速度。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

## 使い方

衝撃・爆発・ドロップに合わせた「カメラシェイク」演出に使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/ShakeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ShakeEffect.cs)

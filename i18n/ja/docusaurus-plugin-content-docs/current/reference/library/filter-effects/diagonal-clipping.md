---
title: "斜めクリッピング"
description: "角度を付けた直線や帯に沿ってレイヤーを切り抜きます。"
sidebar_position: 38
---

# 斜めクリッピング

角度を付けた直線や帯に沿ってレイヤーを切り抜きます。`幅` の正負によって、帯のどちら側を残すかが変わります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 斜めクリッピング

## プロパティ

### 角度 (Angle)

切り抜きの境界線の角度を度で指定します。

- **型:** `float`
- **既定値:** `45`
- **アニメーション:** 可

### 位置 (Position)

元の描画範囲の中心から境界線までの距離をピクセルで指定します。境界線に対して垂直な方向に移動します。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 幅 (Width)

正負の符号を持つ帯の幅をピクセルで指定します。`0` は境界線の片側を切り落とします。正の値は帯の外側を切り落として帯を残し、負の値は帯の内側を切り落とします。絶対値が帯の幅です。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## 使い方

`位置` をアニメーションさせると、斜めの境界線から画像を表示できます。帯状の部分を残すには `幅` を正の値にし、帯状にくり抜くには負の値にします。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/DiagonalClipping.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/DiagonalClipping.cs)

- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.ja.resx)

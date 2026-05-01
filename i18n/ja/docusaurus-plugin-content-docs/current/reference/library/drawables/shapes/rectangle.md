---
title: "矩形"
description: "幅と高さから矩形を描画します。"
sidebar_position: 2
---

# 矩形

幅と高さで定義される領域を矩形として描画します。角は鋭角です。角を丸めたい場合は [角丸四角形](./rounded-rectangle.md) を使ってください。

## ライブラリでの場所

「ライブラリ」 → 矩形

## プロパティ

### 幅 (Width)

矩形の幅（ピクセル）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 高さ (Height)

矩形の高さ（ピクセル）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

## 共通プロパティ

このオブジェクトは `シェイプ` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

背景やテキストの背景、合成のベースシェイプとして利用できます。ストロークで枠線、塗りつぶしで塗りを設定し、トランスフォームで回転や拡大縮小を行えます。

## ソース

[`src/Beutl.Engine/Graphics/Shapes/RectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs)

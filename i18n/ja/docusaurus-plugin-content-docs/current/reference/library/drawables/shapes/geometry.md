---
title: "ジオメトリー"
description: "任意のパスを描画します。"
sidebar_position: 4
---

# ジオメトリー

任意のパスを描画します。

## ライブラリでの場所

「ライブラリ」 → ジオメトリー

## プロパティ

### データ (Data)

描画するパスデータ。線分やベジェ曲線などのセグメントを組み合わせて定義します。

- **型:** `Geometry?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `シェイプ` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

セグメントを組み合わせて、ロゴ・アイコン・カスタム吹き出しといった複雑な形状を描けます。他のシェイプオブジェクトと同じく塗りつぶしやストロークを設定できます。

## ソース

[`src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs)

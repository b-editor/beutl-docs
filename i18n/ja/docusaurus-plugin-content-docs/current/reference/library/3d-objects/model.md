---
title: "モデル"
description: "外部の 3D モデルファイルを読み込んで描画します。"
sidebar_position: 5
---

# モデル

:::caution 試験的な機能

この 3D 機能は開発中であり、API は予告なく変更される可能性があります。

:::

外部ファイル（読み込み機能が対応する形式）から 3D モデルを読み込み、`3Dシーン` 内で描画します。

## ライブラリでの場所

「ライブラリ」 → 3D（実験的） → モデル

## プロパティ

### ソース (Source)

読み込む 3D モデルファイル。

- **型:** `ModelSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `3Dグループ` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## ソース

[`src/Beutl.Engine/Graphics3D/Models/Model3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Models/Model3D.cs)

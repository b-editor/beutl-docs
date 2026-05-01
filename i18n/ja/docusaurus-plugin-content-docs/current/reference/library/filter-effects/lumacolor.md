---
title: "LumaColor"
description: "レイヤーの輝度をアルファにマッピングしてルミナンスマットを作成します。"
sidebar_position: 12
---

# LumaColor

レイヤーのピクセルごとの輝度をアルファにマッピングし、輝度マットを生成します。明るい部分は不透明に、暗い部分は透明になります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → LumaColor

## プロパティ

_このオブジェクト固有のプロパティはありません。_

## 使い方

白黒素材からスクリーン / 乗算系のマットを作ったり、輝度パスからアルファを生成したりする用途に便利です。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/LumaColor.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/LumaColor.cs)

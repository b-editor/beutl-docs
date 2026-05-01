---
title: "ブレンド"
description: "指定したブレンドモードでレイヤーを合成します。"
sidebar_position: 21
---

# ブレンド

指定した `ブラシ` と `ブレンドモード` で合成します。ブラシによる塗りをレイヤーの上にそのブレンドモードで重ねるのと同等です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ブレンド

## プロパティ

### ブラシ (Brush)

レイヤーの上に合成するブラシ。

- **型:** `Brush?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### ブレンドモード (BlendMode)

合成に使うブレンドモード。

- **型:** `BlendMode`
- **既定値:** `BlendMode.SrcIn`
- **アニメーション:** 可

## 使い方

ブラシ（グラデーションや単色）を選び、`乗算` / `スクリーン` / `オーバーレイ` などのブレンドモードで色被りやスタイライズを加えます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/BlendEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/BlendEffect.cs)

---
title: "シャープ"
description: "各ピクセルと周囲との差を強めて、細部を際立たせます。"
sidebar_position: 43
---

# シャープ

ピクセルの明るさと、その周囲をぼかした明るさとの差を加え直して、細部を際立たせます（アンシャープマスク）。変えるのは明るさだけなので、エッジに色のにじみは出ません。透明な周囲のピクセルは計算に入らないため、要素の縁にハローが出ず、形も変わりません。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → シャープ

## プロパティ

### 量 (Amount)

差をどれだけ強く加え直すかをパーセントで指定します。`100` で差を 1 回分加えます。`0` ではレイヤーは変わりません。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 半径 (Radius)

各ピクセルと比べるぼかしの半径を、コンポジション上の単位で指定します。小さい半径は細かな部分をシャープにし、大きい半径は局所的なコントラストを上げます。`0` ではレイヤーは変わりません。

- **型:** `float`
- **既定値:** `3`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### しきい値 (Threshold)

これより小さな差は強調しません。ノイズを目立たせたくないときに上げます。明るさの全範囲に対するパーセントで、暗部でも明部でも同じ意味になります。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

細部には小さな `半径` から始め、エッジがくっきり見えるまで `量` を上げます。粒子や圧縮ノイズが目立ってきたら、`しきい値` を少し上げます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Sharpen.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/Sharpen.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.ja.resx)

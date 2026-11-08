---
title: "ボケ"
description: "レンズの絞りの形にレイヤーをぼかし、明るい点を円形や多角形として目立たせます。"
sidebar_position: 44
---

# ボケ

ピントの外れたレンズのように、レイヤーの各点をレンズの絞りの形（円形または多角形）に広げます。[ぼかし](./blur.md)と違い、明るい点がその形として現れます。サンプルは設定だけで決まるので、再生でもシークでも同じフレームは同じ見た目になります。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ボケ

## プロパティ

### 半径 (Radius)

点が広がる距離を、コンポジション上の単位で指定します。`0` ではレイヤーは変わりません。

- **型:** `float`
- **既定値:** `12`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 絞りの形 (Shape)

`円形` または `多角形`。

- **型:** `BokehShape`
- **既定値:** `BokehShape.Circle`
- **アニメーション:** 不可

### 辺の数 (Sides)

多角形の辺の数です。`絞りの形` が `多角形` のときに使います。

- **型:** `int`
- **既定値:** `6`
- **アニメーション:** 可
- **範囲:** `[3, 12]`

### 回転 (Rotation)

多角形を時計回りに回す角度（度）です。`0` では角の 1 つが真上を向きます。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### ハイライトの強調 (Highlight)

明るい部分を広げる前に明るくして、形として目立たせます。単位はパーセントで、`100` で 2 倍の明るさになります。リニアの輝度 `0.5` から強調が始まり、基準の白（`1`）以上で最大になります。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 品質 (Quality)

`低`、`標準`、`高` から選びます。サンプルを増やすほど形がきれいになり、時間がかかります。`高` は `低` の約 3 倍かかります。

- **型:** `BokehQuality`
- **既定値:** `BokehQuality.Medium`
- **アニメーション:** 不可

## 使い方

ピントの外れた点の大きさに合わせて `半径` を設定します。羽根のある絞りの見た目にするには `多角形` と `辺の数` を選び、照明や反射が形として目立つまで `ハイライトの強調` を上げます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Bokeh.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/Bokeh.cs)

- [`BokehShape.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/BokehShape.cs) / [`BokehQuality.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/BokehQuality.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.ja.resx)

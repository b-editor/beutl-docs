---
title: "ブルーム"
description: "レイヤーの明るい部分の周囲にリニア光の発光を加えます。"
sidebar_position: 40
---

# ブルーム

レイヤーのハイライトを抽出してぼかし、リニア光の発光として元の画像に加えます。HDR のハイライトは明るさを保ちます。`アルファを保持` がオフの場合、発光はレイヤーの縁の外側まで広がります。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ブルーム

## プロパティ

### 半径 (Radius)

発光の広がりをコンポジション上の半径で指定します。

- **型:** `float`
- **既定値:** `12`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### しきい値 (Threshold)

発光させる部分を選ぶリニア光の明るさの基準です。`1` が基準の白です。

- **型:** `float`
- **既定値:** `0.5`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 滑らかさ (%) (SoftKnee)

明るさのしきい値付近を滑らかにします。`0` は急な境界、`100` は明るさ 0 からしきい値の 2 倍まで徐々に変化します。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 強度 (Intensity)

発光の強さの倍率です。`0` で無効、`1` が標準の強さです。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### アルファを保持 (PreserveAlpha)

`true` のとき、レイヤーの輪郭を広げず、元のアルファで発光をマスクします。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 使い方

発光させたい部分が選ばれるまで `しきい値` を下げ、`半径` と `強度` を調整します。発光する部分としない部分の境界が急に見えるときは `滑らかさ` を上げます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Bloom.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/Bloom.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.ja.resx)

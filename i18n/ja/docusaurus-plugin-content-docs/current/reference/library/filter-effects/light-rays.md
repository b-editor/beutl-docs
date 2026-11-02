---
title: "光線"
description: "レイヤーのハイライトを中心から外側へ伸ばし、元の画像に重ねて合成します。"
sidebar_position: 41
---

# 光線

レイヤーのハイライトを中心から外側へ伸ばし、元の画像に重ねて合成します。光線はレイヤーの縁の外側まで伸びることがあります。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 光線

## プロパティ

### 中心 (Center)

入力画像全体を基準にした光線の中心です。画像の外側にも配置できます。

- **型:** `RelativePoint`
- **既定値:** `(50%, 50%)`
- **アニメーション:** 可

### 長さ (%) (Length)

中心からの距離に対する伸び率です。`100` で距離が 2 倍になり、`0` で光線を無効にします。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 減衰 (%) (Decay)

光線に沿って光を弱めます。`0` は均一な強さで、値が大きいほど早く弱まります。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 強度 (Intensity)

光の強さの倍率です。`0` で無効、`1` が標準の強さです。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### しきい値 (Threshold)

光らせる部分を選ぶリニア光の明るさの基準です。`1` が基準の白です。

- **型:** `float`
- **既定値:** `0.5`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 滑らかさ (%) (SoftKnee)

明るさのしきい値付近を滑らかにします。`0` は急な境界、`100` は明るさ 0 からしきい値の 2 倍まで徐々に変化します。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

`中心` を光源の上か背後に置き、`長さ` と `減衰` で光線の届く範囲を調整します。動く光源に合わせるには `中心` をアニメーションさせます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/LightRays.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightRays.cs)

- [`LightEffectPasses.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Graphics/FilterEffects/LightEffectPasses.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Language/GraphicsStrings.ja.resx)

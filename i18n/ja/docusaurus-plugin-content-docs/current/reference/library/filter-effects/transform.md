---
title: "トランスフォーム"
description: "オブジェクト本体の `トランスフォーム` プロパティとは独立に、フィルターとして 2D トランスフォームを適用します。"
sidebar_position: 27
---

# トランスフォーム

描画オブジェクト自身の `トランスフォーム` プロパティとは独立に、エフェクトチェーン上で 2D トランスフォームを適用します。エフェクトチェーン内に複数のトランスフォームを重ねられます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → トランスフォーム

## プロパティ

### トランスフォーム (Transform)

適用するトランスフォーム。

- **型:** `Transform?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### トランスフォームの起点 (TransformOrigin)

トランスフォームの基準点。

- **型:** `RelativePoint`
- **既定値:** `RelativePoint.Center`
- **アニメーション:** 可

### ビットマップ補間モード (BitmapInterpolationMode)

トランスフォーム時のピクセルサンプリングモード。

- **型:** `BitmapInterpolationMode`
- **既定値:** `Media.BitmapInterpolationMode.Default`
- **アニメーション:** 可

### ApplyToTarget

エフェクトチェーンに複数の描画ターゲットがある場合（テキストオブジェクトの `文字ごとに分割`、または `均等に分割` / `パーツごとに分割` を事前に適用した場合など）の挙動を制御します。

- `true`: 各ターゲットをそれぞれ独自の起点でトランスフォームします。
- `false`: 全ターゲットを合成した結果に対し、共通の起点で 1 度だけトランスフォームを適用します。

- **型:** `bool`
- **既定値:** `true`
- **アニメーション:** 可

## 使い方

他のフィルターエフェクトの間にトランスフォームを挟みたいときに便利です。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/TransformEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/TransformEffect.cs)

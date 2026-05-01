---
title: "ディスプレイスメントマップ"
description: "ディスプレイスメントマップとして用いて画像を歪ませます。"
sidebar_position: 31
---

# ディスプレイスメントマップ

ディスプレイスメントマップの色情報をピクセル単位のオフセットとして用いて、画像を歪ませます。`チャンネル` で選択したチャンネルが水平・垂直のずれを駆動します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ディスプレイスメントマップ

## プロパティ

### ディスプレイスメントマップ (DisplacementMap)

ディスプレイスメントを駆動するブラシ。

- **型:** `Brush?`
- **既定値:** `放射グラデーション`（中心が白で外側が透明）
- **アニメーション:** 不可

### トランスフォーム (Transform)

マップをサンプルする前に適用するトランスフォーム。

- **型:** `DisplacementMapTransform?`
- **既定値:** `移動トランスフォーム`
- **アニメーション:** 不可

### 広がり方 (SpreadMethod)

マップを端で折り返す方法（Pad / Reflect / Repeat）。

- **型:** `GradientSpreadMethod`
- **既定値:** `GradientSpreadMethod.Pad`
- **アニメーション:** 可

### チャンネル (Channel)

ディスプレイスメントを駆動するマップのチャンネル。

- **型:** `DisplacementMapChannel`
- **既定値:** `DisplacementMapChannel.Alpha`
- **アニメーション:** 不可

### 符号あり (Signed)

`true` のとき、0.5 を変位ゼロとする符号付きモードになります。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 不可

### ディスプレイスメントマップを表示 (ShowDisplacementMap)

`true` のとき、デバッグ用にマップ自体を表示します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 使い方

ノイズパターン・グラデーション・動画クリップなどをマップとして使います。マップ側の `トランスフォーム` をアニメーションすると流れるような歪みになります。`ディスプレイスメントマップを表示` でデバッグ表示できます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DisplacementMapEffect.cs)

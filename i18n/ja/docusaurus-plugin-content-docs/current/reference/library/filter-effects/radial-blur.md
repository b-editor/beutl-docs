---
title: "放射ブラー"
description: "中心から外側へ、または中心の周囲を回るようにぼかします。"
sidebar_position: 37
---

# 放射ブラー

`ズーム` では中心から外側へ、`回転` では中心の周囲を回るようにレイヤーをぼかします。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 放射ブラー

## プロパティ

### 種類 (Mode)

`ズーム` または `回転` を選びます。

- **型:** `RadialBlurMode`
- **既定値:** `RadialBlurMode.Zoom`（ズーム）
- **アニメーション:** 不可

### 中心 (Center)

元の描画範囲を基準にしたブラーの中心。

- **型:** `RelativePoint`
- **既定値:** `(50%, 50%)`
- **アニメーション:** 可

### 強さ (Amount)

`ズーム` では拡大率をパーセントで、`回転` では全体の回転角度を度で指定します。`0` では画像を変更しません。

- **型:** `float`
- **既定値:** `10`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### サンプル数 (Samples)

ブラーの作成に使うサンプルの数。増やすと滑らかになりますが、描画の負荷も増えます。

- **型:** `int`
- **既定値:** `32`
- **アニメーション:** 可
- **範囲:** `[2, 128]`

## 使い方

動きの起点に `中心` を合わせ、`強さ` を調整します。中心に近づいたり遠ざかったりするような動きには `ズーム`、回るような動きには `回転` を使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/RadialBlur.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/RadialBlur.cs)

- [`RadialBlurMode.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/RadialBlurMode.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/GraphicsStrings.ja.resx)

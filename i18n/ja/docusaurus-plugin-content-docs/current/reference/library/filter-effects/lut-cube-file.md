---
title: "LUT (Cubeファイル)"
description: "`.cube` ファイルから読み込んだ 3D LUT を適用します。"
sidebar_position: 20
---

# LUT (Cubeファイル)

`.cube` ファイルから読み込んだ 3D LUT を適用します。`強さ` で LUT 適用の強度を制御します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → LUT (Cubeファイル)

## プロパティ

### ソース (Source)

適用する `.cube` LUT ファイル。

- **型:** `CubeSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 強さ (Strength)

LUT の混合比（0 で原画、100 でフル LUT）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

`.cube` ファイルを `ソース` に割り当てます。フルでなく 50〜80% 程度の `強さ` から始めると自然になります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/LutEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/LutEffect.cs)

---
title: "スケール"
description: "レイヤーを X / Y / 全体スケールで拡大縮小します。"
sidebar_position: 3
---

# スケール

レイヤーを拡大縮小します。`スケール` が等方の倍率、`X拡大率` / `Y拡大率` がそれぞれの軸独自の倍率（`スケール` に乗算されます）。

## ライブラリでの場所

「ライブラリ」 → トランスフォーム → スケール

## プロパティ

### スケール (Scale)

等方の倍率をパーセントで指定します（`100` が原寸）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

### X拡大率 (ScaleX)

水平方向の倍率（`Scale` と乗算）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

### Y拡大率 (ScaleY)

垂直方向の倍率（`Scale` と乗算）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

## 使い方

`スケール` を `0` → `100` にアニメーションすればポップアップ的な出現を作れます。片軸だけ負の値にするとミラー反転します。

## ソース

[`src/Beutl.Engine/Graphics/Transformation/ScaleTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/ScaleTransform.cs)

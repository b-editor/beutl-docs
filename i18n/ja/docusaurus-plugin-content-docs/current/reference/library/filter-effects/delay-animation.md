---
title: "遅延アニメーション"
description: "後続のエフェクトの適用タイミングを遅らせます。"
sidebar_position: 34
---

# 遅延アニメーション

内包するエフェクトチェーンの適用時刻を一定時間だけ遅らせます。ずらし出現や残響的アニメーションに便利です。
複数の描画ターゲットが必要なため、テキストオブジェクトに適用する場合は `文字ごとに分割` を有効にしてください。それ以外のオブジェクトに適用する場合は `均等に分割` または `パーツごとに分割` を事前のエフェクトに追加してください。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 遅延アニメーション

## プロパティ

### ディレイ (Delay)

遅延量（秒）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### フィルタエフェクト (Effect)

タイミングを遅らせるエフェクトチェーン。

- **型:** `FilterEffect?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 使い方

時間でアニメーションするエフェクトを指定すれば残響風の表現が作れます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/DelayAnimationEffect.cs)

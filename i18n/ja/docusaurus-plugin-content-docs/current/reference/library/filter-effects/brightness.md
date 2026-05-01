---
title: "輝度"
description: "全体の輝度を調整します。"
sidebar_position: 15
---

# 輝度

1 つの倍率で全体の輝度を調整します。100 より大きいと明るく、小さいと暗くなります。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 輝度

## プロパティ

### 量 (Amount)

輝度の倍率。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

## 使い方

本格的なグレーディング前のクイックな明るさ補正に使います。非線形な制御が必要なら `ガンマ` を選んでください。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Brightness.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Brightness.cs)

---
title: "パス追従"
description: "パスに沿わせるように移動させます。"
sidebar_position: 32
---

# パス追従

指定したパスに沿って移動させます。`進捗` で位置を制御し、`回転に追従` を有効にするとレイヤーの向きもパスに合わせます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → パス追従

## プロパティ

### ジオメトリ (Geometry)

追従するパスのジオメトリー。

- **型:** `Geometry?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 進捗 (Progress)

パス上の位置（0 が始点、100 が終点）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 回転に追従 (FollowRotation)

`true` のとき、レイヤーの向きをパスの接線に合わせます。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 使い方

曲線に沿ってテキストや画像を動かす演出に使います。`進捗` のキーフレームと `回転に追従` を組み合わせると自然な「カーブに沿った」動きになります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/PathFollowEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PathFollowEffect.cs)

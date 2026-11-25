---
title: "パーツごとに分割"
description: "連結成分ごとに個別のサブターゲットへ分割します。"
sidebar_position: 26
---

# パーツごとに分割

連結した不透明領域ごとに、レイヤーを別々のターゲットへ分割します。各連結成分が独立したターゲットになり、以降のエフェクトで個別に変形できます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → パーツごとに分割

## プロパティ

_このオブジェクト固有のプロパティはありません。基底クラスから継承される共通プロパティのみが利用できます。_

## 使い方

1 つのトランスフォームで個別パーツごとにアニメーションさせたいときに使います（例：文字ごと・図形ごとの独立アニメーション）。

このエフェクトの後に[遅延アニメーション](./delay-animation.md)や[範囲アニメーター](./range-animator.md)を置くと、パーツを 1 つずつ順に動かしたり、選んだ範囲のパーツだけを変化させたりできます。ここで分けたパーツはテキストでも 1 つずつ数えるので、これらの `単位` は効きません。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/PartsSplitEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/PartsSplitEffect.cs)

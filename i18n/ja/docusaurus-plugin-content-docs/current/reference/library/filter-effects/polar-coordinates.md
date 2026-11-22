---
title: "極座標"
description: "レイヤーの横の帯を中心の周りの輪に曲げるか、輪を帯に展開します。"
sidebar_position: 48
---

# 極座標

レイヤーの横の帯を中心の周りの輪に曲げるか、輪を横の帯に展開します。変換はレイヤーの範囲に内接する楕円に合わせるので、正方形でないレイヤーは楕円に沿って巻き付きます。2 つの方向は互いに逆の変換です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 極座標

## プロパティ

### 方向 (Direction)

レイヤーをどちらの向きに変換するかです。

- **型:** `PolarCoordinatesDirection`
- **既定値:** `PolarCoordinatesDirection.RectangularToPolar`（直交座標から極座標へ）
- **アニメーション:** 不可

選べる値は次のとおりです。

- `直交座標から極座標へ`: レイヤーの最上行が中心に、最下行が楕円の縁に移ります。左端が 12 時の位置から始まって時計回りに巻き付き、右端が同じ位置で左端とつながります。楕円の外側の四隅は透明になります。
- `極座標から直交座標へ`: その逆です。12 時の位置から時計回りに測った角度が左から右へ、中心からの距離が上から下へ並ぶので、輪は横の帯に、放射状の線は縦の線になります。

### 量 (Amount)

各ピクセルを変換先の位置へどれだけ動かすかをパーセントで指定します。`0` ではレイヤーを変更せず、`100` で変換を完全に適用します。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

1 行のテキストやグラデーションのような横長の帯に `直交座標から極座標へ` を適用すると、輪の形に巻き付けられます。`量` を `0` から `100` までアニメーションさせると、レイヤーが少しずつ輪に曲がっていきます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinates.cs)

- [`PolarCoordinatesDirection.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/PolarCoordinatesDirection.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.ja.resx)

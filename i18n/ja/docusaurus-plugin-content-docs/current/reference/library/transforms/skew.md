---
title: "歪み"
description: "レイヤーを X / Y 軸方向に傾けます。"
sidebar_position: 2
---

# 歪み

レイヤーに水平／垂直方向のスキュー（傾き）を適用します。角度は度で指定します。

## ライブラリでの場所

「ライブラリ」 → トランスフォーム → 歪み

## プロパティ

### X傾き (SkewX)

水平方向のスキュー角度（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### Y傾き (SkewY)

垂直方向のスキュー角度（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

## 使い方

5〜20° 程度の浅い角度でスタイライズされた文字や疑似イタリック効果を作ります。`描画オブジェクト` の `トランスフォームの起点` と組み合わせて支点を制御します。

## ソース

[`src/Beutl.Engine/Graphics/Transformation/SkewTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/SkewTransform.cs)

---
title: "不透明度"
description: "パーツごとにフェードできるフィルターエフェクトとして、レイヤーを透明にします。"
sidebar_position: 49
---

# 不透明度

レイヤーを透明にします。描画オブジェクト自体の[不透明度](../common-properties.md#不透明度-opacity)と違ってフィルターエフェクトなので、[遅延アニメーション](./delay-animation.md)の中に入れて、テキストの文字などのパーツを 1 つずつ順にフェードさせられます。色を透明度と一緒に縮めるので、HDR の素材など白より明るい色も、フェードの途中で頭打ちになりません。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 不透明度

## プロパティ

### 不透明度 (Opacity)

不透明度をパーセントで指定します。`100` ではレイヤーを変更せず、`0` で完全に透明にします。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

文字を 1 つずつ順にフェードインさせるには、`文字ごとに分割` をオンにしたテキストの[遅延アニメーション](./delay-animation.md)の中にこのエフェクトを追加し、`不透明度` に `0` から `100` へのキーフレームを打ちます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/OpacityEffect.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/OpacityEffect.cs)

- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.ja.resx)

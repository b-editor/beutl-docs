---
title: "タイムストレッチ"
description: "音の高さを保ったまま再生速度を変更します。"
sidebar_position: 6
---

# タイムストレッチ

音の高さを保ったまま、音声信号の再生速度を変更します。

## ライブラリでの場所

「ライブラリ」 → オーディオエフェクト → タイムストレッチ

## プロパティ

### 速度 (%) (Speed)

再生速度をパーセントで指定します。`100` は通常速度、`50` は半分、`200` は2倍の速度です。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[25, 400]`

## 使い方

サウンドのオーディオエフェクトに追加し、`速度 (%)` を調整すると、音の高さを変えずに音声を遅くしたり速くしたりできます。キーフレームで `速度 (%)` をアニメーションさせると、時間とともに速度を変えられます。

## ソース

[`src/Beutl.Engine/Audio/Effects/TimeStretchEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/TimeStretchEffect.cs)

- [`TimeStretchParameters.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/TimeStretchParameters.cs)
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/AudioStrings.ja.resx)

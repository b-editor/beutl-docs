---
title: "イコライザー"
description: "10 バンドのパラメトリックイコライザーを音声に適用します。"
sidebar_position: 2
---

# イコライザー

帯域ごとに音量をブースト／カットできるマルチバンドのパラメトリックイコライザーです。

## ライブラリでの場所

「ライブラリ」 → オーディオエフェクト → イコライザー

## プロパティ

### バンド数 (BandCountOption)

バンド数のプリセット。多いほど細かく周波数を制御できます。

- **型:** `BandCountPreset`
- **既定値:** `BandCountPreset.Bands10`
- **アニメーション:** 不可

## ソース

[`src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs)

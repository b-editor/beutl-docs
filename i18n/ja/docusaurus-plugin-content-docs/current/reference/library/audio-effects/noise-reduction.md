---
title: "ノイズ除去"
description: "音声からノイズレベルを学習し、持続する背景ノイズを低減します。"
sidebar_position: 7
---

# ノイズ除去

ヒスノイズ、ハムノイズ、ファンの音、室内の環境音など、持続する背景ノイズを低減します。音声からノイズレベルを継続的に学習するため、別途ノイズのサンプルを用意する必要はありません。

## ライブラリでの場所

「ライブラリ」 → オーディオエフェクト → ノイズ除去

## プロパティ

### 低減量 (dB) (Reduction)

検出したノイズを減衰させる最大量。`0` では音声を変更しません。大きくするほどノイズを強く除去しますが、処理による違和感も目立ちやすくなります。

- **型:** `float`
- **既定値:** `12`
- **アニメーション:** 可
- **範囲:** `[0, 48]`

### 感度 (dB) (Sensitivity)

学習したノイズレベルに近い音をどれだけノイズとみなすかを調整します。揺らぎのあるノイズには高くし、息づかいや子音などの小さな音が失われる場合は低くします。

- **型:** `float`
- **既定値:** `3`
- **アニメーション:** 可
- **範囲:** `[0, 24]`

### スムージング (%) (Smoothing)

低減の度合いを時間方向にどれだけ滑らかに変化させるかを調整します。高くすると残ったノイズが揺らぐような違和感を抑え、低くすると小さな音への反応が速くなります。

- **型:** `float`
- **既定値:** `50`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 適応時間 (秒) (Adaptation)

ノイズレベルの学習に使う過去の音声の長さを秒で指定します。これより長く続く音もノイズとみなされることがあります。

- **型:** `float`
- **既定値:** `2`
- **アニメーション:** 可
- **範囲:** `[0.5, 10]`

## 使い方

既定値から始め、小さな音が失われないか聴きながら `低減量 (dB)` を上げます。長く伸ばす音を含む音楽では `適応時間 (秒)` を長くし、背景ノイズが変化する場合は短くします。

## ソース

[`src/Beutl.Engine/Audio/Effects/NoiseReductionEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/NoiseReductionEffect.cs)

- [`NoiseReductionParameters.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/NoiseReductionParameters.cs)
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/AudioStrings.ja.resx)

---
title: "スペクトログラム"
description: "時間方向の音声スペクトログラムを可視化します。"
sidebar_position: 3
---

# スペクトログラム

音声のスペクトログラム（周波数 × 時間 × 強度）を表示窓内で可視化します。音楽や音声のパターン把握に便利です。

## ライブラリでの場所

「ライブラリ」 → オーディオビジュアライザー → スペクトログラム

## プロパティ

### 表示時間（秒） (WindowSeconds)

表示する時間窓の長さ（秒）。

- **型:** `float`
- **既定値:** `4`
- **アニメーション:** 可
- **範囲:** `[0.01, 3600]`

### FFTサイズ (FftSize)

時間列ごとに用いる FFT サイズ。

- **型:** `int`
- **既定値:** `512`
- **アニメーション:** 不可
- **範囲:** `[64, 16384]`

### 下限（dB） (FloorDb)

dB の下限。それより小さい値は最も暗い色にマップされます。

- **型:** `float`
- **既定値:** `-80`
- **アニメーション:** 可
- **範囲:** `[-200, 0]`

### 時間方向の分割数 (TimeColumns)

時間方向に描画する列数。

- **型:** `int`
- **既定値:** `256`
- **アニメーション:** 不可
- **範囲:** `[2, 2048]`

### 周波数軸 (FrequencyScale)

周波数軸のスケール。

- **型:** `FrequencyScale`
- **既定値:** `FrequencyScale.Logarithmic`
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `オーディオビジュアライザー` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

`ソース` にシーン参照（音声）を設定し、現在のシーンを設定することで、音声と同期したスペクトログラムを表示できます。

## ソース

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrogramDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioSpectrogramDrawable.cs)

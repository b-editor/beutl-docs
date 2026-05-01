---
title: "音声波形"
description: "音声信号を波形として可視化します。"
sidebar_position: 1
---

# 音声波形

接続された `サウンド` を時間領域の波形として可視化します。振幅の時間変化を横方向に描く古典的な波形表示です。

## ライブラリでの場所

「ライブラリ」 → オーディオビジュアライザー → 音声波形

## プロパティ

### 形状 (Shape)

各サンプルの描画形状（バー・線など）。

- **型:** `WaveformShape?`
- **既定値:** 最小最大バー (`MinMaxBarWaveformShape`)
- **アニメーション:** 不可

以下に使用可能な形状を示します。
- ブロック
- ドット
- 包絡線塗り
- 上下対称塗り
- 折れ線
- 最小最大バー
- 放射状

### バー数 (BarCount)

1 フレームあたりに描画するバー（サンプル）の数。

- **型:** `int`
- **既定値:** `256`
- **アニメーション:** 不可
- **範囲:** `[1, 10000]`

### 表示時間（秒） (WindowSeconds)

表示する時間窓の長さ（秒）。

- **型:** `float`
- **既定値:** `0.1`
- **アニメーション:** 可
- **範囲:** `[0.01, 3600]`

## 共通プロパティ

このオブジェクトは `オーディオビジュアライザー` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

`ソース` にシーン参照（音声）を設定し、現在のシーンを設定することで、音声と同期した波形を表示できます。

## ソース

[`src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioWaveformDrawable.cs)

---
title: "カーブ"
description: "マスター・RGB・HSV のカーブで階調を調整します。"
sidebar_position: 18
---

# カーブ

マスターカーブ、チャンネル別 RGB カーブ、HSV 同士のクロスカーブ（hue vs saturation など）を提供する、精密な階調・カラーシェイピングツールです。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → カーブ

## プロパティ

### カスタム(RGB) (MasterCurve)

全チャンネルに適用するマスター階調カーブ。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0) から (1,1) への直線）
- **アニメーション:** 不可

### レッドカーブ (RedCurve)

赤チャンネル専用の階調カーブ。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0) から (1,1) への直線）
- **アニメーション:** 不可

### グリーンカーブ (GreenCurve)

緑チャンネル専用の階調カーブ。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0) から (1,1) への直線）
- **アニメーション:** 不可

### ブルーカーブ (BlueCurve)

青チャンネル専用の階調カーブ。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0) から (1,1) への直線）
- **アニメーション:** 不可

### 色相 vs 色相 (HueVsHue)

色相 → 色相のマッピング（特定の色相だけ別の色相にシフト）。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0.5) から (1,0.5) への直線）
- **アニメーション:** 不可

### 色相 vs 彩度 (HueVsSaturation)

色相 → 彩度のマッピング（特定色相の彩度を上下）。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0.5) から (1,0.5) への直線）
- **アニメーション:** 不可

### 色相 vs 輝度 (HueVsLuminance)

色相 → 輝度のマッピング（特定色相を明るく / 暗く）。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0.5) から (1,0.5) への直線）
- **アニメーション:** 不可

### 輝度 vs 彩度 (LuminanceVsSaturation)

輝度 → 彩度のマッピング（例：ハイライトの彩度を下げる）。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0.5) から (1,0.5) への直線）
- **アニメーション:** 不可

### 彩度 vs 彩度 (SaturationVsSaturation)

彩度 → 彩度のマッピング（既存の彩度を圧縮 / 伸張）。

- **型:** `CurveMap`
- **既定値:** `LinearCurve`（(0,0.5) から (1,0.5) への直線）
- **アニメーション:** 不可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Curves.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Curves.cs)

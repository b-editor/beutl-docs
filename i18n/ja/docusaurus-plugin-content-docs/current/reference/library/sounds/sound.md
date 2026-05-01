---
title: "サウンド"
description: "音声ファイルをサウンドソースとして読み込みます。"
sidebar_position: 1
---

# サウンド

音声ファイル（WAV / MP3 / OGG など）をサウンドソースとして読み込みます。信号は再生時にデコードされ、プロジェクトのサンプリングレートにリサンプルされます。

## ライブラリでの場所

「ライブラリ」 → サウンド

## プロパティ

### ソース (Source)

再生する音声ファイル。

- **型:** `SoundSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `サウンド` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

音声ファイルをタイムラインにドロップして追加できます。継承された `ゲイン`（音量）と `スピード`（速度）で調整し、`音声エフェクト` を連結して処理できます。

## ソース

[`src/Beutl.Engine/Audio/SourceSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SourceSound.cs)

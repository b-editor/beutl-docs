---
title: "サウンド"
description: "音声ファイルをサウンドソースとして読み込みます。"
sidebar_position: 1
---

# サウンド

音声ファイル（WAV / MP3 / OGG など）をサウンドソースとして読み込みます。信号は再生時にデコードされ、プロジェクトのサンプリングレートにリサンプルされます。クリップはソースのチャンネルを保ち、パンナーで[プロジェクトのスピーカー配置](../../../get-started/multichannel-audio.md)に配置されます。

## ライブラリでの場所

「ライブラリ」 → サウンド

## プロパティ

### ソース (Source)

再生する音声ファイル。

- **型:** `SoundSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### チャンネルの割り当て (ChannelMap)

このクリップが使うソースのチャンネルを指定します。**自動** はソース自身のチャンネルをそのまま使い、**モノラル**、**ステレオ**、**5.1ch**、**7.1ch** ではクリップの各チャンネルにソースのチャンネルまたは **なし** を割り当てます。[ソースのチャンネルを割り当てる](../../../get-started/multichannel-audio.md#ソースのチャンネルを割り当てる)を参照してください。

- **型:** `AudioChannelMap`
- **既定値:** `AudioChannelMap.Auto`（自動）
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `サウンド` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

音声ファイルをタイムラインにドロップして追加できます。継承された `ゲイン`（音量）と `スピード`（速度）で調整し、`音声エフェクト` を連結して処理できます。音の配置には継承されたパンナーのプロパティを使います。クリップを無音の部分で切るには[無音区間で自動分割](../../tool-tabs/silence-split.md)を参照してください。

## ソース

[`src/Beutl.Engine/Audio/SourceSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SourceSound.cs)

- [`AudioChannelMap.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelMap.cs)

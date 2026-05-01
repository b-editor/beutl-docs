---
title: "シーン参照（音声）"
description: "別のシーンの音声出力を参照します。"
sidebar_position: 2
---

# シーン参照（音声）

別のシーンの音声出力を参照し、現在のシーンの音声にミックスします。

## ライブラリでの場所

「ライブラリ」 → シーン参照（音声）

## プロパティ

### 参照するシーン (ReferencedScene)

音声を取り込む参照先のシーン。

- **型:** `Scene?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `サウンド` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

参照先シーンの映像と音声の両方を取り込みたい場合は `SceneDrawable` と併用してください。

## ソース

[`src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs)

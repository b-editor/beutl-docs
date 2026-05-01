---
title: "画像"
description: "静止画ファイルを描画オブジェクトとして読み込みます。"
sidebar_position: 2
---

# 画像

静止画（PNG / JPEG / WebP など）を描画オブジェクトとして読み込みます。画像はネイティブ解像度で描画されるため、拡大縮小や位置調整は `トランスフォーム` プロパティで行います。

## ライブラリでの場所

「ライブラリ」 → 画像

## プロパティ

### ソース (Source)

表示する画像ファイル。

- **型:** `ImageSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `描画オブジェクト` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

画像をタイムラインにドロップして使用します。

## ソース

[`src/Beutl.Engine/Graphics/SourceImage.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/SourceImage.cs)

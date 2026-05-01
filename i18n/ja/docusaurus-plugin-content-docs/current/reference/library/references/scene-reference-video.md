---
title: "シーン参照（動画）"
description: "別のシーンの映像出力を参照します。"
sidebar_position: 1
---

# シーン参照（動画）

別のシーンの映像出力を参照し、現在のシーンに描画オブジェクトとして組み込みます。参照先のシーンは入力が変化するたびに再評価されます。

## ライブラリでの場所

「ライブラリ」 → シーン参照（動画）

## プロパティ

### 参照するシーン (ReferencedScene)

出力を取り込む参照先のシーン。

- **型:** `Scene?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `描画オブジェクト` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

複数シーンを跨ぐ構成に便利です。ロゴ・下三分の一テロップ・イントロなどの再利用可能な要素を 1 度だけ作り、複数のシーンから参照して使い回せます。

## ソース

[`src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs)

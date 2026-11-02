---
title: "ストローク"
description: "レイヤーの周囲にアウトライン（ストローク）を描画します。"
sidebar_position: 5
---

# ストローク

レイヤーの不透明領域の周囲にアウトライン（ストローク）を描画します。ペンの **重ね順** で、ストロークを元レイヤーの上に描くか下に描くかを選べます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ストローク

## プロパティ

### ストローク (Pen)

ストロークの色・太さ・破線などを記述する Pen。**重ね順**（`StrokeOrder`）で描画の順序を指定します。**塗りの前面**（既定）はストロークを元レイヤーの上に、**塗りの背面** は元レイヤーをストロークの上に描画します。[ストローク (Pen)](../common-properties.md#ストローク-pen) を参照してください。

- **型:** `Pen?`
- **既定値:** 新しい `Pen`
- **アニメーション:** 不可

### オフセット (Offset)

元レイヤーに対するストロークのオフセット。

- **型:** `Point`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

## 以前のバージョンのプロジェクト

以前の **ボーダースタイル**（`Style`）プロパティは、ペンの **重ね順** に移りました。保存された `Foreground` は **塗りの背面** として、`Background` は **塗りの前面** として読み込まれるので、描画の順序は変わりません。**重ね順** はアニメーションできないため、キーフレームや式で変化する `Style` は基準の値で読み込まれます。[バージョン間の互換性](../../../get-started/project-structure.md#version-compatibility)を参照してください。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

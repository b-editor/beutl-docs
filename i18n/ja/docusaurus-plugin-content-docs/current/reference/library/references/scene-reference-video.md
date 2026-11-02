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

出力を取り込む参照先のシーン。[参照先の選択](../../../get-started/edit-element.md#reference-targets)から、プロジェクト内の既存のシーンを指定します。循環参照になるシーンは候補に表示されません。

- **型:** `Scene?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### オフセット位置 (OffsetPosition)

参照先シーン内のどの時刻から再生を開始するか。

- **型:** `MediaTime`
- **既定値:** `00:00:00`
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `描画オブジェクト` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

複数シーンを跨ぐ構成に便利です。ロゴ・下三分の一テロップ・イントロなどの再利用可能な要素を 1 度だけ作り、複数のシーンから参照して使い回せます。スリップ、ロール、スライド、端のトリム、**オリジナルの長さに変更** は参照先シーンの長さに従います。単純な参照ではない式でシーンを選ぶと長さが分からないため、スリップとトリムは拒否されます。

## ソース

[`src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.ProjectSystem/ProjectSystem/SceneDrawable.cs)

- [`ReferencePropertyEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/ViewModels/ReferencePropertyEditorViewModel.cs)

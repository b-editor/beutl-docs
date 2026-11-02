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

音声を取り込む参照先のシーン。[参照先の選択](../../../get-started/edit-element.md#reference-targets)から、プロジェクト内の既存のシーンを指定します。循環参照になるシーンは候補に表示されません。

- **型:** `Scene?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `サウンド` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。

## 使い方

参照先シーンの映像と音声の両方を取り込みたい場合は `SceneDrawable` と併用してください。スリップ、ロール、スライド、端のトリム、**オリジナルの長さに変更** は参照先シーンの長さに従います。単純な参照ではない式でシーンを選ぶと長さが分からないため、スリップとトリムは拒否されます。パンナーはプロジェクトのスピーカー配置のミックスに働くので、[5.1ch / 7.1ch のプロジェクト](../../../get-started/multichannel-audio.md)では `パン` だけが適用されます。

## ソース

[`src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.ProjectSystem/ProjectSystem/SceneSound.cs)

- [`ReferencePropertyEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/ViewModels/ReferencePropertyEditorViewModel.cs)

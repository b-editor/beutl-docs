---
title: "ノードグラフ（エフェクト）"
description: "ノードグラフをカスタムフィルターエフェクトとして利用します。"
sidebar_position: 36
---

# ノードグラフ（エフェクト）

ノードグラフをカスタムフィルターエフェクトとして利用します。グラフは入力としてソースレイヤーを受け取り、フィルター後の出力を返します。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ノードグラフ（エフェクト）

## プロパティ

### モデル (Model)

フィルターを定義するノードグラフモデル。

- **型:** `GraphModel?`
- **既定値:** 空の `GraphModel`
- **アニメーション:** 不可

## 使い方

ノードグラフエディタを開いて、ポストプロセスのパイプラインを視覚的に組み立てます。

## ソース

[`src/Beutl.NodeGraph/NodeGraphFilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.NodeGraph/NodeGraphFilterEffect.cs)

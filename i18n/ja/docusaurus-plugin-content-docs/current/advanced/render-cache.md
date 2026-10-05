---
title: キャッシュ
description: 描画キャッシュの効果とプレビューを軽くするための設定を説明します
sidebar_position: 4
---

## キャッシュ

描画内容が変わっていない部分の結果を再利用すると、重いエフェクトを毎フレーム計算する負荷を減らせます。

たとえば、縁取りを付けた図形に影のアニメーションを付けた場合、変わっていない図形と縁取りの結果を再利用し、影を更新できます。変化する部分が少ない場面ほど、キャッシュの効果を得やすくなります。

## 設定

**設定 → エディター → ノードキャッシュ** で有効にできます。大きな描画内容もキャッシュするには最大ピクセル数を調整しますが、その分メモリを使用します。[エディター設定](../settings/editor.md#ノードキャッシュ)を参照してください。

## キャッシュ可能かの判断

キャッシュは自動で管理されます。描画内容やエフェクトを編集したり、アニメーションで値が変わったりすると、影響する部分が再描画されます。設定のサイズ制限に収まらない描画内容はキャッシュされないため、有効にしてもすべての場面で速くなるわけではありません。

## ソース

- [`RenderNodeCache.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCache.cs)
- [`RenderNodeCacheLifecycle.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCacheLifecycle.cs)

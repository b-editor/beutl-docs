---
title: キャッシュ
description: Beutlでの描画キャッシュの生成判定を説明します
sidebar_position: 4
---

## キャッシュ
このようなノードについて考えます。
```
1. 描画ノード
2. └ トランスフォームノード
3. 　 └ エフェクトノード (ドロップシャドウ, アニメーションあり)
4. 　 　 └ エフェクトノード (縁取り)
5. 　 　 　 └ 図形ノード
```
トランスフォームノード、図形ノードはアニメーションなし。

この例では数フレーム描画されると、
Beutlはエフェクトノード内の4までをキャッシュします。  
以下でなぜそうなるのかを説明します。

## キャッシュ可能かの判断

ノードが変更されず、正常に完了したフレーム描画またはキャッシュ準備のリクエストを3回積み重ねると、キャッシュを作成できる状態になります。境界の測定やヒットテストだけでは、このカウントを進めません。ノードが変更されると、カウントとキャッシュはリセットされます。

キャッシュの設定と、要求された描画領域・作業密度に応じて、実行計画がキャッシュの利用と作成を選択します。

## ソース

- [`RenderNodeCache.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCache.cs)
- [`RenderNodeCacheLifecycle.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Rendering/Cache/RenderNodeCacheLifecycle.cs)

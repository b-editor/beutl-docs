---
title: 音声エフェクトの実装
description: 独自のエフェクトで処理遅延の報告と音声末尾の排出を実装します。
sidebar_position: 5
---

`AudioEffect` は `CreateNode(AudioContext, AudioNode)` で処理用の `AudioNode` を作成します。

## 処理遅延の報告

`AudioEffect.GetLatencySamples(int sampleRate)` をオーバーライドし、出力サンプルレートでの処理遅延をサンプル数で報告します。既定はゼロです。`CreateNode` が生成するノードの報告と一致させ、エフェクトが無効な場合はゼロを返してください。

`AudioNode` には次のAPIがあります。

- `GetLatencySamples(int)`: ノード自身の遅延。
- `GetTotalLatencySamples(int)`: 自身の遅延と、最も遅い入力経路の遅延の合計。
- `GetDrainLatencySamples(int)`: 終端の処理直後に保持している遅延。アニメーションするパラメーターの終端値を利用できます。

サンプルレートは正の値を指定します。遅延は非負で、`int.MaxValue` は無制限または飽和した予算を表します。遅延の報告だけでは `Process` の出力は変わりません。

## 末尾の排出

`Flush(AudioProcessContext)` は連続した終端の `Process` 呼び出し直後に、保持している音声を排出します。単一入力のノードは入力側の末尾を `ProcessTail` で処理します。複数入力のノードでは、`Flush` をオーバーライドして各入力の末尾を排出・混合してください。

`ProcessTail` は渡されたバッファの所有権を受け取ります。別のバッファを返す場合は入力を破棄してください。例外を伝播する場合も、先に入力を破棄してください。排出中は、遅延に関係するアニメーションパラメーターを終端値に保持します。

クリップの自然な連続終端では、バッファに保持した処理遅延の末尾を維持できます。シーク・ループ・編集などの不連続点では、リセットにより破棄される場合があります。[リミッター](../reference/library/audio-effects/limiter.md)も参照してください。

## ソース

- [`AudioEffect.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Audio/Effects/AudioEffect.cs)
- [`AudioNode.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Audio/Graph/AudioNode.cs)

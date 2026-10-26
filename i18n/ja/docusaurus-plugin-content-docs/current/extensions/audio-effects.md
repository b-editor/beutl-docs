---
title: 音声エフェクトの実装
description: 独自のエフェクトで処理遅延の報告と音声末尾の排出を実装します。
sidebar_position: 5
---

`AudioEffect` は `CreateNode(AudioContext, AudioNode)` で処理用の `AudioNode` を作成します。

## 処理遅延の報告

`AudioEffect.GetLatencySamples(int sampleRate, int inputLatency = 0)` をオーバーライドし、`inputLatency` を含む出力までの累積遅延を、出力サンプルレートでのサンプル数で報告します。既定の実装は `inputLatency` をそのまま返します。エフェクトが無効な場合も同様です。`CreateNode` が生成するノードの `GetTotalLatencySamples(int)` と結果を一致させてください。時間変換でも `int.MaxValue` を保持し、遅延の加算でオーバーフローしないようにします。

`AudioNode` には次のAPIがあります。

- `GetLatencySamples(int)`: ノード自身の遅延。
- `GetTotalLatencySamples(int)`: 自身の遅延と、最も遅い入力経路の遅延の合計。
- `GetDrainLatencySamples(int)`: 終端の処理直後に保持している遅延。アニメーションするパラメーターの終端値を利用できます。

サンプルレートは正の値を指定します。遅延は非負で、`int.MaxValue` は無制限または飽和した予算を表します。遅延の報告だけでは `Process` の出力は変わりません。

## バッファと時間範囲

`AudioNode.Process(AudioProcessContext)` と `Flush(AudioProcessContext)` は `Beutl.Audio.AudioBuffer` を返します。`ProcessTail` の引数も、削除された `Pcm<T>` ではなく `AudioBuffer` です。バッファはチャンネル別の浮動小数点サンプルを保持します。`GetChannelData(channel)` でアクセスし、所有するバッファは使用後に破棄してください。[メディアプロバイダーと音声バッファ](media-providers.md)も参照してください。

`AudioProcessContext.TimeRange` は `MediaTime` を使います。処理用バッファのサンプル数には `context.GetSampleCount()` を使用してください。時間範囲をサンプル単位に切り上げて求めます。逆の変換には `AudioProcessContext.GetDurationForSampleCount(sampleCount, sampleRate)` を使うと、`GetSampleCount` で元のサンプル数に戻せる長さになります。`GetTimeForSample(int)` は `MediaTime` を返し、`GetSampleForTime(MediaTime)` は時刻をブロック内のサンプル位置に変換します。

## 末尾の排出

`Flush(AudioProcessContext)` は連続した終端の `Process` 呼び出し直後に、保持している音声を排出します。単一入力のノードは入力側の末尾を `ProcessTail` で処理します。複数入力のノードでは、`Flush` をオーバーライドして各入力の末尾を排出・混合してください。

`ProcessTail` は渡されたバッファの所有権を受け取ります。別のバッファを返す場合は入力を破棄してください。例外を伝播する場合も、先に入力を破棄してください。排出中は、遅延に関係するアニメーションパラメーターを終端値に保持します。

クリップの自然な連続終端では、バッファに保持した処理遅延の末尾を維持できます。シーク・ループ・編集などの不連続点では、リセットにより破棄される場合があります。[リミッター](../reference/library/audio-effects/limiter.md)も参照してください。

## ノードの再利用と入力の変更

`AudioContext.CreateNode<TNode, TParams>` は既存のノードを再利用する場合があります。`SoundGroup` 内のノードも対象です。編集のたびにコンストラクターが呼ばれることを前提とせず、`updater` コールバックで再利用するノードを更新してください。

入力に応じた状態は `OnInputAdded(AudioNode, int)`、`OnInputRemoved(AudioNode, int)`、`OnInputsCleared()` で更新します。これらは入力一覧の変更後に呼ばれ、例外を投げてはいけません。失敗しても入力の変更は巻き戻されません。以前の入力トポロジーのトランザクションとロールバック用フックは削除されています。破棄時は `OnInputsCleared` を呼ばずに入力が消去されるため、ノードが所有する接続用のリソースは `Dispose(bool)` でも解放してください。

## ソース

- [`AudioEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/AudioEffect.cs)
- [`AudioNode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioNode.cs)
- [`AudioBuffer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioBuffer.cs)
- [`AudioProcessContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioProcessContext.cs)
- [`AudioContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioContext.cs)
- [`SoundGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SoundGroup.cs)

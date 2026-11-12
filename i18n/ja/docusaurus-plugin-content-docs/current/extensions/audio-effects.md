---
title: 音声エフェクトの実装
description: 独自のエフェクトで任意のチャンネル構成を扱い、処理遅延の報告と音声末尾の排出を実装します。
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

`context.AnimationSampler.SampleBuffer(property, range, sampleRate, output)` は、パラメーターのキーフレームと式を span に読み取ります。式は 10 ms 間隔で評価するので、スクリプトがサンプルごとに実行されることはありません。評価の間は、`float` の値を補間し、それ以外の型は直前の値を保ちます。`GetKeyFrameAnimation()` が `null` を返すときに静的な処理へ進むノードは、式が設定されていても保存された値を再生してしまいます。`IExpressionProperty.HasExpression` も確認してください。

## サンプルレート {/* #sample-rates */}

preview.12 以降、ソースのサンプルレートがプロジェクトと異なるサウンド（48 kHz のプロジェクトにある 44.1 kHz のファイルなど）は、スピード、パンナー、ゲイン、エフェクトの処理をソースのサンプルレートのまま行い、最後のエフェクトのあとでプロジェクトのサンプルレートに変換されます。この中にあるエフェクトは、バッファと `AudioProcessContext.SampleRate` をソースのサンプルレートで受け取り、ノードの遅延もそのサンプルレートで問い合わせられます。サンプルレートはコンテキストかバッファから取得してください。`CreateNode` で受け取る `AudioContext.SampleRate` は、常にプロジェクトのサンプルレートです。ソースのサンプルレートの半分以上の周波数は表現できません。組み込みのイコライザーはバンドの周波数をその直下に制限するため、8 kHz の音声では 10 kHz のバンドが 4 kHz 付近で効きます。

**リサンプリング**エフェクト（`ResamplingEffect`）は、置かれた位置でプロジェクトのサンプルレートに変換するため、そのあとのエフェクトはプロジェクトのサンプルレートで処理されます。エフェクトをプロジェクトのサンプルレートで処理するには、その前にリサンプリングを置きます。`SoundGroup` と `SceneSound` はプロジェクトのサンプルレートでミックスされ、そのエフェクトもプロジェクトのサンプルレートで処理されます。`Compose` をオーバーライドする `Sound` は、`context.CreateResampleNode(sourceSampleRate)` で自らソースのサンプルレートを変換します。その中にあるリサンプリングエフェクトは、音声をそのまま通します。

## チャンネル構成 {/* #channel-layouts */}

プロジェクトは `Project.ChannelLayout` の構成（モノラル、ステレオ、5.1、7.1）で描画されます。各サウンドはパンナーでプロジェクトの構成に配置されるまでソース自身のチャンネルで処理され、エフェクトはそのパンナーの後で実行されます。そのため 5.1 のプロジェクトでは、サードパーティ製のものを含めて、エフェクトは 6 チャンネルを受け取ります。サウンドの出力のチャンネル数が異なると `Composer` が `InvalidOperationException` を投げるので、エフェクトはプロジェクトのチャンネル数を返す必要があります。

チャンネルごとの状態はステレオを前提とせず、バッファの `ChannelCount` に合わせて確保し、数が変わったら作り直してください。次のエフェクトは受け取ったバッファのチャンネルをループで処理するので、どの構成でも動作します。

```csharp
using System;
using Beutl.Audio;
using Beutl.Audio.Effects;
using Beutl.Audio.Graph;

namespace MyExtension;

public sealed partial class PolarityEffect : AudioEffect
{
    public PolarityEffect()
    {
        ScanProperties<PolarityEffect>();
    }

    public override AudioNode CreateNode(AudioContext context, AudioNode inputNode)
    {
        PolarityNode node = context.AddNode(new PolarityNode());
        context.Connect(inputNode, node);
        return node;
    }
}

public sealed class PolarityNode : AudioNode
{
    public override AudioBuffer Process(AudioProcessContext context)
    {
        if (Inputs.Count != 1)
            throw new InvalidOperationException("The node requires exactly one input.");

        return RecordProcessedOutput(ProcessTail(Inputs[0].Process(context), context, draining: false));
    }

    protected override AudioBuffer ProcessTail(AudioBuffer input, AudioProcessContext context, bool draining)
    {
        for (int channel = 0; channel < input.ChannelCount; channel++)
        {
            Span<float> samples = input.GetChannelData(channel);
            for (int i = 0; i < samples.Length; i++)
                samples[i] = -samples[i];
        }

        return input;
    }
}
```

エフェクトがスピーカーの位置を必要とする場合は、`AudioContext.ChannelLayout` でプロジェクトの構成を取得できます。`GetSpeaker(channel)` と `IndexOf(speaker)` でチャンネルと `AudioSpeakers` を相互に変換します。チャンネルはスピーカーマスクのビットの昇順に並びます。

入力を持たず、ステレオ以外を出力するノードは、無音の `Flush` が同じチャンネル数になるよう `RecordProcessedChannelCount` を呼んでください。

`Compose` をオーバーライドする `Sound` は、コンテキストの構成で出力する必要があります。`context.CreateSourceNode(source, channelMap)` は、ソースと `Sound.Resource.GetChannelMap()` が返すマップからクリップの構成を求めます。`context.CreatePannerNode(Pan, SurroundPan, CenterLevel, LfeLevel, inputLayout)` はプロジェクトの構成に変換します。

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
- [`AudioChannelLayout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelLayout.cs)
- [`AudioChannelMatrix.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelMatrix.cs)
- [`AnimationSampler.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Animation/AnimationSampler.cs)
- [`AudioProcessContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioProcessContext.cs)
- [`AudioContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioContext.cs)
- [`ResamplingEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/ResamplingEffect.cs) and [`ResampleNode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/Nodes/ResampleNode.cs)
- [`Sound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Sound.cs)
- [`SoundGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SoundGroup.cs)

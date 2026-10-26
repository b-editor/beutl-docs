---
title: メディアプロバイダーと音声バッファ
description: フレームとサンプルの順次読み取り、バッファの所有権、メディア時刻の変換を説明します。
sidebar_position: 6
---

`EncodingController.Encode` の実装は、`Beutl.Extensibility` の `IFrameProvider` と `ISampleProvider` を受け取ります。preview.9 では両方とも順次読み取りになり、読み取り時にフレーム番号やサンプル位置を指定しません。出力位置はエンコーダー側で管理し、同じプロバイダーに対する次の読み取りは前の読み取りを await してから行ってください。

## プロバイダーの契約

<div style={{ overflowX: 'auto' }}>

| プロバイダー | メタデータ | 読み取りメソッド |
| --- | --- | --- |
| `IFrameProvider` | `long FrameCount`、`Rational FrameRate` | `ValueTask<Bitmap?> ReadNextFrame()` |
| `ISampleProvider` | `long SampleCount`、`long SampleRate` | `ValueTask<AudioBuffer?> ReadNextSamples(int length)` |

</div>

ストリームの終端では `null` を返します。サンプル数と要求する `length` はチャンネルごとの数であり、インターリーブした値の総数ではありません。エディターのサンプルプロバイダーは要求された長さのバッファを返し、`SampleCount` を超える部分をゼロで埋めます。出力を正確に `SampleCount` で終える場合は、残りのサンプル数だけを要求してください。

`EncodingController.Encode` の呼び出し元が両プロバイダーを所有し、エンコードの終了後または例外発生後に破棄します。エンコーダーは**プロバイダーを破棄してはいけません**。返された `Bitmap` と `AudioBuffer` はエンコーダーが所有するので、使用後に破棄してください。独自のプロバイダーの `Dispose` は、自身が開始した実行中の先読み処理の完了・例外を観測する必要があります。

次のヘルパーは同期コールバックを受け取り、コールバックが戻るまでにバッファの使用を終えることを前提にしています。

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Beutl.Audio;
using Beutl.Extensibility;
using Beutl.Media;

public static class SequentialConsumers
{
    public static async ValueTask ReadFramesAsync(
        IFrameProvider provider, Action<Bitmap> encodeFrame,
        CancellationToken cancellationToken)
    {
        for (long frame = 0; frame < provider.FrameCount; frame++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            using Bitmap? bitmap = await provider.ReadNextFrame();
            if (bitmap is null)
                throw new InvalidOperationException("The frame stream ended early.");
            encodeFrame(bitmap);
        }
    }

    public static async ValueTask ReadSamplesAsync(
        ISampleProvider provider, Action<AudioBuffer> encodeSamples,
        CancellationToken cancellationToken)
    {
        for (long offset = 0; offset < provider.SampleCount;)
        {
            cancellationToken.ThrowIfCancellationRequested();
            int length = (int)Math.Min(1024L, provider.SampleCount - offset);
            using AudioBuffer? buffer = await provider.ReadNextSamples(length);
            if (buffer is null)
                throw new InvalidOperationException("The sample stream ended early.");
            encodeSamples(buffer);
            offset += length;
        }
    }
}
```

## AudioBuffer

`Beutl.Audio.AudioBuffer` は `Pcm<T>` の代わりに使用します。コンストラクターは `(int sampleRate, int channelCount, int sampleCount)` です。サンプルレートとチャンネル数は正の値、チャンネルごとのサンプル数は非負の値を指定します。新しいバッファはゼロで初期化されます。

データはチャンネルごとに分かれた `float` 形式です。`GetChannelData(channel)` はそのチャンネルの `Span<float>`、`GetChannelMemory(channel)` は `Memory<float>` を返します。別の配置やサンプル形式が必要なコーデックとの境界で、インターリーブや形式変換を行ってください。バッファを破棄した後はチャンネルの span や memory を使用できません。

`CopyTo` ではコピー先とサンプルレート・チャンネル数が一致している必要があります。オフセットなしのオーバーロードではサンプル数も一致させます。`AudioBuffer` はコピー時にリサンプリングやチャンネル構成の変更を行いません。

## メディア時刻とプロジェクトのレート

タイムラインの位置と長さには `Beutl.MediaTime` を使います。flick の整数値で時刻を表し、1 秒は `705,600,000` flick です。浮動小数点数の秒数を経由せず、`MediaTime.FromFrames` と `Rational` のフレームレートで変換してください。`ToFrame`、`RoundToFrame`、`ToSamples` には `MidpointRounding` による丸め方を明示します。

プロジェクトのレートもプロパティオブジェクトです。`project.FrameRate.Value` は `Rational`、`project.SampleRate.Value` は `int` です。以前の `Variables` 内の `ProjectVariableKeys` の項目ではなく、このメンバーに直接設定してください。

```csharp
using System;
using Beutl;

public static class MediaTiming
{
    public static void ConfigureRates(Project project)
    {
        project.FrameRate.Value = new Rational(30000, 1001);
        project.SampleRate.Value = 48000;
    }

    public static MediaTime FrameTime(Project project, long frame)
        => MediaTime.FromFrames(frame, project.FrameRate.Value);

    public static long SamplePosition(Project project, MediaTime time)
        => time.ToSamples(project.SampleRate.Value, MidpointRounding.ToZero);

    public static string FormatTime(MediaTime time)
        => time.ToTimeSpan().ToString();
}
```

他の API や表示との境界では `MediaTime.FromTimeSpan` と `ToTimeSpan()` を使用できます。`MediaTime.ToString()` はタイムコードではなく flick 数を表示します。音声処理の時間範囲には、[音声エフェクトの実装](audio-effects.md)に記載したサンプル数の変換ヘルパーを使用してください。

## ソース

- [`IFrameProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IFrameProvider.cs)
- [`ISampleProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ISampleProvider.cs)
- [`EncodingController.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/EncodingController.cs)
- [`SampleProviderImpl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Models/SampleProviderImpl.cs)
- [`AudioBuffer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioBuffer.cs)
- [`MediaTime.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/MediaTime.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Project.cs)

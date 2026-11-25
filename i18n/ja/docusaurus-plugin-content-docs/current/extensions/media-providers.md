---
title: メディアプロバイダーと音声バッファ
description: フレームとサンプルの順次読み取り、チャンネル構成の扱い、バッファの所有権、メディア時刻の変換を説明します。
sidebar_position: 6
---

`EncodingController.Encode` の実装は、`Beutl.Extensibility` の `IFrameProvider` と `ISampleProvider` を受け取ります。どちらも順次読み取りで、読み取り時にフレーム番号やサンプル位置を指定しません。出力位置はエンコーダー側で管理し、同じプロバイダーに対する次の読み取りは前の読み取りを await してから行ってください。

## プロバイダーの契約 {/* #provider-contracts */}

<div style={{ overflowX: 'auto' }}>

| プロバイダー | メタデータ | 読み取りメソッド |
| --- | --- | --- |
| `IFrameProvider` | `long FrameCount`、`Rational FrameRate` | `ValueTask<Bitmap?> ReadNextFrame()` |
| `ISampleProvider` | `long SampleCount`、`long SampleRate`、`AudioChannelLayout ChannelLayout` | `ValueTask<AudioBuffer?> ReadNextSamples(int length)` |

</div>

ストリームの終端では `null` を返します。サンプル数と要求する `length` はチャンネルごとの数であり、インターリーブした値の総数ではありません。エディターのサンプルプロバイダーは要求された長さのバッファを返し、`SampleCount` を超える部分をゼロで埋めます。出力を正確に `SampleCount` で終える場合は、残りのサンプル数だけを要求してください。

`ISampleProvider.ChannelLayout` は、返すすべてのバッファの構成を宣言します。ステレオを返す既定のメンバーなので既存のプロバイダーはそのままコンパイルできますが、ステレオ以外を返すプロバイダーは構成を宣言する必要があります。エンコーダーはチャンネル数をこのプロパティから取得してください。5.1 や 7.1 のプロジェクトを新しく書き出すと、既定でプロジェクトのチャンネルが書き込まれます。

書き込む構成は `AudioEncoderSettings.Channels` で選択し、`GetChannelLayout()` がそれを Beutl の既定のスピーカー順に対応付けます。エディターのプロバイダーはプロジェクトの構成で合成し、各チャンクを `GetChannelLayout()` の構成に変換します。編集や新しい書き出しでチャンネル数を変更するときは `SetChannels(channels)` を呼びます。正の合計ビットレートはチャンネル数に比例して調整されます。保存された設定の復元やコピーには使わないでください。

ユーザーが指定しなかった映像の色設定については、`VideoColorDefaults.Get(target, hdr, recordsColor)` が組み込みのエンコーダーの書き込むタグを返します。指定された値はそのまま保ち、残りをエンコーダー固有のタグに変換してください。

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

## 複数のファイルを書き出す {/* #writing-several-files */}

書き出しのとき、Beutl は新しいコントローラーを作成します。その `OutputFile` は選択されたファイルと同じ名前ですが、選択されたファイルの隣にある一時フォルダーの中を指します。`Encode` が戻ると、Beutl は書き出されたものを選択されたフォルダーに移動します。preview.11 以降、エンコーダーは連番画像のように複数のファイルを書き出せます。各ファイルを `OutputFile` のフォルダーの直下に書き出し、そのパスを `OutputFiles` から返してください。既定値は `OutputFile` だけで、`OutputFile` を含める必要はありません。

Beutl は `Encode` が戻った後に、任意のスレッドで `OutputFiles` を読み、最初のファイルを移動する前にすべてのファイルを確認します。別のフォルダーにあるファイルや、書き出されていないファイルがあると、書き出しは失敗します。そのあと、各ファイルはそれぞれの名前で、`OutputFile` は選択された名前で、選択されたフォルダーに移動します。途中で移動に失敗した場合は置き換えたファイルを元に戻すため、失敗した書き出しや取り消した書き出しは、そのフォルダーを変更しません。以前のファイルを元に戻せなかった場合は、エラーにその名前が示されます。出力タブには、ファイルの合計サイズが表示されます。

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Beutl.Extensibility;
using Beutl.Graphics;
using Beutl.Media;
using Beutl.Media.Encoding;

public sealed class FrameSequenceController(string outputFile) : EncodingController(outputFile)
{
    private readonly List<string> _files = [];

    public override VideoEncoderSettings VideoSettings { get; } = new();

    public override AudioEncoderSettings AudioSettings { get; } = new();

    public override bool IsAudioEnabled => false;

    public override IReadOnlyList<string> OutputFiles => _files;

    public override async ValueTask Encode(
        IFrameProvider frameProvider, ISampleProvider sampleProvider, CancellationToken cancellationToken)
    {
        string folder = Path.GetDirectoryName(OutputFile)!;
        string name = Path.GetFileNameWithoutExtension(OutputFile);
        for (long frame = 0; frame < frameProvider.FrameCount; frame++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            using Bitmap? bitmap = await frameProvider.ReadNextFrame();
            if (bitmap is null)
                throw new InvalidOperationException("The frame stream ended early.");

            string file = Path.Combine(folder, $"{name}_{frame:D5}.png");
            if (!bitmap.Save(file, EncodedImageFormat.Png))
                throw new IOException($"Could not write '{file}'.");
            _files.Add(file);
        }
    }
}
```

## AudioBuffer

`Beutl.Audio.AudioBuffer` は `Pcm<T>` の代わりに使用します。コンストラクターは `(int sampleRate, int channelCount, int sampleCount)` です。サンプルレートとチャンネル数は正の値、チャンネルごとのサンプル数は非負の値を指定します。新しいバッファはゼロで初期化されます。

データはチャンネルごとに分かれた `float` 形式です。`GetChannelData(channel)` はそのチャンネルの `Span<float>`、`GetChannelMemory(channel)` は `Memory<float>` を返します。別の配置やサンプル形式が必要なコーデックとの境界で、インターリーブや形式変換を行ってください。バッファを破棄した後はチャンネルの span や memory を使用できません。

`CopyTo` ではコピー先とサンプルレート・チャンネル数が一致している必要があります。オフセットなしのオーバーロードではサンプル数も一致させます。`AudioBuffer` はコピー時にリサンプリングやチャンネル構成の変更を行いません。構成の変換には `AudioChannelMatrix.Create(input, output)` と `Apply` を使います。正規化やクリッピングは行いません。ステレオにまとめるときは、センターとサラウンドを 0.7071 倍で混合し、LFE チャンネルは捨てます。

## デコーダーと `MediaReader` {/* #decoders */}

`DecodingExtension` は `IDecoderInfo` を返し、その `Open` が `MediaReader` を作成します。`MediaReader.ReadAudio` は `AudioStreamInfo.ChannelLayout` のチャンネルをその順序で返します。組み込みの WAV、Media Foundation、FFmpeg、AVFoundation のデコーダーは、ステレオではなくソース本来のチャンネルを返します。例外は、最初のフレームまでチャンネルが分からない FFmpeg のデコーダーで、ステレオのままになります。`AudioStreamInfo.NumChannels` はメタデータとしてのソースのチャンネル数で、構成と異なる場合があるため、バッファのサイズの決定には使わないでください。

`MediaReader` を直接読むコードは、任意のチャンネル数に対応する必要があります。`AudioChannelMatrix.ConvertOrNull` はデコードしたバッファを必要な構成に変換し、すでにその構成であれば `null` を返します。

```csharp
using Beutl.Audio;
using Beutl.Media.Decoding;

public static class StereoReader
{
    public static AudioBuffer? ReadStereo(MediaReader reader, int start, int length)
    {
        if (!reader.ReadAudio(start, length, out AudioBuffer? decoded))
            return null;

        AudioBuffer? converted = AudioChannelMatrix.ConvertOrNull(
            decoded, reader.AudioInfo.ChannelLayout, AudioChannelLayout.Stereo);
        if (converted is null)
            return decoded;

        decoded.Dispose();
        return converted;
    }
}
```

サードパーティのデコーダーは、`AudioStreamInfo` の `ChannelLayout` を設定して、返す構成を宣言します。既定はステレオなので、ステレオを返し続けるデコーダーは変更不要です。`AudioChannelLayout.FromChannelMask(channelCount, mask)` は WAVEFORMATEXTENSIBLE のマスクから構成を作り、`GetDefault(count)` はチャンネル数に対して Beutl が想定するスピーカー順を返し、`Discrete(count)` は位置が不明なチャンネルを表します。

動画では、デコードしたフレームの色空間を、ソースのタグから `BitmapColorSpaceMapping.BuildTargetColorSpace(transfer, primaries)` で作ってください。`IsHdrTransfer(transfer)` が `true` のときは `BuildHdrColorSpace` を使います。組み込みのデコーダーとエンコーダーも同じ方法を使っています。preview.13 以降、`GetTransferFunction` は、BT.709、BT.601、BT.2020 SDR の動画のタグである `BitmapColorTransfer.Bt709` と `Rec2020` を、新しい `BitmapColorSpaceTransferFn.CoreMedia709` に対応させます。これは QuickTime と AVFoundation が使う、ガンマ 1.9609375 で黒付近の傾きが 1/16 のカーブです。このような動画は以前よりシャドウが暗くデコードされ、書き出しではシャドウのコード値が明るくなるため、QuickTime でレンダリングしたとおりに再生されます。この対応を通すデコーダーやエンコーダーは、変更しなくても組み込みのものと同じ結果になります。`BitmapColorSpaceTransferFn.Bt709` と `Rec2020` は、カメラのカーブの正確な逆関数という値のまま残っています。これらを直接使うデコーダーでは、このような動画のシャドウが Beutl のデコーダーより明るく表示されます。

preview.16 以降、ユーザーは、動画の要素がソースの伝達曲線をどう解釈するかと、ソースのインターレースを解除するかを、**「ソース」** プロパティのメニューの **「伝達曲線」** と **「インターレース解除」** で選べます。デコーダーは、返す `VideoStreamInfo` と受け取る `MediaOptions` を通して、これに関わります。

- `ColorTags` には、ストリームのタグ、つまりフレームの色空間を作るのに使うタグを設定してください。**「伝達曲線」** が **「自動（タグに従う）」** 以外のときは、フレームのコード値を、これらのタグの色空間（タグのないストリームは sRGB）のものとして、タグの曲線の代わりに選ばれた曲線で読みます。HDR の動画は自身の曲線のままです。フレームが埋め込みの ICC プロファイルの色空間を持つ場合は、代わりに `HasIccProfile` を設定してください。Beutl はその色空間を保ったまま、曲線だけを置き換えます。
- `MediaOptions.Deinterlace` は、要素のインターレース解除の設定を伝えます。インターレースを解除できるデコーダーは、`DeinterlaceAuto | DeinterlaceExplicit | DeinterlaceBwdif` のように、対応する内容を `IDecoderInfo.Capabilities` で宣言します。そして、設定を適用したこと（`Applied`）か、**「自動」** でフレームがプログレッシブであること（`NotNeededProgressive`）を `DeinterlaceStatus` で、見つけたフィールド順序を `DetectedFieldOrder` で報告します。要素がインターレース解除を求めると、レジストリは設定に対応するデコーダーを先に試し、リーダーがそのどちらも報告しなければ次のデコーダーに進みます。何も宣言しないデコーダーもファイルを開けますが、インターレースは解除されず、メニューはデコーダーが非対応であることをユーザーに示します。

### デコーダーのレジストリ {/* #decoder-registry */}

preview.15 以降、デコーダーはプロセスではなく、ホストの `DecoderRegistry` に属します。`DecodingExtension.Load` は、`GetDecoderInfo()` が返すデコーダーをコンテキストのレジストリに登録し、`Unload` はそこから削除します。`EnumerateDecoder()` は登録されたデコーダーを、ユーザーが設定したデコーダーの優先順位の順に列挙し、`GuessDecoder(file)` はそのうち `IsSupported(file)` が `true` のものを返します。`FileExtensions.Classify(file)` は、登録されたデコーダーが宣言する動画と音声の拡張子を使って、動画・音声・静止画のファイルを拡張子で見分けます。

ファイルを自分で読む場合は、`MediaReader.Open(file, decoders)` か `MediaReader.Open(file, options, decoders)` にレジストリを渡してください。デコーダーをその順に試し、ファイルがない場合は `FileNotFoundException` を、どのデコーダーも開けない場合は `UnsupportedMediaException` を投げます。レジストリは、`Load` では `context.Services` から、エディタでは `GetService` から、リソースの `Reconcile` 中は `CompositionContext.Decoders` から取得してください。

```csharp
using Beutl.Extensibility;
using Beutl.Media.Decoding;
using Microsoft.Extensions.DependencyInjection;

public static class AudioFiles
{
    // Opens the audio of a file with the decoders that the editor uses.
    public static MediaReader Open(IEditorContext editor, string file)
        => MediaReader.Open(file, new MediaOptions(MediaMode.Audio), editor.GetRequiredService<DecoderRegistry>());
}
```

描画では、レジストリは `Fonts` と並んで `CompositionContext.Decoders` で渡されます。ファイルを持つ `VideoSource` や `SoundSource` は、レジストリなしで `Reconcile` されると `InvalidOperationException` を投げます。そのため、Beutl 自身のレンダラーの外でシーンを描画したりソースを読んだりするコードは、`ExportRendererFactory.Create` や `SourceSound.TryGetOriginalDuration` など、`DecoderRegistry? decoders` を受け取る API と、[シーンのレンダラー](#rendering-a-scene)の `SceneRenderServices` に、ホストのレジストリを渡します。テストでは、`new DecoderRegistry(new ExtensionConfig())` で独自のレジストリを作り、デコーダーを登録します。組み込みの WAV とアニメーション画像のデコーダーは、`BuiltInDecoders.Register(decoders)` で追加できます。

### シーンを描画する {/* #rendering-a-scene */}

preview.16 以降、`SceneRenderer`、`SceneComposer`、`SceneCompositor`、`ObjectTemplateService` は、シーンの描画に使う `Fonts`、`Decoders`、`EditorConfig`、`ProxyConfig` をまとめた `SceneRenderServices`（名前空間 `Beutl`）を受け取ります。描画するシーンのエディタのサービスからこれを作ると、プレビューと同じように、プロジェクトのフォントとメディアを解決し、ユーザーのプレビューの設定に従って描画できます。

```csharp
using Beutl;
using Beutl.Configuration;
using Beutl.Extensibility;
using Beutl.Graphics.Rendering;
using Beutl.Media;
using Beutl.Media.Decoding;
using Beutl.ProjectSystem;
using Microsoft.Extensions.DependencyInjection;

public static class SceneRenders
{
    // Renders a scene the way the editor's preview does.
    public static SceneRenderer CreatePreviewRenderer(IEditorContext editor, Scene scene)
    {
        var configuration = editor.GetRequiredService<GlobalConfiguration>();
        var services = new SceneRenderServices(
            editor.GetRequiredService<FontManager>(),
            editor.GetRequiredService<DecoderRegistry>(),
            configuration.EditorConfig,
            configuration.ProxyStoreConfig);
        return new SceneRenderer(scene, services, RenderIntent.Preview);
    }
}
```

`EditorConfig` がない場合、レンダラーは既定のレンダーキャッシュを使い、`forceOriginalSource` で元のメディアを読むように指定しない限り、プロキシがあればそれを再生します。`ProxyConfig` がない場合は、既定のプリセットのプロキシを求めます。`WithoutConfiguration()` は、フォントとレジストリを残して、この 2 つの設定を外します。`SceneRenderServices.Empty` は何も持たないため、テキストの要素はテキストをレイアウトするときに、ファイルを持つ動画や音声は `Reconcile` されるときに、`InvalidOperationException` を投げます。入れ子のシーンは、それを含むシーンのサービスで描画されます。

## メディア時刻とプロジェクトのレート {/* #media-time-and-project-rates */}

タイムラインの位置と長さには `Beutl.MediaTime` を使います。flick の整数値で時刻を表し、1 秒は `705,600,000` flick です。浮動小数点数の秒数を経由せず、`MediaTime.FromFrames` と `Rational` のフレームレートで変換してください。`ToFrame`、`RoundToFrame`、`ToSamples` には `MidpointRounding` による丸め方を明示します。

プロジェクトのレートもプロパティオブジェクトです。`project.FrameRate.Value` は `Rational`、`project.SampleRate.Value` は `int` です。以前の `Variables` 内の `ProjectVariableKeys` の項目ではなく、このメンバーに直接設定してください。`project.ChannelLayout.Value` は `SpeakerLayout`（`Mono`、`Stereo`、`Surround51`、`Surround71`。既定は `Stereo`）で、拡張メソッド `GetChannelLayout()` で `AudioChannelLayout` に変換できます。

```csharp
using System;
using Beutl;
using Beutl.Audio;

public static class MediaTiming
{
    public static void ConfigureRates(Project project)
    {
        project.FrameRate.Value = new Rational(30000, 1001);
        project.SampleRate.Value = 48000;
        project.ChannelLayout.Value = SpeakerLayout.Surround51;
    }

    public static MediaTime FrameTime(Project project, long frame)
        => MediaTime.FromFrames(frame, project.FrameRate.Value);

    public static long SamplePosition(Project project, MediaTime time)
        => time.ToSamples(project.SampleRate.Value, MidpointRounding.ToZero);

    public static int ChannelCount(Project project)
        => project.GetChannelLayout().ChannelCount;

    public static string FormatTime(MediaTime time)
        => time.ToTimeSpan().ToString();
}
```

他の API や表示との境界では `MediaTime.FromTimeSpan` と `ToTimeSpan()` を使用できます。`MediaTime.ToString()` はタイムコードではなく flick 数を表示します。音声処理の時間範囲には、[音声エフェクトの実装](audio-effects.md)に記載したサンプル数の変換ヘルパーを使用してください。

preview.12 以降、エディタは **「設定」→「エディター」→「時刻の表示形式」** でユーザーが選んだ形式で時刻を表示します。既定はタイムコードです。同じ形式で時刻を表示するには、ホストの `GlobalConfiguration` の `EditorConfig.TimeDisplayFormat.Value` を渡して `TimeDisplayFormatter.Format(time, frameRate, format)` を呼びます。preview.14 以降、`GlobalConfiguration` は `Load` の `context.Services` とエディタの `GetService` から取得できます。2.5 秒は、`Time` では `00:00:02.50` になり、30 fps の `Timecode` では `00:00:02:15`、`Frames` では `75` になります。29.97 fps と 59.94 fps のタイムコードはドロップフレームで数え、フレームの前にセミコロンを置きます。`TimeDisplayFormat` を受け取る `GotoTimecodeParser.TryParse` のオーバーロードは、これらの時刻を読み取れます。

```csharp
using Beutl;
using Beutl.Configuration;

public static class EditorTimes
{
    // Writes a time the way the preview and the timeline show it.
    public static string Format(GlobalConfiguration configuration, Project? project, MediaTime time)
        => TimeDisplayFormatter.Format(
            time,
            project.GetFrameRate(),
            configuration.EditorConfig.TimeDisplayFormat.Value);
}
```

## ソース

- [`IFrameProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IFrameProvider.cs)
- [`ISampleProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ISampleProvider.cs)
- [`EncodingController.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/EncodingController.cs)
- [`StagedOutputFile.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/IO/StagedOutputFile.cs)
- [`AudioEncoderSettings.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Encoding/AudioEncoderSettings.cs)
- [`VideoColorDefaults.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/VideoColorDefaults.cs)
- [`SampleProviderImpl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Models/SampleProviderImpl.cs)
- [`AudioBuffer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioBuffer.cs)
- [`AudioChannelLayout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelLayout.cs)
- [`AudioChannelMatrix.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelMatrix.cs)
- [`MediaReader.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/MediaReader.cs)
- [`DecoderRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/DecoderRegistry.cs), [`DecoderFileExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/DecoderFileExtensions.cs), [`BuiltInDecoders.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/BuiltInDecoders.cs) and [`DecodingExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/DecodingExtension.cs)
- [`AudioStreamInfo.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/AudioStreamInfo.cs)
- [`VideoStreamInfo.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/VideoStreamInfo.cs), [`MediaOptions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/MediaOptions.cs), [`DecoderCapabilities.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/DecoderCapabilities.cs) and [`VideoDeinterlaceOptions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/VideoDeinterlaceOptions.cs)
- [`VideoTransferInterpretation.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/VideoTransferInterpretation.cs) and [`VideoSource.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Source/VideoSource.cs)
- [`SceneRenderServices.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/SceneRenderServices.cs), [`SceneRenderer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/SceneRenderer.cs) and [`SceneCompositor.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/SceneCompositor.cs)
- [`MediaTime.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/MediaTime.cs)
- [`TimeDisplayFormatter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/TimeDisplayFormatter.cs), [`GotoTimecodeParser.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/GotoTimecodeParser.cs) and [`TimeDisplayFormat.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/TimeDisplayFormat.cs)
- [`GlobalConfiguration.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/GlobalConfiguration.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Project.cs)
- [`ProjectRateExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectRateExtensions.cs)
- [`BitmapColorSpaceMapping.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/BitmapColorSpaceMapping.cs) and [`BitmapColorSpaceTransferFn.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/BitmapColorSpaceTransferFn.cs)

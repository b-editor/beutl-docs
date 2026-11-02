---
title: Media Providers and Audio Buffers
description: Consume sequential frames and samples, handle channel layouts, manage buffer ownership, and convert media time.
sidebar_position: 6
---

An `EncodingController.Encode` implementation receives `IFrameProvider` and `ISampleProvider` from `Beutl.Extensibility`. Both providers advance sequentially; reads do not accept a frame index or sample offset. Keep your output position in the encoder and await each read before starting the next one on that provider.

## Provider contracts {/* #provider-contracts */}

<div style={{ overflowX: 'auto' }}>

| Provider | Metadata | Read method |
| --- | --- | --- |
| `IFrameProvider` | `long FrameCount`, `Rational FrameRate` | `ValueTask<Bitmap?> ReadNextFrame()` |
| `ISampleProvider` | `long SampleCount`, `long SampleRate`, `AudioChannelLayout ChannelLayout` | `ValueTask<AudioBuffer?> ReadNextSamples(int length)` |

</div>

A read returns `null` after the stream ends. Sample counts and the requested `length` are per channel, not the number of interleaved values. The editor's sample provider returns the requested buffer length and fills any part beyond `SampleCount` with zeroes. Request only the remaining count when the output must end exactly at `SampleCount`.

`ISampleProvider.ChannelLayout` declares the layout of every returned buffer. It is a default member that returns stereo, so an existing provider still compiles, but a provider that returns anything else must declare its layout. An encoder should take its channel count from this property: a new export of a 5.1 or 7.1 project writes the project's channels by default.

`AudioEncoderSettings.Channels` selects the written layout, and `GetChannelLayout()` maps it to Beutl's default speaker order. The editor's provider composes in the project layout and converts each chunk to the layout from `GetChannelLayout()`. To change the count for an edit or a new export, call `SetChannels(channels)`, which keeps a positive total bitrate proportional to it; do not use it when restoring or copying saved settings.

For video color settings the user leaves unspecified, `VideoColorDefaults.Get(target, hdr, recordsColor)` returns the tags the built-in encoders write. Keep the values that were set, and translate the rest to your encoder's own tags.

The caller of `EncodingController.Encode` owns both providers and disposes them after encoding returns or throws. An encoder must **not dispose the providers**. It owns each returned `Bitmap` or `AudioBuffer` and disposes it after consumption. A custom provider's `Dispose` must observe any in-flight prefetch it started.

These consumer helpers accept synchronous callbacks that finish using each buffer before returning:

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

`Beutl.Audio.AudioBuffer` replaces `Pcm<T>`. Construct it with `(int sampleRate, int channelCount, int sampleCount)`. The sample rate and channel count must be positive; the per-channel sample count must be non-negative. A new buffer is zero-filled.

The storage is planar `float` data: `GetChannelData(channel)` returns a `Span<float>` for one channel, and `GetChannelMemory(channel)` returns its `Memory<float>`. Interleave or convert sample formats at the boundary of a codec that requires another layout. Do not retain a channel span or memory after disposing the buffer.

`CopyTo` requires matching sample rates and channel counts. The overload without an offset also requires matching sample counts. `AudioBuffer` does not resample or change channel layouts during a copy. To convert between layouts, use `AudioChannelMatrix.Create(input, output)` and `Apply`. It does not normalize or clip. Folding to stereo mixes the center and surrounds at 0.7071 and drops the LFE channel.

## Decoders and `MediaReader` {/* #decoders */}

A `DecodingExtension` returns an `IDecoderInfo` whose `Open` creates a `MediaReader`. `MediaReader.ReadAudio` returns `AudioStreamInfo.ChannelLayout` channels in that order, and the built-in WAV, Media Foundation, FFmpeg and AVFoundation decoders return their sources' native channels instead of stereo. `AudioStreamInfo.NumChannels` is the source's channel count as metadata and can differ from the layout, so do not size buffers from it.

Code that reads a `MediaReader` directly must handle any channel count. `AudioChannelMatrix.ConvertOrNull` converts a decoded buffer to the layout you need, and returns `null` when the buffer already has that layout:

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

A third-party decoder declares what it returns by setting `ChannelLayout` on its `AudioStreamInfo`. The default is stereo, so a decoder that keeps returning stereo needs no change. `AudioChannelLayout.FromChannelMask(channelCount, mask)` builds a layout from a WAVEFORMATEXTENSIBLE mask, `GetDefault(count)` gives Beutl's assumed speaker order for a count, and `Discrete(count)` describes channels with no known positions.

## Media time and project rates

Timeline positions and durations use `Beutl.MediaTime`, a whole number of flicks, with `705,600,000` flicks per second. Use `MediaTime.FromFrames` and a `Rational` frame rate instead of converting through floating-point seconds. `ToFrame`, `RoundToFrame`, and `ToSamples` require an explicit `MidpointRounding` policy.

Project rates are property objects: `project.FrameRate.Value` is a `Rational` and `project.SampleRate.Value` is an `int`. Set these members directly instead of using the former `ProjectVariableKeys` entries in `Variables`. `project.ChannelLayout.Value` is a `SpeakerLayout` (`Mono`, `Stereo`, `Surround51` or `Surround71`; `Stereo` by default), and the `GetChannelLayout()` extension method turns it into an `AudioChannelLayout`.

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

Use `MediaTime.FromTimeSpan` and `ToTimeSpan()` at an API or display boundary. `MediaTime.ToString()` displays the flick count, not a timecode. For audio processing ranges, use the sample-count helpers described in [Implementing Audio Effects](audio-effects.md).

## Source

- [`IFrameProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IFrameProvider.cs)
- [`ISampleProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ISampleProvider.cs)
- [`EncodingController.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/EncodingController.cs)
- [`AudioEncoderSettings.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Encoding/AudioEncoderSettings.cs)
- [`VideoColorDefaults.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/VideoColorDefaults.cs)
- [`SampleProviderImpl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Models/SampleProviderImpl.cs)
- [`AudioBuffer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioBuffer.cs)
- [`AudioChannelLayout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelLayout.cs)
- [`AudioChannelMatrix.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioChannelMatrix.cs)
- [`MediaReader.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/MediaReader.cs)
- [`AudioStreamInfo.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/AudioStreamInfo.cs)
- [`MediaTime.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/MediaTime.cs)
- [`Project.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Project.cs)
- [`ProjectRateExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectRateExtensions.cs)

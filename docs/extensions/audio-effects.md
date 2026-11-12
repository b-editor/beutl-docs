---
title: Implementing Audio Effects
description: Handle any channel layout, report processing latency and drain audio tails in custom effects.
sidebar_position: 5
---

An `AudioEffect` creates its processing `AudioNode` with `CreateNode(AudioContext, AudioNode)`.

## Latency reporting

Override `AudioEffect.GetLatencySamples(int sampleRate, int inputLatency = 0)` to report the accumulated latency at the effect's output, including `inputLatency`, in samples at the output sample rate. The default implementation returns `inputLatency` unchanged; disabled effects must do the same. The result must agree with `GetTotalLatencySamples(int)` on the node produced by `CreateNode`. Preserve `int.MaxValue` through time mappings and avoid overflow when combining latencies.

On an `AudioNode`:

- `GetLatencySamples(int)` reports the node's own latency.
- `GetTotalLatencySamples(int)` adds its latency to the slowest input path.
- `GetDrainLatencySamples(int)` reports the latency still held immediately after the terminal processing call, allowing animated parameters to use their terminal values.

The sample rate must be positive. Latency is non-negative; `int.MaxValue` represents an unbounded or saturated budget. Reporting latency alone does not change `Process` output.

## Buffers and time ranges

`AudioNode.Process(AudioProcessContext)` and `Flush(AudioProcessContext)` return `Beutl.Audio.AudioBuffer`. `ProcessTail` takes an `AudioBuffer`, not the removed `Pcm<T>` type. The buffer contains separate floating-point channels; use `GetChannelData(channel)` for sample access and dispose owned buffers when finished. See [Media providers and audio buffers](media-providers.md).

`AudioProcessContext.TimeRange` uses `MediaTime`. Allocate processing buffers with `context.GetSampleCount()`; it rounds the range up to a whole number of samples. For the inverse operation, use `AudioProcessContext.GetDurationForSampleCount(sampleCount, sampleRate)` so a duration converted back with `GetSampleCount` represents exactly that sample count. `GetTimeForSample(int)` returns `MediaTime`, and `GetSampleForTime(MediaTime)` maps a time to the block's sample index.

`context.AnimationSampler.SampleBuffer(property, range, sampleRate, output)` reads a parameter's keyframes and expression into a span. It evaluates an expression on a 10 ms grid, so a script does not run for every sample. In between, `float` values are interpolated and other types keep the previous grid value. A node that takes a static path whenever `GetKeyFrameAnimation()` returns `null` plays the stored value under an expression, so test `IExpressionProperty.HasExpression` as well.

## Sample rates {/* #sample-rates */}

Since preview.12, a sound whose source has a sample rate other than the project's, such as a 44.1 kHz file in a 48 kHz project, keeps the source's rate through its speed, panner, gain and effects, and Beutl converts it to the project's rate after the last effect. An effect in that chain receives buffers and `AudioProcessContext.SampleRate` at the source's rate, and Beutl asks its node for latency at that rate. Take the rate from the context or the buffer: `AudioContext.SampleRate` in `CreateNode` is always the project's. A frequency at or above half the source's rate cannot be represented; the built-in equalizer clamps its bands just under it, so a 10 kHz band on 8 kHz audio acts near 4 kHz.

The **Resampling** effect (`ResamplingEffect`) converts to the project's rate where it stands, so the effects after it run at the project's rate; to run an effect at the project's rate, put Resampling before it. `SoundGroup` and `SceneSound` mix at the project's rate, and their effects run at it. A `Sound` that overrides `Compose` converts its source's rate itself with `context.CreateResampleNode(sourceSampleRate)`, and a Resampling effect in its chain passes the audio through.

## Channel layouts {/* #channel-layouts */}

A project renders in the layout of `Project.ChannelLayout`: mono, stereo, 5.1 or 7.1. Each sound is processed in its own source's channels until its panner places it in the project layout, and its effects run after that panner. In a 5.1 project an effect therefore receives six channels, and that includes third-party effects. `Composer` throws `InvalidOperationException` when a sound's output has another channel count, so an effect must return the project's channel count.

Size per-channel state from the buffer's `ChannelCount` rather than assuming stereo, and rebuild it when the count changes. This effect works in any layout because it loops over the channels of the buffer it receives:

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

`AudioContext.ChannelLayout` gives the project layout when an effect needs speaker positions. `GetSpeaker(channel)` and `IndexOf(speaker)` map between channels and `AudioSpeakers`; channels are ordered by ascending speaker-mask bit.

A node with no inputs that emits anything other than stereo must call `RecordProcessedChannelCount`, so that its silent `Flush` keeps that count.

A `Sound` that overrides `Compose` must output the context's layout. `context.CreateSourceNode(source, channelMap)` derives the clip layout from the source and the map that `Sound.Resource.GetChannelMap()` returns, and `context.CreatePannerNode(Pan, SurroundPan, CenterLevel, LfeLevel, inputLayout)` converts to the project layout.

## Draining the tail

`Flush(AudioProcessContext)` drains pending audio immediately after a contiguous terminal `Process` call. A single-input node processes its input's drained tail through `ProcessTail`; a node with multiple inputs must override `Flush` to drain and merge them.

`ProcessTail` owns the buffer passed to it. If your override replaces that buffer, dispose the input. If it throws, dispose the input before propagating the exception. Hold delay-related animated parameters at their terminal values while draining.

Natural contiguous clip endings can preserve buffered latency tails. Seeks, loops, edits, and other discontinuities can reset processing and discard buffered samples. See [Limiter](../reference/library/audio-effects/limiter.md).

## Node reuse and input changes

`AudioContext.CreateNode<TNode, TParams>` may reuse an existing node, including nodes inside a `SoundGroup`. Update reused nodes in its `updater` callback rather than relying on the constructor to run after each edit.

Keep input-dependent state in `OnInputAdded(AudioNode, int)`, `OnInputRemoved(AudioNode, int)`, and `OnInputsCleared()`. These hooks run after the input list changes and must not throw; changes are not rolled back if a hook fails. The former input-topology transaction and rollback hooks are no longer available. Dispose any connection resources owned by the node in `Dispose(bool)` as well: disposal clears inputs without calling `OnInputsCleared`.

## Source

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

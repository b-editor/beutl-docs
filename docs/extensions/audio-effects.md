---
title: Implementing Audio Effects
description: Report processing latency and drain audio tails in custom effects.
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
- [`AudioProcessContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioProcessContext.cs)
- [`AudioContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Graph/AudioContext.cs)
- [`SoundGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SoundGroup.cs)

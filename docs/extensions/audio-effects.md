---
title: Implementing Audio Effects
description: Report processing latency and drain audio tails in custom effects.
sidebar_position: 5
---

An `AudioEffect` creates its processing `AudioNode` with `CreateNode(AudioContext, AudioNode)`.

## Latency reporting

Override `AudioEffect.GetLatencySamples(int sampleRate)` to report processing latency in samples at the output sample rate. The default is zero. The report must agree with the node produced by `CreateNode` and should be zero when the effect is disabled.

On an `AudioNode`:

- `GetLatencySamples(int)` reports the node's own latency.
- `GetTotalLatencySamples(int)` adds its latency to the slowest input path.
- `GetDrainLatencySamples(int)` reports the latency still held immediately after the terminal processing call, allowing animated parameters to use their terminal values.

The sample rate must be positive. Latency is non-negative; `int.MaxValue` represents an unbounded or saturated budget. Reporting latency alone does not change `Process` output.

## Draining the tail

`Flush(AudioProcessContext)` drains pending audio immediately after a contiguous terminal `Process` call. A single-input node processes its input's drained tail through `ProcessTail`; a node with multiple inputs must override `Flush` to drain and merge them.

`ProcessTail` owns the buffer passed to it. If your override replaces that buffer, dispose the input. If it throws, dispose the input before propagating the exception. Hold delay-related animated parameters at their terminal values while draining.

Natural contiguous clip endings can preserve buffered latency tails. Seeks, loops, edits, and other discontinuities can reset processing and discard buffered samples. See [Limiter](../reference/library/audio-effects/limiter.md).

## Source

- [`AudioEffect.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Audio/Effects/AudioEffect.cs)
- [`AudioNode.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Audio/Graph/AudioNode.cs)

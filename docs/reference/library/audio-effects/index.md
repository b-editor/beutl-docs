---
title: "Audio Effects"
description: "Audio effects that process a `Sound`'s output signal."
---

# Audio Effects

Audio effects that process a `Sound`'s output signal.

- [**Delay**](./delay.md) — Adds an echo / delay effect to the audio signal.
- [**Equalizer**](./equalizer.md) — Equalizer for the audio signal.
- [**Compressor**](./compressor.md) — Dynamic-range compressor that attenuates the signal above a threshold.
- [**Limiter**](./limiter.md) — Brick-wall peak limiter with optional lookahead.
- [**Gate**](./gate.md) — Noise gate that attenuates the signal while it stays below a threshold.
- [**Time Stretch**](./time-stretch.md) — Changes playback speed while preserving pitch.
- [**Noise Reduction**](./noise-reduction.md) — Learns the noise level from the audio to reduce steady background noise.

## Extension development

[Implementing Audio Effects](../../../extensions/audio-effects.md) describes the latency-reporting and tail-draining APIs.

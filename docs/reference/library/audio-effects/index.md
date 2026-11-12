---
title: "Audio Effects"
description: "Audio effects that process a `Sound`'s output signal."
---

# Audio Effects

Audio effects that process a `Sound`'s output signal.

The effects on a [Sound](../sounds/sound.md) run at the sample rate of its file, and the sound is converted to the project's rate after them. Put a [Resampling](./resampling.md) effect first to run them at the project's rate instead.

- [**Delay**](./delay.md) — Adds an echo / delay effect to the audio signal.
- [**Equalizer**](./equalizer.md) — Equalizer for the audio signal.
- [**Compressor**](./compressor.md) — Dynamic-range compressor that attenuates the signal above a threshold.
- [**Limiter**](./limiter.md) — Brick-wall peak limiter with optional lookahead.
- [**Gate**](./gate.md) — Noise gate that attenuates the signal while it stays below a threshold.
- [**Time Stretch**](./time-stretch.md) — Changes playback speed while preserving pitch.
- [**Noise Reduction**](./noise-reduction.md) — Learns the noise level from the audio to reduce steady background noise.
- [**Pitch Shift**](./pitch-shift.md) — Raises or lowers the pitch of the audio signal without changing its speed.
- [**Resampling**](./resampling.md) — Converts a sound from its file's sample rate to the project's with the interpolation you choose.
- [**Vibrato**](./vibrato.md) — Makes the pitch of the audio signal waver at a steady rate.
- [**Ring Modulator**](./ring-modulator.md) — Multiplies the audio signal by a sine wave for metallic and robotic sounds.

## Extension development

[Implementing Audio Effects](../../../extensions/audio-effects.md) describes the latency-reporting and tail-draining APIs.

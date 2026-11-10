---
title: "Vibrato"
description: "Makes the pitch of the audio signal waver at a steady rate."
sidebar_position: 9
---

# Vibrato

Makes the pitch of the audio signal waver by reading it through a delay that swings back and forth. The delay swings between `0` and twice `Depth`, and starts each swing at no delay, so an element starts on time.

## Library location

Library → Audio Effect → Vibrato

## Properties

### Rate (Hz) (Rate)

How many times per second the pitch wavers.

- **Type:** `float`
- **Default:** `5`
- **Animatable:** Yes
- **Range:** `[0, 20]`

### Depth (ms) (Depth)

How far the delay swings, in milliseconds. A larger depth makes the pitch waver further.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[0, 20]`

## Notes

- The delay holds the sound back by up to twice `Depth`. The effect reports that much latency, or 40 ms while `Depth` is animated, and the audio graph drains the held tail at a natural element end.
- The swing is worked out from the time alone, so a constant `Rate` gives the same result after a seek.

## Usage

Start from the defaults for a gentle vibrato. Raise `Depth` for a wider wobble, or raise `Rate` toward its maximum for a fast tremble.

## Source

[`src/Beutl.Engine/Audio/Effects/VibratoEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/VibratoEffect.cs)

- [`VibratoNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/VibratoNode.cs)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.resx)

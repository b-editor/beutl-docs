---
title: "Pitch Shift"
description: "Raises or lowers the pitch of the audio signal without changing its speed."
sidebar_position: 8
---

# Pitch Shift

Raises or lowers the pitch of the audio signal while keeping its speed. The sound is stretched with WSOLA, which joins short grains where their waveforms agree, and then played back at the rate the pitch asks for. The input is read ahead rather than delayed, so the effect adds no latency and the sound stays in time with the picture.

## Library location

Library → Audio Effect → Pitch Shift

## Properties

### Semitones

How far to shift the pitch, in semitones. `12` is one octave up and `-12` one octave down. At `0` the input passes through unchanged. A value outside the range, as from an expression, is held to the range.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-24, 24]`

## Usage

Add the effect to a sound's audio effect chain and set `Semitones` to change a voice or an instrument without changing its timing. Animate `Semitones` with keyframes or an expression for a pitch that changes over time.

## Source

[`src/Beutl.Engine/Audio/Effects/PitchShiftEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/PitchShiftEffect.cs)

- [`PitchShiftNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/PitchShiftNode.cs)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.resx)

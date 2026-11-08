---
title: "Ring Modulator"
description: "Multiplies the audio signal by a sine wave for metallic and robotic sounds."
sidebar_position: 10
---

# Ring Modulator

Multiplies the audio signal by a sine wave of `Frequency`, which turns each tone into the sum and the difference of the two frequencies. Use it for metallic, bell-like, or robotic voices. The sine wave is worked out from the time alone, so a constant `Frequency` gives the same result after a seek.

## Library location

Library → Audio Effect → Ring Modulator

## Properties

### Frequency (Hz) (Frequency)

Frequency of the sine wave the signal is multiplied by. Low values, below about 20 Hz, make the level pulse instead of changing the tone.

- **Type:** `float`
- **Default:** `440`
- **Animatable:** Yes
- **Range:** `[0, 5000]`

### Mix (%) (Mix)

Balance between the original and the modulated signal. `0` leaves the signal unchanged and `100` is fully modulated.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Usage

For a robot voice, set `Frequency` between about 30 and 100 Hz. For a bell-like sound, use a few hundred hertz and lower `Mix` to keep some of the original.

## Source

[`src/Beutl.Engine/Audio/Effects/RingModulatorEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/RingModulatorEffect.cs)

- [`RingModulatorNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/RingModulatorNode.cs)
- [`AudioStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.resx)

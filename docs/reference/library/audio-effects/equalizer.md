---
title: "Equalizer"
description: "A graphic equalizer with selectable band counts (5 / 10 / 15 / 31)."
sidebar_position: 2
---

# Equalizer

A graphic equalizer that splits the audio signal into a fixed set of frequency bands and lets you boost or cut each band. Pick a band count preset to get pre-tuned center frequencies, then adjust each band's filter type, frequency, gain, and Q.

## Library location

Library → Audio Effect → Equalizer

## Properties

### Band Count (BandCountOption)

Number of bands. Selecting a preset re-initializes the `Bands` list with pre-tuned center frequencies and a default Q value (1.4 for 5/10 bands, 2.0 for 15 bands, 4.3 for 31 bands).

- **Type:** `BandCountPreset` (`Bands5` / `Bands10` / `Bands15` / `Bands31`)
- **Default:** `BandCountPreset.Bands10`
- **Animatable:** No

### Bands

The list of equalizer bands. Each entry is an `EqualizerBand` and can be edited individually.

- **Type:** `IList<EqualizerBand>`
- **Default:** Initialized from the selected `Band Count` preset.
- **Animatable:** No (list itself); each band's Frequency / Gain / Q are animatable.

#### Band sub-properties

##### Filter Type

Biquad filter shape used for the band.

- **Type:** `BiQuadFilterType`
- **Default:** `Peak`
- **Animatable:** No

##### Frequency

Center frequency in Hz.

- **Type:** `float`
- **Default:** `1000` (overridden by the Band Count preset on initialization)
- **Range:** `20` to `20000`
- **Animatable:** Yes

##### Gain

Gain in decibels.

- **Type:** `float`
- **Default:** `0`
- **Range:** `-24` to `24`
- **Animatable:** Yes

##### Q

Q factor (filter bandwidth; smaller = wider).

- **Type:** `float`
- **Default:** `1` (overridden by the Band Count preset on initialization)
- **Range:** `0.1` to `18`
- **Animatable:** Yes

## Notes

- Bands left at the default `Peak` / `0 dB` (and with no animation) are skipped during processing, so a flat curve does not add per-band biquads to the signal path.
- Switching the `Band Count` preset rebuilds the `Bands` list, so any per-band edits made before the change are discarded.

## Source

[`src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/EqualizerEffect.cs)

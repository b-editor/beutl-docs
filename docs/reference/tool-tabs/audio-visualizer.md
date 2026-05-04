---
title: "Audio Visualizer"
description: "Describes the role and main usage of the Audio Visualizer tab."
sidebar_position: 12
---

# Audio Visualizer

A tab for **visualizing the audio** of a scene.
It provides several display modes — Waveform, Spectrum, Meter, Spectrogram, and Phase Scope — and analyzes audio not only during playback but also around the playhead while playback is stopped.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes (you can place several side by side with different display modes)

## How to open

Open it from the menu bar via **View → Tools → Audio Visualizer**.

## Layout

- **Toolbar (top)**: A display-mode dropdown on the left and a settings button (gear icon) on the right.
- **Display area (bottom)**: The visualizer for the currently selected mode.

:::note
This tab is meant for analyzing the playback audio of the scene you are editing. If you want to **embed a visualizer into the scene itself** as part of the rendered output, a separate Audio Visualizer drawable is provided under [Drawables > Audio Visualizer](../library/drawables/audio-visualizers/index.md).
:::

## Display modes

Switch between modes using the dropdown on the left of the toolbar. Hovering over each item shows a brief tooltip description.

### Waveform

A time-domain L/R waveform of the most recent audio.

- The upper trace is the left channel and the lower trace is the right channel; both share a center axis line.
- Useful for spotting transients, clipping, asymmetry between channels, DC offset, and confirming at a glance that audio is actually flowing.

### Spectrum

A real-time FFT frequency spectrum.

- The horizontal axis is logarithmic frequency (roughly 50 Hz to the Nyquist frequency), with `50 / 100 / 200 / 500 / 1k / 2k / 5k / 10k / 20k` gridlines drawn as dashed lines with numeric labels.
- The vertical axis is energy in dB (lower at the bottom, higher at the top); the lower bound is determined by the **Min dB** setting.
- The settings flyout exposes **FFT Size**, **Shape**, **Smoothing**, and **Min dB**.
- Useful for EQ work, detecting hum or whistles, and checking the high-frequency content of a mix.

The available shapes are:

- **Bar**: Vertical bars per frequency band.
- **Line**: A polyline connecting the band peaks.
- **FilledArea**: A filled area between the polyline and the bottom edge.
- **MirroredBars**: Vertical bars mirrored symmetrically above and below the center.

### Meter

A stereo L/R level meter that combines several broadcast-standard readouts.

- **L / R bars**: RMS (short-term average level). The scale runs from 0 dB at the top to about −60 dB at the bottom, with `0 / -3 / -6 / -12 / -24 / -36 / -48 / -60` dB gridlines on the right.
- **Peak-hold marker**: Drawn over each bar, decaying at about 6 dB/sec. It turns red as it approaches 0 dB.
- **Clip LED (red strip at the top of each bar)**: Latches on for about 2 seconds when the channel reaches 0 dBFS (±1.0).
- **M (momentary LUFS)**: Momentary loudness based on BS.1770-4 K-weighting (400 ms window), shown as a number below the bars.
- **TP L / TP R (true peak)**: Inter-sample peak in dBTP for each channel, computed by 4× polyphase oversampling. Decays similarly to the peak-hold marker.
- Useful for verifying loudness against delivery targets (e.g. −14 LUFS for YouTube, −23 LUFS for EBU R128) and for catching inter-sample peaks before encoding.

### Spectrogram

A time–frequency heatmap of roughly the last 4 seconds of audio.

- The horizontal axis is time (older on the left, newer on the right).
- The vertical axis is logarithmic frequency (low at the bottom, high at the top).
- Brightness (opacity) represents energy in dB above the noise floor.
- The settings flyout exposes **FFT Size** and **Min dB**.
- Useful for tracking how spectral content evolves over time — sweeping filters, vibrato, room modes, and the harmonic structure of sustained notes.

### Phase Scope

A phase monitor that displays stereo as a 45°-rotated Lissajous figure (goniometer).

- The diamond at the center is the display boundary; its four corners are labeled as follows:
  - **M (top)**: Pure mono. Audio with L=R traces a vertical line along this axis.
  - **S (bottom)**: Fully out of phase. Audio with L=−R spreads downward.
  - **L (left) / R (right)**: A single channel traces along the corresponding diagonal.
- The **corr** value at the top-left is the Pearson correlation coefficient between L and R: `+1` = perfectly mono, `0` = uncorrelated, `−1` = fully out of phase.
- Useful for catching channel-flipped or phase-cancelling material that would collapse during mono playback.

## Settings flyout

Open the settings panel via the gear icon on the right of the toolbar. The settings are shared by Spectrum, Spectrogram, and parts of the level meter display.

### Spectrum

- **FFT Size**: The FFT size used by Spectrum and Spectrogram. Choose from `256 / 512 / 1024 / 2048 / 4096 / 8192`. Larger values give better frequency resolution; smaller values give better time resolution (faster response).
- **Shape**: The drawing shape for Spectrum (Bar / Line / FilledArea / MirroredBars).
- **Smoothing**: Time smoothing for Spectrum, from `0%` to `95%`. Higher values produce a smoother display; lower values respond more quickly.

### Display

- **Min dB**: The lower bound of the displayed dB range, between `−120 dB` and `−40 dB`. In Spectrum, this is the bottom of the vertical axis; in Spectrogram, it is treated as the "noise floor".

### Resetting settings

**Right-clicking** any setting (combo box or slider) resets just that item to its default. The same hint is shown in each setting's tooltip. The defaults are:

| Item | Default |
|------|------|
| FFT Size | 2048 |
| Shape | Bar |
| Smoothing | 55% |
| Min dB | −90 dB |

## Following the playhead

- During playback, frames stream in in real time and the display updates continuously.
- Even while playback is stopped, audio around the playhead is re-analyzed every time you move the playhead, so the display follows fine scrubbing as well.
- When the tab is not selected, updates are paused to keep CPU usage down.

## State persistence

The selected display mode, FFT size, shape, smoothing, and Min dB are saved alongside the project layout and restored on next launch.

## Related documents

- [Scopes](./color-scopes.md)
- [Scene settings](./scene-settings.md)

## Source

- [`AudioVisualizerTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/AudioVisualizerTabExtension.cs)
- [`AudioVisualizerTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/AudioVisualizerTabViewModel.cs)
- [`AudioVisualizerMode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/AudioVisualizerMode.cs)
- [`SpectrumDisplayShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/SpectrumDisplayShape.cs)
- [`AudioVisualizerTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerTabView.axaml.cs)
- [`AudioVisualizerControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerControlBase.cs)
- [`WaveformControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/WaveformControl.cs)
- [`SpectrumControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/SpectrumControl.cs)
- [`LevelMeterControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/LevelMeterControl.cs)
- [`SpectrogramControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/SpectrogramControl.cs)
- [`PhaseScopeControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/PhaseScopeControl.cs)

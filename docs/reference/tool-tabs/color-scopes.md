---
title: "Scopes"
description: "Describes the role and main usage of the Scopes tab."
sidebar_position: 9
---

# Scopes

This tab visualizes the luminance and color information of the preview video as **Waveform, Histogram, Vectorscope, False Color, and Zebra** displays.
Use it as a diagnostic tool to objectively check the results of color correction or color grading, and to spot over- or under-exposure and color casts.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes (you can display different scope types side by side)

## How to open

Open it from the menu bar via **View → Tools → Scopes**.

## Layout

- **Toolbar (top)**: From left to right, the scope type selector, the per-type mode selector, the settings button (Zebra only), and the color-space selector.
- **Display area (bottom)**: Shows the contents of the selected scope. The Waveform and Histogram include axis labels, while the Vectorscope draws a circular grid and color targets.

## Scope types

Switch types using the dropdown at the left of the toolbar.

### Waveform

Samples the image horizontally and plots the luminance/color distribution of each column on the vertical axis.
Useful for checking highlight and shadow balance, and overall white-balance tendencies.

Mode selector (toolbar):

- **Luma**: Show luminance only
- **RGB Overlay**: Show the red, green, and blue channels overlaid
- **RGB Parade**: Show red, green, and blue arranged horizontally from left to right

### Histogram

Displays the luminance distribution of each channel as bars. Use it to check for clipping and to gauge overall contrast.

Mode selector (toolbar):

- **RGB Overlay**: Show red, green, and blue overlaid
- **RGB Parade**: Show red, green, and blue stacked vertically from top to bottom

### Vectorscope

Displays the color distribution in CbCr color space as a circular plot. Use it to check hue and saturation bias, and to verify the skin-tone line.

- A center crosshair, an outer circle, and a 75% inner-circle grid are drawn.
- Small target boxes are drawn for red, green, blue, cyan, magenta, and yellow.

### False Color

Displays an exposure map that maps luminance to a 9-step color ramp (purple, blue, green, gray, pink, yellow, orange, red, white).
Use it to align the skin-tone exposure target (roughly the gray band) or to spot highlight clipping at a glance.

### Zebra

Overlays diagonal stripes on pixels whose luminance is **above the high threshold** or **below the low threshold**.
Over-exposure is shown as black/white stripes, while under-exposure is shown as black/red stripes.

From the toolbar **settings button** (gear icon), you can adjust the following thresholds in the range 0.00 to 1.00.

- **High**: Treats luminance at or above this value as over-exposed
- **Low**: Treats luminance at or below this value as under-exposed

## Common operations

### Switching the color space

Use the dropdown at the right end of the toolbar to switch the color space used for measurement.

- **Gamma**: Aggregate values in sRGB (after gamma correction)
- **Linear**: Aggregate values in linear light (before gamma correction)

### Adjusting the HDR range

For Waveform, Histogram, False Color, and Zebra, you can change the upper limit of the displayed range (the HDR range).
Use this when reviewing HDR material to extend the displayed range beyond the SDR `1.0` ceiling.

- **Drag**: Left-drag on the scope to adjust. Drag vertically for Waveform, False Color, and Zebra; drag horizontally for Histogram.
- **Mouse wheel**: Scroll over the scope to zoom in or out.
- **Double-click**: Resets the HDR range to `1.0x`.
- During interaction, an **"HDR: ◯◯x"** overlay appears briefly in the upper right.

When the HDR range exceeds `1.0x`, the Waveform also draws the original SDR reference line (`1.0`).

### Auto-refresh

- Whenever the preview is rendered, the visible scope is updated automatically.
- Updates pause while the tab is not selected, reducing load.

### Saving state

The selected scope type, each scope's mode, the HDR range, the Zebra thresholds, and the color-space setting are saved alongside the project layout and restored on the next launch.

## Related documents

- [Color Grading](./color-grading.md)
- [Curves](./curves.md)

## Source

- [`ColorScopesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/ColorScopesTabExtension.cs)
- [`ColorScopesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/ViewModels/ColorScopesTabViewModel.cs)
- [`ColorScopesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/ColorScopesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/ColorScopesTabView.axaml.cs)
- [`ScopeControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ScopeControlBase.cs)
- [`HdrScopeControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/HdrScopeControlBase.cs)
- [`ImageOverlayScopeBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ImageOverlayScopeBase.cs)
- [`WaveformControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/WaveformControl.cs)
- [`HistogramControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/HistogramControl.cs)
- [`VectorscopeControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/VectorscopeControl.cs)
- [`FalseColorControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/FalseColorControl.cs)
- [`ZebraControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorScopesTab/Views/Scopes/ZebraControl.cs)

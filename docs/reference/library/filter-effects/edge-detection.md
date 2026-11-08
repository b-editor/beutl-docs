---
title: "Edge Detection"
description: "Draws lines where the layer's lightness, color, or transparency changes, for line art and masks."
sidebar_position: 45
---

# Edge Detection

Draws lines where the layer's lightness, color, or transparency changes, so you can take the outlines of a picture as line art or as a mask. The original picture can be hidden, shown behind the lines, or shown in front of them, which leaves an outline around it. This effect requires GPU textures and GLSL execution.

## Library location

Library → Filter Effect → Edge Detection

## Properties

### Detect (Target)

What a change is measured in.

- **Type:** `EdgeDetectionTarget`
- **Default:** `EdgeDetectionTarget.Luminance`
- **Animatable:** Yes

The choices are:

- `Luminance`: lines inside the picture, where it gets lighter or darker. Transparent parts count for nothing, so the picture's frame draws no line.
- `Transparency`: lines along the picture's outline, where it fades to transparent. The line reaches to both sides of the outline.
- `Color`: lines inside the picture, where its color changes in lightness, hue, or saturation. Two areas of the same lightness are separated when their hues differ. Transparent parts count for nothing.

### Thickness

How far the line reaches to each side of an edge, in composition units.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, 1000]`

### Threshold

Changes smaller than this draw no line. A change from black to white, or from transparent to opaque, is `100`.

- **Type:** `float`
- **Default:** `10`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Strength

How dark a change past the threshold draws its line. At `100` the line is solid from a change 10 points past the threshold, at `50` from 20 points past, and at `20` from 50 points past. Lower, a line darkens with the size of its change. It does not change how far a line reaches.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Color

Color of the lines.

- **Type:** `Color`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** Yes

### Original

Where the original picture goes.

- **Type:** `EdgeDetectionOriginal`
- **Default:** `EdgeDetectionOriginal.Hidden`
- **Animatable:** Yes

The choices are:

- `Hidden`: only the lines.
- `Behind`: the picture behind the lines.
- `In front`: the picture in front of the lines, which then show only around it and through its transparent parts.

## Usage

For line art, keep `Original` at `Hidden` and lower `Threshold` until the lines you want appear. To outline a cut-out shape, choose `Transparency` and `In front`, then raise `Thickness`. Use `Color` when two areas of similar brightness should still be separated.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/EdgeDetection.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetection.cs)

- [`EdgeDetectionTarget.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetectionTarget.cs) / [`EdgeDetectionOriginal.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetectionOriginal.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.resx)

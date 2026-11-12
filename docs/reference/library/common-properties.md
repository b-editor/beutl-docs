---
title: "Common properties"
description: "Properties declared on Beutl's base classes (Drawable, Shape, FilterEffect, ...) and inherited by all library items."
sidebar_position: 1
---

# Common properties

Every library item inherits properties from one or more base classes. These pages document the inherited properties, so individual item pages can stay focused on what is *new* in that class.

The types below describe property values. Extension code reads or writes the property object's `.Value`, for example `drawable.Opacity.Value`; rendering code reads the evaluated `Resource`. See [EngineObject and properties](../../extensions/engine-object.md).

The diagram below shows how the base classes relate:

```
EngineObject
 ├─ Drawable
 │   ├─ Shape (Pen, Fill)
 │   └─ AudioVisualizerDrawable
 ├─ FilterEffect
 ├─ Transform
 ├─ Sound
 ├─ AudioEffect
 ├─ Object3D
 │   └─ Group3D
 └─ Light3D
```

## EngineObject

Declared in [`src/Beutl.Engine/Engine/EngineObject.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Engine/EngineObject.cs). Base class: `Hierarchical`.

`IsTimeAnchor`, `IsEnabled`, `ZIndex`, and `TimeRange` are value-only property objects (`IProperty<bool>`, `IProperty<bool>`, `IProperty<int>`, and `IProperty<TimeRange>`). They are hidden from the ordinary property list. `Start` and `Duration` are read-only `MediaTime` accessors derived from `TimeRange.Value`.

## Drawable

Declared in [`src/Beutl.Engine/Graphics/Drawable.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Drawable.cs). Base class: `EngineObject`.

### Transform

Optional 2D transform applied to the drawable (translate / scale / rotate / skew). The constructor instantiates an empty `TransformGroup` so additional transforms can be appended. An object you add in the editor starts with Translate, Rotation, and Scale in that group; see [Transforms and effects](../tool-tabs/element-property.md#transforms-and-effects).

- **Type:** `Transform?`
- **Default:** Empty `TransformGroup`
- **Animatable:** No

### Alignment X (AlignmentX)

Horizontal alignment of the drawable inside its bounds.

- **Type:** `AlignmentX`
- **Default:** `Media.AlignmentX.Center`
- **Animatable:** Yes

### Alignment Y (AlignmentY)

Vertical alignment of the drawable inside its bounds.

- **Type:** `AlignmentY`
- **Default:** `Media.AlignmentY.Center`
- **Animatable:** Yes

### Transform Origin (TransformOrigin)

Pivot point used by `Transform`, expressed as a relative point (0–1).

- **Type:** `RelativePoint`
- **Default:** `RelativePoint.Center`
- **Animatable:** Yes

### Filter Effect (FilterEffect)

Optional chain of filter effects applied after rendering. The constructor instantiates an empty `FilterEffectGroup` so effects can be appended.

- **Type:** `FilterEffect?`
- **Default:** Empty `FilterEffectGroup`
- **Animatable:** No

### Blend Mode (BlendMode)

Blend mode used to composite this drawable onto the canvas.

- **Type:** `BlendMode`
- **Default:** `Graphics.BlendMode.SrcOver`
- **Animatable:** Yes

### Opacity

Layer opacity in percent (0 = transparent, 100 = fully opaque).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## Shape

Declared in [`src/Beutl.Engine/Graphics/Shapes/Shape.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Shapes/Shape.cs). Base class: `Drawable`.

### Stroke (Pen)

Outline pen (stroke). When `null`, no outline is drawn.

- **Type:** `Pen?`
- **Default:** `null`
- **Animatable:** No

The pen's **Stroke order** (`StrokeOrder`), right under **Location** in the pen editor, chooses whether the stroke is drawn on top of the fill. **Above fill** (`AboveFill`) is the default. **Below fill** (`BelowFill`) draws it under the fill, for an outlined look where a thick stroke never eats into the shape. It cannot be animated.

### Fill

Brush used to fill the interior. When `null`, the shape is hollow.

- **Type:** `Brush?`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** No

A gradient brush also chooses how it mixes the colors between its stops. **Interpolation** (`InterpolationSpace`) is **Linear sRGB** (`LinearSrgb`, the default), which mixes light, so the middle of black and white is 188 in 8-bit sRGB; **sRGB** (`Srgb`), which mixes the stored values as CSS does by default, so the middle is 128; or **OKLab** (`Oklab`), whose lightness changes evenly to the eye and whose colors in between stay clean. **Interpolate Premultiplied** (`InterpolatePremultiplied`, off by default) mixes the colors premultiplied by alpha, so a transparent stop brings no color of its own into the blend. Neither can be animated. The brush editor's swatch and stop bar show the gradient as it renders. Declared in [`GradientBrush.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Media/Brushes/GradientBrush.cs).

## Sound

Declared in [`src/Beutl.Engine/Audio/Sound.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/Sound.cs). Base class: `EngineObject`.

### Offset Position (OffsetPosition)

Time offset within the source audio at which playback starts.

- **Type:** `MediaTime`
- **Default:** `00:00:00`
- **Animatable:** No

### Gain

Audio gain in percent (100 = unity). The master output holds every sample within full scale, so a large gain cannot exceed 0 dBFS.

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Speed

Playback speed in percent (100 = normal).

- **Type:** `float`
- **Default:** `100`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Audio Effect (Effect)

The constructor instantiates an empty `AudioEffectGroup` so effects can be appended.

- **Type:** `AudioEffect?`
- **Default:** Empty `AudioEffectGroup`
- **Animatable:** No

### Pan

Balance between the left and right sides. `0` leaves both sides at full level, `-100` silences the right side, and `100` silences the left side. This and the following three properties are edited in the **Panner** section; see [Multichannel Audio](../../get-started/multichannel-audio.md#place-a-sound-with-the-panner).

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[-100, 100]`

### Front / back (SurroundPan)

In 5.1 and 7.1 projects, moves a mono or stereo sound from the front speakers to the surrounds at equal power. In 7.1, `50` is the side speakers and `100` is the rear speakers.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### Center (CenterLevel)

In 5.1 and 7.1 projects, moves part of a mono or stereo sound's front image into the center speaker, less as `Pan` moves off-center.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

### LFE (LfeLevel)

In 5.1 and 7.1 projects, sends a 120 Hz low-pass of a mono or stereo sound to the LFE channel.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes
- **Range:** `[0, 100]`

## AudioVisualizerDrawable

Declared in [`src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs). Base class: `Drawable`.

### Source

Sound source whose signal is visualized.

- **Type:** `Sound?`
- **Default:** `null`
- **Animatable:** No

### Width

Visualization width in pixels.

- **Type:** `float`
- **Default:** `640`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

### Height

Visualization height in pixels.

- **Type:** `float`
- **Default:** `120`
- **Animatable:** Yes
- **Range:** `[1, ∞)`

In the property panel, **Width** and **Height** share one **Size** row. See [Values shown in one row](../../get-started/keyframe.md#joined-rows).

### Fill

Brush used to draw the bars / lines.

- **Type:** `Brush?`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** No

### Gain

Per-visualizer gain applied before rendering (1 = unity).

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0.01, 1000]`

## FilterEffect

Declared in [`src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs). Base class: `EngineObject`.

`IsTimeAnchor`, `IsEnabled`, `ZIndex`, and `TimeRange` are value-only property objects (`IProperty<bool>`, `IProperty<bool>`, `IProperty<int>`, and `IProperty<TimeRange>`). They are hidden from the ordinary property list. `Start` and `Duration` are read-only `MediaTime` accessors derived from `TimeRange.Value`.

## Transform

Declared in [`src/Beutl.Engine/Graphics/Transformation/Transform.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/Transformation/Transform.cs). Base class: `EngineObject`.

`IsTimeAnchor`, `IsEnabled`, `ZIndex`, and `TimeRange` are value-only property objects (`IProperty<bool>`, `IProperty<bool>`, `IProperty<int>`, and `IProperty<TimeRange>`). They are hidden from the ordinary property list. `Start` and `Duration` are read-only `MediaTime` accessors derived from `TimeRange.Value`.

## AudioEffect

Declared in [`src/Beutl.Engine/Audio/Effects/AudioEffect.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Audio/Effects/AudioEffect.cs). Base class: `EngineObject`.

`IsTimeAnchor`, `IsEnabled`, `ZIndex`, and `TimeRange` are value-only property objects (`IProperty<bool>`, `IProperty<bool>`, `IProperty<int>`, and `IProperty<TimeRange>`). They are hidden from the ordinary property list. `Start` and `Duration` are read-only `MediaTime` accessors derived from `TimeRange.Value`.

## Object3D {/* #object3d */}

Beutl’s 3D coordinates use +X right, +Y down, and +Z away from the viewer, with one unit per pixel. Models default to scale `(100, 100, 100)`. [2D Drawable](./3d-objects/2d-drawable.md) uses its own unlit material, hides the material editor, and defaults to not casting shadows.

Declared in [`src/Beutl.Engine/Graphics3D/Object3D.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics3D/Object3D.cs). Base class: `EngineObject`.

### Position

Local position in 3D space.

- **Type:** `Vector3`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Rotation

Local rotation (Euler angles, degrees).

- **Type:** `Vector3`
- **Default:** `(0, 0, 0)`
- **Animatable:** Yes

### Scale

Local scale per axis as a ratio (1 = original size).

- **Type:** `Vector3`
- **Default:** `(1, 1, 1)`
- **Animatable:** Yes

### Material

Material that defines the surface's shading.

- **Type:** `Material3D?`
- **Default:** `PBRMaterial` (overridden to `null` on `Group3D`)
- **Animatable:** No

An **Unlit Material** ([`UnlitMaterial.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics3D/Materials/UnlitMaterial.cs)) shows its color and color map without lighting. Its **Alpha Mode** (`AlphaMode`, not animatable) decides how alpha is treated:

- **Auto** (the default): the material decides from its color and opacity, as earlier versions did.
- **Opaque**: alpha is ignored and depth is written. A color map shows the colors it stores under alpha 0.
- **Mask**: pixels whose alpha is below **Alpha Cutoff** (`AlphaCutoff`, `0.5` by default, from `0` to `1`) are dropped and the rest are opaque, and depth is written. Light passes through the cut-out parts, so they cast no shadow, and with an image as the color map, so does the pointer.
- **Blend**: the material is blended with what is behind it and writes no depth.

### Cast Shadows (CastShadows)

When `true`, this object casts shadows.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

### Receive Shadows (ReceiveShadows)

When `true`, this object receives shadows.

- **Type:** `bool`
- **Default:** `true`
- **Animatable:** Yes

## Group3D

Declared in [`src/Beutl.Engine/Graphics3D/Group3D.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics3D/Group3D.cs). Base class: `Object3D`.

`IsTimeAnchor`, `IsEnabled`, `ZIndex`, and `TimeRange` are value-only property objects (`IProperty<bool>`, `IProperty<bool>`, `IProperty<int>`, and `IProperty<TimeRange>`). They are hidden from the ordinary property list. `Start` and `Duration` are read-only `MediaTime` accessors derived from `TimeRange.Value`.

## Light3D

Declared in [`src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs). Base class: `EngineObject`.

### Color

Color of the light.

- **Type:** `Color`
- **Default:** `Colors.White`
- **Animatable:** Yes

### Intensity

Brightness multiplier of the light.

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Casts Shadow (CastsShadow)

When `true`, the light casts shadows.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Shadow Bias (ShadowBias)

Constant bias added to the shadow comparison to reduce acne.

- **Type:** `float`
- **Default:** `0.0001`
- **Animatable:** Yes
- **Range:** `[0, 0.01]`

### Shadow Normal Bias (ShadowNormalBias)

Bias along the surface normal to reduce shadow leaking.

- **Type:** `float`
- **Default:** `2`
- **Animatable:** Yes
- **Range:** `[0, 10]`

### Shadow Strength (ShadowStrength)

Mix between full lighting and shadowed regions (1 = full shadow).

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, 1]`

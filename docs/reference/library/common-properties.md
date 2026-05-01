---
title: "Common properties"
description: "Properties declared on Beutl's base classes (Drawable, Shape, FilterEffect, ...) and inherited by all library items."
sidebar_position: 1
---

# Common properties

Every library item inherits properties from one or more base classes. These pages document the inherited properties, so individual item pages can stay focused on what is *new* in that class.

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

Declared in [`src/Beutl.Engine/Engine/EngineObject.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EngineObject.cs). Base class: `Hierarchical`.

_This class declares no new properties of its own._

## Drawable

Declared in [`src/Beutl.Engine/Graphics/Drawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Drawable.cs). Base class: `EngineObject`.

### Transform

Optional 2D transform applied to the drawable (translate / scale / rotate / skew). The constructor instantiates an empty `TransformGroup` so additional transforms can be appended.

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

Declared in [`src/Beutl.Engine/Graphics/Shapes/Shape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/Shape.cs). Base class: `Drawable`.

### Stroke (Pen)

Outline pen (stroke). When `null`, no outline is drawn.

- **Type:** `Pen?`
- **Default:** `null`
- **Animatable:** No

### Fill

Brush used to fill the interior. When `null`, the shape is hollow.

- **Type:** `Brush?`
- **Default:** `#FFFFFFFF` (white)
- **Animatable:** No

## Sound

Declared in [`src/Beutl.Engine/Audio/Sound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Sound.cs). Base class: `EngineObject`.

### Offset Position (OffsetPosition)

Time offset within the source audio at which playback starts.

- **Type:** `TimeSpan`
- **Default:** `00:00:00`
- **Animatable:** No

### Gain

Audio gain in percent (100 = unity).

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

## AudioVisualizerDrawable

Declared in [`src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs). Base class: `Drawable`.

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

Declared in [`src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs). Base class: `EngineObject`.

_This class declares no new properties of its own._

## Transform

Declared in [`src/Beutl.Engine/Graphics/Transformation/Transform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/Transform.cs). Base class: `EngineObject`.

_This class declares no new properties of its own._

## AudioEffect

Declared in [`src/Beutl.Engine/Audio/Effects/AudioEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/AudioEffect.cs). Base class: `EngineObject`.

_This class declares no new properties of its own._

## Object3D

Declared in [`src/Beutl.Engine/Graphics3D/Object3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Object3D.cs). Base class: `EngineObject`.

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

Local scale per axis.

- **Type:** `Vector3`
- **Default:** `(1, 1, 1)`
- **Animatable:** Yes

### Material

Material that defines the surface's shading.

- **Type:** `Material3D?`
- **Default:** `PBRMaterial` (overridden to `null` on `Group3D`)
- **Animatable:** No

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

Declared in [`src/Beutl.Engine/Graphics3D/Group3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Group3D.cs). Base class: `Object3D`.

_This class declares no new properties of its own._

## Light3D

Declared in [`src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs). Base class: `EngineObject`.

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
- **Default:** `0.02`
- **Animatable:** Yes
- **Range:** `[0, 0.1]`

### Shadow Strength (ShadowStrength)

Mix between full lighting and shadowed regions (1 = full shadow).

- **Type:** `float`
- **Default:** `1`
- **Animatable:** Yes
- **Range:** `[0, 1]`

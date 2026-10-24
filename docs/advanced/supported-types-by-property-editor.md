---
title: Supported Types in Property Editor
description: List of types supported by the property editor
sidebar_position: 5
---

Supported Types:
- System.Byte
- System.SByte
- System.Int16
- System.UInt16
- System.Int32
- System.UInt32
- System.Int64
- System.UInt64
- System.Single
- System.Double
- System.Boolean
- System.String
- System.Enum
- Beutl.Media.FontFamily
- System.IO.FileInfo
- Beutl.Graphics.Point
- Beutl.Graphics.Size
- Beutl.Graphics.Rect
- Beutl.Graphics.RelativePoint
- Beutl.Graphics.Thickness
- Beutl.Graphics.CornerRadius
- Beutl.Graphics.Vector
- Beutl.Media.PixelPoint
- Beutl.Media.PixelSize
- Beutl.Media.PixelRect
- System.Numerics.Vector2
- System.Numerics.Vector3
- System.Numerics.Vector4
- Beutl.MediaTime
- Beutl.Media.Source.ImageSource
- Beutl.Media.Source.VideoSource
- Beutl.Media.Source.SoundSource
- Beutl.Media.Brush
- Beutl.Media.Pen
- Beutl.Graphics.Effects.FilterEffect
- Beutl.Audio.Effects.AudioEffect
- Beutl.Graphics.Transformation.Transform
- Beutl.ICoreList&lt;Beutl.Media.GradientStop&gt;
- System.Collections.IList
- Beutl.CoreObject
- System.Decimal
- Beutl.Rational
- Beutl.Media.Color
- Beutl.Media.GradingColor
- Beutl.Media.AlignmentX
- Beutl.Media.AlignmentY
- Beutl.Media.TextAlignment
- Beutl.Graphics.RelativeRect
- Beutl.Animation.Easings.Easing
- Beutl.IO.IFileSource
- Beutl.Graphics3D.Textures.TextureSource
- Beutl.Graphics3D.Models.ModelSource
- Beutl.Media.Source.CubeSource
- Beutl.ProjectSystem.Scene
- Beutl.Media.Geometry
- Beutl.Graphics.CurveMap
- Beutl.Graphics.Effects.DisplacementMapTransform
- Beutl.NodeGraph.GraphModel

Reference properties use a target picker for existing compatible objects. Time values use `Beutl.MediaTime` and are displayed as readable time text. See [Editing an Element](../get-started/edit-element.md#reference-targets).

There is no generic editor for arbitrary `IParsable<T>` types. Custom file-source pickers require a concrete class implementing `IFileSource` with a public parameterless constructor.

## Source

- [`BuiltInPropertyEditors.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/Services/BuiltInPropertyEditors.cs)

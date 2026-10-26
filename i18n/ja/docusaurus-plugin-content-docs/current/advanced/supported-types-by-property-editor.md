---
title: プロパティエディタが対応している型
description: プロパティエディタが対応している型を列挙します
sidebar_position: 5
---

対応している型
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

参照プロパティは、既存の対応するオブジェクトを選ぶ参照先ピッカーを使用します。時刻の値は `Beutl.MediaTime` で、読みやすい時間文字列として表示されます。[要素の編集](../get-started/edit-element.md#reference-targets)を参照してください。

任意の `IParsable<T>` 型を扱う汎用エディターはありません。独自のファイルソースの選択には、`IFileSource` を実装し、引数なしの公開コンストラクターを持つ具象クラスが必要です。

## ソース

- [`BuiltInPropertyEditors.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/PropertyEditors/Services/BuiltInPropertyEditors.cs)

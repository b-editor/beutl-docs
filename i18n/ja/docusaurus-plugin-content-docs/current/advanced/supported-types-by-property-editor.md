---
title: プロパティエディタが対応している型
description: プロパティエディタが対応している型を列挙します
sidebar_position: 5
---

組み込みのプロパティエディターは、以下の値の型に対応しています。オブジェクト用のエディターは対応する派生型にも適用されます。拡張機能の `Register<TValue, TContext>` と `RegisterValue<TValue, TEdit>` は、値の型が `TValue` と完全に一致するプロパティに適用されます。

- `System.Byte`
- `System.SByte`
- `System.Int16`
- `System.UInt16`
- `System.Int32`
- `System.UInt32`
- `System.Int64`
- `System.UInt64`
- `System.Single`
- `System.Double`
- `System.Decimal`
- `Beutl.Rational`
- `System.Boolean`
- `System.String`
- `System.Enum`
- `Beutl.Media.FontFamily`
- `System.IO.FileInfo`
- `Beutl.IO.IFileSource`
- `Beutl.Media.Color`
- `Beutl.Media.GradingColor`
- `Beutl.Graphics.Point`
- `Beutl.Graphics.Size`
- `Beutl.Graphics.Rect`
- `Beutl.Graphics.RelativePoint`
- `Beutl.Graphics.RelativeRect`
- `Beutl.Graphics.Thickness`
- `Beutl.Media.CornerRadius`
- `Beutl.Graphics.Vector`
- `Beutl.Media.PixelPoint`
- `Beutl.Media.PixelSize`
- `Beutl.Media.PixelRect`
- `System.Numerics.Vector2`
- `System.Numerics.Vector3`
- `System.Numerics.Vector4`
- `Beutl.MediaTime`
- `Beutl.Animation.Easings.Easing`
- `Beutl.Media.Source.ImageSource`
- `Beutl.Media.Source.VideoSource`
- `Beutl.Media.Source.SoundSource`
- `Beutl.Graphics3D.Textures.TextureSource`
- `Beutl.Graphics3D.Models.ModelSource`
- `Beutl.Media.Source.CubeSource`
- `Beutl.Media.Brush`
- `Beutl.Media.Pen`
- `Beutl.ProjectSystem.Scene`
- `Beutl.Graphics.Effects.FilterEffect`
- `Beutl.Media.Geometry`
- `Beutl.Audio.Effects.AudioEffect`
- `Beutl.Graphics.Transformation.Transform`
- `Beutl.Graphics.CurveMap`
- `Beutl.Collections.ICoreList<Beutl.Media.GradientStop>`
- `Beutl.Graphics.Effects.DisplacementMapTransform`
- `System.Collections.IList`
- `Beutl.NodeGraph.GraphModel`
- `Beutl.CoreObject`

`IFileSource` のエディターは、公開の引数なしコンストラクターを持つ、未指定の型パラメーターを含まない非抽象クラスを対象とします。リストのエディターは項目の型を取得するために、`IList` とともに `IList<T>` の実装を必要とします。`CoreObject` 型に対して `Property.CreateReference<T>()` で宣言した参照プロパティには、参照先を選ぶエディターが使われます。

タイムラインの時刻には `MediaTime` を使用してください。以前の `TimeSpan` エディターと汎用の `IParsable<T>` フォールバックは削除されています。別の型に対応するエディターを追加するには、`PropertyEditorExtension.RegisterEditors(PropertyEditorRegistry)` を実装します。[エディターとの連携](../extensions/editor-integration.md)を参照してください。

## ファイル選択

`FileInfo` またはファイルソースのプロパティに、`Beutl.Core` の `Beutl.FileFilterAttribute` を付けると、ファイル選択のフィルターを指定できます。複数の属性で複数のファイル種別を提示でき、組み込みのソースエディターでは既定のフィルターを置き換えます。ファイル名のパターンはエディターへのドロップ可否にも使われるため、独自の形式にはパターンを指定してください。`MimeTypes` と `AppleUniformTypeIdentifiers` はプラットフォーム別のファイル選択用メタデータです。

```csharp
using System.IO;
using Beutl;
using Beutl.Engine;

public partial class SubtitleFileOptions : EngineObject
{
    public SubtitleFileOptions()
    {
        ScanProperties<SubtitleFileOptions>();
    }

    [FileFilter("Subtitles", "*.srt", "*.vtt")]
    [FileFilter("Text files", "*.txt", MimeTypes = new[] { "text/plain" },
        AppleUniformTypeIdentifiers = new[] { "public.plain-text" })]
    public IExpressionProperty<FileInfo?> SubtitleFile { get; }
        = Property.CreateExpression<FileInfo?>();
}
```

汎用のファイルソースエディターは新しいソースを作成し、選択したファイルの絶対 URI を `ReadFrom(Uri)` に渡します。パスを消去すると値は `null` になり、生成または読み取りに失敗すると以前の値を維持します。汎用プロパティに属性がなければファイル選択を絞り込みません。フィルターはファイルの内容を検証しないため、読み込む内容は拡張機能側で検証してください。

## ソース

- [`BuiltInPropertyEditors.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/Services/BuiltInPropertyEditors.cs)
- [`PropertyEditorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorRegistry.cs)
- [`FileFilterAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/FileFilterAttribute.cs)
- [`FileSourceEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/ViewModels/FileSourceEditorViewModel.cs)
- [`PropertyEditorControls.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/Services/PropertyEditorControls.cs)
- [`FilePickerFileTypeMatcher.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/FilePickerFileTypeMatcher.cs)

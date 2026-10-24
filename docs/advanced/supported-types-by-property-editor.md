---
title: Supported Types in Property Editor
description: List of types supported by the property editor
sidebar_position: 5
---

The built-in property editors support the following value types. Object editors also match supported derived types; extension registrations with `Register<TValue, TContext>` or `RegisterValue<TValue, TEdit>` match exactly `TValue`.

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

The `IFileSource` editor requires a concrete class with no unbound type parameters and a public parameterless constructor. The list editor requires an implementation of `IList<T>` as well as `IList` so it can determine the item type. Reference properties created with `Property.CreateReference<T>()` for a `CoreObject` type use the reference target picker.

Use `MediaTime` for timeline time values; the former `TimeSpan` editor and the generic `IParsable<T>` fallback are no longer available. To add an editor for another type, implement `PropertyEditorExtension.RegisterEditors(PropertyEditorRegistry)`. See [Editor integration](../extensions/editor-integration.md).

## File pickers

Add `Beutl.FileFilterAttribute` (from `Beutl.Core`) to a `FileInfo` or file-source property to set its picker filters. Multiple attributes offer multiple file types and replace a built-in source editor's default filters. Filename patterns also determine which files can be dropped onto the editor; provide patterns for custom formats. `MimeTypes` and `AppleUniformTypeIdentifiers` add platform-specific picker metadata.

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

The generic file-source editor constructs a new source and calls `ReadFrom(Uri)` with the selected file's absolute URI. Clearing the path sets the value to `null`; construction or reading errors leave the previous value unchanged. An unannotated generic property has no picker filter. Filters do not validate file contents, so the extension must still validate what it reads.

## Source

- [`BuiltInPropertyEditors.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/Services/BuiltInPropertyEditors.cs)
- [`PropertyEditorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorRegistry.cs)
- [`FileFilterAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/FileFilterAttribute.cs)
- [`FileSourceEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/ViewModels/FileSourceEditorViewModel.cs)
- [`PropertyEditorControls.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PropertyEditors/Services/PropertyEditorControls.cs)
- [`FilePickerFileTypeMatcher.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/FilePickerFileTypeMatcher.cs)

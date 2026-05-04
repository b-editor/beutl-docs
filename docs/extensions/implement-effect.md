---
title: Implementing Effects
description: Implement a custom FilterEffect using the EngineObject pattern.
---

A `FilterEffect` is an `EngineObject` that post-processes a render target. The shape of the code is the same as in [Implementing a Drawing Object](implement-drawing-object.md): declare a `partial class`, expose `IProperty<T>` members, and read snapshot values from the auto-generated `Resource` inside `ApplyTo`.

If you have not read the [EngineObject reference](engine-object.md) yet, start there. The property system and `Resource` lifecycle are explained on that page.

## 1. The minimal effect

```cs
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public sealed partial class MyFilterEffect : FilterEffect
{
    public MyFilterEffect()
    {
        ScanProperties<MyFilterEffect>();
    }

    public override void ApplyTo(FilterEffectContext context, FilterEffect.Resource resource)
    {
        // Add filter operations to context here.
    }
}
```

Two differences compared to `Drawable`:

- `ApplyTo` receives a `FilterEffectContext` and the auto-generated `Resource`. Cast `resource` to your derived `Resource` type to read property values.
- There is no `MeasureCore` or `OnDraw`. The editor pipes the render target through `FilterEffectContext` for you, so you only describe how to transform it.

## 2. Combining existing effects

The simplest custom effects layer Beutl's built-in operations through the extension methods on `FilterEffectContext`. Bounds expansion (e.g. blur enlarging the surface) is handled internally, so you rarely need to adjust sizes yourself.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl.Engine;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;
using Beutl.Media;

namespace MyExtension;

public sealed partial class HighContrastBlur : FilterEffect
{
    public HighContrastBlur()
    {
        ScanProperties<HighContrastBlur>();
    }

    [Display(Name = "Blur Sigma")]
    [Range(0, float.MaxValue)]
    public IProperty<float> BlurSigma { get; } = Property.CreateAnimatable<float>(20);

    [Display(Name = "Contrast")]
    [Range(-100, 100)]
    public IProperty<float> Contrast { get; } = Property.CreateAnimatable<float>(20);

    public override void ApplyTo(FilterEffectContext context, FilterEffect.Resource resource)
    {
        var r = (Resource)resource;
        context.Blur(new Size(r.BlurSigma, r.BlurSigma));
        context.HighContrast(
            grayscale: false,
            invertStyle: HighContrastInvertStyle.NoInvert,
            contrast: r.Contrast / 100f);
    }
}
```

`FilterEffectContext` exposes a method for each built-in operation: `Blur`, `DropShadow`, `InnerShadow`, `Erode`, `Dilate`, `ColorMatrix`, `Saturate`, `HueRotate`, `Brightness`, `HighContrast`, `Lighting`, `LookupTable`, `MatrixConvolution`, `Transform`, `BlendMode`, and more. See [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs) for the complete list.

## 3. Processing the render target directly

See [`FlatShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs), [`ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs), and [`GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs) as references.

## 4. Register the effect in your extension

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyEffectExtension : LayerExtension
{
    public override string Name => "My Effects";
    public override string DisplayName => "My Effects";

    public override void Load()
    {
        LibraryService.Current.Register<HighContrastBlur>(
            KnownLibraryItemFormats.FilterEffect,
            "High-Contrast Blur");
    }
}
```

If you want to bundle several effects together, use the `RegisterGroup` helper described in the [EngineObject reference](engine-object.md#registering-with-the-library) to organize them under a single library category.

## Reference files in the Beutl source

| File | What it teaches |
| --- | --- |
| `src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs` | A minimal effect that delegates to a single `FilterEffectContext` call. |
| `src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs` | Custom drawing through `CustomEffect`, with `transformBounds` to expand the surface. |
| `src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs` | The full list of chainable built-in operations. |

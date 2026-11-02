---
title: Implementing Effects
description: Implement a custom FilterEffect using the EngineObject pattern.
---

A `FilterEffect` is an `EngineObject` that post-processes a render target. The shape of the code is the same as in [Implementing a Drawing Object](implement-drawing-object.md): declare a `partial class`, expose `IExpressionProperty<T>` members, and override `ApplyTo` on the auto-generated `Resource`, whose properties hold the evaluated values.

If you have not read the [EngineObject reference](engine-object.md) yet, start there. The property system and `Resource` lifecycle are explained on that page.

## 1. The minimal effect

```cs
using Beutl.Graphics.Effects;

namespace MyExtension;

public sealed partial class MyFilterEffect : FilterEffect
{
    public MyFilterEffect()
    {
        ScanProperties<MyFilterEffect>();
    }

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            // Add filter operations to context here.
        }
    }
}
```

Two differences compared to `Drawable`:

- `ApplyTo` receives only a `FilterEffectContext`. Inside `Resource`, a property name is the value evaluated at the rendered time, so there is nothing to cast. `RequireOriginal()` returns the effect when a method needs state that is not a property.
- There is no `MeasureCore` or `OnDraw`. The editor pipes the render target through `FilterEffectContext` for you, so you only describe how to transform it.

## 2. Combining existing effects

The simplest custom effects layer Beutl's built-in operations through the methods on `FilterEffectContext`. Bounds expansion (e.g. blur enlarging the surface) is handled internally, so you rarely need to adjust sizes yourself.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;
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
    public IExpressionProperty<float> BlurSigma { get; } = Property.CreateAnimatable<float>(20);

    [Display(Name = "Contrast")]
    [Range(-100, 100)]
    public IExpressionProperty<float> Contrast { get; } = Property.CreateAnimatable<float>(20);

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            context.Blur(new Size(BlurSigma, BlurSigma));
            context.HighContrast(
                grayscale: false,
                invertStyle: HighContrastInvertStyle.NoInvert,
                contrast: Contrast / 100f);
        }
    }
}
```

`FilterEffectContext` exposes a method for each built-in operation: `Blur`, `DropShadow`, `InnerShadow`, `Erode`, `Dilate`, `ColorMatrix`, `Saturate`, `HueRotate`, `Brightness`, `HighContrast`, `Lighting`, `MatrixConvolution`, `Transform`, `BlendMode`, and more. See [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs) and [`FilterEffectContext.Operations.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.Operations.cs) for the complete list.

`Crop(Rect, GradientSpreadMethod = Decal)` crops in the coordinates of `Bounds`. The default `Decal` makes pixels outside the rectangle transparent and shrinks the bounds. `Pad` extends edge pixels, `Repeat` tiles, and `Reflect` mirrors the crop while retaining the original bounds.

For GLSL with multiple inputs or multiple passes, also see [C# Script](../reference/library/filter-effects/script/csharp-script.md#custom-glsl-passes).

`Resource.ApplyTo` is protected. To apply another effect, such as a composite's child, call `context.Apply(childResource)`, which keeps continuation boundaries and the enabled state.

### Migrating from preview.9 {/* #migrating-from-preview-9 */}

In preview.9 `ApplyTo` lived on the effect class and received a `resource` argument. There are no compatibility shims: move the body into the nested `Resource`, replace `r.Property` with `Property`, and rebuild.

<div style={{ overflowX: 'auto' }}>

| Before | After |
| --- | --- |
| `override void FilterEffect.ApplyTo(FilterEffectContext, Resource)` | `protected override void ApplyTo(FilterEffectContext)` in the effect's `Resource` |
| `effect.ApplyTo(context, resource)` | `context.Apply(resource)` |

</div>

## 3. Processing the render target directly {/* #processing-the-render-target */}

See [`FlatShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs), [`ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs), and [`GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs) as references.

`CustomEffect(data, action, transformBounds)` receives explicit state and computes output bounds from that state. If output bounds cannot be known during recording, the overload without `transformBounds` leaves them symbolic until the owning target's finite domain is available. Keep metadata callbacks independent of mutable editing objects.

`FilterEffectContext.Shader(ShaderDescription)` and `Geometry(GeometryDescription)` record deferred operations with explicit bounds and hit-test contracts. Use `RenderHitTestContract.None`, `OutputBounds`, `AnyInput`, or `Custom(...)` to state how the operation participates in selection; `default(RenderHitTestContract)` is invalid. A custom callback can receive state through `Custom(state, static (state, context, point) => ...)`.

An `AppendSkiaFilter` factory must only produce its filter. It must not re-enter its `FilterEffectExecutor` through `Activate`, `Flush`, or related methods. Put target drawing in a `CustomEffect` action instead.

A `CustomEffect` callback run by the renderer cannot launch another `RenderNodeRenderer`, including through `DrawDrawable` or `DrawNode` on a canvas from `Open`; such a call throws `InvalidOperationException`. Record the drawable into a `RenderNode`, render it with `CustomFilterEffectContext.ExecutionContext.RenderDependency(root, identity, domain)`, and draw the returned image. The dependency shares the request's allocation, working density, cancellation and cycle detection. A repeated identity reuses the image only within the same recorded effect. `ExecutionContext` is `null` when the effect runs outside the renderer.

`ContinuationEffect(data, action)` hands its callback a `FilterEffectContinuation` for the operations recorded after it, to run any number of times or not at all. `TargetEffect(data, action)` hands its callback a `CompositionTargetAccess`, whose `Capture()` and `Replace(image)` read and replace the composition target beneath the effect. The resource recording them must return `true` from `ControlsContinuation` or `MayAccessTarget` respectively, for every evaluation time. The engine splits chains and routes target work from these declarations before recording, so an undeclared recording throws.

### Metadata callback diagnostics

If the compiler reports `BESG004`, check the values read by the metadata callback and any helpers it calls. Pass those values through explicit state or bound render resources instead of reading mutable static state.

## 4. Declarative shader graphs {/* #shader-graphs */}

`context.ShaderGraph(state, record)` records multi-pass GLSL graphics and compute work without an execution callback. The `record` callback runs synchronously while recording and only declares images, buffers and passes. The renderer compiles the programs, allocates and reuses images, and synchronizes the passes.

```cs
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Shaders;

namespace MyExtension;

public sealed partial class InvertGraphEffect : FilterEffect
{
    private static readonly ShaderProgram s_invert = ShaderProgram.Fullscreen(new ShaderSource("""
        #version 450
        layout(binding = 0) uniform sampler2D image;
        layout(binding = 1, std140) uniform Source { vec4 logical; vec4 raster; vec4 size; } src;
        layout(binding = 2, std140) uniform Destination { vec4 logical; vec4 raster; vec4 size; } dst;
        layout(push_constant) uniform Values { vec4 value; } pc;
        layout(location = 0) out vec4 color;
        void main() {
            vec2 position = dst.raster.xy + gl_FragCoord.xy / dst.size.z;
            vec4 sampled = texture(image, (position - src.raster.xy) / src.raster.zw);
            color = vec4(mix(sampled.rgb, sampled.a - sampled.rgb, pc.value.x), sampled.a);
        }
        """));

    public InvertGraphEffect()
    {
        ScanProperties<InvertGraphEffect>();
    }

    [Display(Name = "Amount")]
    [Range(0, 100)]
    public IExpressionProperty<float> Amount { get; } = Property.CreateAnimatable(100f);

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            context.ShaderGraph(new Vector4(Amount / 100f, 0, 0, 0), static (graph, values) =>
            {
                ShaderImage output = graph.Image2D("output", graph.Source);
                graph.Fullscreen("invert", s_invert, pass =>
                {
                    pass.SampledImage(0, graph.Source);
                    pass.ImageParameters(1, graph.Source);
                    pass.ImageParameters(2, output);
                    pass.PushConstants(values);
                    pass.InputRegion(0, ShaderInputRegion.Identity);
                    pass.ColorAttachment(0, output);
                });
                return graph.Output(output);
            });
        }
    }
}
```

- `graph.Source` is the complete incoming image. A pass reads it only through its own `SampledImage` binding.
- `graph.Image2D(name, like, format, padding, resolutionScale)` declares an image with the bounds of another one. `graph.Fullscreen`, `graph.Render` and `graph.Compute` record passes, and `ShaderProgram.Fullscreen`, `Graphics` and `Compute` create their programs.
- `pass.ImageParameters(binding, image)` binds three std140 `vec4` values: the logical bounds, the raster bounds in the same coordinates, and (pixel width, pixel height, raster scale, 0).
- `pass.PushConstants(value)` copies an unmanaged value of up to 128 bytes, in multiples of four.
- `pass.InputRegion(binding, region)` declares the complete sampling footprint of a sampled image and enables partial rendering. Without it or `PartialRendering()`, the pass runs in full.
- `graph.Output(image)` selects the result, which is linear premultiplied unless you pass another `ColorEncoding`.

`WaveRefraction.cs` and `LightRays.cs` in the Beutl source are complete multi-pass examples.

## 5. Evaluating the input at another time {/* #input-evaluation */}

An effect that needs other moments of its input, such as a motion blur, overrides `UsesInputEvaluation`, `PrepareInput` and `RenderInput` on its `Resource`. An ordinary `ApplyTo` effect needs none of these.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Composition;
using Beutl.Engine;
using Beutl.Graphics;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public sealed partial class EchoEffect : FilterEffect
{
    public EchoEffect()
    {
        ScanProperties<EchoEffect>();
    }

    [Display(Name = "Delay (seconds)")]
    [Range(0, 10)]
    public IExpressionProperty<float> DelaySeconds { get; } = Property.CreateAnimatable(0.25f);

    public new partial class Resource
    {
        private FilterEffectInputSample? _current;
        private FilterEffectInputSample? _delayed;

        public override bool UsesInputEvaluation => true;

        // RenderInput records the samples, so there is nothing to apply to the pixels.
        protected override void ApplyTo(FilterEffectContext context)
        {
        }

        public override bool PrepareInput(FilterEffectInputContext input)
        {
            MediaTime time = input.EvaluationContext.Time;
            _current = input.Evaluate(time);
            _delayed = input.Evaluate(time - MediaTime.FromSeconds(DelaySeconds));
            return true;
        }

        public override void RenderInput(GraphicsContext2D context, FilterEffectInputContext input)
        {
            DrawSample(_delayed!);
            DrawSample(_current!);

            void DrawSample(FilterEffectInputSample sample)
            {
                using (context.PushBlendMode(BlendMode.Plus))
                using (context.PushOpacity(0.5f))
                    sample.Draw(context);
            }
        }

        partial void PostReconcile(EchoEffect obj, CompositionContext context) => ClearSamples();

        partial void PostDispose(bool disposing) => ClearSamples();

        private void ClearSamples()
        {
            _current = null;
            _delayed = null;
        }
    }
}
```

- `PrepareInput` runs after the source is reconciled, even when current-time values did not change. Call `input.Evaluate(time)` for every sample there, so their dependencies, bounds and 3D requirements are known before recording, and return `true` to supply the replacement drawing.
- `input.EvaluationContext` captures the input's clock and its `Conditions`: the effective output `FrameRate`, proxy policy, target domain, scene queries and cancellation token. Let `OperationCanceledException` propagate.
- `sample.Draw(context)` records the sample with its own transform, opacity and preceding effects, in the drawable's parent coordinates. The engine then runs the following effects on the replacement once and composites the owner's blend mode once. Do not reapply the drawable's transform or opacity, and do not clip to its current bounds.
- The engine owns the samples until the source's next reconciliation or disposal, so clear your references in `PostReconcile` and `PostDispose`.
- In a custom execution callback, `ExecutionContext.RenderDependency(sample, availableSize, domain)` renders a sample through the current request. Choose a finite, non-empty domain in parent coordinates, and dispose the returned image lease.

`CompositionContext.EvaluationServices`, which is also available through `input.EvaluationContext`, answers read-only queries about the scene being evaluated: `GetLayers(time)`, `EvaluateLayer(zIndex, time)`, `ReadLayer`, `TryReadFrame` and `ReadAudio(start, duration)`. A detached evaluation may leave it `null`. `TryReadFrame` returns `false` until evaluation completes, so read it from a render-time callback. For an audio-reactive effect, `AudioSpectrum.Calculate(samples, magnitudes)` computes frequency magnitudes from a power-of-two number of samples.

## 6. Register the effect in your extension

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyEffectExtension : Extension
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

<div style={{ overflowX: 'auto' }}>

| File | What it teaches |
| --- | --- |
| `src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs` | A minimal effect that delegates to a single `FilterEffectContext` call. |
| `src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs` | Custom drawing through `CustomEffect`, with `transformBounds` to expand the surface. |
| `src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs` | The full list of chainable built-in operations. |
| `src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs` | A two-pass declarative shader graph. |
| `src/Beutl.Engine/Graphics/FilterEffects/MotionBlur.cs` | Accumulating time samples of the input through `PrepareInput` and `RenderInput`. |

</div>

- [`DiagnosticDescriptors.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine.SourceGenerators/Diagnostics/DiagnosticDescriptors.cs)
- [`FilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs), [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs), and [`FilterEffectContext.Operations.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.Operations.cs)
- [`FilterEffectInputContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectInputContext.cs) and [`FilterEffectContinuation.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContinuation.cs)
- [`RenderExecutionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderExecutionContext.cs), [`CompositionTargetAccess.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/CompositionTargetAccess.cs), and [`RenderHitTestContract.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/Operations/RenderHitTestContract.cs)
- [`ShaderGraphBuilder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shaders/Graph/ShaderGraphBuilder.cs) and [`ShaderPassBuilder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shaders/Graph/ShaderPassBuilder.cs)
- [`ICompositionEvaluationServices.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Composition/ICompositionEvaluationServices.cs) and [`AudioSpectrum.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioSpectrum.cs)
- [`drawing-on-resources-migration.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/drawing-on-resources-migration.md) and [`resolution-independent-rendering.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/resolution-independent-rendering.md)

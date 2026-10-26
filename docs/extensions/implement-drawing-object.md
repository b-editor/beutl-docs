---
title: Implementing a Drawing Object
description: Implement a star-shaped drawing object using the EngineObject pattern.
---

This guide walks through implementing a custom drawing object using Beutl 2.x's extension API, using a star shape as the example.

If you have not read the [EngineObject reference](engine-object.md) yet, start there. This page assumes a basic understanding of `partial class` declarations, the `IExpressionProperty<T>` factory, and the auto-generated `Resource` class.

A drawing object needs two pieces: a class that derives from `Drawable`, and an `Extension` class that registers it. Because a star shape can be expressed entirely as a `Geometry`, we inherit from `Shape` so that fills, pens, and bounds are handled by the `Shape` base class for free.

## 1. Create the `StarShape` class

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics.Shapes;

namespace MyExtension;

public sealed partial class StarShape : Shape
{
    public StarShape()
    {
        ScanProperties<StarShape>();
    }
}
```

Steps 1 and 2 show the parts of the class. The complete implementation to compile is in step 3. Two things to keep in mind:

- Mark the class as `partial` so the source generator can emit the matching `Resource` class.
- Call `ScanProperties<StarShape>()` from the constructor so the editor picks up the `IExpressionProperty<>` members declared below.

## 2. Add a `Size` property

```cs
public sealed partial class StarShape : Shape
{
    public StarShape()
    {
        ScanProperties<StarShape>();
    }

    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IExpressionProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);
}
```

`Property.CreateAnimatable<float>(100)` creates an animatable property with a default value of `100`. The `Shape` base class already exposes `Fill`, `Pen`, `Transform`, `Opacity`, `BlendMode`, and so on, so this derived class only needs to declare its own properties.

## 3. Build the geometry inside `Resource`

Geometry construction belongs at the render-time layer so that the result reflects animated values and is rebuilt only when the inputs change. Add a `partial class Resource`, rebuild the geometry in `PostReconcile`, and return it from `GetGeometry()` (the abstract method `Shape.Resource` requires).

```cs
using System;
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Composition;
using Beutl.Engine;
using Beutl.Graphics;
using Beutl.Graphics.Rendering;
using Beutl.Graphics.Shapes;
using Beutl.Media;

namespace MyExtension;

public sealed partial class StarShape : Shape
{
    public StarShape()
    {
        ScanProperties<StarShape>();
    }

    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IExpressionProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    public partial class Resource
    {
        private readonly PathGeometry _geometry = new();
        private PathGeometry.Resource? _geometryResource;
        private float _builtForSize = float.NaN;

        partial void PostReconcile(StarShape obj, CompositionContext context)
        {
            float size = Math.Max(Size, 0);
            if (size != _builtForSize)
            {
                BuildStar(size);
                _builtForSize = size;
            }

            bool changed = false;
            ResourceReconciler.ReconcileResource(context, _geometry, ref _geometryResource, ref changed);
            if (changed)
                Version++;
        }

        partial void PostDispose(bool disposing)
        {
            if (disposing)
                _geometryResource?.Dispose();
        }

        public override Geometry.Resource? GetGeometry() => _geometryResource;

        private void BuildStar(float size)
        {
            _geometry.Figures.Clear();

            var center = new Point(size / 2, size / 2);
            float radius = 0.45f * size;

            var figure = new PathFigure();
            figure.StartPoint.Value = new Point(size / 2, size / 2 - radius);

            for (int i = 1; i < 5; i++)
            {
                float angle = i * 4 * MathF.PI / 5;
                figure.Segments.Add(new LineSegment(
                    center + new Point(radius * MathF.Sin(angle), -radius * MathF.Cos(angle))));
            }

            figure.IsClosed.Value = true;
            _geometry.Figures.Add(figure);
        }
    }
}
```

Key points:

- `Size` inside `Resource` is the snapshot value — the generator copies the current value of the `Size` property into a field for you.
- `ResourceReconciler.ReconcileResource` creates or reconciles the geometry resource; `Version++` propagates a detected change to the parent resource.
- `_geometry` is reused across frames; the figures are rebuilt only when `Size` changes. The `Geometry.Resource` is retained and reused; the helper calls `Geometry.Resource.Reconcile()`.
- Measurement, fill, pen, and bounds are all handled by the `Shape` base class based on the geometry returned from `GetGeometry()`.

## 4. Register the class in your extension

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class StarShapeExtension : Extension
{
    public override string Name => "Star Shape";
    public override string DisplayName => "Star Shape";

    public override void Load()
    {
        LibraryService.Current.AddMultiple("Star Shape", item => item
            .BindDrawable<StarShape>());
    }
}
```

The `[Export]` attribute lets Beutl's loader discover the extension. `AddMultiple` plus `BindDrawable<T>()` is enough to expose `StarShape` in the library. See the [EngineObject reference](engine-object.md#registering-with-the-library) for the full set of registration helpers.

## Going further: a free-form `Drawable` without `Shape`

If you want to draw directly with `GraphicsContext2D` instead of using a geometry, derive from `Drawable` directly and override `MeasureCore` and `OnDraw`. Both methods receive a snapshot through `Drawable.Resource`, which you cast to your generated `Resource` type to read property values.

```cs
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;
using Beutl.Graphics.Rendering;
using Beutl.Media;

namespace MyExtension;

public sealed partial class CustomDrawable : Drawable
{
    public CustomDrawable()
    {
        ScanProperties<CustomDrawable>();
    }

    public IExpressionProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    protected override Size MeasureCore(Size availableSize, Drawable.Resource resource)
    {
        var r = (Resource)resource;
        return new Size(r.Size, r.Size);
    }

    protected override void OnDraw(GraphicsContext2D context, Drawable.Resource resource)
    {
        var r = (Resource)resource;
        context.DrawRectangle(new Rect(0, 0, r.Size, r.Size), Brushes.Resource.White, null);
    }
}
```

If you implement a custom `RenderNode`, update its state and call `MarkChanged()` on the thread that records it. Its owner must explicitly call `Dispose()`. `RenderNode` has no finalizer, so an abandoned node does not receive `OnDispose(false)`.

## Source

- [`RectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) and [`Shape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/Shape.cs)
- [`ResourceReconciler.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ResourceReconciler.cs) and [`PathFigure.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Geometry/PathFigure.cs)
- [`Drawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Drawable.cs), [`GraphicsContext2D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/GraphicsContext2D.cs), and [`RenderNode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderNode.cs)

---
title: EngineObject Reference
description: How EngineObject, IProperty, and the auto-generated Resource classes work in Beutl 2.x.
sidebar_position: 4
---

`EngineObject` is the base class for every editable object in Beutl 2.x. Most types you can place on the timeline — `Drawable`, `Shape`, `FilterEffect`, `Brush`, `Geometry`, and so on — derive from it. Reading this page first will let you skim the other extension guides much faster.

## What `EngineObject` provides

- A property system based on `IProperty<T>` instances.
- A source generator (`Beutl.Engine.SourceGenerators`) that produces the boilerplate every derived class needs (the nested `Resource` class, `ToResource(...)`, and `ScanPropertiesCore<T>()`).
- Built-in support for shared concerns such as time ranges, Z-index, and enabled/disabled state.

## Declaring an `EngineObject`

There are only two things to remember: mark the class as `partial`, and call `ScanProperties<T>()` from the constructor.

```cs
using Beutl.Engine;

namespace MyExtension;

public sealed partial class MySampleObject : EngineObject
{
    public MySampleObject()
    {
        ScanProperties<MySampleObject>();
    }
}
```

The `partial` modifier lets the source generator add the `Resource` class and the `ToResource` method. `ScanProperties<T>()` walks the declared `IProperty<T>` members so the editor can display, animate, and serialize them.

In real extensions you usually inherit from a subclass of `EngineObject` (such as `Drawable`, `Shape`, or `FilterEffect`) rather than `EngineObject` directly. See [Common derived classes](#common-derived-classes) for the typical entry points.

## Declaring properties

Declare properties as instance members typed `IProperty<T>` (or `IListProperty<T>`) and create them with the `Property` factory.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl.Engine;
using Beutl.Media;

public sealed partial class MyShape : Shape
{
    public MyShape()
    {
        ScanProperties<MyShape>();
    }

    // Animatable numeric property with a default value.
    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    // Non-animatable reference value.
    [Display(Name = "Caption")]
    public IProperty<string?> Caption { get; } = Property.Create<string?>();

    // Dynamic list that holds nested EngineObjects.
    public IListProperty<MyShape> Children { get; } = Property.CreateList<MyShape>();
}
```

| Factory | Use it for |
| --- | --- |
| `Property.CreateAnimatable<T>(default, validator?)` | Values the user animates with keyframes. |
| `Property.Create<T>(default, validator?)` | Static configuration values or references to other `EngineObject`s. |
| `Property.CreateList<T>()` | Ordered collections of `EngineObject`-derived items. |

Validation attributes from `System.ComponentModel.DataAnnotations` (e.g. `[Range]`) are applied automatically. `[Display(Name = ..., ResourceType = ...)]` controls the label shown in the property panel and supports localization through resource types.

## The auto-generated `Resource` class

For every concrete `partial class : EngineObject`, the source generator emits a nested `Resource` class. The rendering pipeline treats it as a snapshot of the object at a point in time, so the animation, expression, and composition systems can sample values without touching the instance the user is editing.

What the generator produces (conceptually):
```cs
// Auto-generated — you don't write this yourself:
public partial class MyShape
{
    public override MyShape.Resource ToResource(CompositionContext context)
    {
        var resource = new Resource();
        bool updateOnly = true;
        resource.Update(this, context, ref updateOnly);
        return resource;
    }

    public new partial class Resource : Shape.Resource
    {
        public float Size { get; set; }
        public string? Caption { get; set; }
        public List<MyShape.Resource> Children { get; set; } = [];

        public override void Update(EngineObject obj, CompositionContext context, ref bool updateOnly)
        {
            // Pull the current value of each property (with animations and
            // expressions already evaluated) out of the CompositionContext
            // and copy it into the fields above.
            // Increment Version when a value changes.
        }
    }
}
```

You can extend the generated `Resource` by adding your own `partial class Resource { … }`. The generator exposes two pairs of partial-method hooks:

```cs
public partial class MyShape : Shape
{
    public partial class Resource
    {
        // Called at the start of the generated Update().
        partial void PreUpdate(MyShape obj, CompositionContext context)
        {
            // Anything you want to do before Update() runs goes here.
        }

        // Called at the end of the generated Update().
        partial void PostUpdate(MyShape obj, CompositionContext context)
        {
            // Build child resources, recompute caches, etc.
        }

        // Called at the start of Dispose().
        partial void PreDispose(bool disposing)
        {
            // Anything you want to do before Dispose() runs goes here.
        }

        // Called at the end of Dispose().
        partial void PostDispose(bool disposing)
        {
            // Release the resources you allocated in PostUpdate, etc.
        }
    }
}
```

[`RectShape`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) is a good real-world example. It keeps an internal `RectGeometry`, recomputes its size in `PostUpdate`, and disposes of the geometry resource in `PostDispose`.

## Edit time vs. render time

Keep these two layers clear in your head:

| Layer | Type | Lifetime | Who writes to it |
| --- | --- | --- | --- |
| Edit time | `EngineObject` | Lives in the project | UI, scripts, deserialization |
| Render time | `EngineObject.Resource` | Created per composition pass | The auto-generated `Update()` only |

Render code (`Drawable.OnDraw`, `FilterEffect.ApplyTo`, etc.) receives a `Resource`, so read values from it. Do not touch `IProperty<T>.CurrentValue` directly — `Resource` already has animations and expressions resolved into a snapshot, which is what you want for efficient rendering. `EngineObject` is the editing object; render code is expected to read values through the `Resource`.

## Fallback handling

Every public `EngineObject`-derived type that Beutl ships with declares a fallback type:

```cs
public sealed partial class FallbackDrawable : Drawable, IFallback;

[FallbackType(typeof(FallbackDrawable))]
public abstract partial class Drawable : EngineObject { /* … */ }
```

If a saved project references a type that is no longer installed (for example, an extension was removed), Beutl can deserialize the data into the corresponding fallback. The data is preserved when the project is saved again.

## Common derived classes

| Base class | Namespace | Role | Implementation guide |
| --- | --- | --- | --- |
| `Drawable` | `Beutl.Graphics` | Anything that draws to a canvas. Provides `Transform`, `Opacity`, `BlendMode`, `FilterEffect`, and alignment. | [Implementing a Drawing Object](implement-drawing-object.md) |
| `Shape` | `Beutl.Graphics.Shapes` | A `Drawable` whose appearance is defined by a `Geometry`. Adds `Fill` and `Pen`. | [Implementing a Drawing Object](implement-drawing-object.md) |
| `FilterEffect` | `Beutl.Graphics.Effects` | Post effect applied to a render target. | [Implementing Effects](implement-effect.md) |
| `Sound` | `Beutl.Audio` | Anything that produces audio on the timeline. Provides `Gain`, `Speed`, `OffsetPosition`, and `AudioEffect`. |  |
| `AudioEffect` | `Beutl.Audio.Effects` | Audio effect applied to the output of a `Sound`. |  |
| `Geometry` / `Brush` / `Pen` | `Beutl.Media` | Reusable drawing building blocks. | (Use the `EngineObject` pattern above.) |

## Registering with the library

Override `Extension.Load()` and use `LibraryService` to register your types.

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyExtension : Extension
{
    public override string Name => "My Extension";
    public override string DisplayName => "My Extension";

    public override void Load()
    {
        // Register a single object with an explicit category.
        LibraryService.Current.Register<MySampleObject>(
            KnownLibraryItemFormats.EngineObject,
            "My Sample Object");

        // Bundle multiple objects into one library item.
        LibraryService.Current.AddMultiple("My Object", item => item
            .BindGeometry<MyShapeGeometry>()
            .BindDrawable<MyShape>());

        // Group several items together under one heading.
        LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddEngineObject<MySampleObject>("My Sample Object")
            .AddDrawable<MyShape>("My Shape"));
    }
}
```

`KnownLibraryItemFormats` exposes the formats the editor recognizes (`EngineObject`, `Drawable`, `FilterEffect`, `Brush`, `Geometry`, `Pen`, `Sound`, `Transform`, etc.). The `BindDrawable<T>()` shortcut on `AddMultiple` registers a `Drawable` with the shape picker without needing the format string yourself.

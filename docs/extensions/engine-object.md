---
title: EngineObject Reference
description: How property objects, expressions, and the generated Resource classes work in Beutl 2.x.
sidebar_position: 4
---

`EngineObject` is the base class for renderable and composable objects in Beutl 2.x. Most types you can place on the timeline — `Drawable`, `Shape`, `FilterEffect`, `Brush`, `Geometry`, and so on — derive from it. Reading this page first will let you skim the other extension guides much faster.

## What `EngineObject` provides

- Value properties (`IProperty<T>`), expression properties (`IExpressionProperty<T>`), and list properties (`IListProperty<T>`).
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

`Property`, `IProperty<T>`, `IExpressionProperty<T>`, and `IListProperty<T>` belong to the `Beutl` namespace in **Beutl.Core**. Import `Beutl.Engine` as well to use the `Property.CreateAnimatable` extension member.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;

namespace MyExtension;

public sealed partial class MyProperties : EngineObject
{
    public MyProperties()
    {
        ScanProperties<MyProperties>();
    }

    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IExpressionProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    [Display(Name = "Caption")]
    public IExpressionProperty<string?> Caption { get; } = Property.CreateExpression<string?>();

    public IProperty<bool> ShowLabel { get; } = Property.CreateValue(true);

    public IListProperty<MyProperties> Children { get; } = Property.CreateList<MyProperties>();
}
```

<div style={{ overflowX: 'auto' }}>

| Factory | Result | Use it for |
| --- | --- | --- |
| `Property.CreateAnimatable<T>(defaultValue, validator)` | `IExpressionProperty<T>` | Values that accept keyframes and expressions. Both arguments are optional. |
| `Property.CreateExpression<T>(defaultValue, validator)` | `IExpressionProperty<T>` | Values that accept expressions but not keyframes. Both arguments are optional. |
| `Property.CreateValue<T>(defaultValue, validator)` | `IProperty<T>` | Values that accept neither expressions nor keyframes. Both arguments are optional. |
| `Property.CreateReference<T>()` | `IExpressionProperty<T>` | Non-owning references to objects. The referenced object is not attached as a child. |
| `Property.CreateList<T>()` | `IListProperty<T>` | Owned, ordered collections; call `Add`, `Remove`, or `Clear` on the property itself. |

</div>

`IProperty<T>` exposes the stored `Value`, `DefaultValue`, `ValueChanged`, and `IsValueSet`. Expression-specific members such as `Expression`, `HasExpression`, `IsAnimatable`, and `Evaluate(EvaluationContext)` belong to `IExpressionProperty<T>`. Test `property is IExpressionProperty` to detect expression support; `SupportsExpression` has been removed. `SimpleProperty<T>`, `ValueOnlyProperty<T>`, and `ListProperty<T>` are the implementations in Beutl.Core.

Validation attributes from `System.ComponentModel.DataAnnotations` (e.g. `[Range]`) are applied automatically. `[Display(Name = ..., ResourceType = ...)]` controls the label shown in the property panel and supports localization through resource types.

Use `[Unit(PropertyUnit.Percent)]`, `[Unit(PropertyUnit.Degrees)]`, or `[Unit(PropertyUnit.Ratio)]` for unit metadata. These types are in `Beutl`; the property editor displays the unit and the Agent Toolkit includes it in schemas.

### Reading and changing values

Read and write the property object's `Value`, including inherited members such as `Name`, `Id`, `IsEnabled`, `ZIndex`, and `TimeRange`. There are no separate static `XxxProperty` fields or scalar accessors for these members.

```cs
using System;
using MyExtension;

var obj = new MyProperties
{
    Name = { Value = "Example" },
    Size = { Value = 120 },
    IsEnabled = { Value = true }
};
obj.Children.Add(new MyProperties());
obj.Size.ValueChanged += (_, change) => Console.WriteLine(change.NewValue);
```

`property.GetObservable()` emits a scalar property's current value and subsequent value changes. For a list, observe `CollectionChanged`; assigning its `Value` copies the contents into the owner-held list. Observe the property itself; a value change does not generally raise `PropertyChanged("Size")` on its owner. Compare `a.Id.Value == b.Id.Value` when comparing IDs. Comparing property objects instead compares their identity and produces diagnostic `BESG007`; use `ReferenceEquals` only when identity is intended.

When migrating older code, replace `CurrentValue` with `Value`, `GetValue(context)` with `Evaluate(context)`, `ReplaceCurrentValue(value)` with `SetValueEvenIfEqual(value)`, and `HasLocalValue` with `IsValueSet`. `CoreProperty`, `ConfigureProperty`, and the `CoreObject.GetValue` / `SetValue` APIs have been removed. The same property declaration and `ScanProperties<T>()` pattern now applies to `CoreObject` subclasses outside the engine.

### Keyframes and expressions

Keyframes are the bottom of a property's expression chain. Use the extension methods in `Beutl.Animation` instead of the removed `IProperty.Animation` and `AnimationChanged` members:

```cs
using Beutl;
using Beutl.Animation;
using MyExtension;

var obj = new MyProperties();
var animation = new KeyFrameAnimation<float>();
animation.KeyFrames.Add(new KeyFrame<float>
{
    KeyTime = { Value = MediaTime.Zero },
    Value = { Value = 100 }
});
animation.KeyFrames.Add(new KeyFrame<float>
{
    KeyTime = { Value = MediaTime.FromSeconds(1) },
    Value = { Value = 200 }
});
obj.Size.SetKeyFrameAnimation(animation);
KeyFrameAnimation<float>? current = obj.Size.GetKeyFrameAnimation();
```

`Expression` returns the keyframes when there is no expression above them, while `HasExpression` excludes keyframes. `IAnimation`, `IAnimation<T>`, and the non-generic `KeyFrameAnimation` have been removed; use `IKeyFrameAnimation` or `KeyFrameAnimation<T>`. `UseGlobalClock` and each keyframe's `KeyTime`, `Value`, and `Easing` are property objects too.

The property menu's **Separate components** gives a vector, color, or similar property an independent track for each component. Its animation is then an `IComponentAnimation`, so `GetKeyFrameAnimation` returns `null`. Use `GetPropertyAnimation` and `SetPropertyAnimation` when code must handle both kinds: `KeyFrameAnimation<T>` and component animations both implement `IPropertyAnimation`, and `IPropertyAnimation<T>.EvaluateAt(time)` reads either. `IComponentAnimation.Components` lists the component properties. `ComponentAnimations.IsSupported(type)`, `Separate(property)`, and `Unseparate(property, time)` do what the menu does; unseparating keeps the value evaluated at `time`.

`IExpression`, `IExpression<T>`, `ExpressionContext`, `PropertyLookup`, and `ExpressionException` are also in `Beutl.Core`, namespace `Beutl`. `IExpressionProperty<T>.Evaluate` accepts `EvaluationContext`; an expression implementation's `IExpression<T>.Evaluate` receives `ExpressionContext`. Both expression and composition contexts derive from `EvaluationContext`; `ExpressionContext` does not derive from `CompositionContext`.

Timeline and keyframe times use `MediaTime`, not `TimeSpan`. Create frame times with `MediaTime.FromFrames(frame, rationalRate)` and convert to a display duration with `ToTimeSpan()`. `MediaTime.ToString()` displays a flick count.

### One row for two or three properties {/* #combined-editor */}

`[CombinedEditor(nameof(Second))]` on the first of two animatable `float` or `int` properties shows both in one vector editor row of the property panel, one layer of the inline view and one row of the graph editor. `[CombinedEditor(nameof(Second), nameof(Third))]` joins three `float` properties the same way. Each property still keeps its own value, range, keyframes and expression, in the model and in the file. `Name` and `ResourceType` name the row as they do in `[Display]`; without them, the row takes the first property's name.

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;

namespace MyExtension;

public sealed partial class MyPanel : EngineObject
{
    public MyPanel()
    {
        ScanProperties<MyPanel>();
    }

    [Display(Name = "Width")]
    [Range(0, float.MaxValue)]
    [CombinedEditor(nameof(Height), Name = "Size")]
    public IExpressionProperty<float> Width { get; } = Property.CreateAnimatable<float>(100);

    [Display(Name = "Height")]
    [Range(0, float.MaxValue)]
    public IExpressionProperty<float> Height { get; } = Property.CreateAnimatable<float>(100);
}
```

The row edits two properties as a `Size` when the first one's name ends with `Width`, and as a `Point` otherwise (`PixelSize` and `PixelPoint` for `int`); three make a `Vector3`. The properties must be declared on the same `EngineObject` with `Property.CreateAnimatable`, and the names must match; otherwise each keeps its own row. In a node, each property keeps its own row and port.

The row splits into a row per property while their keyframe times, easings or clocks differ, or while they do not share one expression, and joins again once they match. **Separate components** in its menu splits it by hand; for a joined row that changes only the view, which the panel saves with its view state. A joined row takes one expression that returns the whole value, such as `new Size(Sin(Time) * 100, 100)`; `Size` and `Point` gained `double, double` constructors for expressions like this one. Each property saves it as a `ComponentExpression<TValue, TComponent>` (namespace `Beutl.Engine.Expressions`), which evaluates the shared expression, takes the property's component and keeps the property's keyframes below it. Code that reads one property's `Expression` can meet it; `IComponentExpression` gives its `Source`, `Component` and `ComponentIndex`. Because older versions drop this new type of expression, preview.11 raised the [file format floor](version-mapping.md).

## The auto-generated `Resource` class

For every concrete `partial class : EngineObject`, the source generator emits a nested `Resource` class. The rendering pipeline treats it as a snapshot of the object at a point in time, so the animation, expression, and composition systems can sample values without touching the instance the user is editing.

The generator supplies `ToResource(CompositionContext)`, snapshot properties, and `Reconcile(EngineObject, CompositionContext, ref bool versionBumped)`. `Reconcile` evaluates expression properties for the context's time, updates child resources, and advances `Version` when values change. The old `Update`, `PreUpdate`, and `PostUpdate` names have been replaced by `Reconcile`, `PreReconcile`, and `PostReconcile`.

You can extend the generated resource with partial-method hooks. Add this partial declaration alongside `MyProperties` above:

```cs
using Beutl.Composition;

namespace MyExtension;

public sealed partial class MyProperties
{
    public new partial class Resource
    {
        partial void PreReconcile(MyProperties obj, CompositionContext context)
        {
        }

        partial void PostReconcile(MyProperties obj, CompositionContext context)
        {
        }

        partial void PreDispose(bool disposing)
        {
        }

        partial void PostDispose(bool disposing)
        {
        }
    }
}
```

Use `PostReconcile` to build derived data from snapshot values, and dispose resources you own in a disposal hook. The generated implementation disposes its own child resources when `disposing` is `true`. [`RectShape`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) follows this pattern; the [drawing-object guide](implement-drawing-object.md) shows a complete extension implementation using public APIs.

In a class derived from another `EngineObject`, the generated `Reconcile` runs the class's `PreReconcile`, then the base class's `Reconcile` with the base's hooks, and only then evaluates the class's own properties and runs its `PostReconcile`. A base hook that calls an override, as `AudioVisualizerDrawable.Resource` calls `ComputeSampleWindow` from its `PostReconcile`, therefore sees the derived properties at their previous values, or at their defaults on a new resource. Evaluate what such an override reads in `PreReconcile` and keep it in a field of its own, such as `_windowFftSize = context.Get(obj.FftSize)`. Do not write the field the generator keeps for the property, such as `_fftSize`: the generated `Reconcile` compares the new value with it to tell whether the resource changed.

## Edit time vs. render time

Keep these two layers clear in your head:

<div style={{ overflowX: 'auto' }}>

| Layer | Type | Lifetime | Who writes to it |
| --- | --- | --- | --- |
| Edit time | `EngineObject` | Lives in the project | UI, scripts, deserialization |
| Render time | `EngineObject.Resource` | Created and reconciled for composition; may be reused | Generated `Reconcile()` and custom resource hooks |

</div>

Render code lives on the `Resource` (`Drawable.Resource.OnDraw`, `FilterEffect.Resource.ApplyTo`, etc.), so read values from its properties. Inside `Resource`, a name such as `Size` is the evaluated value, not the object's `IExpressionProperty<T>`. Do not touch `IProperty<T>.Value` directly — `Resource` already has animations and expressions resolved into a snapshot, which is what you want for efficient rendering. `EngineObject` is the editing object; `RequireOriginal()` returns it when a method needs state that is not a property.

## Fallback handling

Base types such as `Drawable`, `Sound`, and `EngineObject` declare a `[FallbackType]`. If a saved project refers to an unavailable extension type, the corresponding fallback keeps its serialized data so it can be saved again. A fallback drawable produces no drawing; it is not a replacement implementation of the missing extension.

## Common derived classes

<div style={{ overflowX: 'auto' }}>

| Base class | Namespace | Role | Implementation guide |
| --- | --- | --- | --- |
| `Drawable` | `Beutl.Graphics` | Anything that draws to a canvas. Provides `Transform`, `Opacity`, `BlendMode`, `FilterEffect`, and alignment. | [Implementing a Drawing Object](implement-drawing-object.md) |
| `Shape` | `Beutl.Graphics.Shapes` | A `Drawable` whose appearance is defined by a `Geometry`. Adds `Fill` and `Pen`. | [Implementing a Drawing Object](implement-drawing-object.md) |
| `FilterEffect` | `Beutl.Graphics.Effects` | Post effect applied to a render target. | [Implementing Effects](implement-effect.md) |
| `Sound` | `Beutl.Audio` | Anything that produces audio on the timeline. Provides `Gain`, `Pan`, `SurroundPan`, `CenterLevel`, `LfeLevel`, `Speed`, `OffsetPosition`, and `Effect`. |  |
| `AudioEffect` | `Beutl.Audio.Effects` | Audio effect applied to the output of a `Sound`. | [Implementing audio effects](audio-effects.md) |
| `Geometry` / `Brush` / `Pen` | `Beutl.Media` | Reusable drawing building blocks. | (Use the `EngineObject` pattern above.) |

</div>

## Registering with the library

Override `Extension.Load()` and use `LibraryService` to register your types.

```cs
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;
using Beutl.Media;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyExtension : Extension
{
    public override string Name => "My Extension";
    public override string DisplayName => "My Extension";

    public override void Load()
    {
        LibraryService.Current.Register<MySampleObject>(
            KnownLibraryItemFormats.EngineObject,
            "My Sample Object");

        LibraryService.Current.AddMultiple("My Object", item => item
            .BindGeometry<RectGeometry>()
            .BindDrawable<RectShape>());

        LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddEngineObject<MySampleObject>("My Sample Object")
            .AddMultiple("My Shape", item => item.BindDrawable<RectShape>()));
    }
}
```

`KnownLibraryItemFormats` exposes the formats the editor recognizes (`EngineObject`, `Drawable`, `FilterEffect`, `Brush`, `Geometry`, `Pen`, `Sound`, `Transform`, etc.). The `BindDrawable<T>()` shortcut on `AddMultiple` registers a `Drawable` with the shape picker without needing the format string yourself.

`AddDrawable<T>()` and `AddSound<T>()` now register the `EngineObject` format as well, so their items can be added to the timeline. `AddMultiple` remains useful when one item offers several representations.

## Source

- [`IProperty.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/PropertySystem/IProperty.cs), [`Property.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/PropertySystem/Property.cs), and [`EnginePropertyExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EnginePropertyExtensions.cs)
- [`EngineObject.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EngineObject.cs) and [`ResourceClassEmitter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine.SourceGenerators/Emit/ResourceClassEmitter.cs)
- [`AudioVisualizerDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs)
- [`IPropertyAnimation.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Animation/IPropertyAnimation.cs) and [`ComponentAnimations.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Animation/ComponentAnimations.cs)
- [`KeyFrameAnimationExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Animation/KeyFrameAnimationExtensions.cs), [`ExpressionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Expressions/ExpressionContext.cs), and [`MediaTime.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/MediaTime.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`UnitAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/UnitAttribute.cs)
- [`CombinedEditorAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/CombinedEditorAttribute.cs) and [`ComponentExpression.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/Expressions/ComponentExpression.cs)

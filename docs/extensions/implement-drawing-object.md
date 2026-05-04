---
title: Implementing a Drawing Object
description: Explanation of how to implement a new drawing object.
---

:::note
This page is under construction.
:::

This guide explains how to implement a new drawing object that draws a star shape.

To add a new drawing object, you need two classes: `Drawable` and `Extension`.

First, we will implement the `Drawable` class.

## 1. Create the StarShape Class

Create a `StarShape` class that inherits from the `Drawable` class as follows.

```cs
using Beutl.Graphics;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public class StarShape : Drawable
{
    // NOTE: These methods will be implemented later
    protected override Size MeasureCore(Size availableSize)
    {
        throw new NotImplementedException();
    }

    protected override void OnDraw(GraphicsContext2D context)
    {
        throw new NotImplementedException();
    }
}
```

### Adding Properties

Add properties using the `ConfigureProperty` method.

```cs
using Beutl;
using System.ComponentModel.DataAnnotations;

public class StarShape : Drawable
{
    public static readonly CoreProperty<float> SizeProperty;

    static StarShape()
    {
        SizeProperty = ConfigureProperty<float, StarShape>(nameof(Size))
            .DefaultValue(100) // Set default value
            .Register();

        // Specify properties that affect the rendering content here
        AffectRender<StarShape>(SizeProperty);
    }

    [Range(0, float.MaxValue)]
    public float Size
    {
        get => GetValue(SizeProperty);
        set => SetValue(SizeProperty, value);
    }
}
```

### Creating Geometry When Size Changes

```cs
public class StarShape : Drawable
{
    private PathGeometry _geometry = new();

    private void UpdateGeometry(float size)
    {
        var center = new Point(size / 2, size / 2);
        float radius = 0.45f * size;

        _geometry.MoveTo(new Point(size / 2, (size / 2) - radius));

        for (int i = 1; i < 5; i++)
        {
            float angle = i * 4 * MathF.PI / 5;
            _geometry.LineTo(center + new Point(radius * MathF.Sin(angle), -radius * MathF.Cos(angle)));
        }
        
        _geometry.Close();
    }

    protected override void OnPropertyChanged(PropertyChangedEventArgs args)
    {
        // Use PropertyChangedEventArgs for compatibility with INotifyPropertyChanged, so check the type
        if (args is CorePropertyChangedEventArgs<float> typedArgs
            && typedArgs.Property == SizeProperty)
        {
            UpdateGeometry(typedArgs.NewValue);
        }
    }
}
```

### Drawing

```cs
public class StarShape : Drawable
{
    protected override Size MeasureCore(Size availableSize)
    {
        return _geometry.Bounds.Size;
    }

    protected override void OnDraw(GraphicsContext2D context)
    {
        // Fill is defined in the Drawable class
        context.DrawGeometry(_geometry, Fill, null);
    }
}
```

### Testing the Drawing

Test if the star shape is drawn correctly.
**Program.cs**
```cs
using Beutl.Media;
using Beutl.Graphics;
using Beutl.Graphics.Rendering;
using MyExtension;

var shape = new StarShape()
{
    Size = 100,
    Fill = Brushes.White
};

using var renderTarget = RenderTarget.Create(120, 120);
using var canvas = new ImmediateCanvas(renderTarget);
canvas.DrawDrawable(shape);

using var bitmap = renderTarget.Snapshot();
bitmap.Save("star.png");
```

Run the following command to generate the image:
```sh
dotnet run -p:OutputType=Exe
```

## 2. Create the Extension Class

Override the `Extension.Load` method to register the classes implemented in this library.

```cs
using Beutl.Extensibility;
using Beutl.Service;

namespace MyExtension;

[Export]
public class StarShapeExtension : Extension
{
    public override string Name => "Star Shape";
    
    public override string DisplayName => "Star Shape";

    public override void Load()
    {
        base.Load();
        LibraryService.Current.AddMultiple("Star Shape", m => m
            .BindDrawable<StarShape>());
    }
}
```

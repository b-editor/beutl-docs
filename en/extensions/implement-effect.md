---
title: Implementing Effects
---

> [!NOTE]
> This page is under construction.

```cs
public class MyFilterEffect : FilterEffect
{
    public override void ApplyTo(FilterEffectContext context)
    {
        // Add your processing here
    }
}
```

## Combining Existing Effects
### Using FilterEffectContext Methods
```cs
public class MyFilterEffect : FilterEffect
{
    public override void ApplyTo(FilterEffectContext context)
    {
        context.Blur(new Size(20, 20));
        context.HighContrast(
            grayscale: false,
            invertStyle: HighContrastInvertStyle.NoInvert,
            contrast: 20);
    }

    public override Rect TransformBounds(Rect bounds)
    {
        // Inflate the bounds to account for the Blur effect
        return bounds.Inflate(20 * 3);
    }
}
```
### Using Other FilterEffect Instances
```cs
public class MyFilterEffect : FilterEffect
{
    private readonly Blur _blur = new()
    {
        Sigma = new Size(20, 20)
    };
    private readonly HighContrast _contrast = new()
    {
        Grayscale = false,
        InvertStyle = HighContrastInvertStyle.NoInvert,
        Contrast = 20
    };

    public override void ApplyTo(FilterEffectContext context)
    {
        context.Apply(_blur);
        context.Apply(_contrast);
    }

    public override Rect TransformBounds(Rect bounds)
    {
        return _blur.TransformBounds(bounds);
    }
}
```

## Processing Bitmaps Directly
```cs
public class MyFilterEffect : FilterEffect
{
    public override void ApplyTo(FilterEffectContext context)
    {
        // The data argument is passed to the action and transformBounds methods
        // Specify a comparable value
        context.Custom(
            data: 0,
            action: CustomEffectProcess,
            transformBounds: (_, b) => b);
    }

    private static void CustomEffectProcess(int _, FilterEffectCustonOperationContext context)
    {
        // Obtain SKSurface
        if (context.Target.Surface is { } surface)
        {
            // Use SKCanvas
            SKCanvas skcanvas = surface.Value.Canvas;
            skcanvas.Clear();
        }

        // Use Beutl's canvas
        using (ImmediateCanvas canvas = context.Open(context.Target))
        {
            canvas.Clear();
        }

        // Replace the effect target
        // (Change the image processed by subsequent effects)
        // Using a reference counter, hence using 'using'.
        using (var newTarget = context.CreateTarget(width: 100, height: 100))
        {
            context.ReplaceTarget(newTarget);
        }
    }
}
```

## Adding Properties
Refer to [Adding Properties](implement-drawing-object.md) in the Implementing Drawing Objects section.

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
        // Specify an equivalence-comparable value
        context.CustomTom(
            data: 0,
            action: CustomEffectProcess,
            transformBounds: (_, b) => b);
    }

    private static void CustomEffectProcess(int _, CustomFilterEffectContext context)
    {
        for (int i = 0; i < context.Targets.Count; i++)
        {
            EffectTarget target = context.Targets[i];
            RenderTarget renderTarget = target.RenderTarget!;
            // When operating Skia directly
            // 1. Get SKSurface
            SKSurface surface = RenderTarget.GetSKSurface(renderTarget);
            // 2. Get SKCanvas
            SKCanvas skcanvas = surface.Value.Canvas;
            // 3. Manipulate
            skcanvas.Clear();

            // When using the Beutl wrapper
            // 1. Create Canvas
            using (var canvas = new ImmediateCanvas(renderTarget))
            {
                // 2. Manipulate
                canvas.Clear();
            }

            // If you want to change the image size
            var newTarget = context.CreateTarget(width: 100, height: 100);
            context.Targets[i] = newTarget;
            target.Dispose();
        }
    }
}
```

## Adding Properties
Refer to [Adding Properties](implement-drawing-object.md) in the Implementing Drawing Objects section.

---
title: エフェクトを実装する
---

> [!NOTE]
> このページは作業中です。

```cs
public class MyFilterEffect : FilterEffect
{
    public override void ApplyTo(FilterEffectContext context)
    {
        // ここに処理を追加
    }
}
```

## 既存のエフェクトを組み合わせる
### FilterEffectContextのメソッドを使う
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
        // Blurの分、境界線を膨らませる
        return bounds.Inflate(20 * 3);
    }
}
```
### 他のFilterEffectインスタンスを使う
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

## ビットマップを直接処理する
```cs
public class MyFilterEffect : FilterEffect
{
    public override void ApplyTo(FilterEffectContext context)
    {
        // data引数はactionやtransformBoundsの第一引数に渡されます
        // 比較可能な値を指定してください
        context.Custom(
            data: 0,
            action: CustomEffectProcess,
            transformBounds: (_, b) => b);
    }

    private static void CustomEffectProcess(int _, FilterEffectCustonOperationContext context)
    {
        // SKSurfaceを取得
        if (context.Target.Surface is { } surface)
        {
            // SKCanvasを使う
            SKCanvas skcanvas = surface.Value.Canvas;
            skcanvas.Clear();
        }

        // Beutlのキャンバスを使う
        using (ImmediateCanvas canvas = context.Open(context.Target))
        {
            canvas.Clear();
        }

        // エフェクトターゲットを置き換え
        // (後続のエフェクトが処理する画像を変更)
        // 参照カウンタを使っているためusingしています。
        using (var newTarget = context.CreateTarget(width: 100, height: 100))
        {
            context.ReplaceTarget(newTarget);
        }
    }
}
```

## プロパティを追加する
[描画オブジェクトを実装](implement-drawing-object.md) の __プロパティを追加__ をご覧ください。
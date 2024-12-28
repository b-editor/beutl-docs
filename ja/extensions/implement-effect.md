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
        // 等価比較可能な値を指定してください
        context.CustomEffect(
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

            // Skiaを直接操作する場合
            // 1. SKSurfaceを取得
            SKSurface surface = RenderTarget.GetSKSurface(renderTarget);
            // 2. SKCanvasを取得
            SKCanvas skcanvas = surface.Value.Canvas;
            // 3. 操作
            skcanvas.Clear();

            // Beutlのラッパーを使う場合
            // 1. キャンバスを作成
            using (var canvas = new ImmediateCanvas(renderTarget))
            {
                // 2. 操作
                canvas.Clear();
            }

            // 画像サイズを変更したい場合
            var newTarget = context.CreateTarget(width: 100, height: 100);
            context.Targets[i] = newTarget;
            target.Dispose();
        }
    }
}
```

## プロパティを追加する
[描画オブジェクトを実装](implement-drawing-object.md) の __プロパティを追加__ をご覧ください。
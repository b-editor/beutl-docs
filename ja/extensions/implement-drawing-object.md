---
title: 描画オブジェクトを実装
description: 新しく描画オブジェクトを実装する方法を説明します。
---

> [!NOTE]
> このページは作業中です。

ここでは新たに星型を描画するオブジェクトを実装します。

新しく描画オブジェクトを追加するには、
`Drawable`, `SourceOperator`, `Extension`の3つのクラスが必要です。  

まず、`Drawable`クラスを実装していきます。

## 1. StarShapeクラスを作成

以下のように、`Drawable`クラスを継承する`StarShape`クラスを作成します。

```cs
using Beutl.Graphics;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public class StarShape : Drawable
{
    // NOTE: これらのメソッドは後で実装します
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

### プロパティを追加

`ConfigureProperty`メソッドを使用して、プロパティを追加します。

```cs
using Beutl;
using System.CompomentModel.DataAnnotations;

public class StarShape : Drawable
{
    public static readonly CoreProperty<float> SizeProperty;

    static StarShape()
    {
        SizeProperty = ConfigureProperty<float, StarShape>(nameof(Size))
            .DefaultValue(100) // デフォルト値を設定
            .Register();

        // 描画内容に影響するプロパティはここで指定する
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

### サイズ変更時にGeometryを作成

```cs
public class StarShape : Drawable
{
    private PathGeometry _geometry = new();

    private void UpdateGeometry(float size)
    {
        var center = new Point(size / 2, size / 2);
        float radius = 0.45f * size;

        geometry.MoveTo(new Point(size / 2, (size / 2) - radius));

        for (int i = 1; i < 5; i++)
        {
            float angle = i * 4 * MathF.PI / 5;
            geometry.LineTo(center + new Point(radius * MathF.Sin(angle), -radius * MathF.Cos(angle)));
        }
        
        geometry.Close();
    }

    protected override void OnPropertyChanged(PropertyChangedEventArgs args)
    {
        // OnPropertyChangedの引数はINotifyPropertyChangedとの互換性のために、
        // PropertyChangedEventArgsを使っているので型判定をする
        if (args is CorePropertyChangedEventArgs<float> typedArgs
            && typedArgs.Property == SizeProperty)
        {
            UpdateGeometry(typedArgs.NewValue);
        }
    }
}
```

### 描画する

```cs
public class StarShape : Drawable
{
    protected override Size MeasureCore(Size availableSize)
    {
        return _geometry.Bounds.Size;
    }

    protected override void OnDraw(GraphicsContext2D context)
    {
        // FillはDrawableクラスに定義済み
        context.DrawGeometry(_geometry, Fill, null);
    }
}
```

### 試しに描画してみる
試しに星型が描画されるかテストしてみましょう。
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

このコマンドを実行すると以下のような、画像が生成されます。
```sh
dotnet run -p:OutputType=Exe
```

## 2. SourceOperatorクラスを作成

特に特別な処理をしない場合、表示するプロパティを以下のように並べます

```cs
using Beutl.Operators.Source;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Transformation;
using Beutl.Media;
using Beutl.Styling;

namespace MyExtension;

public class StarShapeOperator() : PublishOperator<StarShape>(
[
    (StarShape.WidthProperty, 100),
    (Drawable.TransformProperty, () => new TransformGroup()),
    Drawable.AlignmentXProperty,
    Drawable.AlignmentYProperty,
    Drawable.TransformOriginProperty,
    (Drawable.FillProperty, () => new SolidColorBrush(Colors.White)),
    (Drawable.FilterEffectProperty, () => new FilterEffectGroup()),
    Drawable.BlendModeProperty,
    Drawable.OpacityProperty
]);
```

## 3. Extensionクラスを作成

`Extension.Load`メソッドをオーバーライドしてライブラリに今回実装したクラスを登録します。

```cs
using Beutl.Extensibility;
using Beutl.Service;

namespace MyExtension;

[Export]
public class StarShapeExtension : Extension
{
    public override string Name => "Star Shape";
    
    public override string DisplayName => "星型";

    public override void Load()
    {
        base.Load();
        // 一つの項目に複数の型を追加することができます。
        // UI上でドラッグアンドドロップする場所に応じて、型が選ばれます
        LibraryService.Current.AddMultiple("星型", m => m
            .BindSourceOperator<StarShapeOperator>()
            .BindDrawable<StarShape>());
    }
}
```

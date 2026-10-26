---
title: 描画オブジェクトを実装
description: EngineObject パターンを使って星型の描画オブジェクトを実装します。
---

ここでは星型を描画するオブジェクトを例として、Beutl 2.x の拡張 API を使ったカスタム描画オブジェクトの実装方法を解説します。

[EngineObject リファレンス](engine-object.md) をまだ読んでいない場合は先にそちらをご覧ください。本ページは `partial class` の宣言、`IExpressionProperty<T>` ファクトリ、自動生成される `Resource` クラスの基礎知識を前提としています。

描画オブジェクトには 2 つの要素が必要です：`Drawable` を継承するクラスと、それを登録する `Extension` クラス。今回作る星型は `Geometry` で完全に表現できるので、塗り・線・境界の処理を `Shape` 基底クラスに任せられる `Shape` を継承します。

## 1. `StarShape` クラスを作成

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

手順 1・2 はクラスの構成要素です。コンパイルする完全な実装は手順 3 にあります。意識すべき点は 2 つあります。

- ソースジェネレータが対応する `Resource` クラスを生成できるよう、`partial` を付ける。
- 以下で宣言する `IExpressionProperty<>` メンバをエディタが認識できるよう、コンストラクタで `ScanProperties<StarShape>()` を呼ぶ。

## 2. `Size` プロパティを追加

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

`Property.CreateAnimatable<float>(100)` はデフォルト値 100 のアニメーション可能なプロパティを生成します。`Shape` 基底クラスがすでに `Fill` / `Pen` / `Transform` / `Opacity` / `BlendMode` などを公開しているため、この派生クラスでは固有のプロパティだけを宣言すれば十分です。

## 3. `Resource` 内でジオメトリを構築する

ジオメトリの生成はアニメーション値を反映でき、入力が変化したときだけ再構築されるよう、描画時のレイヤーで行います。`partial class Resource` を追加し、`PostReconcile` でジオメトリを再構築して `GetGeometry()`（`Shape.Resource` が要求する抽象メソッド）から返すようにします。

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

ポイント：

- `Resource` 内の `Size` はスナップショット値です。`Size` プロパティの現在値はジェネレータがフィールドにコピーしてくれます。
- `ResourceReconciler.ReconcileResource` がジオメトリリソースを生成・更新し、変更があれば `Version++` で親にも伝えます。
- `_geometry` はフレームをまたいで再利用し、`Size` が変わったときだけ図形を作り直します。`Geometry.Resource` は保持して再利用し、ヘルパーが `Geometry.Resource.Reconcile()` を呼びます。
- 計測・塗り・線・境界の処理は `Shape` 基底クラスが `GetGeometry()` の戻り値をもとに行ってくれます。

## 4. 拡張機能でクラスを登録する

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

`[Export]` 属性を付けることで Beutl のローダーから検出されます。`AddMultiple`, `BindDrawable<T>()` を使えば、`StarShape` を ライブラリへ登録できます。登録系ヘルパーの全体は [EngineObject リファレンス](engine-object.md#ライブラリへの登録) を参照してください。

## 発展：`Shape` を使わない自由な `Drawable`

ジオメトリベースではなく `GraphicsContext2D` で直接描きたい場合は、`Drawable` を直接継承して `MeasureCore` と `OnDraw` をオーバーライドします。どちらのメソッドも `Drawable.Resource` のスナップショットを受け取るので、自分の生成された `Resource` 型へキャストしてプロパティ値を読み取ります。

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

独自の `RenderNode` を実装する場合は、記録するスレッドで状態を更新し、`MarkChanged()` を呼んで変更を通知します。所有者から明示的に `Dispose()` してください。`RenderNode` には finalizer がなく、放置しても `OnDispose(false)` は呼ばれません。

## ソース

- [`RectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) and [`Shape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/Shape.cs)
- [`ResourceReconciler.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ResourceReconciler.cs) and [`PathFigure.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Geometry/PathFigure.cs)
- [`Drawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Drawable.cs), [`GraphicsContext2D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/GraphicsContext2D.cs), and [`RenderNode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderNode.cs)

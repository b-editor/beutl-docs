---
title: 描画オブジェクトを実装
description: EngineObject パターンを使って星型の描画オブジェクトを実装します。
---

ここでは星型を描画するオブジェクトを例として、Beutl 2.x の拡張 API を使ったカスタム描画オブジェクトの実装方法を解説します。

[EngineObject リファレンス](engine-object.md) をまだ読んでいない場合は先にそちらをご覧ください。本ページは `partial class` の宣言、`IProperty<T>` ファクトリ、自動生成される `Resource` クラスの基礎知識を前提としています。

描画オブジェクトには 2 つの要素が必要です：`Drawable` を継承するクラスと、それを登録する `Extension` クラス。今回作る星型は `Geometry` で完全に表現できるので、塗り・線・境界の処理を `Shape` 基底クラスに任せられる `Shape` を継承します。

## 1. `StarShape` クラスを作成

```cs
using System.ComponentModel.DataAnnotations;
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

意識すべき点は2つあります。

- ソースジェネレータが対応する `Resource` クラスを生成できるよう、`partial` を付ける。
- 以下で宣言する `IProperty<>` メンバをエディタが認識できるよう、コンストラクタで `ScanProperties<StarShape>()` を呼ぶ。

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
    public IProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);
}
```

`Property.CreateAnimatable<float>(100)` はデフォルト値 100 のアニメーション可能なプロパティを生成します。`Shape` 基底クラスがすでに `Fill` / `Pen` / `Transform` / `Opacity` / `BlendMode` などを公開しているため、この派生クラスでは固有のプロパティだけを宣言すれば十分です。

## 3. `Resource` 内でジオメトリを構築する

ジオメトリの生成はアニメーション値を反映でき、入力が変化したときだけ再構築されるよう、描画時のレイヤーで行います。`partial class Resource` を追加し、`PostUpdate` でジオメトリを再構築して `GetGeometry()`（`Shape.Resource` が要求する抽象メソッド）から返すようにします。

```cs
using Beutl.Composition;
using Beutl.Engine;
using Beutl.Graphics;
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
    public IProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    public partial class Resource
    {
        private readonly PathGeometry _geometry = new();
        private PathGeometry.Resource? _geometryResource;
        private float _builtForSize = float.NaN;

        partial void PostUpdate(StarShape obj, CompositionContext context)
        {
            float size = Math.Max(Size, 0);
            // Size が変わったときだけジオメトリを再構築
            if (size != _builtForSize)
            {
                BuildStar(size);
                _builtForSize = size;
                Version++;
            }
            
            // リソースの更新
            if (_geometryResource == null)
            {
                _geometryResource = _geometry.ToResource();
            }
            else
            {
                var _ = false;
                _geometryResource.Update(_geometry, context, ref _);
            }
        }

        partial void PostDispose(bool disposing)
        {
            _geometryResource?.Dispose();
        }

        public override Geometry.Resource? GetGeometry() => _geometryResource;

        private void BuildStar(float size)
        {
            _geometry.Figures.Clear();

            var center = new Point(size / 2, size / 2);
            float radius = 0.45f * size;

            var figure = new PathFigure();
            figure.StartPoint.CurrentValue = new Point(size / 2, size / 2 - radius);

            for (int i = 1; i < 5; i++)
            {
                float angle = i * 4 * MathF.PI / 5;
                figure.Segments.Add(new LineSegment(
                    center + new Point(radius * MathF.Sin(angle), -radius * MathF.Cos(angle))));
            }

            figure.IsClosed.CurrentValue = true;
            _geometry.Figures.Add(figure);
        }
    }
}
```

ポイント：

- `Resource` 内の `Size` はスナップショット値です。`Size` プロパティの現在値はジェネレータがフィールドにコピーしてくれます。
- 再構築後の `Version++` で「リソースが変化したので描画内容が更新される」ことをコンポジションシステムに伝えます。
- `_geometry` はフレームをまたいで再利用し、`Size` が変わったときだけ図形を作り直します。`Geometry.Resource` は `Resource` の寿命に合わせて一度だけ生成し、更新は `Geometry.Resource.Update()` で行います。
- 計測・塗り・線・境界の処理は `Shape` 基底クラスが `GetGeometry()` の戻り値をもとに行ってくれます。

## 4. 拡張機能でクラスを登録する

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class StarShapeExtension : LayerExtension
{
    public override string Name => "Star Shape";
    public override string DisplayName => "星型";

    public override void Load()
    {
        LibraryService.Current.AddMultiple("星型", item => item
            .BindDrawable<StarShape>());
    }
}
```

`[Export]` 属性を付けることで Beutl のローダーから検出されます。`AddMultiple`, `BindDrawable<T>()` を使えば、`StarShape` を ライブラリへ登録できます。登録系ヘルパーの全体は [EngineObject リファレンス](engine-object.md#ライブラリへの登録) を参照してください。

## 発展：`Shape` を使わない自由な `Drawable`

ジオメトリベースではなく `GraphicsContext2D` で直接描きたい場合は、`Drawable` を直接継承して `MeasureCore` と `OnDraw` をオーバーライドします。どちらのメソッドも `Drawable.Resource` のスナップショットを受け取るので、自分の生成された `Resource` 型へキャストしてプロパティ値を読み取ります。

```cs
public sealed partial class CustomDrawable : Drawable
{
    public CustomDrawable()
    {
        ScanProperties<CustomDrawable>();
    }

    public IProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

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

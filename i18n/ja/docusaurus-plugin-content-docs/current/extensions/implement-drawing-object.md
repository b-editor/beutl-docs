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

    public new partial class Resource
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
- 計測・塗り・線・境界の処理は `Shape.Resource` が行います。その `MeasureCore` と `OnDraw` は `GetGeometry()` の戻り値を使います。

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

ジオメトリベースではなく `GraphicsContext2D` で直接描きたい場合は、`Drawable` を直接継承し、入れ子の `Resource` で `MeasureCore` と `OnDraw` をオーバーライドします。`Resource` の中でプロパティ名は描画時刻で評価された値を指すので、`Size` をそのまま読み取れます。プロパティ以外の状態が必要なメソッドでは、`RequireOriginal()` で描画オブジェクトを取得できます。

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

    public new partial class Resource
    {
        protected override Size MeasureCore(Size availableSize)
        {
            return new Size(Size, Size);
        }

        protected override void OnDraw(GraphicsContext2D context)
        {
            context.DrawRectangle(new Rect(0, 0, Size, Size), Brushes.Resource.White, null);
        }
    }
}
```

公開された入口は `Resource.Measure(availableSize)` と `Resource.Render(context)` です。`Render` は無効なリソースを描画せず、エフェクトが時間サンプリングした入力に置き換える場合はそちらを描画し、それ以外は `RenderCore` を呼びます。そのため `RenderCore` で `IsEnabled` を確認する必要はありません。既定の `RenderCore` は `OnDraw` の前後でブレンドモード、トランスフォーム、不透明度、フィルターエフェクトを適用します。内容の配置や合成の方法を変える場合にだけオーバーライドしてください。`OnDraw` から子の描画オブジェクトを描くには、そのリソースを `context.DrawDrawable` に渡します。

独自の `RenderNode` を実装する場合は、記録するスレッドで状態を更新し、`MarkChanged()` を呼んで変更を通知します。所有者から明示的に `Dispose()` してください。`RenderNode` には finalizer がなく、放置しても `OnDispose(false)` は呼ばれません。

### preview.9 からの移行 {/* #migrating-from-preview-9 */}

preview.9 では、これらのオーバーライドはオブジェクトのクラスにあり、引数で `resource` を受け取っていました。互換用の API はありません。各メソッドの本体を入れ子の `Resource` に移し、`r.Property` を `Property` に置き換えて再ビルドしてください。

<div style={{ overflowX: 'auto' }}>

| 変更前 | 変更後 |
| --- | --- |
| `override Size Drawable.MeasureCore(Size, Resource)` | 描画オブジェクトの `Resource` の `protected override Size MeasureCore(Size)` |
| `override void Drawable.OnDraw(GraphicsContext2D, Resource)` | 描画オブジェクトの `Resource` の `protected override void OnDraw(GraphicsContext2D)` |
| `override void Drawable.Render(GraphicsContext2D, Resource)` | 描画オブジェクトの `Resource` の `protected override void RenderCore(GraphicsContext2D)` |
| `drawable.Render(context, resource)` | `resource.Render(context)` |

</div>

## プレビューで点を編集する {/* #editing-handles */}

`IEditingHandleProvider` を実装すると、プレビューにドラッグできる点を表示できます。ホストはまず選択中のオブジェクトを確認するので、描画オブジェクトだけでなく、その中のエフェクトもハンドルを提供できます。位置は所有する描画オブジェクトのローカルな論理座標で指定します。トランスフォームの適用はホストが行い、ドラッグを離したときに編集を履歴へ確定します。

```cs
using System.Collections.Generic;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;
using Beutl.Graphics.Rendering;
using Beutl.Media;

namespace MyExtension;

public sealed partial class MarkerDrawable : Drawable, IEditingHandleProvider
{
    public MarkerDrawable()
    {
        ScanProperties<MarkerDrawable>();
    }

    public IExpressionProperty<Point> Marker { get; } = Property.CreateAnimatable(new Point(50, 50));

    public IReadOnlyList<EditingHandle> GetEditingHandles(MediaTime time)
        => [new EditingHandle("marker", Marker.Evaluate(new EvaluationContext(time)), "Marker") { Property = Marker }];

    public new partial class Resource
    {
        protected override Size MeasureCore(Size availableSize) => new(100, 100);

        protected override void OnDraw(GraphicsContext2D context)
        {
            context.DrawEllipse(new Rect(Marker.X - 4, Marker.Y - 4, 8, 8), Brushes.Resource.White, null);
        }
    }
}
```

`Property` を設定すると、ホストがそのプロパティと現在時刻の前後のキーフレームを書き換えます。設定しない場合は、代わりに `MoveEditingHandle(id, position, time)` を呼びます。`Color` を設定すると、ホスト既定のハンドルの色を置き換えます。

## ソース

- [`RectShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) and [`Shape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/Shape.cs)
- [`ResourceReconciler.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ResourceReconciler.cs) and [`PathFigure.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Geometry/PathFigure.cs)
- [`IEditingHandleProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/IEditingHandleProvider.cs) and [`drawing-on-resources-migration.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/drawing-on-resources-migration.md)
- [`Drawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Drawable.cs), [`GraphicsContext2D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/GraphicsContext2D.cs), and [`RenderNode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderNode.cs)

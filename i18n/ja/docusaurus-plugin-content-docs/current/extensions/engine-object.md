---
title: EngineObject リファレンス
description: Beutl 2.x における EngineObject、IProperty、自動生成される Resource クラスの仕組み。
sidebar_position: 4
---

`EngineObject` は Beutl 2.x で編集可能なすべてのオブジェクトの基底クラスです。`Drawable`・`Shape`・`FilterEffect`・`Brush`・`Geometry` など、タイムラインに配置できる型の大半はこのクラスを継承しています。先にこのページに目を通しておくと、他の拡張機能ガイドを大幅に短く読めるはずです。

## `EngineObject` が提供するもの

- `IProperty<T>` インスタンスをベースにしたプロパティシステム。
- 派生クラスに必要なボイラープレート（入れ子の `Resource` クラス、`ToResource(...)` メソッド、`ScanPropertiesCore<T>()`）を自動生成するソースジェネレータ `Beutl.Engine.SourceGenerators`。
- 時間範囲・Z インデックス・有効/無効といった共通機能の組み込み実装。

## `EngineObject` の宣言

要点は 2 つだけです。クラスを `partial` にすること、コンストラクタで `ScanProperties<T>()` を呼ぶこと。

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

`partial` 修飾子があるおかげで、ソースジェネレータが `Resource` クラスや `ToResource` メソッドを追加できます。`ScanProperties<T>()` は宣言された `IProperty<T>` メンバを走査し、エディタが表示・アニメーション化・シリアライズできる形で登録します。

実際の拡張機能では `EngineObject` を直接継承するよりも、`Drawable` / `Shape` / `FilterEffect` などのサブクラスを継承するのが普通です。代表的な継承先は[共通の派生クラス](#共通の派生クラス)を参照してください。

## プロパティの宣言

プロパティはインスタンスメンバとして `IProperty<T>`（または `IListProperty<T>`）型で宣言し、`Property` ファクトリで生成します。

```cs
using System.ComponentModel.DataAnnotations;
using Beutl.Engine;
using Beutl.Media;

public sealed partial class MyShape : Shape
{
    public MyShape()
    {
        ScanProperties<MyShape>();
    }

    // アニメーション可能な数値プロパティ。デフォルト値あり。
    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    // アニメーション不可の参照値。
    [Display(Name = "Caption")]
    public IProperty<string?> Caption { get; } = Property.Create<string?>();

    // 入れ子の EngineObject を保持する動的リスト。
    public IListProperty<MyShape> Children { get; } = Property.CreateList<MyShape>();
}
```

| ファクトリ | 用途 |
| --- | --- |
| `Property.CreateAnimatable<T>(default, validator?)` | ユーザがキーフレームでアニメーションさせる値。 |
| `Property.Create<T>(default, validator?)` | 静的な設定値、他の `EngineObject` への参照。 |
| `Property.CreateList<T>()` | `EngineObject` 派生クラスの順序付きコレクション。 |

`System.ComponentModel.DataAnnotations` の検証属性（例: `[Range]`）は自動で適用されます。`[Display(Name = ..., ResourceType = ...)]` はプロパティパネルに表示されるラベルを制御し、リソース型を介したローカライズにも対応します。

## 自動生成される `Resource` クラス

具象 `partial class : EngineObject` ごとに、ソースジェネレータが入れ子の `Resource` クラスを出力します。レンダリングパイプラインはこれを「ある時点でのオブジェクトのスナップショット」として扱うため、アニメーション・式・コンポジションシステムは編集中のインスタンスに触らずに値をサンプリングできます。

ジェネレータが生成するもの（概念的なコード）：
```cs
// 自動生成（自分では書きません）：
public partial class MyShape
{
    public override MyShape.Resource ToResource(CompositionContext context)
    {
        var resource = new Resource();
        bool updateOnly = true;
        resource.Update(this, context, ref updateOnly);
        return resource;
    }

    public new partial class Resource : Shape.Resource
    {
        public float Size { get; set; }
        public string? Caption { get; set; }
        public List<MyShape.Resource> Children { get; set; } = [];

        public override void Update(EngineObject obj, CompositionContext context, ref bool updateOnly)
        {
            // 各プロパティの現在値（アニメーション・式 など考慮済み）を
            // CompositionContext から取得し、上記フィールドに書き写します。
            // 値が変わった場合は Version をインクリメントします。
        }
    }
}
```

生成された `Resource` には自分で `partial class Resource { … }` を追加して拡張できます。次の 2 つの partial メソッドフックが用意されています。

```cs
public partial class MyShape : Shape
{
    public partial class Resource
    {
        // 自動生成された Update() の先頭で呼ばれます。
        partial void PreUpdate(MyShape obj, CompositionContext context)
        {
            // Update() の前にやりたい処理があればここへ。
        }

        // 自動生成された Update() の末尾で呼ばれます。
        partial void PostUpdate(MyShape obj, CompositionContext context)
        {
            // 子リソースの構築、キャッシュの再計算 など。
        }

        // Dispose() の先頭で呼ばれます。
        partial void PreDispose(bool disposing)
        {
            // Dispose() の前にやりたい処理があればここへ。
        }

        // Dispose() の末尾で呼ばれます。
        partial void PostDispose(bool disposing)
        {
            // PostUpdate で確保したリソースの解放 など。
        }
    }
}
```

実例としては [`RectShape`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) がわかりやすいです。`RectGeometry` を内部に保持し、`PostUpdate` でサイズを再計算、`PostDispose` でジオメトリリソースを破棄しています。

## 編集時 vs 描画時

この 2 つのレイヤーを意識してください。

| レイヤー | 型 | ライフタイム | 書き換える主体 |
| --- | --- | --- | --- |
| 編集時 | `EngineObject` | プロジェクト内に存続 | UI、スクリプト、デシリアライズ |
| 描画時 | `EngineObject.Resource` | コンポジションパスごとに生成 | 自動生成された `Update()` のみ |

レンダリング処理（`Drawable.OnDraw`、`FilterEffect.ApplyTo` など）では `Resource` を引数に受け取るので、値はそこから読み取ります。`IProperty<T>.CurrentValue` を直接参照しないでください。`Resource` はアニメーションや式を考慮した「ある時点での値のスナップショット」なので、これを使うことで効率的に描画できます。`EngineObject` はあくまで編集用のオブジェクトで、描画処理中は `Resource` を通じて値を取得することが前提です。

## フォールバック処理

Beutl が公開するすべての公開 `EngineObject` 派生クラスにはフォールバック型が宣言されています。

例：
```cs
public sealed partial class FallbackDrawable : Drawable, IFallback;

[FallbackType(typeof(FallbackDrawable))]
public abstract partial class Drawable : EngineObject { /* … */ }
```

保存されたプロジェクトが、現在インストールされていない型（例：拡張機能が削除された）を参照していた場合でも、Beutl は対応するフォールバックにデータをデシリアライズしてくれます。これにより次回保存時もデータが保持されます。

## 共通の派生クラス

| 基底クラス | 名前空間 | 役割 | 実装ガイド |
| --- | --- | --- | --- |
| `Drawable` | `Beutl.Graphics` | キャンバスに描画される任意のオブジェクト。`Transform` / `Opacity` / `BlendMode` / `FilterEffect` / アライメントを提供。 | [描画オブジェクトを実装](implement-drawing-object.md) |
| `Shape` | `Beutl.Graphics.Shapes` | 見た目が `Geometry` で決まる `Drawable`。`Fill` と `Pen` を追加で持ちます。 | [描画オブジェクトを実装](implement-drawing-object.md) |
| `FilterEffect` | `Beutl.Graphics.Effects` | レンダーターゲットへ適用するポストエフェクト。 | [エフェクトを実装する](implement-effect.md) |
| `Sound` | `Beutl.Audio` | タイムラインに配置される任意の音源。`Gain` / `Speed` / `OffsetPosition` / `AudioEffect` を提供。 |  |
| `AudioEffect` | `Beutl.Audio.Effects` | `Sound` の出力に適用されるオーディオエフェクト。 |  |
| `Geometry` / `Brush` / `Pen` | `Beutl.Media` | 再利用可能な描画ビルディングブロック。 | （上記の `EngineObject` パターンを使用） |

## ライブラリへの登録

`Extension.Load()` のオーバーライドで `LibraryService` を使って型を登録します。

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyExtension : LayerExtension
{
    public override string Name => "My Extension";
    public override string DisplayName => "My Extension";

    public override void Load()
    {
        // カテゴリを明示して 1 つだけ登録する場合。
        LibraryService.Current.Register<MySampleObject>(
            KnownLibraryItemFormats.EngineObject,
            "My Sample Object");

        // 複数のオブジェクトを 1 つのライブラリ項目にまとめる場合。
        LibraryService.Current.AddMultiple("My Object", item => item
            .BindGeometry<MyShapeGeometry>()
            .BindDrawable<MyShape>());
        
        // グループを作って複数の項目をまとめる場合。
        LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddEngineObject<MySampleObject>("My Sample Object")
            .AddDrawable<MyShape>("My Shape"));
    }
}
```

`KnownLibraryItemFormats` にはエディタが認識するフォーマット（`EngineObject`、`Drawable`、`FilterEffect`、`Brush`、`Geometry`、`Pen`、`Sound`、`Transform` など）の定数が並んでいます。`AddMultiple` の `BindDrawable<T>()` ショートカットを使うと、フォーマット文字列を書かずに `Drawable` を図形ピッカーへ登録できます。

---
title: EngineObject リファレンス
description: Beutl 2.x におけるプロパティオブジェクト、式、自動生成される Resource クラスの仕組み。
sidebar_position: 4
---

`EngineObject` は Beutl 2.x で描画やコンポジションに使うオブジェクトの基底クラスです。`Drawable`・`Shape`・`FilterEffect`・`Brush`・`Geometry` など、タイムラインに配置できる型の大半はこのクラスを継承しています。先にこのページに目を通しておくと、他の拡張機能ガイドを大幅に短く読めるはずです。

## `EngineObject` が提供するもの

- 値のプロパティ（`IProperty<T>`）、式を持つプロパティ（`IExpressionProperty<T>`）、リストのプロパティ（`IListProperty<T>`）。
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

`Property`、`IProperty<T>`、`IExpressionProperty<T>`、`IListProperty<T>` は **Beutl.Core** の `Beutl` 名前空間にあります。`Property.CreateAnimatable` 拡張メンバを使うには `Beutl.Engine` もインポートします。

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;

namespace MyExtension;

public sealed partial class MyProperties : EngineObject
{
    public MyProperties()
    {
        ScanProperties<MyProperties>();
    }

    [Display(Name = "Size")]
    [Range(0, float.MaxValue)]
    public IExpressionProperty<float> Size { get; } = Property.CreateAnimatable<float>(100);

    [Display(Name = "Caption")]
    public IExpressionProperty<string?> Caption { get; } = Property.CreateExpression<string?>();

    public IProperty<bool> ShowLabel { get; } = Property.CreateValue(true);

    public IListProperty<MyProperties> Children { get; } = Property.CreateList<MyProperties>();
}
```

<div style={{ overflowX: 'auto' }}>

| ファクトリ | 戻り値 | 用途 |
| --- | --- | --- |
| `Property.CreateAnimatable<T>(defaultValue, validator)` | `IExpressionProperty<T>` | キーフレームと式を使える値。引数はいずれも省略できます。 |
| `Property.CreateExpression<T>(defaultValue, validator)` | `IExpressionProperty<T>` | 式を使えて、キーフレームは使えない値。引数はいずれも省略できます。 |
| `Property.CreateValue<T>(defaultValue, validator)` | `IProperty<T>` | 式もキーフレームも使わない値。引数はいずれも省略できます。 |
| `Property.CreateReference<T>()` | `IExpressionProperty<T>` | 所有権を持たないオブジェクトへの参照。参照先を子として接続しません。 |
| `Property.CreateList<T>()` | `IListProperty<T>` | 所有する順序付きコレクション。プロパティ自体の `Add`、`Remove`、`Clear` を呼びます。 |

</div>

`IProperty<T>` は保存された `Value`、`DefaultValue`、`ValueChanged`、`IsValueSet` を公開します。`Expression`、`HasExpression`、`IsAnimatable`、`Evaluate(EvaluationContext)` など、式に関するメンバは `IExpressionProperty<T>` にあります。式を使えるかどうかは `property is IExpressionProperty` で調べます。`SupportsExpression` は削除されました。実装型の `SimpleProperty<T>`、`ValueOnlyProperty<T>`、`ListProperty<T>` も Beutl.Core にあります。

`System.ComponentModel.DataAnnotations` の検証属性（例: `[Range]`）は自動で適用されます。`[Display(Name = ..., ResourceType = ...)]` はプロパティパネルに表示されるラベルを制御し、リソース型を介したローカライズにも対応します。

単位のメタデータには `[Unit(PropertyUnit.Percent)]`、`[Unit(PropertyUnit.Degrees)]`、`[Unit(PropertyUnit.Ratio)]` を使います。これらは `Beutl` 名前空間にあり、エディターの単位表示と Agent Toolkit のスキーマに使われます。

### 値の読み書き

プロパティオブジェクトの `Value` を読み書きします。継承した `Name`、`Id`、`IsEnabled`、`ZIndex`、`TimeRange` も同様です。これらのメンバには、別の静的な `XxxProperty` フィールドや値だけのアクセサーはありません。

```cs
using System;
using MyExtension;

var obj = new MyProperties
{
    Name = { Value = "Example" },
    Size = { Value = 120 },
    IsEnabled = { Value = true }
};
obj.Children.Add(new MyProperties());
obj.Size.ValueChanged += (_, change) => Console.WriteLine(change.NewValue);
```

`property.GetObservable()` はスカラーのプロパティについて、購読時の値と、その後の値の変更を通知します。リストは `CollectionChanged` を監視します。リストの `Value` への代入は、所有者が保持するリストに内容をコピーします。プロパティ自体を監視してください。値が変わっても、一般に所有者から `PropertyChanged("Size")` は通知されません。ID の値を比較するときは `a.Id.Value == b.Id.Value` と書きます。プロパティオブジェクト同士の比較は参照の比較になり、診断 `BESG007` が出ます。同じプロパティオブジェクトか調べたい場合だけ `ReferenceEquals` を使います。

以前のコードを移行するときは、`CurrentValue` を `Value`、`GetValue(context)` を `Evaluate(context)`、`ReplaceCurrentValue(value)` を `SetValueEvenIfEqual(value)`、`HasLocalValue` を `IsValueSet` に変更します。`CoreProperty`、`ConfigureProperty`、`CoreObject.GetValue` / `SetValue` は削除されました。エンジン以外の `CoreObject` 派生クラスも、同じプロパティ宣言と `ScanProperties<T>()` のパターンを使います。

### キーフレームと式

キーフレームは、プロパティの式の連鎖の最下層に置かれます。削除された `IProperty.Animation` と `AnimationChanged` の代わりに `Beutl.Animation` の拡張メソッドを使います。

```cs
using Beutl;
using Beutl.Animation;
using MyExtension;

var obj = new MyProperties();
var animation = new KeyFrameAnimation<float>();
animation.KeyFrames.Add(new KeyFrame<float>
{
    KeyTime = { Value = MediaTime.Zero },
    Value = { Value = 100 }
});
animation.KeyFrames.Add(new KeyFrame<float>
{
    KeyTime = { Value = MediaTime.FromSeconds(1) },
    Value = { Value = 200 }
});
obj.Size.SetKeyFrameAnimation(animation);
KeyFrameAnimation<float>? current = obj.Size.GetKeyFrameAnimation();
```

上位の式がない場合、`Expression` はキーフレームを返しますが、`HasExpression` はキーフレームを数えません。`IAnimation`、`IAnimation<T>`、非ジェネリックの `KeyFrameAnimation` は削除されました。`IKeyFrameAnimation` または `KeyFrameAnimation<T>` を使います。`UseGlobalClock` と、各キーフレームの `KeyTime`、`Value`、`Easing` もプロパティオブジェクトです。

`IExpression`、`IExpression<T>`、`ExpressionContext`、`PropertyLookup`、`ExpressionException` も Beutl.Core の `Beutl` 名前空間にあります。`IExpressionProperty<T>.Evaluate` は `EvaluationContext`、式の実装の `IExpression<T>.Evaluate` は `ExpressionContext` を受け取ります。式とコンポジションのコンテキストはともに `EvaluationContext` を継承します。`ExpressionContext` は `CompositionContext` を継承しません。

タイムラインとキーフレームの時刻には `TimeSpan` ではなく `MediaTime` を使います。フレームの時刻は `MediaTime.FromFrames(frame, rationalRate)` で作り、時間として表示するときは `ToTimeSpan()` で変換します。`MediaTime.ToString()` は flick 数を表示します。

## 自動生成される `Resource` クラス

具象 `partial class : EngineObject` ごとに、ソースジェネレータが入れ子の `Resource` クラスを出力します。レンダリングパイプラインはこれを「ある時点でのオブジェクトのスナップショット」として扱うため、アニメーション・式・コンポジションシステムは編集中のインスタンスに触らずに値をサンプリングできます。

ジェネレータは `ToResource(CompositionContext)`、スナップショットのプロパティ、`Reconcile(EngineObject, CompositionContext, ref bool versionBumped)` を生成します。`Reconcile` はコンテキストの時刻で式を評価して子リソースを更新し、値が変わると `Version` を進めます。以前の `Update`、`PreUpdate`、`PostUpdate` は `Reconcile`、`PreReconcile`、`PostReconcile` に変わりました。

生成されたリソースは partial メソッドのフックで拡張できます。上の `MyProperties` に、次の partial 宣言を追加します。

```cs
using Beutl.Composition;

namespace MyExtension;

public sealed partial class MyProperties
{
    public partial class Resource
    {
        partial void PreReconcile(MyProperties obj, CompositionContext context)
        {
        }

        partial void PostReconcile(MyProperties obj, CompositionContext context)
        {
        }

        partial void PreDispose(bool disposing)
        {
        }

        partial void PostDispose(bool disposing)
        {
        }
    }
}
```

`PostReconcile` ではスナップショット値から派生データを作り、自分で所有するリソースは破棄時のフックで解放します。生成された実装は `disposing` が `true` のときに自身の子リソースを解放します。[`RectShape`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/RectShape.cs) もこのパターンを使います。[描画オブジェクトのガイド](implement-drawing-object.md) には、公開 API を使った拡張機能の完全な実装例があります。

## 編集時 vs 描画時

この 2 つのレイヤーを意識してください。

<div style={{ overflowX: 'auto' }}>

| レイヤー | 型 | ライフタイム | 書き換える主体 |
| --- | --- | --- | --- |
| 編集時 | `EngineObject` | プロジェクト内に存続 | UI、スクリプト、デシリアライズ |
| 描画時 | `EngineObject.Resource` | コンポジション用に生成・更新し、再利用する場合がある | 自動生成された `Reconcile()` とリソースのフック |

</div>

レンダリング処理（`Drawable.OnDraw`、`FilterEffect.ApplyTo` など）では `Resource` を引数に受け取るので、値はそこから読み取ります。`IProperty<T>.Value` を直接参照しないでください。`Resource` はアニメーションや式を考慮した「ある時点での値のスナップショット」なので、これを使うことで効率的に描画できます。`EngineObject` はあくまで編集用のオブジェクトで、描画処理中は `Resource` を通じて値を取得することが前提です。

## フォールバック処理

`Drawable`、`Sound`、`EngineObject` などの基底クラスには `[FallbackType]` が宣言されています。保存されたプロジェクトが利用できない拡張機能の型を参照している場合、対応するフォールバックがシリアライズされたデータを保持し、再保存できるようにします。フォールバックの描画オブジェクトは何も描画せず、失われた拡張機能の動作を代わりに実装するものではありません。

## 共通の派生クラス

<div style={{ overflowX: 'auto' }}>

| 基底クラス | 名前空間 | 役割 | 実装ガイド |
| --- | --- | --- | --- |
| `Drawable` | `Beutl.Graphics` | キャンバスに描画される任意のオブジェクト。`Transform` / `Opacity` / `BlendMode` / `FilterEffect` / アライメントを提供。 | [描画オブジェクトを実装](implement-drawing-object.md) |
| `Shape` | `Beutl.Graphics.Shapes` | 見た目が `Geometry` で決まる `Drawable`。`Fill` と `Pen` を追加で持ちます。 | [描画オブジェクトを実装](implement-drawing-object.md) |
| `FilterEffect` | `Beutl.Graphics.Effects` | レンダーターゲットへ適用するポストエフェクト。 | [エフェクトを実装する](implement-effect.md) |
| `Sound` | `Beutl.Audio` | タイムラインに配置される任意の音源。`Gain` / `Speed` / `OffsetPosition` / `Effect` を提供。 |  |
| `AudioEffect` | `Beutl.Audio.Effects` | `Sound` の出力に適用されるオーディオエフェクト。 | [音声エフェクトの実装](audio-effects.md) |
| `Geometry` / `Brush` / `Pen` | `Beutl.Media` | 再利用可能な描画ビルディングブロック。 | （上記の `EngineObject` パターンを使用） |

</div>

## ライブラリへの登録

`Extension.Load()` のオーバーライドで `LibraryService` を使って型を登録します。

```cs
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;
using Beutl.Media;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyExtension : Extension
{
    public override string Name => "My Extension";
    public override string DisplayName => "My Extension";

    public override void Load()
    {
        LibraryService.Current.Register<MySampleObject>(
            KnownLibraryItemFormats.EngineObject,
            "My Sample Object");

        LibraryService.Current.AddMultiple("My Object", item => item
            .BindGeometry<RectGeometry>()
            .BindDrawable<RectShape>());

        LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddEngineObject<MySampleObject>("My Sample Object")
            .AddMultiple("My Shape", item => item.BindDrawable<RectShape>()));
    }
}
```

`KnownLibraryItemFormats` にはエディタが認識するフォーマット（`EngineObject`、`Drawable`、`FilterEffect`、`Brush`、`Geometry`、`Pen`、`Sound`、`Transform` など）の定数が並んでいます。`AddMultiple` の `BindDrawable<T>()` ショートカットを使うと、フォーマット文字列を書かずに `Drawable` を図形ピッカーへ登録できます。

`AddDrawable<T>()` と `AddSound<T>()` は `EngineObject` の形式も登録するようになったため、項目をタイムラインに追加できます。1 つの項目に複数の表現をまとめる場合は、引き続き `AddMultiple` が使えます。

## ソース

- [`IProperty.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/PropertySystem/IProperty.cs), [`Property.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/PropertySystem/Property.cs), and [`EnginePropertyExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EnginePropertyExtensions.cs)
- [`EngineObject.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EngineObject.cs) and [`ResourceClassEmitter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine.SourceGenerators/Emit/ResourceClassEmitter.cs)
- [`KeyFrameAnimationExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Animation/KeyFrameAnimationExtensions.cs), [`ExpressionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Expressions/ExpressionContext.cs), and [`MediaTime.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/MediaTime.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`UnitAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/UnitAttribute.cs)

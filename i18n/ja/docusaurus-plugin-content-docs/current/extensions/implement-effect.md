---
title: エフェクトを実装する
description: EngineObject パターンに基づくカスタム FilterEffect を実装します。
---

`FilterEffect` はレンダーターゲットを後処理する `EngineObject` です。基本的な書き方は[描画オブジェクトを実装](implement-drawing-object.md)と同じで、`partial class` で宣言し、`IProperty<T>` メンバを公開し、`ApplyTo` の中で自動生成された `Resource` からスナップショット値を読み取ります。

[EngineObject リファレンス](engine-object.md) を読んでいない場合は先に目を通してください。プロパティシステムや `Resource` のライフサイクルがそこで説明されています。

## 1. 最小のエフェクト

```cs
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public sealed partial class MyFilterEffect : FilterEffect
{
    public MyFilterEffect()
    {
        ScanProperties<MyFilterEffect>();
    }

    public override void ApplyTo(FilterEffectContext context, FilterEffect.Resource resource)
    {
        // ここで context にフィルタ操作を追加します。
    }
}
```

`Drawable` との違いは 2 つ：

- `ApplyTo` は `FilterEffectContext` と自動生成された `Resource` を受け取ります。プロパティの値を読むには `resource` を派生 `Resource` 型にキャストします。
- `MeasureCore` / `OnDraw` はありません。エディタが `FilterEffectContext` を介してレンダーターゲットを流し込んでくれるので、それをどう変換するかだけを記述します。

## 2. 既存のエフェクトを組み合わせる

最も簡単なカスタムエフェクトは、`FilterEffectContext` の拡張メソッドを使って Beutl 組み込みの操作を重ねていく方法です。境界の自動拡張（例：ブラーは表面を広げる）も内部で処理されるため、サイズ調整を自分で書く必要はほぼありません。

```cs
using System.ComponentModel.DataAnnotations;
using Beutl.Engine;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;
using Beutl.Media;

namespace MyExtension;

public sealed partial class HighContrastBlur : FilterEffect
{
    public HighContrastBlur()
    {
        ScanProperties<HighContrastBlur>();
    }

    [Display(Name = "Blur Sigma")]
    [Range(0, float.MaxValue)]
    public IProperty<float> BlurSigma { get; } = Property.CreateAnimatable<float>(20);

    [Display(Name = "Contrast")]
    [Range(-100, 100)]
    public IProperty<float> Contrast { get; } = Property.CreateAnimatable<float>(20);

    public override void ApplyTo(FilterEffectContext context, FilterEffect.Resource resource)
    {
        var r = (Resource)resource;
        context.Blur(new Size(r.BlurSigma, r.BlurSigma));
        context.HighContrast(
            grayscale: false,
            invertStyle: HighContrastInvertStyle.NoInvert,
            contrast: r.Contrast / 100f);
    }
}
```

`FilterEffectContext` には組み込み操作それぞれに対応するメソッドが用意されています：`Blur`、`DropShadow`、`InnerShadow`、`Erode`、`Dilate`、`ColorMatrix`、`Saturate`、`HueRotate`、`Brightness`、`HighContrast`、`Lighting`、`LookupTable`、`MatrixConvolution`、`Transform`、`BlendMode` など。完全なリストは [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs) を参照してください。

## 3. レンダーターゲットを直接処理する

[`FlatShadow.cs](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs) や [`ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs)、[`GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs) などを参考にしてください。

## 4. 拡張機能で登録する

```cs
using Beutl.Extensibility;
using Beutl.Services;

namespace MyExtension;

[Export]
public sealed class MyEffectExtension : Extension
{
    public override string Name => "My Effects";
    public override string DisplayName => "My Effects";

    public override void Load()
    {
        LibraryService.Current.Register<HighContrastBlur>(
            KnownLibraryItemFormats.FilterEffect,
            "High-Contrast Blur");
    }
}
```

複数のエフェクトをまとめたい場合は、[EngineObject リファレンス](engine-object.md#ライブラリへの登録) で説明している `RegisterGroup` ヘルパーを使うと、ライブラリ上で 1 つのカテゴリにグルーピングできます。

## Beutl ソースの参考ファイル

| ファイル | 学べること |
| --- | --- |
| `src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs` | `FilterEffectContext` の単一呼び出しで完結する最小エフェクト。 |
| `src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs` | `CustomEffect` で独自描画を行い、`transformBounds` で境界を拡張する例。 |
| `src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs` | チェイン可能な組み込み操作の全リスト。 |

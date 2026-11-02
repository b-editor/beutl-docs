---
title: エフェクトを実装する
description: EngineObject パターンに基づくカスタム FilterEffect を実装します。
---

`FilterEffect` はレンダーターゲットを後処理する `EngineObject` です。基本的な書き方は[描画オブジェクトを実装](implement-drawing-object.md)と同じで、`partial class` で宣言し、`IExpressionProperty<T>` メンバを公開し、自動生成された `Resource` で `ApplyTo` をオーバーライドします。`Resource` のプロパティは評価済みの値を保持しています。

[EngineObject リファレンス](engine-object.md) を読んでいない場合は先に目を通してください。プロパティシステムや `Resource` のライフサイクルがそこで説明されています。

## 1. 最小のエフェクト

```cs
using Beutl.Graphics.Effects;

namespace MyExtension;

public sealed partial class MyFilterEffect : FilterEffect
{
    public MyFilterEffect()
    {
        ScanProperties<MyFilterEffect>();
    }

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            // Add filter operations to context here.
        }
    }
}
```

`Drawable` との違いは 2 つ：

- `ApplyTo` が受け取るのは `FilterEffectContext` だけです。`Resource` の中でプロパティ名は描画時刻で評価された値を指すので、キャストは不要です。プロパティ以外の状態が必要なメソッドでは、`RequireOriginal()` でエフェクトを取得できます。
- `MeasureCore` / `OnDraw` はありません。エディタが `FilterEffectContext` を介してレンダーターゲットを流し込んでくれるので、それをどう変換するかだけを記述します。

## 2. 既存のエフェクトを組み合わせる

最も簡単なカスタムエフェクトは、`FilterEffectContext` のメソッドを使って Beutl 組み込みの操作を重ねていく方法です。境界の自動拡張（例：ブラーは表面を広げる）も内部で処理されるため、サイズ調整を自分で書く必要はほぼありません。

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;
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
    public IExpressionProperty<float> BlurSigma { get; } = Property.CreateAnimatable<float>(20);

    [Display(Name = "Contrast")]
    [Range(-100, 100)]
    public IExpressionProperty<float> Contrast { get; } = Property.CreateAnimatable<float>(20);

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            context.Blur(new Size(BlurSigma, BlurSigma));
            context.HighContrast(
                grayscale: false,
                invertStyle: HighContrastInvertStyle.NoInvert,
                contrast: Contrast / 100f);
        }
    }
}
```

`FilterEffectContext` には組み込み操作それぞれに対応するメソッドが用意されています：`Blur`、`DropShadow`、`InnerShadow`、`Erode`、`Dilate`、`ColorMatrix`、`Saturate`、`HueRotate`、`Brightness`、`HighContrast`、`Lighting`、`MatrixConvolution`、`Transform`、`BlendMode` など。完全なリストは [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs) と [`FilterEffectContext.Operations.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.Operations.cs) を参照してください。

`Crop(Rect, GradientSpreadMethod = Decal)` は `Bounds` と同じ座標系の矩形を切り出します。既定の `Decal` は範囲外を透明にして境界を縮めます。`Pad` は端の色を延長し、`Repeat` は繰り返し、`Reflect` は反転して繰り返し、元の境界を保ちます。

複数入力や複数パスのGLSL処理については、[C#スクリプト](../reference/library/filter-effects/script/csharp-script.md#glslのカスタムパス)も参照してください。

`Resource.ApplyTo` は protected です。複合エフェクトの子のように別のエフェクトを適用するには `context.Apply(childResource)` を呼びます。継続の境界と有効状態はこのメソッドが保ちます。

### preview.9 からの移行 {/* #migrating-from-preview-9 */}

preview.9 では、`ApplyTo` はエフェクトのクラスにあり、引数で `resource` を受け取っていました。互換用の API はありません。メソッドの本体を入れ子の `Resource` に移し、`r.Property` を `Property` に置き換えて再ビルドしてください。

<div style={{ overflowX: 'auto' }}>

| 変更前 | 変更後 |
| --- | --- |
| `override void FilterEffect.ApplyTo(FilterEffectContext, Resource)` | エフェクトの `Resource` の `protected override void ApplyTo(FilterEffectContext)` |
| `effect.ApplyTo(context, resource)` | `context.Apply(resource)` |

</div>

## 3. レンダーターゲットを直接処理する {/* #processing-the-render-target */}

[`FlatShadow.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs) や [`ColorShift.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorShift.cs)、[`GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs) などを参考にしてください。

`CustomEffect(data, action, transformBounds)` は明示的な状態を受け取り、その状態から出力境界を計算します。記録時に出力境界が決まらない場合、`transformBounds` を渡さないオーバーロードは、所有するターゲットの有限の領域が決まるまで境界を未確定として扱います。メタデータのコールバックから、編集中の変更可能なオブジェクトを直接参照しないでください。

`FilterEffectContext.Shader(ShaderDescription)` と `Geometry(GeometryDescription)` は、境界とヒットテストの契約を持つ遅延操作を記録します。操作の選択判定は `RenderHitTestContract.None`、`OutputBounds`、`AnyInput`、`Custom(...)` で宣言します。`default(RenderHitTestContract)` は無効です。独自のコールバックには `Custom(state, static (state, context, point) => ...)` で状態を渡せます。

`AppendSkiaFilter` の factory はフィルターの生成だけを行い、`Activate`、`Flush` などで自身の `FilterEffectExecutor` に再入してはいけません。ターゲットへの描画は `CustomEffect` の action に移します。

レンダラーが実行する `CustomEffect` のコールバックから、別の `RenderNodeRenderer` は起動できません。`Open` で得たキャンバスの `DrawDrawable` や `DrawNode` を経由する場合も同じで、呼び出すと `InvalidOperationException` が発生します。描画オブジェクトを `RenderNode` に記録し、`CustomFilterEffectContext.ExecutionContext.RenderDependency(root, identity, domain)` で描画して、返された画像を描いてください。この依存描画は、リクエストの割り当て、作業密度、キャンセル、循環検出を共有します。同じ identity の画像を再利用できるのは、同じ記録済みエフェクトの中だけです。レンダラーの外で実行されるとき、`ExecutionContext` は `null` です。

`ContinuationEffect(data, action)` のコールバックは、後に記録された操作を表す `FilterEffectContinuation` を受け取ります。何度でも実行でき、実行しなくても構いません。`TargetEffect(data, action)` のコールバックは `CompositionTargetAccess` を受け取ります。その `Capture()` と `Replace(image)` で、エフェクトの下にあるコンポジションターゲットを読み取り、置き換えます。これらを記録するリソースは、どの評価時刻でも、それぞれ `ControlsContinuation`、`MayAccessTarget` から `true` を返す必要があります。エンジンは記録の前にこの宣言をもとにチェーンを分割し、ターゲットへの処理を振り分けるため、宣言せずに記録すると例外が発生します。

### メタデータコールバックの診断

コンパイラーが `BESG004` を報告した場合は、メタデータコールバックと、その中から呼ぶ処理が参照している値を確認してください。変更される静的な値を直接読み取らず、明示的な状態や束縛された描画リソースを通じて渡します。

## 4. 宣言的なシェーダーグラフ {/* #shader-graphs */}

`context.ShaderGraph(state, record)` を使うと、実行時のコールバックなしで、複数パスの GLSL のグラフィックス処理とコンピュート処理を記録できます。`record` コールバックは記録中に同期的に実行され、画像、バッファ、パスを宣言するだけです。プログラムのコンパイル、画像の割り当てと再利用、パス間の同期はレンダラーが行います。

```cs
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using Beutl;
using Beutl.Engine;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Shaders;

namespace MyExtension;

public sealed partial class InvertGraphEffect : FilterEffect
{
    private static readonly ShaderProgram s_invert = ShaderProgram.Fullscreen(new ShaderSource("""
        #version 450
        layout(binding = 0) uniform sampler2D image;
        layout(binding = 1, std140) uniform Source { vec4 logical; vec4 raster; vec4 size; } src;
        layout(binding = 2, std140) uniform Destination { vec4 logical; vec4 raster; vec4 size; } dst;
        layout(push_constant) uniform Values { vec4 value; } pc;
        layout(location = 0) out vec4 color;
        void main() {
            vec2 position = dst.raster.xy + gl_FragCoord.xy / dst.size.z;
            vec4 sampled = texture(image, (position - src.raster.xy) / src.raster.zw);
            color = vec4(mix(sampled.rgb, sampled.a - sampled.rgb, pc.value.x), sampled.a);
        }
        """));

    public InvertGraphEffect()
    {
        ScanProperties<InvertGraphEffect>();
    }

    [Display(Name = "Amount")]
    [Range(0, 100)]
    public IExpressionProperty<float> Amount { get; } = Property.CreateAnimatable(100f);

    public new partial class Resource
    {
        protected override void ApplyTo(FilterEffectContext context)
        {
            context.ShaderGraph(new Vector4(Amount / 100f, 0, 0, 0), static (graph, values) =>
            {
                ShaderImage output = graph.Image2D("output", graph.Source);
                graph.Fullscreen("invert", s_invert, pass =>
                {
                    pass.SampledImage(0, graph.Source);
                    pass.ImageParameters(1, graph.Source);
                    pass.ImageParameters(2, output);
                    pass.PushConstants(values);
                    pass.InputRegion(0, ShaderInputRegion.Identity);
                    pass.ColorAttachment(0, output);
                });
                return graph.Output(output);
            });
        }
    }
}
```

- `graph.Source` は入力画像の全体です。パスがこれを読むのは、そのパス自身の `SampledImage` バインディングを通してだけです。
- `graph.Image2D(name, like, format, padding, resolutionScale)` は、別の画像と同じ境界を持つ画像を宣言します。パスは `graph.Fullscreen`、`graph.Render`、`graph.Compute` で記録し、そのプログラムは `ShaderProgram.Fullscreen`、`Graphics`、`Compute` で作成します。
- `pass.ImageParameters(binding, image)` は 3 つの std140 `vec4` 値をバインドします。論理的な境界、同じ座標系でのラスター境界、(ピクセル幅, ピクセル高さ, ラスタースケール, 0) です。
- `pass.PushConstants(value)` はアンマネージ値をコピーします。サイズは 128 バイトまでの 4 の倍数です。
- `pass.InputRegion(binding, region)` はサンプリングする画像の範囲全体を宣言し、部分描画を有効にします。これも `PartialRendering()` も呼ばないパスは、全体を描画します。
- `graph.Output(image)` は結果を選択します。別の `ColorEncoding` を渡さなければ、結果はリニアの乗算済みアルファです。

Beutl のソースの `WaveRefraction.cs` と `LightRays.cs` は、複数パスの完全な例です。

## 5. 入力を別の時刻で評価する {/* #input-evaluation */}

モーションブラーのように入力の別の時点が必要なエフェクトは、`Resource` で `UsesInputEvaluation`、`PrepareInput`、`RenderInput` をオーバーライドします。通常の `ApplyTo` だけのエフェクトには、どれも必要ありません。

```cs
using System.ComponentModel.DataAnnotations;
using Beutl;
using Beutl.Composition;
using Beutl.Engine;
using Beutl.Graphics;
using Beutl.Graphics.Effects;
using Beutl.Graphics.Rendering;

namespace MyExtension;

public sealed partial class EchoEffect : FilterEffect
{
    public EchoEffect()
    {
        ScanProperties<EchoEffect>();
    }

    [Display(Name = "Delay (seconds)")]
    [Range(0, 10)]
    public IExpressionProperty<float> DelaySeconds { get; } = Property.CreateAnimatable(0.25f);

    public new partial class Resource
    {
        private FilterEffectInputSample? _current;
        private FilterEffectInputSample? _delayed;

        public override bool UsesInputEvaluation => true;

        // RenderInput records the samples, so there is nothing to apply to the pixels.
        protected override void ApplyTo(FilterEffectContext context)
        {
        }

        public override bool PrepareInput(FilterEffectInputContext input)
        {
            MediaTime time = input.EvaluationContext.Time;
            _current = input.Evaluate(time);
            _delayed = input.Evaluate(time - MediaTime.FromSeconds(DelaySeconds));
            return true;
        }

        public override void RenderInput(GraphicsContext2D context, FilterEffectInputContext input)
        {
            DrawSample(_delayed!);
            DrawSample(_current!);

            void DrawSample(FilterEffectInputSample sample)
            {
                using (context.PushBlendMode(BlendMode.Plus))
                using (context.PushOpacity(0.5f))
                    sample.Draw(context);
            }
        }

        partial void PostReconcile(EchoEffect obj, CompositionContext context) => ClearSamples();

        partial void PostDispose(bool disposing) => ClearSamples();

        private void ClearSamples()
        {
            _current = null;
            _delayed = null;
        }
    }
}
```

- `PrepareInput` はソースの更新後に呼ばれ、現在時刻の値が変わっていないときも実行されます。依存関係、境界、3D の要件を記録前に確定できるよう、ここですべてのサンプルについて `input.Evaluate(time)` を呼び、置き換えの描画を行う場合は `true` を返します。
- `input.EvaluationContext` は入力のクロックと `Conditions` を保持します。`Conditions` には実効的な出力 `FrameRate`、プロキシの方針、ターゲットの領域、シーンへの問い合わせ、キャンセルトークンが含まれます。`OperationCanceledException` はそのまま伝播させてください。
- `sample.Draw(context)` は、サンプル自身のトランスフォーム、不透明度、前段のエフェクトを含めて、描画オブジェクトの親の座標系で記録します。その後、エンジンが後続のエフェクトを置き換え結果に 1 回だけ実行し、所有者のブレンドモードで 1 回だけ合成します。描画オブジェクトのトランスフォームや不透明度を再度適用したり、現在の境界でクリップしたりしないでください。
- サンプルは、ソースが次に更新または破棄されるまでエンジンが所有します。保持している参照は `PostReconcile` と `PostDispose` で消去してください。
- 独自の実行コールバックでは、`ExecutionContext.RenderDependency(sample, availableSize, domain)` で、現在のリクエストを通してサンプルを描画できます。領域は親の座標系で有限かつ空でない範囲を指定し、返された画像のリースは破棄してください。

`CompositionContext.EvaluationServices`（`input.EvaluationContext` からも取得可能）は、評価中のシーンへの読み取り専用の問い合わせに答えます。`GetLayers(time)`、`EvaluateLayer(zIndex, time)`、`ReadLayer`、`TryReadFrame`、`ReadAudio(start, duration)` があります。シーンから切り離された評価では `null` の場合があります。`TryReadFrame` は評価が完了するまで `false` を返すので、描画時のコールバックから読み取ってください。音声に反応するエフェクトでは、`AudioSpectrum.Calculate(samples, magnitudes)` で 2 のべき乗個のサンプルから周波数の振幅を計算できます。

## 6. 拡張機能で登録する

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

<div style={{ overflowX: 'auto' }}>

| ファイル | 学べること |
| --- | --- |
| `src/Beutl.Engine/Graphics/FilterEffects/HighContrast.cs` | `FilterEffectContext` の単一呼び出しで完結する最小エフェクト。 |
| `src/Beutl.Engine/Graphics/FilterEffects/FlatShadow.cs` | `CustomEffect` で独自描画を行い、`transformBounds` で境界を拡張する例。 |
| `src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs` | チェイン可能な組み込み操作の全リスト。 |
| `src/Beutl.Engine/Graphics/FilterEffects/WaveRefraction.cs` | 2 パスの宣言的なシェーダーグラフ。 |
| `src/Beutl.Engine/Graphics/FilterEffects/MotionBlur.cs` | `PrepareInput` と `RenderInput` で入力の時間サンプルを累積する例。 |

</div>

- [`DiagnosticDescriptors.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine.SourceGenerators/Diagnostics/DiagnosticDescriptors.cs)
- [`FilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs), [`FilterEffectContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.cs), and [`FilterEffectContext.Operations.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContext.Operations.cs)
- [`FilterEffectInputContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectInputContext.cs) and [`FilterEffectContinuation.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffectContinuation.cs)
- [`RenderExecutionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderExecutionContext.cs), [`CompositionTargetAccess.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/CompositionTargetAccess.cs), and [`RenderHitTestContract.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/Operations/RenderHitTestContract.cs)
- [`ShaderGraphBuilder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shaders/Graph/ShaderGraphBuilder.cs) and [`ShaderPassBuilder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shaders/Graph/ShaderPassBuilder.cs)
- [`ICompositionEvaluationServices.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Composition/ICompositionEvaluationServices.cs) and [`AudioSpectrum.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/AudioSpectrum.cs)
- [`drawing-on-resources-migration.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/drawing-on-resources-migration.md) and [`resolution-independent-rendering.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/resolution-independent-rendering.md)

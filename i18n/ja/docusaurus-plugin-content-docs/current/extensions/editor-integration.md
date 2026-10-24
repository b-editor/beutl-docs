---
title: エディタとの連携
description: 公開された拡張契約を使って、コマンド、プロパティエディタ、MCP ツール、要素のソースを登録します。
sidebar_position: 7
---

Beutl 2.0.0-preview.9 は、これらの契約を `Beutl.Extensibility` から公開しています。[preview.9 の SDK](create-csproj.md) を使い、拡張機能を再ビルドしてください。名前空間が同じでも、アセンブリ間を移動した契約型があります。

## コマンド {/* #commands */}

`ViewExtension.ContextCommands` からコマンド定義を返します。各定義には固定の `Id` が必要です。キーマップはこの ID で割り当てを保存します。`IContextCommandHandler` と、以前のコマンド名による振り分けは削除されています。

- 開いているエディタやツールのコンテキストを使う場合は、`ContextCommandDefinition<TContext>` に `ExecuteOnAsync` と、必要に応じて `CanExecuteOn` を設定します。
- 自分のタブが開いていなくても使えるコマンドは、`ContextCommandDefinition` に `Scope = ContextCommandScope.Extension`、`ExecuteAsync`、必要に応じて `CanExecute` を設定します。アクティブなエディタも存在するとは限らないため、使用前に `execution.EditorContext` を確認してください。
- パレットから実行したコマンドは、`execution.Interaction` の `ShowInputAsync` と `ShowQuickPickAsync` で入力や選択を求められます。キーボードからの実行では `null` です。各要求の完了を待ち、結果が `null` なら中止し、`execution.CancellationToken` も確認してください。
- 実行可能な状態が変わるハンドラーは `IContextCommandStateNotifier` を実装します。アクティブなエディタの状態に依存する共有の拡張機能は `IContextCommandEditorStateNotifier` を実装できます。

次のコマンドは、アクティブなエディタの再生位置を先頭へ移します。

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

[Export]
public sealed class SeekCommands : ViewExtension
{
    public override IEnumerable<ContextCommandDefinition> ContextCommands =>
    [
        new ContextCommandDefinition("example.seekStart", "Go to start")
        {
            Scope = ContextCommandScope.Extension,
            CanExecute = execution =>
                execution.EditorContext?.GetService(typeof(IEditorClock)) is IEditorClock,
            ExecuteAsync = execution =>
            {
                if (execution.EditorContext?.GetService(typeof(IEditorClock)) is IEditorClock clock)
                    clock.Seek(MediaTime.Zero);
                return Task.CompletedTask;
            }
        }
    ];
}
```

別の拡張機能の定義を実行するときは、`CanRun(context, execution)` を確認してから `RunAsync(context, execution)` を呼びます。シーンエディタの再生コマンドの ID は `editor.playPause` です。[再生との連携](pitfalls.md#the-playhead-during-playback)を参照してください。

## プロパティエディタ {/* #property-editors */}

拡張機能のアセンブリでは、`RegisterEditors(PropertyEditorRegistry)` を `protected override` でオーバーライドします。以前の `MatchProperty`、`TryCreateContext`、`TryCreateControl` のオーバーライドと `DefaultHandler` は削除されています。

<div style={{ overflowX: 'auto' }}>

| 登録方法 | 用途 | 表示される場所 |
| --- | --- | --- |
| `Register<TValue, TContext>` | 独自の `IPropertyEditorContext` と Avalonia の `Control` | プロパティパネル。ノード、リスト項目、設定では `PropertyEditorOptions` に対応するコントロールのファクトリーを渡した場合のみ |
| `RegisterGroup<TContext>` | 選んだ複数のプロパティアダプターを 1 つのエディタで編集 | プロパティパネル |
| `RegisterValue<TValue, TEdit>` | `IValueEditorContext<TEdit>` と `IValueEditorControl<TEdit>` を組み合わせる標準エディタ | プロパティパネル、ノード、リスト項目、設定 |

</div>

`Register` と `RegisterValue` は、値の型が `TValue` と完全に一致するプロパティを選びます。特定の所有者やプロパティに絞る場合は `PropertyEditorOptions.Match` を設定します。`Register` では `CreateNodeControl`、`CreateListItemControl`、`CreateSettingsControl` で各表示場所に対応します。省略した場所では、次の候補のエディタが選ばれます。

`IPropertyAdapter` と、そのジェネリック・アニメーション・式のインターフェースは **Beutl.Engine アセンブリ**にあり、名前空間は **`Beutl.Extensibility`** です。`GetCoreProperty()` は削除されています。アダプターが元の `Beutl.IProperty` を公開している場合は `GetEngineProperty()` で取得できます。`IAnimatablePropertyAdapter.Animation` は `IKeyFrameAnimation?`、ジェネリック版は `KeyFrameAnimation<T>?` です。

次の登録は、`TextBlock.Text` の既定エディタを包みます。`TryCreateDefault` で内側のコンテキストを作り、`TryCreateControl` で呼ぶたびに新しいコントロールを作ります。内側のエディタの登録を上書きしないよう、ラッパーのコンテキストは別にしてください。visitor、UI 状態の保存・復元、破棄は内側に転送します。

```csharp
using System.Text.Json.Nodes;
using Avalonia;
using Avalonia.Controls;
using Beutl.Extensibility;
using EngineText = Beutl.Graphics.Shapes.TextBlock;

[Export]
public sealed class TextPropertyEditors : PropertyEditorExtension
{
    protected override void RegisterEditors(PropertyEditorRegistry registry)
    {
        registry.Register<string?, WrappedTextContext>(
            property =>
            {
                if (!registry.TryCreateDefault(property, out var inner))
                    throw new InvalidOperationException("No default text editor.");
                return new WrappedTextContext(this, inner);
            },
            context =>
            {
                if (!registry.TryCreateControl(context.Inner, out var control))
                    throw new InvalidOperationException("No control for the text editor.");
                return new Border { Padding = new Thickness(4), Child = control };
            },
            new PropertyEditorOptions
            {
                Match = property => property.ImplementedType == typeof(EngineText)
                    && property.GetEngineProperty()?.Name == nameof(EngineText.Text)
            });
    }
}

public sealed class WrappedTextContext(
    PropertyEditorExtension extension, IPropertyEditorContext inner) : IPropertyEditorContext
{
    public PropertyEditorExtension Extension { get; } = extension;

    public IPropertyEditorContext Inner { get; } = inner;

    public void Accept(IPropertyEditorContextVisitor visitor)
    {
        visitor.Visit(this);
        Inner.Accept(visitor);
    }

    public void ReadFromJson(JsonObject json) => Inner.ReadFromJson(json);

    public void WriteToJson(JsonObject json) => Inner.WriteToJson(json);

    public void Dispose() => Inner.Dispose();
}
```

複数のプロパティを書き換えるエディタでは、[履歴の編集セッション](pitfalls.md#one-undo-step-for-several-changes)を使ってください。複数の表示場所で同じ Avalonia コントロールを共有しないでください。

## MCP ツール {/* #mcp-tools */}

`McpToolExtension` を継承すると、Beutl のライブ MCP エンドポイントにツールを追加できます。`McpToolDefinition`、`McpToolCall`、`McpToolResult`、`McpToolContent`、`McpTextContent`、`McpImageContent` は、すべて **`Beutl.Extensibility`** にあります。以前の `Beutl.Editor.Services.Mcp` 名前空間は、拡張機能用の契約ではありません。

`Tools` は毎回同じ定義を返し、UI の状態に依存させないでください。ホストはバックグラウンドスレッドから読むことがあります。衝突を避けるため、ツール名に拡張機能固有の接頭辞を付けてください。名前は 1～128 文字で、ASCII の英数字、`_`、`-`、`.` が使えます。引数のスキーマは `type` が `object` の JSON オブジェクトである必要があります。`instanceId` はホストが予約しています。

`InvokeAsync` は UI スレッドで呼ばれます。重い処理は別のスレッドへ移し、キャンセルを確認してください。`await` の間にエディタが閉じることがあるため、完了後にはサービスを取得し直します。呼び出し側が対処できる失敗は `McpToolResult.Error(...)` で返してください。

```csharp
using Beutl.Editor.Services;
using Beutl.Extensibility;

[Export]
public sealed class PlayheadTool : McpToolExtension
{
    private const string ToolName = "example.read_playhead";

    public override IReadOnlyList<McpToolDefinition> Tools { get; } =
    [
        new(ToolName, "Read the editor playhead as a time span.")
        {
            ReadOnlyHint = true,
            OpenWorldHint = false
        }
    ];

    public override ValueTask<McpToolResult> InvokeAsync(
        McpToolCall call, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        if (call.Name != ToolName)
            return ValueTask.FromResult(McpToolResult.Error("Unknown tool."));
        if (call.EditorContext?.GetService(typeof(IEditorClock)) is not IEditorClock clock)
            return ValueTask.FromResult(McpToolResult.Error("No scene editor is available."));

        return ValueTask.FromResult(
            McpToolResult.Text(clock.CurrentTime.Value.ToTimeSpan().ToString()));
    }
}
```

## 要素のソース {/* #element-sources */}

`ElementDescription`、`ElementSource` とソースハンドラーの契約は **`Beutl.Extensibility`** にあります。要求は `IElementAdder.AddAsync`（`Beutl.Editor.Services`）に渡します。`Start` は `MediaTime`、`Length` は nullable な `MediaTime` です。`Length: null` ならハンドラーが長さを決めるか維持し、ゼロは明示的に長さゼロを要求します。

組み込みのソースは `ElementSource.File`、`ElementSource.EngineObject`、`ElementSource.ElementTemplate` です。

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;

public static class ElementRequests
{
    public static ValueTask<ElementAddResult> AddRectangleAsync(
        IElementAdder adder, CancellationToken cancellationToken)
        => adder.AddAsync(
            [new ElementDescription(
                Start: MediaTime.Zero,
                Length: MediaTime.FromSeconds(1),
                Layer: 0,
                Source: new ElementSource.EngineObject(() => new RectShape()),
                Name: "Rectangle")],
            cancellationToken);
}
```

独自のソースを追加するには、`ElementSource` を継承する record を作り、エクスポートした `ElementSourceHandlerExtension` から `ElementSourceHandlerRegistration` を返します。各 `IElementSourceHandler` は対象の型と完全に一致する `SourceType` を宣言し、次の 2 段階を実装します。

1. `PreflightAsync` は要求を検証し、`ElementSourcePreflightResult.Ready(preflight, targetLayers)` または `Rejected(failure)` を返します。対象レイヤーは最低 1 つ予約してください。返した `IElementSourcePreflight` はホストが所有し、バッチ完了後に非同期で破棄します。
2. `MaterializeAsync` はその状態を使い、`ElementSourceMaterializationResult.Materialized(new ElementMaterialization(...))` または `Rejected(failure)` を返します。結果には主となる要素、付随する要素、グループ、一時リソースのリースを含められます。作成後も必要なリソースは、一時リースではなく、返す要素のグラフに所有させてください。

登録の既定値は `ElementSourceHandlerRegistrationMode.Add` です。同じソース型の既存ハンドラーを意図的に置き換える場合にだけ `Replace` を使ってください。

## 復旧した要素の修復 {/* #element-recovery */}

独自のエディタも、通常の編集前に `Scene.IsElementLocked(element)` を確認してください。ユーザーによるロックだけでなく、復旧のために保存が保護されている要素も対象です。保護の原因となる値やオブジェクトを除去・置換する修復では、通常の公開プロパティ・キーフレーム・コレクション API で変更した後、同じシーンを監視する `HistoryManager` を渡して `ElementRecoveryService.TryCompleteRepair(element, history)`（`Beutl.Editor.Services`）を呼びます。その後、同じ履歴トランザクションを確定してください。

このメソッドは、残る障害がなく保存を再開できた場合に `true` を返します。保護されていない場合や別の障害が残る場合は `false` です。メソッド自身は履歴を確定しません。元に戻す操作では、保護と保持されていた元データも復元されます。

読み取られなかった保存データのメンバーは保持され、次回の保存でも書き戻されます。廃止したキーを意図的に捨てる場合は `Beutl.Serialization.DroppedMembersAttribute` を使い、同じ名前を別の意味で再利用しないでください。

## ソース

- [`ContextCommandAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ContextCommandAttribute.cs)
- [`IContextCommandInteraction.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IContextCommandInteraction.cs)
- [`PropertyEditorExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorExtension.cs)
- [`PropertyEditorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorRegistry.cs)
- [`PropertyEditorOptions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/PropertyEditorOptions.cs)
- [`IPropertyAdapter.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Extensibility/IPropertyAdapter.cs)
- [`McpToolExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolExtension.cs)
- [`McpToolDefinition.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolDefinition.cs)
- [`McpToolCall.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolCall.cs)
- [`McpToolResult.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/McpToolResult.cs)
- [`ElementDescription.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ElementDescription.cs)
- [`ElementSourceHandlerExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ElementSourceHandlerExtension.cs)
- [`IElementAdder.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/IElementAdder.cs)
- [`ElementRecoveryService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ElementRecoveryService.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs)
- [`DroppedMembersAttribute.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/DroppedMembersAttribute.cs)

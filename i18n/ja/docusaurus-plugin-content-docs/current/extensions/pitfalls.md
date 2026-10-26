---
title: 拡張機能開発の注意点
description: 拡張機能のビルド・パッケージ作成・テストで見落としやすい Beutl 2.x の動作と、その対処方法をまとめます。
---

API からは読み取りにくく、拡張機能の作者が実際につまずいた動作をまとめたページです。Beutl 本体で直すべきものには、対応する Issue へのリンクを付けています。対象は Beutl 2.0.0-preview.9 です。以下の API を移行してから、対応する SDK で拡張機能を再ビルドしてください。

## パッケージと読み込み

### ソースジェネレーターをパッケージの依存関係に含めない

preview.9 の SDK は `Beutl.Engine.SourceGenerators` に `PrivateAssets="all"` を付けます。preview.8 で必要だった自動参照を無効にする回避策は、更新時に削除できます。SDK がジェネレーターのバージョンを `$(BeutlPackagesVersion)` にそろえます。

`.nupkg` の中の `.nuspec` を確認し、ソースジェネレーターがインストール時の依存関係に含まれていないことを確かめてください。

### Beutl が同梱しているライブラリ

拡張機能はそれぞれ専用の `AssemblyLoadContext` に読み込まれます。ただし、同じ名前のアセンブリを Beutl が同じかより新しいバージョンで同梱している場合は、Beutl のものが使われます。そのようなライブラリ（たとえば FluentIcons）を使うときは、次の 2 点に注意してください。

- Beutl の [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/main/Directory.Packages.props) にあるバージョンと同じものを参照します。より新しいバージョンを要求すると、拡張機能のコピーが別に読み込まれ、Beutl の型と一致しなくなります。
- `ExcludeAssets="runtime;native" PrivateAssets="all"` で、実行時の資産とネイティブの資産を除外します。`ExcludeAssets="runtime"` だけでは、推移的に入る libSkiaSharp や HarfBuzz などのネイティブライブラリが、出力先の `runtimes` フォルダーにコピーされます。

```xml
<PackageReference Include="FluentIcons.Avalonia.Fluent"
                  Version="2.1.344"
                  ExcludeAssets="runtime;native"
                  PrivateAssets="all" />
```

ビルド後、出力先の `<AssemblyName>.deps.json` に載っているのが、自分のアセンブリと Beutl が同梱していないライブラリだけであることを確かめてください。SDK は `Beutl.Controls` も参照します。[プロジェクトの作成](create-csproj.md)を参照してください。

### 読み込みは全部成功するか、全部取り消されるか

- Beutl は、アセンブリの public な型から拡張機能を探します。拡張機能のクラスは `public` で、`Extension` を継承し、`[Export]` 属性と引数なしのコンストラクターを持つ必要があります。
- Beutl は public な型を厳密に読み込みます。そのうち 1 つでも読み込めないアセンブリを参照していると（除外したのに Beutl が同梱していないライブラリなど）、パッケージ全体の読み込みに失敗します。
- ある拡張機能の `Load()` が例外を投げると、同じパッケージの拡張機能はすべて取り消されます。

### サイドロード

`DebugApplication` のビルドは `~/.beutl/sideloads/<AssemblyName>` に出力されます。Beutl が読み込むのは、フォルダーと同じ名前の DLL があるフォルダー（`<名前>/<名前>.dll`）だけです。自分でファイルをコピーする場合も、この名前のそろえ方を守ってください。

### バージョン番号とアイコン

- `0.1.0` のような正式版のバージョンで Beutl のプレビュー版パッケージに依存すると、`dotnet pack` が警告 NU5104 を出します。Beutl のプレビュー版を対象にしている間は、`0.1.0-preview.1` のようなプレリリースのバージョンを使ってください。
- `PackageIcon` で設定されるのは `.nupkg` の中のアイコンです。ストアのページのアイコンは、開発者ページから別にアップロードします（[拡張機能を公開する](publish.md)を参照）。画像は角を丸めない正方形にしてください。表示するときに、ストアと Beutl が角を丸めます。

## 保存と編集

### コレクションのコンバーターは値の型に付ける

preview.9 は、コレクション型自身の `[JsonConverter]` を保存・読み込みの両方で使用します。コンバーターがなければ、引き続き要素を 1 つずつ書き出します。`ICoreSerializable` と参照の値は、Beutl 独自のシリアライズ経路を使います。

プロパティメンバーに付けた `[JsonConverter]` は、プロパティシステムでは読み取られません。値の型に付けるか、適切な Beutl のシリアライズ契約を実装してください。メンバーの属性には依存しないでください。

### 時間で変わる内容と分割

ユーザーが要素を分割すると、Beutl は要素をコピーし、前半と後半のオブジェクトの `ISplittable.NotifySplitted` を呼びます。コメントや歌詞、口パクのように、自分の時間軸で内容を再生するオブジェクトは、`SourceVideo` や `SourceSound` と同じく、後半で時刻をずらしてください。ずらさないと、後半が最初から再生し直されます。

```csharp
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;

public abstract partial class TimedDrawable : Drawable, ISplittable
{
    protected TimedDrawable()
    {
        ScanProperties<TimedDrawable>();
    }

    public IExpressionProperty<MediaTime> TimeOffset { get; } =
        Property.CreateExpression(MediaTime.Zero);

    public void NotifySplitted(bool backward, MediaTime startDelta, MediaTime durationDelta)
    {
        if (backward)
            TimeOffset.Value -= startDelta;
    }
}
```

### 保存するがパネルに出さない値

`EngineObject` の protected メソッド `HideProperties(...)` を使うと、プロパティをプロパティパネルに表示しないようにできます。保存・元に戻す・コピーの対象には残るので、独自のエディタで設定する値に使えます。

### 複数の変更を 1 回の「元に戻す」にまとめる {/* #one-undo-step-for-several-changes */}

プロパティエディタは、`IPropertyEditorContext.Accept` に渡される `IServiceProvider` の visitor から `HistoryManager` を取得できます。明示的な編集では `BeginEdit` を呼び、`edit.Enter()` の中でプロパティを変更してから `Complete()` で確定します。未完了のセッションを破棄すると、その変更は取り消されます。

同時に開ける編集セッションは 1 つだけです。独立した変更は UI スレッドから `RunAfterEditAsync` を呼び、現在のセッションが閉じるまで待機させてください。`Enter()` のスコープを `await` の前後にまたがらせないでください。

```csharp
using Beutl;
using Beutl.Editor;
using Beutl.ProjectSystem;

public static class TimingEdits
{
    public static Task SetTimingAsync(
        HistoryManager history, Element element, MediaTime start, MediaTime length)
        => history.RunAfterEditAsync(() =>
        {
            using EditSession edit = history.BeginEdit("Change timing");
            using (edit.Enter())
            {
                element.Start.Value = start;
                element.Length.Value = length;
            }
            edit.Complete();
        });
}
```

## エディタとの連携

### タイムラインに対応するライブラリ項目を登録する

preview.9 の `AddDrawable<T>()` と `AddSound<T>()` は、描画オブジェクト・音声の形式と `EngineObject` の形式を両方登録します。preview.8 で必要だった `AddMultiple` による回避策は不要です。複数形式の項目を作る場合、`BindDrawable<T>()` と `BindSound<T>()` も引き続き両方の形式を登録します。

```csharp
using Beutl.Graphics.Shapes;
using Beutl.Services;

public static class ShapeLibrary
{
    public static void Register()
        => LibraryService.Current.RegisterGroup("My Extension", group => group
            .AddDrawable<RectShape>("My Rectangle"));
}
```

テストでは、`LibraryService.Current.GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` に自分の型が含まれることを確認できます。

### 再生中の再生位置 {/* #the-playhead-during-playback */}

再生中の `IEditorClock.CurrentTime` は、描画済みのフレームを表示したときにだけ進みます。フレーム単位でしか動かず、描画が重いと音声より遅れたり止まったりします。再生に合わせて入力の時刻を計る場合は使わず、`IPreviewPlayer.IsPlaying` が true になってからの経過時間で計ってください。

`IPreviewPlayer` には再生開始メソッドがありません。シーンエディタの `editor.playPause` コマンド定義を取得し、`CanRun` を確認してから、エディタのコンテキストを渡して `RunAsync` を呼んでください。`IContextCommandHandler` は削除されています。このコマンドは再生と停止を切り替えるため、先に `IsPlaying` を確認します。再生側が参照するシーンの状態を変更する前には、`IPreviewPlayer.Pause()` の完了を待ってください。

```csharp
using System.Linq;
using Beutl.Editor.Services;
using Beutl.Extensibility;

public static class PlaybackCommands
{
    public static async Task StartAsync(IEditorContext editor, IPreviewPlayer player)
    {
        if (player.IsPlaying.Value)
            return;

        ContextCommandDefinition? command = editor.Extension.ContextCommands
            .FirstOrDefault(item => item.Id == "editor.playPause");
        var execution = new ContextCommandExecution("editor.playPause")
        {
            EditorContext = editor
        };
        if (command?.CanRun(editor, execution) == true)
            await command.RunAsync(editor, execution);
    }
}
```

`IEditorClock.CurrentTime` は読み取り専用で、値は `MediaTime` です。移動には `IEditorClock.Seek(time)` を使います。同様に、選択対象の変更には `IEditorSelection.Select(obj)`、共有されるタイムラインの選択には `SelectedElements` を使います。コマンドの登録は[エディタとの連携](editor-integration.md)を参照してください。

### ツールタブ

- `ToolTabExtension.Header` はツール選択のラベルです。`null` を返すと選択肢に出ません。開いたタブのタイトルは、インスタンスごとのリアクティブプロパティ `IToolContext.Header` で指定します。
- `OpenToolTab` は、すでに開いているコンテキストを前面に出します。再利用には `FindToolTab<T>()` を使います。
- 選択に追従せず、表示対象に固定できるタブは `IPinnableToolContext` を実装します。対象の寿命に合わせて `IsPinned` と `HasTarget` を更新してください。
- タブの切り替えをまたいで同じコントロールを再利用する場合は `ReuseContentAcrossActivation` をオーバーライドします。再利用するコントロールもビジュアルツリーから外れ、再び追加されることがあります。`IDisposable` を実装した再利用コントロールは、タブを閉じるときにコンテキストより先に破棄されます。
- `GetIcon()` は FluentAvalonia 3 の `FAIconSource` を返します。呼ばれるたびに新しいアイコンソースを返してください。

## UI

### 共通のコントロールを使う

`Beutl.Controls` は公開パッケージになり、SDK から自動参照されます。非公開のテーマリソースキーから組み直す代わりに `Beutl.Controls.ToolTabBar` を使ってください。組み込みのプロパティエディタとの連携には、`Beutl.Extensibility` の[型付き登録](editor-integration.md#property-editors)を使います。

プロパティのコントロールを調整するときは、Beutl のテーマで余白とラベルの位置を確かめてください。ヘッドレス描画はレイアウトの確認に役立ちますが、公開前には Beutl 本体でも確認してください。

## テキストと画素の描画

- `context.DrawText(text, fill, pen)` が縁取りを描くのは、`FormattedText.Pen` が設定されているときだけです。引数の pen だけでは縁取りは描かれません。
- `FormattedText.Bounds` は文字の送り幅と文字間隔を含み、`ActualBounds` は縁取りを含むインクの範囲、`RasterBounds` はラスタライズされるグリフのマスクの範囲です。いずれも行の高さではありません。行の高さは負の値の `Metrics.Ascent` と `Metrics.Descent` から求め、ベースラインを `top - Ascent` に置いてください。
- OS ごとの既定フォントを決め打ちせず、文字を表示できる登録済みのフォントを選んでください。フォントマネージャーにはフォールバックの仕組みがあります。描画に使う実際の書体で測定してください。
- `TextElements.Lines` は最初の列挙で整形結果を保存します。その後に入力を変えた場合は、新しい `TextElements` を作り、古いものを破棄してください。
- `Bgra8888` のコンストラクターの引数は `(r, g, b, a)` の順です。フィールドは B、G、R、A の順に並んでいます。
- 透明な画素のテストではアルファ値を確認してください。RGB の値だけでは透明かどうかは判断できません。

## ソース

- [`Beutl.Extensibility.Sdk.csproj`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Beutl.Extensibility.Sdk.csproj)
- [`JsonSerializationContext.Serialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Serialize.cs)
- [`JsonSerializationContext.Deserialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Deserialize.cs)
- [`ISplittable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ISplittable.cs)
- [`HistoryManager.EditSessions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/HistoryManager.EditSessions.cs)
- [`EditSession.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditSession.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`SceneEditorExtension.Commands.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/SceneEditorExtension.Commands.cs)
- [`SceneEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/SceneEditorTabExtension.cs)
- [`IPinnableToolContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IPinnableToolContext.cs)
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)

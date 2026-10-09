---
title: 拡張機能開発の注意点
description: 拡張機能のビルド・パッケージ作成・テストで見落としやすい Beutl 2.x の動作と、その対処方法をまとめます。
---

API からは読み取りにくく、拡張機能の作者が実際につまずいた動作をまとめたページです。Beutl 本体で直すべきものには、対応する Issue へのリンクを付けています。内容は Beutl 2.0.0-preview.8 で確認しています。

## パッケージと読み込み

### ソースジェネレーターがパッケージの依存関係に入る

`Beutl.Extensibility.Sdk` 2.0.0-preview.8 以前は、`DebugApplication` 以外のビルドで、`Beutl.Engine.SourceGenerators` への参照に `PrivateAssets="all"` を付けません。そのため `dotnet pack` で作ったパッケージの依存関係に、ジェネレーターが含まれます。Beutl はインストール時にこの依存を解決できず、`Unable to resolve dependency 'Beutl.Engine.SourceGenerators'` というエラーでインストールに失敗します。

自動参照を切り、自分で参照を追加してください。`$(BeutlPackagesVersion)` は SDK が参照する Beutl のパッケージのバージョンなので、ジェネレーターも常に同じバージョンになります。

```xml
<PropertyGroup>
  <BeutlAutoReferenceSourceGenerators>false</BeutlAutoReferenceSourceGenerators>
</PropertyGroup>

<ItemGroup>
  <PackageReference Include="Beutl.Engine.SourceGenerators"
                    OutputItemType="Analyzer"
                    ReferenceOutputAssembly="false"
                    Version="$(BeutlPackagesVersion)"
                    PrivateAssets="all" />
</ItemGroup>
```

`.nupkg` の中の `.nuspec` を開き、依存関係が Beutl のパッケージだけになっていることを確かめてください。SDK の修正は [b-editor/beutl#2727](https://github.com/b-editor/beutl/pull/2727)、この依存を含んだまま公開済みのパッケージへの対応は [b-editor/beutl#2730](https://github.com/b-editor/beutl/issues/2730) で扱っています。

### Beutl が同梱しているライブラリ

拡張機能はそれぞれ専用の `AssemblyLoadContext` に読み込まれます。ただし、同じ名前のアセンブリを Beutl が同じかより新しいバージョンで同梱している場合は、Beutl のものが使われます。そのようなライブラリ（たとえば FluentIcons）を使うときは、次の 2 点に注意してください。

- Beutl の [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/Directory.Packages.props) にあるバージョンと同じものを参照します。より新しいバージョンを要求すると、拡張機能のコピーが別に読み込まれ、Beutl の型と一致しなくなります。
- `ExcludeAssets="runtime;native" PrivateAssets="all"` で、実行時の資産とネイティブの資産を除外します。`ExcludeAssets="runtime"` だけでは、推移的に入る libSkiaSharp や HarfBuzz などのネイティブライブラリが、出力先の `runtimes` フォルダーにコピーされます。

```xml
<PackageReference Include="FluentIcons.Avalonia.Fluent"
                  Version="2.1.343"
                  ExcludeAssets="runtime;native"
                  PrivateAssets="all" />
```

ビルド後、出力先の `<AssemblyName>.deps.json` に載っているのが、自分のアセンブリと Beutl が同梱していないライブラリだけであることを確かめてください。これらのライブラリをもっと簡単に参照する方法は [b-editor/beutl#2733](https://github.com/b-editor/beutl/issues/2733) で扱っています。

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

### `IEnumerable` を実装した値では `[JsonConverter]` が使われない

Beutl のシリアライザーは、値を `System.Text.Json` に渡す前に `IEnumerable` かどうかを調べます。保存では、値が `IEnumerable` を実装していると要素を 1 つずつ書き出し、型に付けた `[JsonConverter]` は使いません。読み込みでは、`IEnumerable<T>` を実装した型に JSON の配列を読み込むとき、要素を 1 つずつ読み、その型の新しいインスタンスに入れます。うまくいくのは配列と、引数なしのコンストラクターを持つ `IList` の型だけです。それ以外の型は `null` として読み込まれるか、読み込みが例外で失敗します。

プロパティに保存する値の型には `IEnumerable` を実装せず、`Items` のようなプロパティで要素を公開してください。[b-editor/beutl#2728](https://github.com/b-editor/beutl/issues/2728) で扱っています。

```csharp
[JsonConverter(typeof(CommentListConverter))]
public sealed class CommentList // IEnumerable<Comment> は実装しない
{
    public IReadOnlyList<Comment> Items { get; }
}
```

### 時間で変わる内容と分割

ユーザーが要素を分割すると、Beutl は要素をコピーし、前半と後半のオブジェクトの `ISplittable.NotifySplitted` を呼びます。コメントや歌詞、口パクのように、自分の時間軸で内容を再生するオブジェクトは、`SourceVideo` や `SourceSound` と同じく、後半で時刻をずらしてください。ずらさないと、後半が最初から再生し直されます。

```csharp
public sealed partial class MyDrawable : Drawable, ISplittable
{
    // 内容の時刻は、要素の先頭からの時間からこの値を引いたもの。
    public IProperty<TimeSpan> TimeOffset { get; } = Property.Create(TimeSpan.Zero);

    public void NotifySplitted(bool backward, TimeSpan startDelta, TimeSpan durationDelta)
    {
        // 後半は startDelta だけ遅く始まるので、内容をその分だけ戻す。
        if (backward)
            TimeOffset.CurrentValue -= startDelta;
    }
}
```

### 保存するがパネルに出さない値

`EngineObject` の protected メソッド `HideProperties(...)` を使うと、プロパティをプロパティパネルに表示しないようにできます。保存・元に戻す・コピーの対象には残るので、独自のエディタで設定する値に使えます。

### 複数の変更を 1 回の「元に戻す」にまとめる

プロパティエディタは、`IPropertyEditorContext.Accept` に渡される visitor から `HistoryManager` を受け取れます。プロパティを変更してから `Commit` を 1 回呼ぶと、ユーザーは 1 回の操作でまとめて元に戻せます。

```csharp
public void Accept(IPropertyEditorContextVisitor visitor)
{
    visitor.Visit(this);
    if (visitor is IServiceProvider services)
        _history = services.GetService(typeof(HistoryManager)) as HistoryManager;
}

private void Assign(MyDrawable drawable, string path)
{
    drawable.MouthOpen.CurrentValue = path;
    drawable.MouthClosed.CurrentValue = "";
    _history?.Commit("口のレイヤーを割り当て");
}
```

## エディタとの連携

### タイムラインに追加できないライブラリ項目

`GroupLibraryItem.AddDrawable<T>()` と `AddSound<T>()` が登録するのは `Drawable` か `Sound` の形式だけです。一方、タイムラインが受け付けるのは `EngineObject` の形式を持つ項目です。そのため、これらの項目はライブラリと検索には表示されますが、タイムラインにドラッグしても何も起きません。両方の形式を登録する `AddMultiple` と `BindDrawable<T>()`・`BindSound<T>()` で登録してください。[b-editor/beutl#2729](https://github.com/b-editor/beutl/issues/2729) で扱っています。

```csharp
LibraryService.Current.RegisterGroup("My Extension", group => group
    .AddMultiple("My Shape", item => item.BindDrawable<MyShape>()));
```

テストでは、`LibraryService.Current.GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` に自分の型が含まれることで確認できます。

### 再生中の再生位置

再生中の `IEditorClock.CurrentTime` は、描画済みのフレームを表示したときにだけ進みます。フレーム単位でしか動かず、描画が重いと音声より遅れたり止まったりします。再生に合わせて入力の時刻を計る場合は使わず、`IPreviewPlayer.IsPlaying` が true になってからの経過時間で計ってください。

再生を開始する公開メソッドはありません。エディタの `PlayPause` コマンドを実行してください（エディタのコンテキストが `IContextCommandHandler` を実装しています）。コマンドは再生と停止を切り替えるので、先に `IsPlaying` を確かめます。停止は `IPreviewPlayer.Pause()` で行います。拡張機能向けの再生 API は [b-editor/beutl#2731](https://github.com/b-editor/beutl/issues/2731) で扱っています。

```csharp
if (editorContext is IContextCommandHandler commands && !player.IsPlaying.Value)
    await commands.ExecuteAsync(new ContextCommandExecution("PlayPause"));
```

### ツールタブ

- `Header` が `null` を返す `ToolTabExtension` は、タブを追加するメニューに表示されません。自分の UI から `IEditorContext.OpenToolTab` で開いてください。
- `OpenToolTab` は、同じタブがすでに開いていれば、新しく開かずにそのタブを前面に出します。開いているタブを使い回すには `FindToolTab<T>()` を使います。

## UI

### `Beutl.Controls` は使えない

`Beutl.Controls` はパッケージとして公開されていないため、`ToolTabBar` などのコントロールを参照できません。Beutl と同じ見た目にするには、実行時に Beutl が提供するテーマのリソースから作り直してください。リソースは `GetResourceObservable` でバインドすると、別のテーマを使うテストなど、リソースがない環境でも動きます。

```csharp
var bar = new Border
{
    MinHeight = 38,
    Padding = new Thickness(4, 2),
    BorderThickness = new Thickness(0, 0, 0, 1),
};
bar.Bind(Border.BorderBrushProperty, bar.GetResourceObservable("DividerStrokeColorDefaultBrush"));

var add = new Button { Content = new FluentIcon { Icon = Icon.Add, FontSize = 16 } };
add.Bind(StyledElement.ThemeProperty, add.GetResourceObservable("ToolTabBarIconButtonTheme"));
```

ツールタブでよく使うのは、`ToolTabBarIconButtonTheme`、`LiteComboBoxStyle`、`DividerStrokeColorDefaultBrush`、`TextFillColorSecondaryBrush` と、`options-group` スタイルクラスです。どれも公開 API ではなく、変わる可能性があります。[b-editor/beutl#2732](https://github.com/b-editor/beutl/issues/2732) で扱っています。

### プロパティエディタの余白

プロパティエディタには左右に 4 px の余白があり、さらにヘッダーと値の周りに 4 px の余白があります。ヘッダーを上に置き、値を横幅いっぱいに表示するエディタも、同じ余白にすると他の行とそろいます。Beutl の `GradientStopsEditor` がこの形です。

### `CheckBox` と `RadioButton` の `Padding`

`CheckBox` や `RadioButton` の `Padding` を変える場合は、`VerticalContentAlignment` も `Center` にしてください。FluentAvalonia のラジオボタンは、ラベルを上に寄せ、上に 6 px の余白を取って記号の位置に合わせています。この余白を消すと、ラベルが記号より上にずれます。

### ヘッドレスでのスクリーンショット

Avalonia.Headless と Beutl のテーマで UI を描画するのは便利ですが、結果がアプリと同じになるとは限りません。たとえば、ラジオボタンのラベルのずれはヘッドレスでは再現しませんでした。公開する前に、Beutl 本体でレイアウトを確かめてください。

## テキストと画素の描画

- `context.DrawText(text, fill, pen)` が縁取りを描くのは、`FormattedText.Pen` が設定されているときだけです。引数の pen だけでは縁取りは描かれません。
- `FormattedText.Bounds` は文字のインクの範囲で、行の高さではありません。行の高さは負の値の `Metrics.Ascent` と `Metrics.Descent` から求め、ベースラインを `top - Ascent` に置いてください。
- macOS の既定のフォントファミリーは Helvetica で、日本語の幅をかなり狭く測ります。`FontManager.Instance.IsRegistered` で確かめたうえで "Noto Sans JP" を使うなど、文字に合うフォントを選んでください。
- `Bgra8888` のコンストラクターの引数は `(r, g, b, a)` の順です。フィールドは B、G、R、A の順に並んでいます。
- SkiaSharp の `SKColors.Transparent` は透明な白（`0x00FFFFFF`）です。何も描かれていない画素は `SKColors.Empty` なので、何も描かれていないことを確かめるときはアルファ値を調べてください。

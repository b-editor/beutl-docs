---
title: 拡張機能開発の注意点
description: 拡張機能のビルド・パッケージ作成・テストで見落としやすい Beutl 2.x の動作と、その対処方法をまとめます。
---

API からは読み取りにくく、拡張機能の作者が実際につまずいた動作をまとめたページです。Beutl 本体で直すべきものには、対応する Issue へのリンクを付けています。対象は Beutl 2.0.0-preview.11 です。以下の API を移行してから、対応する SDK で拡張機能を再ビルドしてください。

## preview.10 からの移行 {/* #migrating-from-preview-10 */}

preview.10 の拡張機能を移行するときは、次の変更を確認してください。削除した API に互換用の API はありません。

- **テスト用のプロジェクト**: preview.11 で保存したプロジェクトは、preview.10 以前では開けません。[バージョンの対応表](version-mapping.md)を参照してください。
- **`FAColorPicker`、`ColorPickerButton`、`ColorPickerFlyout`**: `FluentAvalonia.UI.Controls` にあった FluentAvalonia のカラーピッカーの複製とともに、`Beutl.Controls` から削除されました。ほかに `ColorButtonColorChangedEventArgs`、`ColorChangedEventArgs`、`ColorComponent`、`ColorPickerComponent`、`ColorRamp`、`ColorSpectrum`、`ColorSpectrumComponents`、`ColorSpectrumShape`、`ColorTextType` と、テーマの `ColorPickerStyles.axaml`、`ColorPickerButtonStyles.axaml` も削除されています。`SimpleColorPicker` を使い、オブジェクトのプロパティではない色には `SimpleColorPickerButton` を使ってください。[共通のコントロール](#use-the-shared-controls)を参照してください。
- **`ColorPaletteItem`**: `FluentAvalonia.UI.Controls` から `Beutl.Controls.PropertyEditors` に移動しました。周りの `FAColorPicker` の色を設定する代わりに、`Click` を発生させます。`Beutl.Controls.Behaviors.ColorPaletteItemBehavior` とリソースの `ColorPaletteItemTemplate` は削除されました。
- **`SimpleColorPicker.SetColor`**: ピッカーの `Color` も設定するようになりました。以前はイベントを発生させるだけでした。
- **`ColorGradingWheel`**: `InputType`、`InputTypeProperty`、`ShowDetails`、`ShowDetailsProperty` は削除されました。テンプレートのパーツが `PART_GradingColorPicker` から `PART_Layout`、`PART_Header`、`PART_Pad`、`PART_MasterWheel`、`PART_Components`、`PART_ResetButton` に変わったため、独自のテーマはこれらを用意する必要があります。プロパティの既定値がゼロでない場合は、新しい `Neutral` にその既定値を設定してください。`MaxChroma`、`MasterRange`、`IsSideBySide` も追加されています。
- **テーマとアプリのリソース**: `BeutlDarkBorder.axaml` と `BeutlDarkColors.axaml` は、FluentAvalonia のピッカーだけが読んでいたキーを定義しなくなりました。対象は `ColorPickerBackground`、`ColorPickerComponentLabelBackground`、`ColorPickerTabsBackground`、`ColorPickerTabItemForeground`、`ColorPickerTabItemForegroundPointerOver`、`ColorPickerTabItemForegroundSelected`、`ColorPickerTabItemSelectionIndicatorColor`、`ColorPickerTabItemSelectionIndicatorPointerOver`、`ColorPickerColorTypeButtonBackground`、`ColorPickerMoreButtonForeground`、`ColorPickerMoreButtonForegroundPressed`、`ColorPickerColorPaletteItemBorderBrushPointerOver` です。アプリのリソース `PaletteColors` と、カラーグレーディングタブの `MinimalNumberEditor`、`PropertiesVisibilityToggleButtonStyle` も削除されました。
- **`UIToneMappingOperator`**: `None` は `0` から `5` に変わり、`0` は新しい `Auto` になりました。`default(UIToneMappingOperator)` も `Auto` です。古い値でコンパイルした拡張機能は再ビルドし、`default` を None の意味で使っていたコードでは `None` を明示してください。`EditorConfig.ToneMappingMode` の既定値は `Auto` で、保存された `0` は `Auto` として読み込まれます。プレビューが適用する演算子は `UIToneMappingOperatorExtensions.Resolve(mode, showsHdr)` で求められます。
- **`DynamicsNode.MapChannels`**: 削除されました。`DynamicsNode` の派生クラスは、各チャンネルを `AudioBuffer.GetChannelData(channel)` で読み取ります。
- **`MessageStrings`、`Strings`、`TutorialStrings`**: `MessageStrings.ConfirmInstall`、`UpdateCompletedLaunchConfirm`、`UpdateCompletedLaunchPrompt`、`ApplicationNotLaunched`、`ApplicationPathNotSpecified`、`Strings.CreateNewProjectOrScene`、`OpenAFileYouHaveAlreadyCreated`、`StartEditing`、`All`、`Projects`、`Files`、`Recently`、`NoFilesUsedRecently`、`Previous`、`TutorialStrings.StartTutorial` は削除されました。独自の文字列を用意してください。
- **再生の開始**: `editor.playPause` を実行する代わりに `IPreviewPlayer.Play()` を呼び、入力の時刻は `GetPlaybackTime()` で計ってください。[再生中の再生位置](#the-playhead-during-playback)を参照してください。
- **複数のファイルを書き出すエンコーダー**: Beutl の一時フォルダーからファイルを自分で移動する代わりに、`EncodingController.OutputFiles` で列挙してください。[複数のファイルを書き出す](media-providers.md#writing-several-files)を参照してください。
- **Beutl が同梱しているライブラリの参照**: `ExcludeAssets` と `PrivateAssets` を指定した `PackageReference` や、Beutl のバージョンに固定した `PackageReference` は、`BeutlHostPackageReference` に置き換えてください。[Beutl が同梱しているライブラリ](#libraries-that-beutl-already-ships)を参照してください。
- **`IElementAdder` や `IElementObjectService` で追加する描画オブジェクト**: トランスフォームのグループが空の新しい描画オブジェクトには、`TranslateTransform`、`RotationTransform`、`ScaleTransform` が追加されます。そのあとで独自に `TranslateTransform` を追加すると、2 つになります。[要素のソース](editor-integration.md#element-sources)を参照してください。
- **プロパティ以外に保存する状態**: 明示的な保存では、前回の保存以降にプロパティが変更された要素だけを書き出します。[保存する状態はプロパティに持たせる](#keep-saved-state-in-properties)を参照してください。
- **macOS のコンテキストメニュー**: `ContextMenu` とコンテキストフライアウトは、既定でネイティブのメニューとして開きます。[macOS のコンテキストメニュー](#context-menus-on-macos)を参照してください。
- **独自の `ISceneSettingsService`**: `masterVolume` を受け取る新しい `Apply` のオーバーロードには既定の実装があり、`Scene.MasterVolume` を書き込んでから、`masterVolume` のないオーバーロードを呼びます。マスター音量だけを変更したときもコミットされるように、オーバーライドしてください。
- **独自の `INodeGraphMutationService`**: 新しい `CanConnect(GraphModel, GraphNode, INodePort?, GraphNode, INodePort?)` には既定の実装があり、ポートが `null` のときは `false` を返します。動的ポートのノードにポートを追加するサービスでは、オーバーライドしてください。

## preview.9 からの移行 {/* #migrating-from-preview-9 */}

preview.9 の拡張機能を移行するときは、次の変更を確認してください。削除または移動した API に互換用の API はありません。

- **`Drawable` と `FilterEffect` のオーバーライド**: 入れ子の `Resource` に移します。[描画オブジェクト](implement-drawing-object.md#migrating-from-preview-9)と[エフェクト](implement-effect.md#migrating-from-preview-9)を参照してください。
- **`CustomEffect` のコールバック**: レンダラーが実行するコールバックから別のレンダラーを起動できなくなりました。`RenderDependency` を使います。[エフェクト](implement-effect.md#processing-the-render-target)を参照してください。
- **`MediaReader` を読むコード**: `ReadAudio` は常にステレオではなく `AudioStreamInfo.ChannelLayout` のチャンネルを返すので、任意のチャンネル数に対応します。[デコーダー](media-providers.md#decoders)を参照してください。
- **`ISampleProvider` の実装とエンコーダー**: ステレオ以外を返すプロバイダーは `ChannelLayout` を宣言し、エンコーダーはそこからチャンネル数を取得します。[プロバイダーの契約](media-providers.md#provider-contracts)を参照してください。
- **`AudioEffect` と `AudioNode` の実装**: 5.1 や 7.1 のプロジェクトでは、プロジェクトのチャンネル数を受け取ります。[チャンネル構成](audio-effects.md#channel-layouts)を参照してください。
- **`StrokeEffect.Style`、`StrokeEffect.StrokeStyles`**: 削除されました。`Style` に `Foreground` を設定していた場合は、ペンの `StrokeOrder` に `StrokeOrder.BelowFill` を設定します。`Background` は既定の `AboveFill` にあたります。
- **`SourceVideo`、`SourceSound`、`SceneSound`、`SceneDrawable` の `NotifySplitted`**: これらの型は公開メソッドとして宣言しなくなりました。`ISplittable` または `Element.NotifySplitted` を通して呼びます。
- **`FontFamilyPickerFlyout`、`FontFamilyPickerFlyoutViewModel`**: `SearchablePickerFlyout` に名前が変わり、`ISearchablePickerViewModel` を受け取ります。ビューモデルは internal になりました。[共通のコントロール](#use-the-shared-controls)を参照してください。
- **独自の `IElementAttributeService`**: `SetTrackMatte(Element, MatteSourceKind, int?, MatteMode)` と `SetVisibleInOutput(Element, bool)` を実装します。
- **独自の `INodeGraphMutationService`**: `CanConnect(GraphModel, INodePort, INodePort)` と `RewireListSlot(GraphModel, Connection, GraphNode, INodePort?)` を実装します。
- **独自の `ISceneSettingsService`**: `Apply(Scene, PixelSize, MediaTime, MediaTime, SpeakerLayout)` を実装します。
- **`ExtensionsStrings`、`Strings`、`GraphicsStrings`**: `ExtensionsStrings.NoLogoImageAvailable`、`Free`、`Description`、`Package_Screenshots`、`Strings.Link`、`GraphicsStrings.StrokeEffect_Style` は削除されました。独自の文字列を用意してください。
- **`WeakEvents`、`WeakEvent`、`WeakEvent<TSender, TEventArgs>`、`IWeakEventSubscriber<TEventArgs>`**: `Beutl.Utilities` から削除されました。イベントを直接購読し、不要になったら解除してください。
- **テスト用のプロジェクト**: preview.10 で保存したプロジェクトは、preview.9 以前では開けません。[バージョンの対応表](version-mapping.md)を参照してください。

## パッケージと読み込み

### ソースジェネレーターをパッケージの依存関係に含めない

preview.9 以降の SDK は `Beutl.Engine.SourceGenerators` に `PrivateAssets="all"` を付けます。preview.8 で必要だった自動参照を無効にする回避策は、更新時に削除できます。SDK がジェネレーターのバージョンを `$(BeutlPackagesVersion)` にそろえます。

`.nupkg` の中の `.nuspec` を確認し、ソースジェネレーターがインストール時の依存関係に含まれていないことを確かめてください。

### Beutl が同梱しているライブラリ {/* #libraries-that-beutl-already-ships */}

拡張機能はそれぞれ専用の `AssemblyLoadContext` に読み込まれます。ただし、同じ名前のアセンブリを Beutl が同じかより新しいバージョンで同梱している場合は、Beutl のものが使われます。拡張機能がより新しいバージョンを要求すると、拡張機能のコピーが別に読み込まれ、Beutl の型と一致しなくなります。また、`ExcludeAssets="runtime;native"` を指定しないと、推移的に入る libSkiaSharp や HarfBuzz などのネイティブライブラリも、出力先の `runtimes` フォルダーにコピーされます。

preview.11 以降は、このようなライブラリ（たとえば FluentIcons）を、バージョンを指定せずに `BeutlHostPackageReference` で参照してください。

```xml
<ItemGroup>
  <BeutlHostPackageReference Include="FluentIcons.Avalonia.Fluent" />
</ItemGroup>
```

SDK はこれを、Beutl が同梱しているバージョンの `PackageReference` に変換し、`ExcludeAssets="runtime;native"` と `PrivateAssets="all"` を付けます。拡張機能はそのライブラリに対してコンパイルされ、実行時には Beutl のコピーを使います。ライブラリのファイルが出力先やパッケージに入ることはありません。指定できる名前は、Beutl の [`Directory.Packages.props`](https://github.com/b-editor/beutl/blob/main/Directory.Packages.props) にあるパッケージのうち、ビルド・テスト・パッケージ作成用のツールと、FFmpeg のワーカーか Windows x64 の Media Foundation 拡張機能だけが読み込むライブラリを除いたものです。Beutl が同梱していない名前を指定すると、復元がエラーで止まります。拡張機能独自のライブラリは、通常の `PackageReference` で参照してください。

ビルド後、出力先の `<AssemblyName>.deps.json` に載っているのが、自分のアセンブリと Beutl が同梱していないライブラリだけであることを確かめてください。SDK は `Beutl.Controls` も参照します。[プロジェクトの作成](create-csproj.md)を参照してください。

### 既定のコンテキストを通して読み込むライブラリ

preview.11 以降は、ライブラリが `AssemblyLoadContext.Default` に要求したアセンブリが拡張機能のパッケージにしかない場合、Beutl はそれを拡張機能のパッケージから見つけます。既定のコンテキストは独自のコピーを読み込み、そのコピーは Beutl の終了まで読み込まれたままになります。拡張機能のコンテキストは、そのコピーが十分に新しければそれを使うため、型が 2 種類になることはありません。ただし、拡張機能のコンテキストに読み込まれたライブラリが、自身を参照するアセンブリを既定のコンテキストを通して読み込むことは、まだできません（[#3921](https://github.com/b-editor/beutl/issues/3921)）。

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

preview.9 以降は、コレクション型自身の `[JsonConverter]` を保存・読み込みの両方で使用します。コンバーターがなければ、引き続き要素を 1 つずつ書き出します。`ICoreSerializable` と参照の値は、Beutl 独自のシリアライズ経路を使います。

プロパティメンバーに付けた `[JsonConverter]` は、プロパティシステムでは読み取られません。値の型に付けるか、適切な Beutl のシリアライズ契約を実装してください。メンバーの属性には依存しないでください。

### 時間で変わる内容と分割

ユーザーが要素を分割すると、Beutl は要素をコピーし、前半と後半のオブジェクトの `ISplittable.NotifySplitted` を呼びます。コメントや歌詞、口パクのように、自分の時間軸で内容を再生するオブジェクトは、後半を前半の続きから再生する必要があります。そうしないと、後半が最初から再生し直されます。

`SourceVideo`、`SourceSound`、`SceneSound`、`SceneDrawable` が共有する契約 `ITimeMappedSource` を実装してください。必須なのは `OffsetPosition` と `Speed` だけです。既定の `NotifySplitted` が後半の `OffsetPosition` を時間軸の先へ進め、分割、トリム、スリップはこの契約を通じて `OffsetPosition` を書き換えます。`Sound` の派生クラスは両方のプロパティを持っているので、インターフェイスを追加するだけで済みます。

```csharp
using Beutl;
using Beutl.Engine;
using Beutl.Graphics;

public abstract partial class TimedDrawable : Drawable, ITimeMappedSource
{
    protected TimedDrawable()
    {
        ScanProperties<TimedDrawable>();
    }

    public IExpressionProperty<MediaTime> OffsetPosition { get; } =
        Property.CreateExpression(MediaTime.Zero);

    // Null plays the timeline at 100%.
    IExpressionProperty<float>? ITimeMappedSource.Speed => null;
}
```

クリップのローカル時刻 `t` で、ソースは時間軸の `OffsetPosition` に `[0, t]` の `Speed` の積分を加えた位置を再生します。この位置をもとに描画してください。`GetSourceDuration()` は時間軸の長さを返し、編集はその範囲に収まります。`HasDynamicMapping` の既定は `OffsetPosition.HasExpression` です。式が時間軸そのものを選ぶ場合は `HasDynamicTimeline` をオーバーライドしてください。`ISplittable` を直接実装するのは、このような時間軸を持たないオブジェクトだけにしてください。

### 保存するがパネルに出さない値

`EngineObject` の protected メソッド `HideProperties(...)` を使うと、プロパティをプロパティパネルに表示しないようにできます。保存・元に戻す・コピーの対象には残るので、独自のエディタで設定する値に使えます。

### 保存する状態はプロパティに持たせる {/* #keep-saved-state-in-properties */}

preview.11 以降、明示的な保存では、前回の保存以降にプロパティ（キーフレームとリストを含みます）が変更された要素だけを書き出します。シーンを開いてから最初の保存と、ファイルを移動する保存やメディアを修復する保存では、引き続きすべての要素を書き出します。オブジェクトが保存する値はプロパティに持たせてください。フィールドだけに保持し、独自の `Serialize` で書き出す値は、同じ要素のほかの部分が変更されるまでファイルに反映されません。独自のエディタで設定するプロパティは、`HideProperties(...)` でパネルに表示しないようにできます。

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

preview.9 以降の `AddDrawable<T>()` と `AddSound<T>()` は、描画オブジェクト・音声の形式と `EngineObject` の形式を両方登録します。preview.8 で必要だった `AddMultiple` による回避策は不要です。複数形式の項目を作る場合、`BindDrawable<T>()` と `BindSound<T>()` も引き続き両方の形式を登録します。

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

再生中の `IEditorClock.CurrentTime` は、描画済みのフレームを表示したときにだけ進みます。フレーム単位でしか動かず、描画が重いと音声より遅れたり止まったりします。再生に合わせて入力の時刻を計る場合は、代わりに `IPreviewPlayer.GetPlaybackTime()` を読んでください。ユーザーが聞いている音声に従い、音声を再生していない間は実時間に従います。再生が止まっている間は `null` を返します。再生を開始している途中と、音声を再生しない早送りや逆再生の間は、再生位置を返します。

`IPreviewPlayer.Play()` は、再生位置から通常の速度で再生を開始します。再生中に呼んでも何もしません。再生側が参照するシーンの状態を変更する前には、`IPreviewPlayer.Pause()` の完了を待ってください。シーンエディタは、プレーヤーを `IEditorContext` のサービスとして提供します。`Play()` と `GetPlaybackTime()` には既定の実装があるため、ほかの `IPreviewPlayer` の実装もそのままコンパイルできます。その実装がオーバーライドするまで、`Play()` は何もせず、`GetPlaybackTime()` は `null` を返します。

```csharp
using Beutl;
using Beutl.Editor.Services;
using Beutl.Extensibility;

public sealed class TapRecorder(IPreviewPlayer player)
{
    private readonly List<MediaTime> _taps = [];

    public IReadOnlyList<MediaTime> Taps => _taps;

    public static TapRecorder? Create(IEditorContext editor)
        => editor.GetService(typeof(IPreviewPlayer)) is IPreviewPlayer player
            ? new TapRecorder(player)
            : null;

    public void Start()
    {
        _taps.Clear();
        player.Play();
    }

    // Call this from the key or pointer handler of each tap.
    public void Tap()
    {
        if (player.GetPlaybackTime() is { } time)
            _taps.Add(time);
    }

    public Task StopAsync() => player.Pause();
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

### 共通のコントロールを使う {/* #use-the-shared-controls */}

`Beutl.Controls` は公開パッケージになり、SDK から自動参照されます。非公開のテーマリソースキーから組み直す代わりに `Beutl.Controls.ToolTabBar` を使ってください。組み込みのプロパティエディタとの連携には、`Beutl.Extensibility` の[型付き登録](editor-integration.md#property-editors)を使います。

フォントやコーデックのピッカーのように検索とピン留めができる一覧には、`SearchablePickerViewModel<TSearchKey>` を継承して `Search` を実装し、`SearchablePickerFlyout` で開きます。外観と文言は `PresenterThemeKey` と `NoResultsText` で設定します。

`Beutl.Controls.EmptyState` は、ビューに表示するものがまだないことを伝えます。`Icon`、`Title`、`Description` を設定し、ボタンなどの操作をコンテンツに置きます。設定していない部分は場所を取りません。`Beutl.Controls.StatusLabel` は、一覧や行の項目の状態を示します。`Text` に表示する文字列を指定し、`Kind`（`Neutral`、`Accent`、`Success`、`Caution`、`Critical`）で色を選びます。どちらも `AutomationProperties.LiveSetting` を、読み上げるテキストに引き継ぎます。

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            xmlns:controls="using:Beutl.Controls"
            xmlns:icons="using:FluentIcons.Avalonia.Fluent"
            Spacing="8">
    <controls:EmptyState Title="No markers"
                         Description="Markers you add to the timeline appear here.">
        <controls:EmptyState.Icon>
            <icons:SymbolIcon Symbol="Bookmark" />
        </controls:EmptyState.Icon>
        <Button Content="Add a marker" />
    </controls:EmptyState>
    <controls:StatusLabel Kind="Success" Text="Ready" />
</StackPanel>
```

設定の色のように、オブジェクトのプロパティではない色には `Beutl.Controls.PropertyEditors.SimpleColorPickerButton` を使ってください。パレット付きの `SimpleColorPicker` を開き、ユーザーが確定すると色を適用してから `ColorConfirmed` を発生させます。`IsAlphaEnabled` を `false` にすると、色は不透明に保たれ、不透明度は表示されません。

プロパティのコントロールを調整するときは、Beutl のテーマで余白とラベルの位置を確かめてください。ヘッドレス描画はレイアウトの確認に役立ちますが、公開前には Beutl 本体でも確認してください。

### macOS のコンテキストメニュー {/* #context-menus-on-macos */}

preview.11 以降の macOS では、**「設定」→「表示」→「ネイティブのコンテキストメニューを使用」** がオンの間（既定ではオンです）、`ContextMenu` と、`MenuFlyout`、`FAMenuFlyout`、`FACommandBarFlyout` を使った `ContextFlyout` が、ネイティブのメニューとして開きます。Avalonia のメニューも見えない状態で開くため、バインディング、`Opening` のハンドラー、`IsOpen` はそのまま機能します。`MenuItem` はテキスト、チェックマーク、入力ジェスチャーを表示しますが、`Icon` は表示しません。FluentAvalonia の項目は `IconSource` も表示します。それ以外のもの（ヘッダーがテキストでない `MenuItem` など）を含むメニューは Avalonia のメニューのまま開き、`Button.Flyout` や `ShowAt` で開いたフライアウトも同様です。macOS では、設定のオンとオフの両方でメニューを確認してください。

## テキストと画素の描画

- `context.DrawText(text, fill, pen)` が縁取りを描くのは、`FormattedText.Pen` が設定されているときだけです。引数の pen だけでは縁取りは描かれません。
- `FormattedText.Bounds` は文字の送り幅と文字間隔を含み、`ActualBounds` は縁取りを含むインクの範囲、`RasterBounds` はラスタライズされるグリフのマスクの範囲です。いずれも行の高さではありません。行の高さは負の値の `Metrics.Ascent` と `Metrics.Descent` から求め、ベースラインを `top - Ascent` に置いてください。
- OS ごとの既定フォントを決め打ちせず、文字を表示できる登録済みのフォントを選んでください。フォントマネージャーにはフォールバックの仕組みがあります。描画に使う実際の書体で測定してください。
- `TextElements.Lines` は最初の列挙で整形結果を保存します。その後に入力を変えた場合は、新しい `TextElements` を作り、古いものを破棄してください。
- `Bgra8888` のコンストラクターの引数は `(r, g, b, a)` の順です。フィールドは B、G、R、A の順に並んでいます。
- 透明な画素のテストではアルファ値を確認してください。RGB の値だけでは透明かどうかは判断できません。

## ソース

- [`Beutl.Extensibility.Sdk.csproj`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Beutl.Extensibility.Sdk.csproj)
- [`Sdk.targets`](https://github.com/b-editor/beutl/blob/main/sdk/Beutl.Extensibility.Sdk/Sdk/Sdk.targets) and [`host-libraries.md`](https://github.com/b-editor/beutl/blob/main/docs/extension-authoring/host-libraries.md)
- [`PluginLoadContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Api/Services/PluginLoadContext.cs)
- [`JsonSerializationContext.Serialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Serialize.cs)
- [`JsonSerializationContext.Deserialize.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Serialization/JsonSerializationContext.Deserialize.cs)
- [`ISplittable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ISplittable.cs)
- [`ITimeMappedSource.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/ITimeMappedSource.cs)
- [`HistoryManager.EditSessions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/HistoryManager.EditSessions.cs)
- [`EditSession.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditSession.cs)
- [`EditedElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/EditedElements.cs)
- [`LibraryServiceExtensions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/Services/LibraryServiceExtensions.cs)
- [`IPreviewPlayer.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/IPreviewPlayer.cs)
- [`SceneEditorExtension.Commands.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/SceneEditorExtension.Commands.cs)
- [`SceneEditorTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/SceneEditorTabExtension.cs)
- [`IPinnableToolContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IPinnableToolContext.cs)
- [`SearchablePickerFlyout.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SearchablePickerFlyout.cs)
- [`SearchablePickerViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SearchablePickerViewModel.cs)
- [`EmptyState.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/EmptyState.cs), [`StatusLabel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/StatusLabel.cs) and [`SimpleColorPickerButton.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/SimpleColorPickerButton.cs)
- [`NativeContextMenus.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/NativeContextMenus.cs) and [`ContextMenuEntry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/ContextMenuEntry.cs)
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)

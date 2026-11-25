---
title: 拡張機能開発の注意点
description: 拡張機能のビルド・パッケージ作成・テストで見落としやすい Beutl 2.x の動作と、その対処方法をまとめます。
---

API からは読み取りにくく、拡張機能の作者が実際につまずいた動作をまとめたページです。Beutl 本体で直すべきものには、対応する Issue へのリンクを付けています。対象は Beutl 2.0.0-preview.16 です。以下の API を移行してから、対応する SDK で拡張機能を再ビルドしてください。

## preview.15 からの移行 {/* #migrating-from-preview-15 */}

preview.15 の拡張機能を移行するときは、次の変更を確認してください。ほとんどの拡張機能は、テスト用のプロジェクトを Avalonia 12.2.0 に移し、preview.16 の SDK で再ビルドするだけで済みます。シーンのレンダラー、コンポジター、オブジェクトテンプレートのサービスを自分で作成する拡張機能、プロキシのストアやジョブキューを実装する拡張機能、`SpeedIntegrator` を使う拡張機能は変更が必要です。削除した API に互換用の API はありません。

- **テスト用のプロジェクト**: ターゲットフレームワークは `net11.0` のままです。Avalonia は 12.2.0 になるため、`Avalonia.Headless` などの Avalonia のパッケージを Beutl のバージョンに固定しているテスト用のプロジェクトは 12.2.0 に移します。`BeutlHostPackageReference` は自動で追従します。ファイル形式の下限は preview.15 に上がります。preview.16 で保存したプロジェクトは preview.15 以降で開け、preview.11 から preview.14 では開けません。[バージョンの対応表](version-mapping.md)を参照してください。
- **`SceneRenderer`、`SceneComposer`、`SceneCompositor`、`ObjectTemplateService`**: これらのコンストラクターと `ObjectTemplatePreviewRenderer.RenderPngAsync` は、個別の `FontManager?`、`EditorConfig?`、`ProxyStoreConfig?`、`DecoderRegistry?` の引数の代わりに `SceneRenderServices` を受け取ります。`SceneComposer` の 2 つのコンストラクターは、`SceneComposer(scene, services, disableResourceShare, forceOriginalSource)` の 1 つになりました。`SceneCompositor.Fonts` と `Decoders` は、新しい `Services` から読んだフォントとレジストリを引き続き返します。[シーンを描画する](media-providers.md#rendering-a-scene)を参照してください。
- **プロキシ**: `IProxyStore` の `TryGet`、`TryTransition`、`Delete`、`Touch` と `IProxyJobQueue` の `EnqueueAsync` は、最後の引数に省略可能な `VideoDeinterlaceOptions deinterlace` を受け取ります。これらを呼ぶコードは再ビルドするだけで済みますが、どちらかのインターフェースを実装するクラスには引数の追加が必要で、preview.15 向けにビルドしたパッケージがこれらのいずれかを実装していると、preview.16 では読み込まれません。プロキシのジェネレーターは、要素のインターレース解除の設定を `ProxyJob.Deinterlace` で受け取り、同じ `Deinterlace` を持つ `ProxyEntry` を登録します。Beutl は、設定が一致する要素にだけプロキシを使います。ストアは preview.15 が作成したプロキシを読まなくなったため、作り直す必要があります。
- **`SpeedIntegrator`**: コンストラクターはサンプルレートを受け取らない `SpeedIntegrator(Action? invalidateCallback = null)` になり、`SampleRate` と `TryGetCache(int)` は削除されました。キーフレームを設定した速度を、毎秒 60 回の合計ではなく、キーフレームからキーフレームまで正確に積分します。そのため、速度にキーフレームを設定したクリップは、以前とわずかに異なるソースの時刻に対応し、急な変化では最大で数フレームずれます。また、前回の積分の後に追加、削除、移動されたキーフレームにも追従します。
- **動画のソース**: `SourceVideo` は、ソースの伝達曲線の解釈と、インターレース解除をするかどうかの 2 つの設定を新しく保存します。ユーザーは、**「ソース」** プロパティのメニューの **「伝達曲線」** と **「インターレース解除」** で設定します。`IDecoderInfo` には `Capabilities` が、`IProxyResolver` にはインターレース解除の設定を受け取る `Resolve` のオーバーロードが追加され、いずれも既定の実装があります。デコーダーは、報告する内容を通してこれらの設定に従います。[デコーダー](media-providers.md#decoders)を参照してください。
- **成分ごとに欄があるプロパティエディタ**: コントロールは、ユーザーが入力した成分を `IValueEditorContext<TEdit>.PreviewEdit(value, relative, editedComponents)` でコンテキストに伝えられるようになり、`PropertyEditorViewModel<TValue>` はそれを新しい `ReplaceUnderExpression` のオーバーロードに渡します。どちらも既定では成分を受け取らないオーバーロードを呼ぶため、既存のコンテキストはこれまでどおりに動作します。[式の下の値を編集する](editor-integration.md#editing-under-an-expression)を参照してください。

## preview.14 からの移行 {/* #migrating-from-preview-14 */}

preview.14 の拡張機能を移行するときは、次の変更を確認してください。preview.14 でほかの多くのサービスがそうなったように、デコーダーもホストのものになりました。メディアを自分で開く拡張機能、シーンを描画する拡張機能、以下のインターフェースを実装する拡張機能は変更が必要です。メディアを開く多くのメソッドに省略可能な `DecoderRegistry? decoders` 引数が加わったため、それ以外の拡張機能も再ビルドが必要です。削除した API に互換用の API はありません。

- **テスト用のプロジェクト**: ターゲットフレームワークは `net11.0`、Avalonia は 12.1.6、ファイル形式の下限は preview.11 のままです。preview.15 で保存したプロジェクトは preview.11 でも開けます。[バージョンの対応表](version-mapping.md)を参照してください。
- **`DecoderRegistry`**: static ではなくなりました。ホストがそれぞれ 1 つ持ち、`Load` の `context.Services` とエディタの `GetService` から取得できます。`Register`、`Unregister`、`EnumerateDecoder`、`GuessDecoder`、`OpenMediaFile`、`ProxyResolver`、`DecodersChanged` はそのインスタンスのメンバーになり、`DecoderRegistry.Initialize(config)` はコンストラクター `new DecoderRegistry(config)` になりました。static だった `DecoderFileExtensions` の機能は、その `FileExtensions` にあります。`DecodingExtension` は、読み込まれたコンテキストのレジストリにデコーダーを登録します。[デコーダーのレジストリ](media-providers.md#decoder-registry)を参照してください。
- **メディアを開く**: `MediaReader.Open` は最後の引数にレジストリを受け取ります。ファイルを持つ `VideoSource` や `SoundSource` は、`Decoders` が `null` の `CompositionContext` で `Reconcile` されると `InvalidOperationException` を投げます。`SceneRenderer`、`ExportRendererFactory.Create`、`SourceSound` と `SourceVideo` の `TryGetOriginalDuration` など、`DecoderRegistry? decoders` を受け取る API には、ホストのレジストリを渡してください。テストでは、独自のレジストリにデコーダーを登録します。
- **独自の `IOriginalDurationProvider`、`IThumbnailsProvider`、`IProxyGeneratorFactory`**: `TryGetOriginalDuration`、`GetThumbnailStripAsync`、`GetWaveformChunksAsync` は最後の引数に `DecoderRegistry? decoders = null` を受け取り、`IProxyGeneratorFactory.Create` はソースを開くための `DecoderRegistry` を受け取ります。これらを実装するクラスには引数の追加が必要で、preview.14 向けにビルドしたパッケージがこれらのいずれかを実装していると、preview.15 では読み込まれません。`GetClipLayout` をオーバーライドする `Sound` にも、同じ最後の引数が必要です。メディアは受け取ったレジストリで開いてください。
- **独自の `ITimeMappedSource`**: `GetSourceDuration()` は `GetSourceDuration(DecoderRegistry? decoders = null)` になりました。既定の実装があるため、引数のないメソッドを残したクラスもコンパイルできますが、Beutl はそれを呼ばなくなり、編集で `OffsetPosition` が時間軸の長さに収まらなくなります。引数を追加してください。[時間で変わる内容と分割](#time-based-content-and-splitting)を参照してください。
- **独自の `IGenerativeRunHost`**: 新しい `Decoders` プロパティには既定の実装がないため、このインターフェースを実装するクラスには追加が必要です。`GenerativeGraphRunner` は、このレジストリでグラフを評価し、ノードのプレビューを読み込みます。
- **拡張機能が開くウィンドウ**: ウィンドウを開くコントロールから、`ControlDecoders.Decoders` もコピーしてください。[拡張機能が開くウィンドウ](#windows-that-your-extension-opens)を参照してください。
- **プロジェクトのフォント**: プロジェクトを開いても、同梱のフォントはホストの `FontManager` に読み込まれなくなりました。各シーンエディタは、ホストのものをフォークした独自の `FontManager` でこれらを解決します。そのため、`Load` で取得した `FontManager` で描画や測定をすると、プロジェクトのテキストは別のフォントに置き換わります。エディタのものを使ってください。[テキストと画素の描画](#drawing-text-and-pixels)を参照してください。
- **キーフレームと式の併用**: 式がキーフレームを `Value` として読めるようになったため、エディタは、ユーザーがキーフレームを追加しても式を削除せず、式を設定してもキーフレームを削除しなくなりました。`HasExpression` が `true` の間は、`GetKeyFrameAnimation()` がキーフレームを返しても、値は式で決まります。[キーフレームと式](engine-object.md#keyframes-and-expressions)を参照してください。
- **プロパティエディタ**: 値のエディタは、プロパティに式があっても編集できる状態のまま、式の下の値を編集できるようになりました。`IValueEditorContext<TEdit>` に追加されたメンバーには既定の実装があるため、既存のコンテキストもそのままコンパイルでき、これまでどおりに動作します。[式の下の値を編集する](editor-integration.md#editing-under-an-expression)を参照してください。
- **ブラウザのダウンロード**: `BrowserDownloadOffer` が、`Source` が応答したリクエストのメソッドを伝えるようになりました。`Source` を自分で要求する拡張機能は、先に `CanRequestAgain` を確認してください。[ブラウザのダウンロード](editor-integration.md#browser-downloads)を参照してください。
- **Windows での Beutl のフォルダー**: 新しいインストールは、既定で現在のユーザー向けに、管理者権限なしで `%LOCALAPPDATA%\Programs\Beutl` に入ります。更新では、置き換えるインストールのフォルダーが維持されます。`Program Files` を前提にせず、Beutl 自身のファイルは `AppContext.BaseDirectory` から探してください。

## preview.13 からの移行 {/* #migrating-from-preview-13 */}

preview.13 の拡張機能を移行するときは、次の変更を確認してください。拡張機能が使っていたグローバルなシングルトンの多くは削除され、拡張機能は `Load` が受け取るコンテキストからホストのサービスを取得します。すべての拡張機能が `Load` をオーバーライドしているため、すべての拡張機能で変更と再ビルドが必要です。削除した API に互換用の API はありません。

- **テスト用のプロジェクト**: ターゲットフレームワークは `net11.0`、Avalonia は 12.1.6、ファイル形式の下限は preview.11 のままです。preview.14 で保存したプロジェクトは preview.11 でも開けます。[バージョンの対応表](version-mapping.md)を参照してください。
- **`Extension.Load()` と `Unload()`**: `Load(IExtensionContext context)` と `Unload(IExtensionContext context)` に変わり、`context.Services` からホストのサービスを取得できます。`ThemeExtension`、`DecodingExtension`、`ProxyExtension`、`TutorialExtension` の派生クラスでこれらをオーバーライドする場合は、基底クラスのメソッドにコンテキストを渡してください。preview.13 向けにビルドしたパッケージが `Load()` や `Unload()` をオーバーライドしていると、preview.14 では読み込まれません。[ホストのサービス](#services-from-the-host)を参照してください。
- **`LibraryService.Current`、`ObjectTemplateService.Instance`**: 削除されました。`LibraryService` や `ObjectTemplateService` は、`context.Services` か、エディタの `IEditorContext` から取得してください。[ライブラリへの登録](engine-object.md#registering-with-the-library)を参照してください。
- **`TutorialService`**: `Current` とともに削除されました。`TutorialExtension` は、コンテキストの `ITutorialService` にチュートリアルを登録します。テストなどで `Load` を直接呼ぶコードは、`ITutorialService` を提供するコンテキストを渡してください。
- **`GlobalConfiguration.Instance`**: 削除されました。`GlobalConfiguration` を取得し、`EditorConfig` など必要なセクションを読んでください。コンストラクターが public になったため、テストでは独自のインスタンスを作れます。`RenderCacheOptions.CreateFromGlobalConfiguration()` は `CreateFromConfiguration(EditorConfig)` になりました。
- **`Scene.AddChild`、`MoveChild`、`MoveChildren`、`CloseGapAfter`、`CloseAllGaps`**: `GlobalConfiguration.Instance` から **「設定」→「エディター」→「自動でシーンの長さを調整」** を読まなくなり、代わりに既定値が `true` の `bool autoAdjustDuration` を受け取ります。省略すると、ユーザーが設定をオフにしていても、要素が収まるようにシーンを延ばします。設定に従うには、ホストの `GlobalConfiguration` の `EditorConfig.AutoAdjustSceneDuration.Value` を渡してください。
- **`NotificationService`**: static ではなくなり、`NotificationService.Handler` は削除されました。`INotificationService` を取得して、`Show`、`ShowInformation`、`ShowSuccess`、`ShowWarning`、`ShowError` を呼んでください。これらは `Beutl.Services` の拡張メソッドで、引数は以前と同じです。
- **`FontManager.Instance`**: `FontManager.Initialize`、`FontFamily.Typefaces` とともに削除されました。`FormattedText`、`TextElements`、`TextElementsBuilder` は、使う `FontManager` を受け取ります。ファミリーの書体は `fonts.GetTypefaces(family)` で取得します。[テキストと画素の描画](#drawing-text-and-pixels)を参照してください。
- **独自の `IGenerativeRunHost`**: 新しい `Fonts` プロパティには既定の実装がないため、このインターフェースを実装するクラスには追加が必要です。`GenerativeGraphRunner` は、ノードの入力を取得するとき、この `FontManager` でグラフを評価します。
- **拡張機能が開くウィンドウ**: `Beutl.Controls` のコントロールは、Beutl がウィンドウに設定する添付プロパティから、ユーザーの設定とホストのフォントを取得します。[拡張機能が開くウィンドウ](#windows-that-your-extension-opens)を参照してください。
- **レンダリングのコールバック**: コールバックが読むラスターは、それぞれの範囲を 1 つの `RenderPlacement` で表すようになりました。削除された `Bounds`、`EffectiveScale`、`Scale`、`Density`、`WorkingScale`、`DeviceBounds`、`DeviceSize`、`DeviceGridOffset`、`LogicalOrigin`、`LogicalBounds`、`RasterBounds`、`RequiredRegion` の代わりに、`EffectTarget`、`RenderExecutionInput`、`MaterializedInputDescription`、`OpaqueRenderOutput`、`RenderCallbackCanvas` では `Placement` を、`GeometrySession`、`OpaqueRenderSession`、`ShaderExecutionContext` では `OutputPlacement` を読んでください。`EffectTarget.Bounds` は残っており、引き続き内容を移動します。`MaterializedInputDescription.FromRenderTarget` は `RenderPlacement` を受け取ります。[レンダーターゲットを直接処理する](implement-effect.md#processing-the-render-target)を参照してください。
- **`GradingColorPicker`**: `IsDragging` と `StopDrag()` は削除されました。編集は `ColorChanged` と `ColorConfirmed` で追ってください。
- **Beutl の UI フォント**: `Beutl.Controls` に埋め込まれなくなったため、`avares://Beutl.Controls/Assets/Fonts/...` のリソースはなくなりました。`Beutl.Controls.Styling` の `UiFonts.DefaultFontFamily` か `UiFonts.GetFontFamily(culture)` を使ってください。
- **非同期メソッド**: SDK は、`Task` か `ValueTask` を返す `async` メソッドを .NET 11 のランタイム非同期でコンパイルします。このようなメソッドには `AsyncStateMachineAttribute` が付かなくなります。また、`TaskCreationOptions.RunContinuationsAsynchronously` で作ったタスクの継続はスレッドプールを経由して UI スレッドに届くため、タスクの完了直後に UI スレッドへ投稿した処理より後に実行されることがあります。[ランタイム非同期](create-csproj.md#runtime-async)を参照してください。
- **ブラウザのダウンロード**: `BrowserDownloadExtension` の `Claim` と `ImportAsync` に既定の実装ができ、新しい `TryDownloadPageAsync` でブラウザの **「ファイルをダウンロード」** を処理できます。[ブラウザのダウンロード](editor-integration.md#downloading-the-pages-media)を参照してください。
- **拡張機能の更新**: Beutl は既定で、ストアの拡張機能の新しいリリースを自動でインストールするようになりました。[ターゲットバージョンと自動更新](publish.md#target-version-and-automatic-updates)を参照してください。

## preview.12 からの移行 {/* #migrating-from-preview-12 */}

preview.12 の拡張機能を移行するときは、次の変更を確認してください。preview.13 で削除された公開 API はありません。

- **テスト用のプロジェクト**: ターゲットフレームワークは `net11.0`、Avalonia は 12.1.6、ファイル形式の下限は preview.11 のままです。preview.13 で保存したプロジェクトは preview.11 でも開けます。[バージョンの対応表](version-mapping.md)を参照してください。
- **独自の `ILayerAttributeService`**: 新しい `SetName(Scene scene, int zIndex, string name)` には既定の実装がないため、このインターフェースを実装するクラスには追加が必要です。このメソッドは `zIndex` のレイヤーに名前を付け、`TimelineLayer` がなければ作るので、名前はレイヤーと一緒に移動します。空の名前を渡すと名前を消し、既定値だけが残った `TimelineLayer` を削除します。名前が変わったときは `true` を返し、履歴に 1 つの項目をコミットします。サービスを呼び出すだけのコードは変更不要です。
- **BT.709 の動画**: `BitmapColorSpaceMapping.GetTransferFunction` は、BT.709 と BT.2020 SDR のタグを新しい `BitmapColorSpaceTransferFn.CoreMedia709` に対応させます。このような動画は、シャドウが暗くデコードされ、書き出しではシャドウのコード値が明るくなります。[デコーダー](media-providers.md#decoders)を参照してください。
- **プロパティエディタ**: 複数の要素を選ぶと、プロパティパネルは要素の 1 つのコピーを通してまとめて編集し、コピーへの変更をすべての要素で繰り返します。[複数の要素を選んだとき](editor-integration.md#several-selected-elements)を参照してください。
- **文字列プロパティのコード**: シェーダーやスクリプトを保持するプロパティに `[DataType(CustomDataTypes.Code)]` を付けると、行を折り返さず Tab キーを受け付ける等幅の欄になります。`DataType.MultilineText` の欄は長い行を折り返すようになりました。[プロパティの宣言](engine-object.md#declaring-properties)を参照してください。

## preview.11 からの移行 {/* #migrating-from-preview-11 */}

preview.11 の拡張機能を移行するときは、次の変更を確認してください。preview.12 で削除された公開 API はありません。

- **ターゲットフレームワーク**: パッケージと `Beutl.Extensibility.Sdk` は `net11.0` を対象にしています。.NET 11 SDK（Visual Studio 2026 18.12 以降）でビルドしてください。フレームワークを指定していないプロジェクトには SDK が `net11.0` を設定します。`net10.0` を指定しているプロジェクトやテスト用のプロジェクトは変更してください。preview.11 向けに `net10.0` でビルドした拡張機能も、preview.12 で読み込めます。[プロジェクトの作成](create-csproj.md)を参照してください。
- **テスト用のプロジェクト**: ファイル形式の下限は preview.11 のままなので、preview.12 で保存したプロジェクトは preview.11 でも開けます。`Avalonia.Headless` などの Avalonia のパッケージを Beutl と同じバージョンに固定しているテスト用のプロジェクトは、12.1.6 に更新してください。[バージョンの対応表](version-mapping.md)を参照してください。
- **音声エフェクト**: ソースのサンプルレートがプロジェクトと異なる場合、エフェクトはソースのサンプルレートで処理され、プロジェクトのサンプルレートへの変換はそのあとで行われます。サンプルレートはプロジェクトからではなく、`AudioProcessContext.SampleRate` かバッファから取得してください。[サンプルレート](audio-effects.md#sample-rates)を参照してください。
- **表示する時刻**: エディタは既定で時刻をタイムコードで表示し、ユーザーは時間やフレーム番号の表示にも切り替えられます。エディタの表示に合わせるには、ユーザーの `EditorConfig.TimeDisplayFormat` に従い、`TimeDisplayFormatter.Format` で時刻を書式化してください。[メディア時刻](media-providers.md#media-time-and-project-rates)を参照してください。
- **ライブラリのエフェクト**: ライブラリとエフェクトのピッカーは、各エフェクトを動くサムネイルで表示します。エフェクトごとにレシピを登録してください。登録しないと、サムネイルはサンプル画像の上で既定値のまま再生されます。[ライブラリのサムネイル](implement-effect.md#library-thumbnails)を参照してください。
- **`ColorBalancePad.DragStarted`**: 押したときではなく、押したまま 3 ピクセル動いたときに発生し、ポインターのロックもそこで始まります。クリックだけでは `DragStarted` も `DragCompleted` も発生しません。
- **独自の `IPreviewPlayer`**: 新しい `CleanPreviewImage` は既定で `PreviewImage` を返し、`AcquireCleanPreview()` は何もしないハンドルを返します。選択範囲の枠などをフレームに重ねて描くプレーヤーでは、これらをオーバーライドしてください。ライブラリは、このフレームの上にエフェクトのサムネイルを描きます。

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

### ホストのサービス {/* #services-from-the-host */}

preview.14 以降、Beutl は `Load` と `Unload` に `IExtensionContext` を渡します。その `Services` はホストの `IServiceProvider` で、`LibraryService`、`ObjectTemplateService`、`GlobalConfiguration`、`FontManager`、`INotificationService`、`ITutorialService` と、preview.15 以降は `DecoderRegistry` を提供します。サービスは型が完全に一致するものだけが見つかるため、`GlobalConfiguration` を取得してから、`EditorConfig` などのセクションを読んでください。`GetRequiredService<T>()` は `Microsoft.Extensions.DependencyInjection` にあり、SDK の参照に含まれています。

```csharp
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;
using Beutl.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MyExtension;

[Export]
public sealed class ShapesExtension : Extension
{
    private INotificationService? _notifications;

    public override void Load(IExtensionContext context)
    {
        context.Services.GetRequiredService<LibraryService>()
            .RegisterGroup("My Shapes", group => group
                .AddDrawable<RectShape>("My Rectangle"));

        // Keep what later code needs, and let it go in Unload.
        _notifications = context.Services.GetRequiredService<INotificationService>();
    }

    public override void Unload(IExtensionContext context)
    {
        _notifications = null;
    }

    public void ReportFailure(Exception exception)
        => _notifications?.ShowError("My Shapes", exception.Message);
}
```

- Beutl は拡張機能を 1 つずつ読み込みます。組み込みの拡張機能が最初で、次にインストールされたパッケージを名前順に、最後にサイドロードされた拡張機能を読み込みます。`Load` が失敗したときにも `Unload` を呼ぶため、`Unload` は `Load` で完了した処理だけを元に戻し、何度呼ばれても問題がないように書いてください。
- コマンド、ツールタブ、そのほかのファクトリでは、`execution.EditorContext` やツールタブの作成時に渡される `IEditorContext` など、対象のエディタからサービスを取得してください。シーンエディタは、上記のサービスと独自のサービスを `GetService` で提供します。1 つの拡張機能のインスタンスが複数のホストに使われることがあるため、`Load` で保持したサービスよりも、こちらを優先してください。preview.15 以降、エディタの `FontManager` は、シーンのプロジェクトに同梱されたフォントをホストのフォントより優先して解決するフォークです。

### 読み込みは全部成功するか、全部取り消されるか

- Beutl は、アセンブリの public な型から拡張機能を探します。拡張機能のクラスは `public` で、`Extension` を継承し、`[Export]` 属性と引数なしのコンストラクターを持つ必要があります。
- Beutl は public な型を厳密に読み込みます。そのうち 1 つでも読み込めないアセンブリを参照していると（除外したのに Beutl が同梱していないライブラリなど）、パッケージ全体の読み込みに失敗します。
- ある拡張機能の `Load` が例外を投げると、同じパッケージの拡張機能はすべて取り消されます。

### サイドロード

`DebugApplication` のビルドは `~/.beutl/sideloads/<AssemblyName>` に出力されます。Beutl が読み込むのは、フォルダーと同じ名前の DLL があるフォルダー（`<名前>/<名前>.dll`）だけです。自分でファイルをコピーする場合も、この名前のそろえ方を守ってください。

### バージョン番号とアイコン

- `0.1.0` のような正式版のバージョンで Beutl のプレビュー版パッケージに依存すると、`dotnet pack` が警告 NU5104 を出します。Beutl のプレビュー版を対象にしている間は、`0.1.0-preview.1` のようなプレリリースのバージョンを使ってください。
- `PackageIcon` で設定されるのは `.nupkg` の中のアイコンです。ストアのページのアイコンは、開発者ページから別にアップロードします（[拡張機能を公開する](publish.md)を参照）。画像は角を丸めない正方形にしてください。表示するときに、ストアと Beutl が角を丸めます。

## 保存と編集

### コレクションのコンバーターは値の型に付ける

preview.9 以降は、コレクション型自身の `[JsonConverter]` を保存・読み込みの両方で使用します。コンバーターがなければ、引き続き要素を 1 つずつ書き出します。`ICoreSerializable` と参照の値は、Beutl 独自のシリアライズ経路を使います。

プロパティメンバーに付けた `[JsonConverter]` は、プロパティシステムでは読み取られません。値の型に付けるか、適切な Beutl のシリアライズ契約を実装してください。メンバーの属性には依存しないでください。

### 時間で変わる内容と分割 {/* #time-based-content-and-splitting */}

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

要素のローカル時刻 `t` で、ソースは時間軸の `OffsetPosition` に `[0, t]` の `Speed` の積分を加えた位置を再生します。この位置をもとに描画してください。`GetSourceDuration(decoders)` は時間軸の長さを返し、編集はその範囲に収まります。メディアファイルは、受け取った `DecoderRegistry` で開いてください。`HasDynamicMapping` の既定は `OffsetPosition.HasExpression` です。式が時間軸そのものを選ぶ場合は `HasDynamicTimeline` をオーバーライドしてください。`ISplittable` を直接実装するのは、このような時間軸を持たないオブジェクトだけにしてください。

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
    // Call this from Load with the LibraryService of the context.
    public static void Register(LibraryService library)
        => library.RegisterGroup("My Extension", group => group
            .AddDrawable<RectShape>("My Rectangle"));
}
```

テストでは、`new LibraryService()` に登録し、その `GetTypesFromFormat(KnownLibraryItemFormats.EngineObject)` に自分の型が含まれることを確認できます。

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

preview.12 で追加された `Beutl.Controls.AnimatedThumbnail` は、`IAnimatedThumbnailSource` を表示します。静止時は静止画を、`IsPlaying` が `true` の間は 1 枚のシートに並べたフレームをループで表示します。ソースには、画面に表示されている間だけ静止画を、再生中だけフレームを要求するため、長い一覧でも見えている分だけを読み込みます。

プロパティのコントロールを調整するときは、Beutl のテーマで余白とラベルの位置を確かめてください。ヘッドレス描画はレイアウトの確認に役立ちますが、公開前には Beutl 本体でも確認してください。

### 拡張機能が開くウィンドウ {/* #windows-that-your-extension-opens */}

preview.14 以降、`Beutl.Controls` のコントロールは、継承される添付プロパティ `ControlConfiguration.Configuration` と `ControlFonts.Fonts` から、ユーザーの設定とホストのフォントを取得します。同じように、`ControlNotifications.Notifications` はホストの `INotificationService` をビューに伝えます。preview.15 以降は `ControlDecoders.Decoders` がホストの `DecoderRegistry` を伝え、動画と音声のプロパティのファイルピッカーは、これを読んで提示するファイルの種類を決めます。Beutl は自分のウィンドウ（フローティングにしたツールタブや `ToolWindowExtension` のウィンドウを含みます）にこれらを設定し、ツールタブ、フライアウト、ポップアップの中のコントロールはそれを継承します。拡張機能が自分で作って表示するウィンドウには設定されません。そのため、macOS のネイティブのコンテキストメニューとプロパティのドラッグ中のポインターのロックはユーザーの設定ではなく既定値に従い、フォントのピッカーはプロジェクトのフォントを含まない独自のフォントマネージャーを作り、`ControlNotifications.GetNotifications` と `ControlDecoders.GetDecoders` は `null` を返します。ウィンドウを開くコントロールから、これらをコピーしてください。

```csharp
using Avalonia.Controls;
using Beutl.Controls;

public static class ExtensionWindows
{
    public static void CopyHostServices(Window window, Control opener)
    {
        ControlConfiguration.SetConfiguration(window, ControlConfiguration.GetConfiguration(opener));
        ControlFonts.SetFonts(window, ControlFonts.GetFonts(opener));
        ControlNotifications.SetNotifications(window, ControlNotifications.GetNotifications(opener));
        ControlDecoders.SetDecoders(window, ControlDecoders.GetDecoders(opener));
    }
}
```

このようなウィンドウのカラーピッカーは、コピーしたあとも既定のパレットだけを表示し、最近使った色を記録しません。

### macOS のコンテキストメニュー {/* #context-menus-on-macos */}

preview.11 以降の macOS では、**「設定」→「表示」→「ネイティブのコンテキストメニューを使用」** がオンの間（既定ではオンです）、`ContextMenu` と、`MenuFlyout`、`FAMenuFlyout`、`FACommandBarFlyout` を使った `ContextFlyout` が、ネイティブのメニューとして開きます。Avalonia のメニューも見えない状態で開くため、バインディング、`Opening` のハンドラー、`IsOpen` はそのまま機能します。`MenuItem` はテキスト、チェックマーク、入力ジェスチャーを表示しますが、`Icon` は表示しません。FluentAvalonia の項目は `IconSource` も表示します。それ以外のもの（ヘッダーがテキストでない `MenuItem` など）を含むメニューは Avalonia のメニューのまま開き、`Button.Flyout` や `ShowAt` で開いたフライアウトも同様です。macOS では、設定のオンとオフの両方でメニューを確認してください。

## テキストと画素の描画 {/* #drawing-text-and-pixels */}

- preview.14 以降、`FormattedText`、`TextElements`、`TextElementsBuilder` は、フォントを解決する `FontManager` を受け取ります。リソースでは、[`TextBlock`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextBlock.cs) と同じように、`Reconcile` のときに `CompositionContext.Fonts` から取得します。Beutl がシーンを描画している間、これはそのシーンのエディタのフォントマネージャーです。描画の外では、テキストが属するシーンのエディタの `FontManager` を使い、プロジェクトに属さないテキストにはホストのものを使ってください。
- preview.15 以降、エディタのフォントマネージャーはフォークです。`FontManager.Fork()` が作るマネージャーは、`LoadProjectFonts` で読み込んだフォントを親のフォントより優先して解決し、それ以外は親に問い合わせます。これらのフォントは親には届きませんが、`AddFont` で追加したフォントは、すべてのフォークが共有するインストール済みのフォントに加わります。Beutl は、開いているプロジェクトのためにホストのフォントをフォークし、そのプロジェクトのシーンエディタごとにそれをさらにフォークします。`ControlFonts.SetFonts` でコントロールに渡したフォークは、コントロールが表示しなくなったら `ControlFonts.Release` で解放してください。
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
- [`Extension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/Extension.cs) and [`IExtensionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/IExtensionContext.cs)
- [`INotificationService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Core/Services/INotificationService.cs) and [`GlobalConfiguration.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/GlobalConfiguration.cs)
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
- [`AnimatedThumbnail.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/AnimatedThumbnail.cs) and [`IAnimatedThumbnailSource.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/IAnimatedThumbnailSource.cs)
- [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs)
- [`NativeContextMenus.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/NativeContextMenus.cs) and [`ContextMenuEntry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/NativeContextMenu/ContextMenuEntry.cs)
- [`ControlConfiguration.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlConfiguration.cs), [`ControlFonts.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlFonts.cs), [`ControlNotifications.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlNotifications.cs), [`ControlDecoders.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/ControlDecoders.cs) and [`UiFonts.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/Styling/UiFonts.cs)
- [`DecoderRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Decoding/DecoderRegistry.cs), [`IOriginalLengthProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/IOriginalLengthProvider.cs), [`IThumbnailsProvider.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/IThumbnailsProvider.cs) and [`ProxyGeneratorRegistry.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyGeneratorRegistry.cs)
- [`GenerativeGraphRunner.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.NodeGraph/Generative/GenerativeGraphRunner.cs)
- [`Scene.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.cs) and [`Scene.Gaps.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/ProjectSystem/Scene.Gaps.cs)
- [`RenderPlacement.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Rendering/RenderPlacement.cs)
- [`FontManager.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Font/FontManager.cs) and [`CompositionContext.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Composition/CompositionContext.cs)
- [`FormattedText.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/TextFormatting/FormattedText.cs)
- [`TextElements.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextElements.cs)
- [`ILayerAttributeService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/Services/ILayerAttributeService.cs)
- [`SceneRenderServices.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.ProjectSystem/SceneRenderServices.cs) and [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/SpeedIntegrator.cs)
- [`IProxyStore.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/IProxyStore.cs), [`IProxyJobQueue.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/IProxyJobQueue.cs) and [`ProxyStoreIndex.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyStoreIndex.cs)

# Headless スクリーンショット

Beutl デスクトップの実際の Avalonia UI を、ディスプレイを使わず Skia で描画します。デスクトップ側を変更した後、同じシナリオを実行して現行ドキュメントの画像を更新できます。

## ローカルで更新する

Node.js 20 以上、デスクトップの `global.json` に対応する .NET SDK、Beutl のソースチェックアウトが必要です。Linux の最小構成では `libfontconfig1` と `libfreetype6` もインストールしてください。NuGet パッケージが未取得の場合はネットワーク接続が必要です。

```bash
# ../beutl の現在のソースから英語・日本語の画像を更新
pnpm screenshots:update

# 別のチェックアウトや作業ツリーを指定
pnpm screenshots:update --beutl-source /path/to/beutl

# 特定の画面・言語だけ更新
pnpm screenshots:update --scenario view-settings --locale ja

# 更新せず描画結果だけ確認
pnpm screenshots:render --output .cache/screenshots/preview

# 同じ条件で再生成し、保存済み画像との差分があれば終了コード 1
pnpm screenshots:check

# 対象一覧と更新スクリプトのテスト
pnpm screenshots:list
pnpm screenshots:test
```

`BEUTL_SOURCE` 環境変数でもソースを指定できます。pnpm を使わず `node scripts/screenshots.mjs update` などを実行することもできます。

生成画像は既存の相対パスに保存するため、Markdown の画像参照を変更する必要はありません。全対象の描画と PNG の検証が成功してから画像を置き換えます。描画に失敗した場合、保存済み画像は更新されません。ビルド・プレビューは `.cache/screenshots/` に保存し、デスクトップのソースや通常の `bin`・`obj` を変更しません。

`screenshots/generated.json` に各画像のサイズ、SHA-256、デスクトップのコミット、未コミットの変更の有無、OS・アーキテクチャ・.NET SDK を記録します。部分更新では、対象外の画像の生成元を保持します。デスクトップに未コミットの変更がある場合、その変更も描画対象になるため、コミット ID だけでは再現できません。

## GitHub Actions

**Desktop screenshots** ワークフローを手動実行し、`desktop_ref` にデスクトップのブランチ・タグ・コミットを指定します。コミットを指定すると生成元を固定できます。生成された `desktop-screenshots` artifact には `docs/`、`i18n/`、`generated.json` が入ります。

画像を確認した後、artifact 内の `docs/` と `i18n/` をリポジトリにコピーし、`generated.json` を `screenshots/generated.json` に保存してコミットしてください。サイトは通常のデプロイワークフローで更新されます。

デスクトップ側の CI から連携する場合、docs リポジトリに `repository_dispatch` を送れます。

```json
{
  "event_type": "desktop-ui-changed",
  "client_payload": { "desktop_ref": "DESKTOP_COMMIT_SHA" }
}
```

送信側には docs リポジトリへの dispatch 権限が必要です。このリポジトリには受信側だけを追加しています。自動コミットやデプロイはこのワークフローでは行いません。

## 描画条件

- `beutl.dark.border` テーマ、倍率 1、シナリオごとに固定した画面サイズ。
- デスクトップ同梱の Noto フォントを使用。英語・日本語は別プロセスで生成。
- 一時的な `BEUTL_HOME` を使用。個人の設定・履歴・拡張機能を読み込まない。
- テレメトリ、Fluent のアニメーション、設定カードの展開アニメーション、コントロールの transition を無効化。固定したレンダリング tick で表示を確定。編集プロパティが独自に実行する初期 CrossFade は、デスクトップ側の既定の継続時間が経過してから描画します。
- フレームキャッシュの容量やフォントパスなど、環境によって変わる表示値にはサンプル値を設定。
- OS のネイティブウィンドウ枠を除外。メニューやダイアログも実際の UI から取得。

ビットマップの完全一致を確認する `check` は、同じ OS・アーキテクチャ・.NET SDK・デスクトップコミットで実行してください。CI の生成環境は Ubuntu 24.04 です。

## シナリオを追加する

1. `tools/screenshots/Scenarios.cs`（設定・ダイアログ）または `EditorScreenshots.cs`（編集画面）に実際の View と ViewModel を使ったシナリオを追加します。サンプルデータや開くメニューなどの状態をここで設定します。
2. `manifest.json` にシナリオ ID と、各言語のドキュメントルートからの画像パスを追加します。保存先は現行ドキュメントの `_images` 以下の PNG に限定しています。
3. `screenshots:render --scenario ID` で両言語の表示を確認し、`screenshots:update --scenario ID` で保存します。

アプリケーションのリソース・スタイルは指定したデスクトップの `App.axaml` からビルド時に取得します。テーマ・フォント・プロパティエディタ・UI スケジューラの初期化と拡張機能登録もデスクトップの処理を利用します。一部は desktop assembly の internal API のため、名前を限定した reflection で呼び出しています。デスクトップでその初期化 API が変更された場合は生成を失敗させ、古い実装へのフォールバックは行いません。

現在は 26 シナリオ（英語・日本語で 52 枚）を対象としています。プロジェクト作成と各種設定のほか、編集画面全体、ライブラリとイージング一覧、タイムライン、要素プロパティ、シーン設定、プレビュー設定、グラフエディタ、ノードグラフ、テレメトリ設定、キーフレームのプロパティを再生成できます。フォントの Windows・Linux の画像は、同じフォント設定 UI に OS ごとのサンプルパスを入れたものです。

編集画面は一時ディレクトリに作成したサンプルプロジェクトを使います。長方形とタイトル、幅のキーフレーム、接続済みのノードを実際の編集コンテキストに設定し、撮影後にエディタとプロジェクトを閉じます。個人のプロジェクトは開きません。

Media Foundation の Windows 専用画面、要素分割の操作例、パッケージ公開画面、OS や Visual Studio など外部アプリの画面、動画はまだ自動生成対象に含めていません。`versioned_docs/` と日本語の過去バージョンの画像も更新しません。

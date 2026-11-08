---
title: 素材とテンプレート
description: パッケージストアから素材とオブジェクトテンプレートをインストールします。
sidebar_position: 10
---

パッケージストアには **拡張機能**、**素材**、**テンプレート** があります。素材とテンプレートの両方を含むパッケージもあります。

## パッケージをインストールする

1. **拡張機能** ウィンドウを開きます。
2. **ホーム** の上部にあるタブで **素材** または **テンプレート** を選びます。
3. パッケージのカードをクリックして詳細を開きます。
4. ヘッダーのボタンの下にあるバージョンの選択欄でリリースを選び、**インストール** を押します。

詳細ページは 1 列にまとまっています。インストール・更新・アンインストールのボタンとバージョンの選択欄があるヘッダーの下に、スクリーンショット（ある場合）、説明、選択中のリリースのノート、名前・バージョン・ウェブサイト・タグを示す **情報** の一覧が続きます。インストール済みのパッケージには、更新とアンインストールの操作もあります。

**ライブラリ** には自分のパッケージが同じ形のタブ（**パッケージ** と **ローカルパッケージ**）で表示されます。**アップデートを確認** はタブの行にあります。

## インストールしたファイルを使う

[ファイル](../reference/tool-tabs/file-browser.md)タブを開き、固定されている **素材** または **テンプレート** フォルダーを選びます。インストールした素材やオブジェクトテンプレートは、パッケージ名ごとにまとめられています。

対応するメディアやオブジェクトテンプレートをタイムラインにドラッグします。オブジェクトテンプレートはファイルブラウザーでサムネイルを表示できます。

## 予約された変更

インストール・更新・アンインストールの操作は、アプリ終了時に実行するよう予約される場合があります。パッケージの変更を適用するために終了するよう案内されたら、作業を保存して Beutl を終了してください。保留中の変更は保存され、次の起動時にも復元されます。予約を取り消す場合は、終了前にパッケージの詳細画面で **キャンセル** を選びます。

## 拡張機能の互換性

インストール済みの Beutl に存在しない API を必要とする拡張機能は、読み込み・インストール・更新が拒否されます。エラー通知の **詳細** から、対象のパッケージと互換性のレポートを確認してください。使用中の Beutl に対応する拡張機能のリリースを選ぶか、拡張機能が対象とするバージョンに Beutl を更新します。更新が拒否された場合、以前のインストール済みバージョンは残ります。

そうしたパッケージに新しいリリースがある場合は、パッケージごとのエラーではなく、**パッケージの更新が必要です。** という短い警告を 1 つ表示します。警告は更新の確認が終わってから表示され、**開く** ボタンでライブラリを開いて更新を確認するので、すぐに更新ボタンを使えます。更新がないパッケージと、サイドロードしたパッケージには、これまでどおり詳しいエラーが表示されます。

## 関連ドキュメント

- [ファイル](../reference/tool-tabs/file-browser.md)
- [パッケージの公開](../extensions/publish.md)

## ソース

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)
- [`DiscoverPage.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Pages/ExtensionsPages/DiscoverPage.axaml)
- [`PackageDetailsPage.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Pages/ExtensionsPages/DiscoverPages/PackageDetailsPage.axaml)
- [`LibraryPage.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Pages/ExtensionsPages/LibraryPage.axaml)
- [`PackageChangesQueue.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Api/Services/PackageChangesQueue.cs)
- [`MainViewModel.Shutdown.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/MainViewModel.Shutdown.cs)
- [`PackageOperationHandler.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/ExtensionsPages/PackageOperationHandler.cs)
- [`AfterLoadingExtensionsTask.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/StartupTasks/AfterLoadingExtensionsTask.cs)
- [`CheckForPackageUpdatesTask.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupTasks/CheckForPackageUpdatesTask.cs)

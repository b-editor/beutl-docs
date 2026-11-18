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

パッケージを名前で探すには、ウィンドウ右上の検索ボックスを使います。**`Ctrl + F`**（macOSでは **`Cmd + F`**）で検索ボックスに移動してその文字列を選択します。検索するまでは、表示中のページはそのままです。

## インストールしたファイルを使う

[ファイル](../reference/tool-tabs/file-browser.md)タブを開き、固定されている **素材** または **テンプレート** フォルダーを選びます。インストールした素材やオブジェクトテンプレートは、パッケージ名ごとにまとめられています。

対応するメディアやオブジェクトテンプレートをタイムラインにドラッグします。オブジェクトテンプレートはファイルブラウザーでサムネイルを表示できます。

## 予約された変更

インストール・更新・アンインストールの操作のうち、Beutl の実行中に完了できないものは、アプリ終了時に実行するよう予約されます。変更が予約されている間、**ライブラリ** のパッケージの行には **再起動** が表示され、パッケージの詳細画面では **キャンセル** の上に **再起動** が表示されます。**再起動** を選ぶと、作業内容を保存してから **終了** と同じように Beutl を終了します。続いてパッケージツールが、予約されたすべての変更を適用し、その変更で不要になったパッケージを削除するまで、操作を待たずに進めます。ただし、パッケージがライセンスへの同意を求めたときは、その回答を待ちます。最後のページには **閉じる** と並んで **Beutlを起動** が表示されます。再起動せずに Beutl を終了したときは、パッケージツールが開き、**スタート** を押すまで待ちます。保留中の変更は保存され、次の起動時にも復元されます。予約を取り消す場合は、行の **…** メニューかパッケージの詳細画面で **キャンセル** を選びます。

## 拡張機能の更新 {/* #updating-extensions */}

ストアからインストールした拡張機能は、既定で自動的に更新されます。Beutl は更新をバックグラウンドでダウンロードし、次回の起動時にプロジェクトを開く前に適用します。通知だけにしたい場合や、Beutl 本体と一緒にだけ更新したい場合は、**設定 → 拡張機能** の[更新のタイミング](../settings/extension.md#update-timing)を変更します。

更新ボタンと更新の通知は、使用中の Beutl のバージョンに対応した最新のリリースを示し、パッケージの詳細ではそのリリースが最初から選択されています。新しいリリースがすべてほかのバージョンの Beutl 向けのパッケージには、更新は表示されません。

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
- [`PackageOperationHandler.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/ViewModels/ExtensionsPages/PackageOperationHandler.cs) / [`LibraryPage.axaml`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Pages/ExtensionsPages/LibraryPage.axaml) / [`PackageDetailsPage.axaml`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Pages/ExtensionsPages/DiscoverPages/PackageDetailsPage.axaml)
- [`ResultPage.axaml`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.PackageTools.UI/Views/ResultPage.axaml)
- [`AfterLoadingExtensionsTask.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/StartupTasks/AfterLoadingExtensionsTask.cs)
- [`CheckForPackageUpdatesTask.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupTasks/CheckForPackageUpdatesTask.cs)
- [`ExtensionsPage.axaml.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Pages/ExtensionsPage.axaml.cs) / [`Release.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Api/Objects/Release.cs) / [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)
- [`CheckForPackageUpdatesTask.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Services/StartupTasks/CheckForPackageUpdatesTask.cs) / [`PackageManager.ExtensionUpdates.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Api/Services/PackageManager.ExtensionUpdates.cs)

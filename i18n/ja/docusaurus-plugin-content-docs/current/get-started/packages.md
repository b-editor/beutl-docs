---
title: 素材とテンプレート
description: パッケージストアから素材とオブジェクトテンプレートをインストールします。
sidebar_position: 10
---

パッケージストアには **拡張機能**、**素材**、**テンプレート** があります。素材とテンプレートの両方を含むパッケージもあります。

## パッケージをインストールする

1. **拡張機能** ウィンドウを開きます。
2. カテゴリーフィルターで **素材** または **テンプレート** を選びます。
3. 使いたいパッケージを開いてリリースを選び、**インストール** を押します。

インストール済みのパッケージには、更新とアンインストールの操作もあります。

## インストールしたファイルを使う

[ファイル](../reference/tool-tabs/file-browser.md)タブを開き、固定されている **素材** または **テンプレート** フォルダーを選びます。インストールした素材やオブジェクトテンプレートは、パッケージ名ごとにまとめられています。

対応するメディアやオブジェクトテンプレートをタイムラインにドラッグします。オブジェクトテンプレートはファイルブラウザーでサムネイルを表示できます。

## 予約された変更

インストール・更新・アンインストールの操作は、アプリ終了時に実行するよう予約される場合があります。パッケージの変更を適用するために終了するよう案内されたら、作業を保存して Beutl を終了してください。保留中の変更は保存され、次の起動時にも復元されます。予約を取り消す場合は、終了前にパッケージの詳細画面で **キャンセル** を選びます。

## 拡張機能の互換性

インストール済みの Beutl に存在しない API を必要とする拡張機能は、読み込み・インストール・更新が拒否されます。エラー通知の **詳細** から、対象のパッケージと互換性のレポートを確認してください。使用中の Beutl に対応する拡張機能のリリースを選ぶか、拡張機能が対象とするバージョンに Beutl を更新します。更新が拒否された場合、以前のインストール済みバージョンは残ります。

## 関連ドキュメント

- [ファイル](../reference/tool-tabs/file-browser.md)
- [パッケージの公開](../extensions/publish.md)

## ソース

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)
- [`PackageChangesQueue.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Api/Services/PackageChangesQueue.cs)
- [`MainViewModel.Shutdown.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/MainViewModel.Shutdown.cs)
- [`PackageOperationHandler.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/ExtensionsPages/PackageOperationHandler.cs)
- [`AfterLoadingExtensionsTask.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/StartupTasks/AfterLoadingExtensionsTask.cs)

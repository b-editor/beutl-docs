---
title: 素材とテンプレート
description: パッケージストアから素材とオブジェクトテンプレートをインストールします。
sidebar_position: 10
---

パッケージストアには **拡張機能**、**素材**、**テンプレート** があります。素材とテンプレートの両方を含むパッケージもあります。

## パッケージをインストールする

**拡張機能** ウィンドウを開き、カテゴリーフィルターでストアを絞り込みます。パッケージを開いてリリースを選び、**インストール** を押します。インストール済みのパッケージには更新とアンインストールの操作もあります。

## インストールしたファイルを使う

[ファイル](../reference/tool-tabs/file-browser.md)タブを開きます。固定されている **素材** と **テンプレート** フォルダーに、パッケージ名ごとにインストールした素材が入っています。

- 素材: Beutlのホームディレクトリ内の `materials/<packageName>`。
- オブジェクトテンプレート: Beutlのホームディレクトリ内の `templates/<packageName>`。

対応するメディアやオブジェクトテンプレートをタイムラインにドラッグします。オブジェクトテンプレートはファイルブラウザーでサムネイルを表示できます。

## Webのインストールリンク

Webのインストールリンクを開くと、Beutlでパッケージの詳細が表示されます。`beutl://install?package=<packageName>&version=<version>` でバージョンを指定でき、`version` は省略可能です。

リンクを開くだけではインストールされません。選択されたリリースを確認して **インストール** を押してください。指定されたバージョンが利用できない場合は、先に利用可能なリリースを選択します。

## 関連ドキュメント

- [ファイル](../reference/tool-tabs/file-browser.md)
- [パッケージの公開](../extensions/publish.md)

## ソース

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageInstallRequest.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PackageInstallRequest.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)

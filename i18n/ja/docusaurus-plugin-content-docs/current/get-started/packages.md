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

## 関連ドキュメント

- [ファイル](../reference/tool-tabs/file-browser.md)
- [パッケージの公開](../extensions/publish.md)

## ソース

- [`PackageKind.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageKind.cs)
- [`PackageInstaller.Data.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Api/Services/PackageInstaller.Data.cs)
- [`PackageDetailsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/ExtensionsPages/DiscoverPages/PackageDetailsPageViewModel.cs)

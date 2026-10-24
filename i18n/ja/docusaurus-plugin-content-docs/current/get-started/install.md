---
title: インストール
description: Beutlをインストールする方法を説明します
sidebar_position: 1
---

このページでは、Beutlのインストール方法を説明します。

以下の手順では、インストールするBeutlのバージョンを`{version}`と表記します。

## Windowsの場合

Windowsではx64とARM64の両方を利用できます。ARM64デバイスには、ファイル名に`arm64`を含むインストーラーを使用してください。

### スタンドアロンインストーラーを使う (おすすめ)
1. `beutl-standalone-setup.exe` (ARM64の場合は`beutl-standalone-arm64-setup.exe`) をダウンロードして、実行します。
2. 画面に従ってインストールします。
3. `Beutl.exe`を起動します。

配布パッケージには .NET ランタイムが含まれています。軽量インストーラーとランタイムを含まないアーカイブの配布は終了しました。以前の軽量版や Windows のポータブル版から更新する場合は、スタンドアロンインストーラーをダウンロードしてください。

## Ubuntu22.04の場合

### Debianパッケージからインストール

1. x64 では `beutl_{version}ubuntu22.04_amd64.deb`、ARM64 では `beutl_{version}ubuntu22.04_arm64.deb` をダウンロードします。以下のコマンドも、ダウンロードしたファイル名に合わせてください。
2. 以下のコマンドを実行します。
```sh
sudo apt update
sudo apt install ./beutl_{version}ubuntu22.04_amd64.deb
```
3. インストール完了です

### 手動でインストール
1. アーキテクチャに合わせて `Beutl-linux-x64-standalone-{version}.zip` または `Beutl-linux-arm64-standalone-{version}.zip` をダウンロードして展開します。
2. `chmod`を使用して、`Beutl`, `Beutl.ExceptionHandler`, `Beutl.PackageTools.UI`, `Beutl.FFmpegWorker`, `Beutl.AgentToolkit.Mcp`を実行可能にします。
3. `Beutl`を起動します。

## Linux (Flatpak) の場合

Flatpak を使うと、ディストリビューション固有のパッケージなしに任意の Linux ディストリビューションへ Beutl をインストールできます。

:::note
Flathub リモートが設定された `flatpak` が必要です。初回インストール時に、バンドルは Flathub から `org.freedesktop.Platform` ランタイムを取得します。
:::

1. リリースページから、x64 では `Beutl-{version}.flatpak`、ARM64 では `Beutl-arm64-{version}.flatpak` をダウンロードします。以下のコマンドも対応するファイル名に合わせてください。
2. 現在のユーザー向けにバンドルをインストールします。
```sh
flatpak install --user Beutl-{version}.flatpak
```
3. Beutl を起動します。
```sh
flatpak run net.beditor.Beutl
```

インストール後、デスクトップ環境のアプリケーションメニューにも Beutl が表示されます。

### Flatpak の更新

Beutl内蔵の更新機能は、新しいFlatpakバンドルをダウンロードし、実行中のアーキテクチャと同じユーザーまたはシステムのインストール先に適用できます。更新完了後、Beutlを閉じて開き直すと、新しいバージョンが使われます。

## macOSの場合

- `Beutl.osx_arm64.app.zip` または `Beutl.osx_x64.app.zip` をダウンロードします。
- ダウンロードしたファイルをダブルクリックして展開します。
- `Beutl.app`をダブルクリックするとアプリが起動します。

## 更新する前に

**2.0.0-preview.9 で保存したプロジェクトは、preview.8 以前では開けません。** 古い Beutl に戻す必要がある場合は、新しいバージョンで保存する前にプロジェクトフォルダー全体をコピーしてください。[プロジェクトの構造](./project-structure.md#version-compatibility)も参照してください。

AIコーディングエージェントを使用している場合は、更新後に [Beutl との連携を再インストール](../advanced/ai-agents.md)してください。

## ソース

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/FlatpakUpdater.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)

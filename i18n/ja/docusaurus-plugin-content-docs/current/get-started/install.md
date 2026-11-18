---
title: インストール
description: Beutlをインストールする方法を説明します
sidebar_position: 1
---

このページでは、Beutlのインストール方法を説明します。

以下の手順では、インストールするBeutlのバージョンを`{version}`と表記します。

## 動作環境 {/* #system-requirements */}

Beutl は x64 と ARM64 のコンピューターで動作します。x64 では、プロセッサーが x86-64-v2、つまり CX16、POPCNT、SSE3、SSSE3、SSE4.1、SSE4.2 の命令に対応している必要があります。Intel と AMD がサポートを続けているプロセッサーはすべて対応しており、対応していない最後のプロセッサーは 2013 年ごろにサポートが終了しています。Beutl に含まれる .NET 11 ランタイムがこれらの命令を[必要とする](https://learn.microsoft.com/dotnet/core/compatibility/jit/11/minimum-hardware-requirements)ため、2.0.0-preview.12 以降の Beutl は、対応していない x64 プロセッサーでは起動しません。ARM64 の要件は変わっていません。

## Windowsの場合

Windowsではx64とARM64の両方を利用できます。ARM64デバイスには、ファイル名に`arm64`を含むインストーラーを使用してください。

### スタンドアロンインストーラーを使う (おすすめ)
1. `beutl-standalone-setup.exe` (ARM64の場合は`beutl-standalone-arm64-setup.exe`) をダウンロードして、実行します。
2. 画面に従ってインストールします。
3. `Beutl.exe`を起動します。

配布パッケージには .NET ランタイムが含まれています。軽量インストーラーとランタイムを含まないアーカイブの配布は終了しました。以前の軽量版や Windows のポータブル版から更新する場合は、スタンドアロンインストーラーをダウンロードしてください。

## Debian・Ubuntuの場合

Debianパッケージは、Ubuntu 22.04・24.04・26.04 と Debian 12・13 にインストールできます。

### Debianパッケージからインストール

1. x64 では `beutl_{version}_amd64.deb`、ARM64 では `beutl_{version}_arm64.deb` をダウンロードします。以下のコマンドも、ダウンロードしたファイル名に合わせてください。
2. 以下のコマンドを実行します。
```sh
sudo apt update
sudo apt install ./beutl_{version}_amd64.deb
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

Beutl内蔵の更新機能は、新しいFlatpakバンドルをダウンロードし、実行中のアーキテクチャと同じユーザーまたはシステムのインストール先にインストールします。バンドルはほかの更新と同じようにバックグラウンドでダウンロードされ（[Beutl を更新する](#beutl-を更新する)を参照）、インストールは操作を待ちます。準備完了の通知か更新のダイアログで **インストール** を選んでください。ダイアログで **後で** を選ぶと、ダウンロードしたバンドルは Beutl を終了するまで保持されるので、[ステータス](../reference/index.md#アプリの状態)のポップアップから開ける更新のダイアログでインストールできます。更新完了後、Beutlを閉じて開き直すと、新しいバージョンが使われます。

`flatpak install` や GNOME Software が既定で行う、すべてのユーザー向けのインストールを更新するには管理者の認証が必要で、**インストール** を選ぶとデスクトップがパスワードを一度だけ尋ねます。認証をキャンセルしたか失敗した場合は、**再試行** でもう一度試すか、**リリースノート** から更新をダウンロードして手動でインストールしてください。

## macOSの場合

- `Beutl.osx_arm64.app.zip` または `Beutl.osx_x64.app.zip` をダウンロードします。
- ダウンロードしたファイルをダブルクリックして展開します。
- `Beutl.app`をダブルクリックするとアプリが起動します。

## Beutl を更新する

起動時に新しいバージョンが見つかると、Beutl は編集を続けている間にバックグラウンドで更新をダウンロードします。そのことを **リリースノート** のある短い通知 **アップデートをダウンロード中** で知らせ、タイトルバーの[ステータス](../reference/index.md#アプリの状態)ボタンに進捗が表示されます。使い続けるためにインストールが必要な更新も同じようにダウンロードされ、その通知には **引き続き使用するにはアップグレードする必要があります** と表示されます。先に確認したい場合は、設定の **情報** ページで **アップデートを自動でダウンロード** をオフにします。すると Beutl は **ダウンロード** と **リリースノート** のある通知を表示し、**ダウンロード** でダウンロードが始まります。Beutl を複数起動しているときは、確認なしでダウンロードするのはそのうち 1 つだけで、ほかは **ダウンロード** を表示します。ステータスのポップアップから更新のダイアログを開けます。**バックグラウンドへ** でダイアログを閉じ、`Esc` で更新をキャンセルします。

更新の準備ができると、バージョンを示した通知で次の操作を選べます。

- Windows では **インストーラーを起動**、macOS と Linux では **再起動して更新**: Beutl が閉じて更新が始まります。macOS と Linux では、更新後に Beutl が再び起動します。
- **終了時に更新**: 作業内容を保存してから Beutl を終了したときに更新をインストールし、Beutl は閉じたままになります。
- **リリースノート**: リリースページを開きます。通知は表示されたままです。

Flatpak のインストールでは、代わりに **インストール** と **リリースノート** が表示されます。[Flatpak の更新](#flatpak-の更新)を参照してください。

拡張機能も Beutl と一緒に更新するときは、**拡張機能2件も一緒に更新します。** のように、通知にその件数も表示されます。[更新のタイミング](../settings/extension.md#update-timing)を参照してください。

インストールせずに残した更新は、もう一度ダウンロードされません。再起動後に同じ更新を準備するとき、Beutl は保存したファイルを確認してから使います。Flatpak のバンドルは改めてダウンロードされます。

ダウンロードや準備に失敗したときは、通知とダイアログに **再試行** が表示され、メッセージには失敗した手順が示されます。

新しく公開されたバージョンを初めて起動すると、**リリースノート** のある通知が表示され、そのバージョンのリリースページを開けます。

## 更新する前に

**2.0.0-preview.14 では、プロジェクト形式の最低対応バージョンは preview.11 のままです。** preview.14 で保存したプロジェクトは preview.11、preview.12、preview.13 では開けますが、preview.10 以前では開けません。preview.10 以前に戻す必要がある場合は、新しいバージョンで保存する前にプロジェクトフォルダー全体をコピーしてください。[プロジェクトの構造](./project-structure.md#version-compatibility)も参照してください。

**x64 では、preview.12 以降、x86-64-v2 に対応したプロセッサーが必要です。** [動作環境](#system-requirements)を参照してください。

preview.14 に更新すると、既存のプロジェクトの見た目が変わることがあります。

- **レイヤー、クリッピング、ブレンド、内側シャドウ、フラットシャドウ、ストロークの各エフェクトを掛けた内容が、ピクセル未満の位置を保つようになりました。** 以前は最大で半ピクセルずれ、一部だけ覆われた右端の列と下端の行が欠けていたため、これらのエフェクトを掛けたテキストがわずかに動くことがあり、ゆっくり動かしたときも滑らかに動くようになります。**自動センタリング** をオンにしたクリッピングはこれまでどおりです。

既存のプロキシは一度破棄され、作り直されます。Media Foundation が PAL など正方形でないピクセルの動画を表示サイズで読み込んでいたため、プロキシに歪んだ行が含まれていることがあるためです。

ストアからインストールした拡張機能は、自動で更新されるようになりました。Beutl は更新をバックグラウンドでダウンロードし、次回の起動時にプロジェクトを開く前に適用します。通知だけにしたい場合は、[更新のタイミング](../settings/extension.md#update-timing)で **通知のみ** を選びます。

使い続けるために必要な更新と Flatpak のバンドルも、バックグラウンドでダウンロードされるようになりました。[Beutl を更新する](#beutl-を更新する)を参照してください。

AIコーディングエージェントを使用している場合は、更新後に [Beutl との連携を再インストール](../advanced/ai-agents.md)してください。

## ソース

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/FlatpakUpdater.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/AppUpdateController.cs) / [`StartupNotificationService.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupNotificationService.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)
- [`global.json`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/global.json)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Core/Serialization/FileFormat.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Services/AppUpdateController.cs) / [`UpdateConfig.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Configuration/UpdateConfig.cs) / [`InformationPage.axaml`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl/Pages/SettingsPages/InformationPage.axaml)
- [`BitmapColorSpaceMapping.cs`](https://github.com/b-editor/beutl/blob/9953a97c9925706428da0095756c4736f216cd76/src/Beutl.Engine/Media/BitmapColorSpaceMapping.cs)
- [`CheckForUpdatesTask.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Services/StartupTasks/CheckForUpdatesTask.cs) / [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Services/AppUpdateController.cs) / [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs) / [`UpdateDownloadCache.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Services/UpdateDownloadCache.cs)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Core/Serialization/FileFormat.cs) / [`ProxyStoreIndex.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Engine/Media/Proxy/ProxyStoreIndex.cs) / [`UpdateConfig.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Configuration/UpdateConfig.cs)
- [`LayerEffect.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Engine/Graphics/FilterEffects/LayerEffect.cs) / [`Clipping.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Engine/Graphics/FilterEffects/Clipping.cs)

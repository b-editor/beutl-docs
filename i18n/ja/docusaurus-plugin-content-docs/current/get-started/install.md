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

Beutl内蔵の更新機能は、新しいFlatpakバンドルをダウンロードし、実行中のアーキテクチャと同じユーザーまたはシステムのインストール先に適用できます。更新完了後、Beutlを閉じて開き直すと、新しいバージョンが使われます。

`flatpak install` や GNOME Software が既定で行う、すべてのユーザー向けのインストールを更新するには管理者の認証が必要で、デスクトップがパスワードを一度だけ尋ねます。認証をキャンセルしたか失敗した場合は、**再試行** でもう一度試すか、**リリースノート** から更新をダウンロードして手動でインストールしてください。

## macOSの場合

- `Beutl.osx_arm64.app.zip` または `Beutl.osx_x64.app.zip` をダウンロードします。
- ダウンロードしたファイルをダブルクリックして展開します。
- `Beutl.app`をダブルクリックするとアプリが起動します。

## Beutl を更新する

新しいバージョンがあると、Beutl は **インストール** と **リリースノート** のある通知を表示します。**インストール** を選ぶと、編集を続けている間にバックグラウンドで更新をダウンロードし、タイトルバーの[ステータス](../reference/index.md#アプリの状態)ボタンに進捗が表示されます。ステータスのポップアップから更新のダイアログを開けます。**バックグラウンドへ** でダイアログを閉じ、`Esc` で更新をキャンセルします。

更新の準備ができると、バージョンを示した通知で次の操作を選べます。

- Windows では **インストーラーを起動**、macOS と Linux では **再起動して更新**: Beutl が閉じて更新が始まります。macOS と Linux では、更新後に Beutl が再び起動します。
- **終了時に更新**: 作業内容を保存してから Beutl を終了したときに更新をインストールし、Beutl は閉じたままになります。

Flatpak のインストールでは、ダウンロードが終わるとすぐに新しいバンドルをインストールします。[Flatpak の更新](#flatpak-の更新)を参照してください。

ダウンロードや準備に失敗したときは、通知とダイアログに **再試行** が表示され、メッセージには失敗した手順が示されます。

新しく公開されたバージョンを初めて起動すると、**リリースノート** のある通知が表示され、そのバージョンのリリースページを開けます。

## 更新する前に

**2.0.0-preview.11 で保存したプロジェクトは、preview.10 以前では開けません。** 古い Beutl に戻す必要がある場合は、新しいバージョンで保存する前にプロジェクトフォルダー全体をコピーしてください。[プロジェクトの構造](./project-structure.md#version-compatibility)も参照してください。

preview.11 に更新すると、既存のプロジェクトの見た目や音が変わることがあります。

- **ストロークとフラットシャドウの輪郭は、見えている縁に沿います。** 輪郭をサブピクセルの精度でなぞるようになり、以前より約 0.5 ピクセル内側になりました。約 3% 未満のアルファと 1 ピクセルより小さな島には輪郭を付けず、半径が約 2.4 ピクセルまでの丸い角は尖った角として描きます。[ストローク](../reference/library/filter-effects/stroke.md)を参照してください。
- **無効にしたトランスフォームは何も動かしません。** 描画オブジェクトのトランスフォームに直接設定した単独のトランスフォームやグループは、オフにしても適用され続けていましたが、スイッチのとおり効かなくなりました。
- **スピードのキーフレームがすべて 100% のサウンドは、固定の 100% と同じように再生されます。** 入力はタイムストレッチされずにそのまま通ります。
- **プレビューのトーンマッピングはディスプレイに従います。** 以前のバージョンで保存したトーンマッピングの **なし** は新しい **自動** として読み込まれるので、HDR ディスプレイ上の HDR プレビューでは **ディスプレイに合わせる** が使われます。SDR のプレビューと書き出しは変わりません。[トーンマッピング](../settings/editor.md#トーンマッピング)を参照してください。

開いているシーンを一度保存した後は、変更した要素だけを書き込むので、その間に Beutl の外で編集した要素ファイルは、Beutl でもその要素を編集しない限り上書きされなくなりました。macOS では、右クリックメニューがネイティブのメニューになりました。[ネイティブのコンテキストメニューを使用](../settings/view.md#ネイティブのコンテキストメニューを使用)を参照してください。

AIコーディングエージェントを使用している場合は、更新後に [Beutl との連携を再インストール](../advanced/ai-agents.md)してください。

## ソース

- [`FlatpakUpdater.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/FlatpakUpdater.cs)
- [`AppUpdateController.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/AppUpdateController.cs) / [`StartupNotificationService.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/Services/StartupNotificationService.cs)
- [`UpdateDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/Dialogs/UpdateDialogViewModel.cs)
- [`release.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/release.yml)
- [`build-debian-package.yml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/.github/workflows/build-debian-package.yml)
- [`build-flatpak-package.yml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/.github/workflows/build-flatpak-package.yml)
- [`Build.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/nukebuild/Build.cs)
- [`FileFormat.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Core/Serialization/FileFormat.cs)
- [`AlphaOutlineTracer.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/AlphaOutlineTracer.cs)
- [`Transform.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/Transformation/Transform.cs)
- [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Media/SpeedIntegrator.cs)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Configuration/EditorConfig.cs)

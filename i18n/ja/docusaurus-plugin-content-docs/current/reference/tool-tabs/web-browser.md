---
title: "ブラウザ"
description: "エディター内でWebサイトを閲覧し、素材をダウンロードします。"
sidebar_position: 20
---

# ブラウザ

ドッキング可能なタブでWebサイトを閲覧し、ブックマークを登録したり、プロジェクト用の素材をダウンロードしたりできます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: はい

## 開き方

**表示 → ツール → ブラウザ** を開きます。各タブで異なるページを表示できます。ブラウザーエンジンを利用できない場合は、タブに表示されるランタイムのインストール案内に従ってください。

## ナビゲーションとページ操作

アドレスバーにHTTP/HTTPSのURLまたは検索語を入力します。戻る・進む・再読み込みを利用できます。新しいタブの空白ページで **ブックマークを追加** を押すと、URLと名前を登録できます。タブのメニューには新しいタブ、**ページ内検索**、ズーム、既定のブラウザーで開く、印刷があります。

- **`Ctrl + F`**（macOSでは **`Cmd + F`**）: ページ内検索。`Enter`で次の一致、`Shift + Enter`で前の一致に移動し、`Esc`で検索を閉じます。
- **`Ctrl + +` / `Ctrl + -`**（macOSでは **`Cmd`**）: ズーム。**`Ctrl + 0`**（macOSでは **`Cmd + 0`**）で100%に戻します。範囲は50%〜200%です。

## ダウンロード

保存先としてプロジェクト内の `resources/downloads` または共有の **素材** フォルダーを選択できます。対応する画像・動画・音声ファイルはタイムラインにも追加できます。

タブのメニューから **ダウンロード履歴** を開くと、ファイルや保存フォルダーを開く、対応素材を取り込む、再試行する、履歴の項目を削除する操作ができます。項目の削除ではダウンロード済みファイルは残ります。現在のページのメディアをダウンロードする操作では、保存方法を選択できます。

## 検索・プライバシー

タブのメニューの **検索・プライバシー** またはブラウザーの設定ページを開きます。

| 設定 | 既定値 |
|------|--------|
| 検索エンジン | Google（Bingも選択可能） |
| 検索候補 | オン |
| ダウンロード履歴を記録する | オン |
| 広告をブロック | オフ |
| フィルターリスト | EasyList |

広告ブロックにはHTTPSのフィルターURLを1行に1件入力し、**フィルターを更新** を実行します。EasyListに対応しますが、一部のルールに制限があり、更新は手動です。

ローカルのダウンロード履歴やブラウザーのCookieを削除できます。Cookieの削除はWebサイトからのログアウトを伴うため確認が表示され、ブラウザーエンジンが対応している場合に利用できます。

## 関連ドキュメント

- [ファイル](./file-browser.md)
- [素材とテンプレート](../../get-started/packages.md)

## ソース

- [`WebBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/WebBrowserTabExtension.cs)
- [`WebBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/ViewModels/WebBrowserTabViewModel.cs)
- [`WebBrowserTabView.PageTools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.PageTools.cs)
- [`WebBrowserTabView.Tools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.Tools.cs)
- [`BrowserProfile.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/BrowserProfile.cs)
- [`BrowserSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Pages/SettingsPages/BrowserSettingsPage.axaml)

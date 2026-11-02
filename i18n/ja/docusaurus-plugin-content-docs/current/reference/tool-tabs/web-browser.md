---
title: "ブラウザ"
description: "エディター内でWebサイトを閲覧し、ファイルをダウンロードします。"
sidebar_position: 20
---

# ブラウザ

ドッキング可能なタブでWebサイトを閲覧し、ブックマークを登録したり、プロジェクト用のファイルをダウンロードしたりできます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: はい

## 開き方

**表示 → ツール → ブラウザ** を開きます。各タブで異なるページを表示できます。ブラウザーエンジンを利用できない場合は、タブに表示されるランタイムのインストール案内に従ってください。

## ナビゲーションとページ操作

アドレスバーにHTTP/HTTPSのURLまたは検索語を入力します。戻る・進む・再読み込みを利用できます。新しいタブの空白ページで **ブックマークを追加** を押すと、URLと名前を登録できます。タブのメニューには新しいタブ、**ページ内検索**、ズーム、既定のブラウザーで開く、印刷があります。

Web ページを表示しているときは、タブのメニューの **ブックマークを追加** で現在の URL とページタイトルをそのまま登録できます。

ページの `window.open()` と、新しいウィンドウで開くリンクは新しいタブで開きます。このタブは開いたページのオリジンをリファラーとして送るので、直リンクを拒否する素材サイトでも要求が受け付けられます。表示していないタブはページを保持するので、切り替えて戻っても再読み込みされません（Linux の WPE WebKit を除く）。Linux では Cookie が再起動後も保持されます。

- **`Ctrl + F`**（macOSでは **`Cmd + F`**）: ページ内検索。`Enter`で次の一致、`Shift + Enter`で前の一致に移動し、`Esc`で検索を閉じます。
- **`Ctrl + +` / `Ctrl + -`**（macOSでは **`Cmd`**）: ズーム。**`Ctrl + 0`**（macOSでは **`Cmd + 0`**）で100%に戻します。範囲は50%〜200%です。

## ダウンロード

保存先としてプロジェクト内の `resources/downloads` または共有の **素材** フォルダーを選択できます。効果音やフォント、LUT をまとめた ZIP など、どのファイルも保存できます。例外は、サインインページなどファイルの代わりに返された Web ページだけです。対応する画像・動画・音声ファイルはタイムラインにも追加できます。

ページがスクリプトで生成したファイル（`blob:` や `data:` の URL）も同じバーに、ページが付けた名前で表示されます。バーと履歴ではファイルの提供元がそのページとして表示され、ブラウザーエンジンが作成元として別のサイトを示す場合はそのサイトとして表示されます。

タブのメニューから **ダウンロード履歴** を開くと、ダウンロードしたメディアファイルや各ファイルの保存フォルダーを開く、対応素材を取り込む、再試行する、履歴の項目を削除する操作ができます。ほかのファイルを開くとダウンロードしたプログラムが実行されるおそれがあるため、履歴から開けるのはメディアファイルだけです。生成されたファイルは再試行できません。項目の削除ではダウンロード済みファイルは残ります。**ファイルをダウンロード** では、現在のページのダウンロード方法を選択できます。

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

- [`WebBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/WebBrowserTabExtension.cs)
- [`WebBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/ViewModels/WebBrowserTabViewModel.cs)
- [`WebBrowserTabView.PageTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.PageTools.cs)
- [`WebBrowserTabView.Tools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.Tools.cs)
- [`BrowserProfile.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/BrowserProfile.cs)
- [`BrowserSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Pages/SettingsPages/BrowserSettingsPage.axaml)
- [`BrowserMediaDownload.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/WebBrowserTab/BrowserMediaDownload.cs)
- [`BrowserDownloadHistoryItem.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/WebBrowserTab/Views/BrowserDownloadHistoryItem.cs)

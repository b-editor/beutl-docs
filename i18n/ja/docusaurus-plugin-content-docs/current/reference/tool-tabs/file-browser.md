---
title: "ファイルブラウザ"
description: "ファイルブラウザタブの役割と主な使い方を説明します。"
sidebar_position: 3
---

# ファイルブラウザ

プロジェクトフォルダや任意のフォルダ内の **ファイルを参照・整理し、タイムラインへドラッグ&ドロップで取り込む** ためのタブです。
お気に入りの登録、プロジェクト内のメディアファイル検索、サムネイル表示、リネーム/削除/新規フォルダ作成といったファイル操作も行えます。

## タブの特性

- **デフォルトで開く**: はい
- **複数同時に開く**: できない

## 開き方

メニューバーの **「表示」→「ツール」→「ファイルブラウザ」** から開けます。

## 画面構成

タブは2種類のビューを切り替えて使います。

- **ホームビュー**（既定）: 「お気に入り」「プロジェクトディレクトリ」「メディアファイル」の3つのセクションを縦に並べて表示します
- **ディレクトリブラウズビュー**: フォルダの中身を一覧表示します。任意のフォルダを開くと切り替わります

ビューに関わらず、上部にツールバーが配置されます。

### ツールバーのボタン

| ボタン | 表示条件 | 動作 |
|--------|----------|------|
| **フォルダを開く** | ブラウズ時のみ | フォルダ選択ダイアログを開き、選んだフォルダの内容を表示 |
| **パンくずリスト** | ブラウズ時のみ | 現在のフォルダのパスを階層表示。クリックでその階層へジャンプ |
| **表示モード切替** | ブラウズ時のみ | 押すたびに **リスト → ツリー → アイコン** の順で切り替わる |
| **新しいフォルダ** | ブラウズ時のみ | 現在のフォルダに新しいフォルダを作成 |
| **更新** | 常時 | 表示中の内容を再読み込み |
| **ホーム** | 常時 | ホームビューに戻る |

ファイルシステムの変更は自動で監視されており、ファイル/フォルダの追加・削除・リネーム・更新があると、自動的に表示が更新されます。プロジェクト系のファイル（`.bep` / `.scene` / `.belm` / `.beutl` を含むパス）は頻繁に書き換わるため監視対象から除外されます。

## ホームビュー

各セクションは見出しのトグルで **折りたたみ/展開** でき、見出し右の小さなボタンで **アイコン表示 / リスト表示** を切り替えられます。

### お気に入り

任意のフォルダ・ファイルを登録できる場所です。先頭には **「テンプレート」** フォルダ（タイムラインで「テンプレートとして保存」した要素の保存先）が常に表示されます。

- 登録内容は設定として永続化され、次回以降の起動でも保持されます
- 登録方法: 項目の右クリックメニュー **「お気に入りに追加」**、またはこのセクションへのドラッグ&ドロップ
- 解除方法: 登録済み項目の右クリックメニュー **「お気に入りから削除」**
- 何も登録されていないときは案内テキストが表示されます

### プロジェクトディレクトリ

開いているシーンが属するプロジェクトのフォルダ内容を一覧表示します。プロジェクトを開いていない場合はシーンファイルの親フォルダが対象になります。

### メディアファイル

プロジェクトフォルダ配下を **再帰的に検索** し、見つかった画像・動画・音声ファイルを最大200件まで一覧表示します。

## ディレクトリブラウズビュー

選んだフォルダの中身を、ツールバーで設定した表示モードで一覧します。

### 表示モード

- **アイコン**: 64×64 のサムネイル/アイコンとファイル名をタイル状に並べる
- **リスト**: 24×24 のサムネイル/アイコンとファイル名を1行ずつ並べる
- **ツリー**: フォルダを展開しながら階層構造をたどる

### サムネイルとツールチップ

画像（png / jpg / jpeg / gif / bmp / webp / ico / tiff / tif）と動画（mp4 / avi / mov / mkv / wmv / flv / webm）はサムネイルが自動生成されます。サムネイルを生成できないファイルは拡張子に応じたアイコンで表示されます。

項目にマウスを乗せると、メディア情報のツールチップが表示されます。

- **動画**: 解像度・フレームレート・コーデック・長さ・ファイルサイズ
- **音声**（mp3 / wav / ogg / flac / aac / wma / m4a）: コーデック・サンプリングレート・チャンネル数・長さ・ファイルサイズ
- **その他のファイル**: ファイルサイズと最終更新日

## アイテムの操作

### マウス操作

- **シングルクリック**: 選択（`Ctrl` / `Shift` で複数選択）
- **ダブルクリック**: フォルダなら中に入る、ファイルならOSの既定アプリで開く
- **ドラッグ**: タイムラインや他のタブ、外部アプリ（Finder / Explorer など）にファイル/フォルダを渡す

### 右クリックメニュー

| 項目 | 動作 |
|------|------|
| **開く** | フォルダなら中に入る、ファイルなら既定アプリで開く |
| **名前の変更** | フライアウトで新しい名前を入力（同名のファイル/フォルダがある場合はエラー表示） |
| **削除** | 確認ダイアログを経てゴミ箱ではなく完全削除。複数選択中は一括削除 |
| **お気に入りに追加 / お気に入りから削除** | お気に入りの登録状態に応じて表示が切り替わる |

## ドラッグ&ドロップ

### ファイルブラウザの中から外へ

ファイルブラウザの項目を **タイムライン** や **要素プロパティ**、**Finder / Explorer** などへドラッグして渡せます。複数選択している項目をまとめてドラッグすることもできます。動画・画像・音声ファイルをタイムラインにドロップすると、対応する要素として追加されます。

### ファイルブラウザの中で移動

ファイルブラウザ内の項目を、別のフォルダや別セクションへドラッグすると **移動** になります（コピーではありません）。

- フォルダ項目の上にドロップ → そのフォルダの中へ移動
- ブラウズビューの空き領域にドロップ → 現在表示中のフォルダへ移動
- ホームビューの **プロジェクトディレクトリ** セクションにドロップ → プロジェクトフォルダへ移動
- ホームビューの **メディアファイル** セクションにドロップ → プロジェクトフォルダ内の `resources` フォルダへ移動（無ければ自動作成）
- 同じフォルダ内へのドロップや、自分自身/自分の子孫へのフォルダ移動はスキップされます

### 外部からファイルブラウザへ

OSのファイラーなどからドロップすると **コピー** になります（同名ファイルが既にあるときは上書きしません）。

- フォルダ項目の上にドロップ → そのフォルダの中へコピー
- **お気に入り** セクションにドロップ → そのパスをお気に入りに登録
- **プロジェクトディレクトリ** セクションにドロップ → プロジェクトフォルダへコピー
- **メディアファイル** セクションにドロップ → プロジェクトフォルダ内の `resources` フォルダへコピー

## 関連ドキュメント

- [プロジェクトの構造](../../get-started/project-structure.md)
- [要素を追加する](../../get-started/add-element.md)
- [タイムライン](./timeline.md)

## ソース

- [`FileBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/FileBrowserTabExtension.cs)
- [`FileBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/ViewModels/FileBrowserTabViewModel.cs)
- [`FileSystemItemViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/ViewModels/FileSystemItemViewModel.cs)
- [`FileBrowserTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileBrowserTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileBrowserTabView.axaml.cs)
- [`FileItemDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileItemDragBehavior.cs)
- [`FileSelectionBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Views/FileSelectionBehavior.cs)
- [`MediaFileSearcher.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/MediaFileSearcher.cs)
- [`FileThumbnailService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/FileThumbnailService.cs)
- [`FavoritesManager.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/FavoritesManager.cs)
- [`DirectoryWatcherService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/FileBrowserTab/Services/DirectoryWatcherService.cs)

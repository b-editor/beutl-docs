---
title: "ターミナル"
description: "ターミナルタブの役割と使い方を説明します。"
sidebar_position: 16
---

# ターミナル

このタブでは、エディター内で**シェルを実行**できます。プロジェクトフォルダーで起動するため、Beutlを離れずに `claude` (Claude Code) や `codex` などのAIコーディングエージェントをプロジェクトに対して実行できます。`ffmpeg` や `git` などのコマンドも実行できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数インスタンスの許可**: はい

## 開き方

メニューバーの **表示 → ツール → ターミナル** から開きます。

## シェルと作業ディレクトリ

[設定 → ターミナル](#settings)でシェルを指定しない限り、Beutlが環境に応じて起動するシェルを選びます。

| OS | シェル | 引数 |
|----|-------|------|
| Windows | `%COMSPEC%` (未設定時は `cmd.exe`) | なし |
| macOS | `$SHELL` (未設定時は `/bin/zsh`) | `-l` (ログインシェル) |
| Linux | `$SHELL` (未設定時は `/bin/bash`) | `-l` (ログインシェル) |

macOSとLinuxでは、Beutlがシェルを**ログインシェル**として起動するため、プロファイル(`PATH`などの設定)が読み込まれます。

作業ディレクトリは**現在のプロジェクトのフォルダー**です。プロジェクトが開かれていない場合は、シーンファイルのフォルダーが使われます。

:::info
macOSとLinuxでは、GUIから起動したアプリの環境にロケールが含まれないことが多いため、そのままではマルチバイト出力が文字化けします。`LC_ALL` / `LC_CTYPE` / `LANG` のいずれも設定されていない場合、Beutlは現在のUIカルチャから導出した `LANG` のフォールバック値(例: `ja_JP.UTF-8`)をシェルに渡します。
:::

## コピーと貼り付け

テキストはドラッグして選択します。テキストを選択している間は、`Ctrl + C` または `Ctrl + Shift + C`（macOS では `Cmd + C`）でコピーします。何も選択していないときの `Ctrl + C` は、これまでどおりシェルに渡されます。貼り付けは `Ctrl + Shift + V` または `Shift + Insert`（macOS では `Cmd + V`）で、`Ctrl + V` だけを押したときはシェルに渡されます。

右クリックすると、選択しているテキストをコピーし、何も選択していないときは貼り付けます。ターミナル内のプログラムがマウス操作を受け取っている間は、`Shift` を押しながら右クリックします。

## 設定 {/* #settings */}

**設定 → ターミナル** で、ターミナルの見た目と、起動するシェルを変更できます。**表示** の変更は、開いているターミナルにすぐ反映されます。

| 設定 | 既定値 |
|------|--------|
| **テーマ** | **Beutl のテーマに合わせる**（**ダーク** と **ライト** も選択可能） |
| **フォント** | **既定**: Windows では Consolas、macOS では Menlo、Linux では DejaVu Sans Mono |
| **フォントサイズ (DIP)** | 14（8〜72） |
| **スクロール履歴の行数** | 5,000（0〜1,000,000） |

**Beutl のテーマに合わせる** では、文字と背景の色を Beutl のテーマから取るので、ターミナルが周りのパネルになじみます。**フォント** には、コンピューターにインストールされているフォントが並びます。

**起動シェル** の **実行ファイル** と **引数** で、ターミナルが起動するものを指定します。両方とも空欄にすると、上の表のシェルと引数を使います。空欄の **実行ファイル** には既定のシェルが表示されます。引数は 1 行に 1 つ入力し、行内の空白はそのまま渡されます。入力した引数は既定の `-l` の代わりになり、**実行ファイル** に入力したシェルには入力した引数だけが渡されます。これらの変更は、ターミナルの新規起動時または再起動時に反映されます。

## セッションのライフサイクル

- シェルプロセスが終了すると、タブ上部に**「ターミナルセッションは終了しました。」**というバナーと**「再起動」**ボタンが表示されます。ボタンをクリックすると、同じ作業ディレクトリで、そのときの設定が選ぶシェルの新しいセッションを開始します。それまでの出力はスクロールバックに残ります。
- **実行ファイル** に存在しないプログラムを指定したときなど、シェルを起動できない場合は、タブにエラーが表示され、同じバナーと**「再起動」**ボタンが表示されます。
- スクロールバックには、**スクロール履歴の行数** で指定した行数まで残ります。
- 同じドック内の別のタブに切り替えてから戻っても、シェルプロセスとスクロールバックはそのまま保たれます。
- セッションは保存されません。タブまたはエディターを閉じると、シェルプロセスも終了します。

## 関連ドキュメント

- [ツールタブ](./index.md)
- [プロジェクトの構造](../../get-started/project-structure.md)

## ソース

- [`TerminalTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/TerminalTabExtension.cs)
- [`TerminalTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/ViewModels/TerminalTabViewModel.cs)
- [`TerminalTabView.axaml`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml.cs) / [`ShellTerminalControl.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Editor.Components/TerminalTab/Views/ShellTerminalControl.cs)
- [`TerminalConfig.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl.Configuration/TerminalConfig.cs) / [`TerminalSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Pages/SettingsPages/TerminalSettingsPage.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/4ca0cc18507a50d94678d11a386fd477dd75125e/src/Beutl/Pages/SettingsPages/TerminalSettingsPage.axaml.cs)
- ターミナルコントロール自体は [RoyalTerminal](https://github.com/royalapplications/RoyalTerminal)（`RoyalApps.RoyalTerminal.Avalonia`）が提供しています。

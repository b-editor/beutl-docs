---
title: "ターミナル"
description: "ターミナルタブの役割と使い方を説明します。"
sidebar_position: 14
---

# ターミナル

このタブでは、エディター内で**シェルを実行**できます。プロジェクトフォルダーで起動するため、Beutlを離れずに `claude` (Claude Code) や `codex` などのAIコーディングエージェントをプロジェクトに対して実行できます。`ffmpeg` や `git` などのコマンドも実行できます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数インスタンスの許可**: はい

## 開き方

メニューバーの **表示 → ツール → ターミナル** から開きます。

## シェルと作業ディレクトリ

Beutlが環境に応じて起動するシェルを自動的に選びます。このための設定項目はありません。

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

## セッションのライフサイクル

- シェルプロセスが終了すると、タブ上部に**「ターミナルセッションは終了しました。」**というバナーと**「再起動」**ボタンが表示されます。ボタンをクリックすると、同じシェルと作業ディレクトリで新しいセッションを開始します。
- スクロールバックバッファは最大5,000行です。
- セッションは保存されません。タブまたはエディターを閉じると、シェルプロセスも終了します。

## 関連ドキュメント

- [ツールタブ](./index.md)
- [プロジェクトの構造](../../get-started/project-structure.md)

## ソース

- [`TerminalTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/TerminalTabExtension.cs)
- [`TerminalTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/ViewModels/TerminalTabViewModel.cs)
- [`TerminalTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/TerminalTab/Views/TerminalTabView.axaml.cs)
- ターミナルコントロール自体は外部サブモジュール [`Iciclecreek.Avalonia.Terminal`](https://github.com/b-editor/beutl/tree/main/external) が提供しています。

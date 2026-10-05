---
title: "バージョン管理"
description: "Gitでプロジェクトのバージョンを記録・比較・復元します。"
sidebar_position: 19
---

# バージョン管理

プロジェクトのバージョンをGitに記録し、ファイルの差分を確認したり、過去の状態を復元したり、リモートリポジトリと同期したりできます。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: いいえ

## 開き方

**表示 → ツール → バージョン管理** を開きます。Git 2.36以降がインストールされ、Beutlから利用できる必要があります。

新規プロジェクトでは作成ダイアログの **Git で履歴を記録** を有効にします。既存のプロジェクトでは、このタブの **バージョン管理を有効化…** を選択します。コミット用の名前とメールアドレスが未設定の場合は入力を求められます。

## バージョンの記録と比較

- **コミットメッセージ** を入力して **コミット** を押すと、現在のプロジェクト状態を記録します。
- **バージョン履歴** のコミットを選び、**変更されたファイル** からファイルを選ぶと差分を表示します。
- 既定では、明示的な保存時とプロジェクトを閉じるときも、変更があればバージョンを記録します。編集内容の自動保存とGitへのバージョン記録は別の操作です。

## 復元とブランチ

バージョンを選択して **復元** を押します。現在の変更を保存し、必要に応じて安全スナップショットを記録してからプロジェクトを閉じ、選択した状態を新しいコミットとして記録して開き直します。既存のGit履歴は保持されますが、エディターの現在の取り消し履歴は消去されます。

**新しいブランチに復元…** は現在の先頭からブランチを作り、その上に選択したプロジェクト状態を適用します。ウィンドウ上部のブランチ表示からも、作成と切り替えができます。

プロジェクトが大きなリポジトリの一部である場合、ブランチの切り替えはリポジトリ全体に影響します。切り替える前に確認ダイアログの内容を確認してください。

## リモートとの同期

**リモートを設定…** で既存のリモートリポジトリのURLを入力します。**プッシュ** はローカルのバージョンを送信し、**プル** はfast-forward更新を取り込んでプロジェクトを開き直します。**ブランチを公開…** はリモートを設定してブランチをプッシュします。

認証はGitの資格情報ヘルパーまたはSSHエージェントで設定します。履歴の分岐や未解決の競合は、外部のGitツールで解決してからBeutlでの操作を続けてください。

## 設定

**設定 → エディター** にバージョン管理の設定があります。

| 設定内容 | 既定値 |
|----------|--------|
| 新規プロジェクトをGitで管理 | オン |
| 明示的な保存時にバージョンを記録 | オン |
| プロジェクトを閉じるときにバージョンを記録 | オン |
| 利用可能な場合にGit LFSを使用 | オン |
| Gitの実行ファイルのパス | 自動検出 |
| 大きなメディアの警告しきい値 | 50 MB |

Git LFSは大きなメディアを通常のGitオブジェクトとは別に保存します。リモートのLFS容量と帯域幅の上限は適用されます。

## 関連ドキュメント

- [プロジェクトを作成する](../../get-started/create-project.md)
- [プロジェクトの構造](../../get-started/project-structure.md)

## ソース

- [`VersionControlTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PrimitiveImpls/VersionControlTabExtension.cs)
- [`VersionControlTabViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlTabViewModel.cs)
- [`VersionControlCoordinator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/VersionControlCoordinator.cs)
- [`VersionControlConfig.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Configuration/VersionControlConfig.cs)
- [`GitInstallationLocator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor/VersionControl/GitInstallationLocator.cs)

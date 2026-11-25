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

新規プロジェクトでは作成ダイアログの **Git で履歴を記録** を有効にします。既存のプロジェクトでは、このタブの **バージョン管理を有効化…** を選択します。コミット用の名前とメールアドレスが未設定の場合は入力を求められます。既存のリポジトリから始めるには、[クローン](#cloning-a-repository)します。

## バージョンの記録と比較

- **コミットメッセージ** を入力して **コミット** を押すと、現在のプロジェクト状態を記録します。
- **バージョン履歴** のコミットを選び、**変更されたファイル** からファイルを選ぶと差分を表示します。
- 既定では、明示的な保存時とプロジェクトを閉じるときも、変更があればバージョンを記録します。編集内容の自動保存とGitへのバージョン記録は別の操作です。

## 復元とブランチ

バージョンを選択して **復元** を押します。現在の変更を保存し、必要に応じて安全スナップショットを記録してからプロジェクトを閉じ、選択した状態を新しいコミットとして記録して開き直します。既存のGit履歴は保持されますが、エディターの現在の取り消し履歴は消去されます。

**新しいブランチに復元…** は現在の先頭からブランチを作り、その上に選択したプロジェクト状態を適用します。ウィンドウ上部のブランチ表示からも、作成と切り替えができます。

プロジェクトが大きなリポジトリの一部である場合、ブランチの切り替えはリポジトリ全体に影響します。切り替える前に確認ダイアログの内容を確認してください。

## リモートとの同期

コミットメッセージの下にある操作ボタンのメニューで **リモートを設定…** を選ぶと **Git リモートに接続** が開き、次の3つの方法で接続できます。

- **Beutl で作成** は、**リポジトリ名**（既定はプロジェクト名）でBeutlリポジトリを作成して接続します。名前は、スラッシュ、バックスラッシュ、制御文字を含まない80文字以内です。
- **既存から選択** には、アカウントのBeutlリポジトリが一覧表示されます。検索して選択します。
- **Git URL** では、任意のGitリポジトリの **リモート URL** を入力します。

Beutlリポジトリを使うにはBeutlにサインインしている必要があり、サインインしていない場合はダイアログに **Beutl にサインイン** が表示されます。プロジェクトにリモートがすでにある場合は、そのURLと **現在の origin が置き換わります。** という警告が表示されます。リモートがなく、コミットする変更も残っていないときは、操作ボタンに **ブランチを公開…** と表示されます。これは同じダイアログを開き、**作成して公開** または **接続して公開** でリモートを接続してからブランチをプッシュします。

**プッシュ** はローカルのバージョンを送信し、**プル** はfast-forward更新を取り込んでプロジェクトを開き直します。Beutlリポジトリでは、操作ボタンのメニューとブランチ表示の **Web で開く** でリポジトリをブラウザーで開き、バージョンの右クリックメニューの **Web でこのコミットを表示** でそのバージョンを開きます。

Beutlリポジトリでは、Beutlがアクセストークンを発行して安全なGitの資格情報ヘルパーに保存するので、認証を自分で設定する必要はありません。Beutlにサインインしている間にリポジトリの認証に失敗した場合は、エラー通知の **Beutl リモートに再接続** で新しいトークンを発行してから、操作をもう一度実行します。そのほかのリモートの認証は、Gitの資格情報ヘルパーまたはSSHエージェントで設定します。履歴の分岐や未解決の競合は、外部のGitツールで解決してからBeutlでの操作を続けてください。

サインインした状態でBeutlリポジトリにプッシュすると、プロジェクトのサムネイルもアップロードされます。このコンピューターにないリポジトリには、スタート画面でそのサムネイルが表示されます。

### 進捗

プッシュ、プル、ブランチの公開の間は、操作ボタンの下に現在の段階と進捗バーが表示されます。Gitが割合を報告するときは割合が表示され、リモートを待っているときなどはバーが割合なしで動きます。Git LFSの転送では、転送量と速度も表示されます。操作が終わるまで、操作ボタンは **キャンセル** になります。

コミットの作成、バージョンの復元、ブランチの切り替え、プルした変更の適用とプロジェクトの開き直しの間は、エディターの領域に **コミットを作成中…**、**バージョンを復元中…**、**ブランチを切り替え中…**、**リモートの変更を適用中…** のように処理の内容が表示されます。

## リポジトリをクローンする {/* #cloning-a-repository */}

**ファイル → リポジトリからクローン…** を選ぶか、スタート画面の **リポジトリからクローン** を選びます。

1. **Beutl リポジトリ** を選んで自分のリポジトリを選択するか、**URL からクローン** を選んで **リモート URL** を入力します。Beutlリポジトリを使うにはBeutlにサインインしている必要があります。
2. **保存先** で **親フォルダー** と **フォルダー名** を指定します。フォルダー名は、変更するまでリポジトリ名に合わせて入力されます。保存先は空のフォルダーか、まだ存在しないフォルダーにします。
3. **クローン** を押します。ダイアログに進捗が表示され、**キャンセル** でクローンを中止できます。Gitがない場合やバージョンが古い場合は、ダイアログにその旨と **Git をダウンロード** が表示されます。

Beutlはプロジェクトを開く前に、リポジトリのGit LFSファイルをダウンロードします。リポジトリにGit LFSファイルがあり、Git LFSがインストールされていない場合は、クローンを中止してGit LFSのインストールを求めます。クローンしたリポジトリにプロジェクトが1つあればそれを開き、複数あれば **開くプロジェクトを選択** で選びます。プロジェクトがない場合は、**新規作成** でクローンしたフォルダーにプロジェクトを作成するか、**フォルダーを開く** を選びます。

BeutlのWebサイトにあるリポジトリのリンクからは、そのリポジトリを選択した状態でこのダイアログが開きます。リンクがブランチ、タグ、コミットを指定している場合は、**リビジョン** とその名前が表示されます。そのリポジトリのプロジェクトをすでに開いている場合は、その旨が表示されます。最近使ったプロジェクトにそのリポジトリのものがある場合は、先に **ローカルを開く** か **新しくクローン** かを選びます。

サインインしている間は、スタート画面にもBeutlリポジトリが一覧表示されます。[プロジェクトを作成する](../../get-started/create-project.md)を参照してください。

## 設定

**設定 → エディター** にバージョン管理の設定があります。

| 設定内容 | 既定値 |
|----------|--------|
| 新規プロジェクトを既定で追跡 | オン |
| 保存時にバージョンを記録 | オン |
| 閉じるときにバージョンを記録 | オン |
| 利用可能な場合は Git LFS を使用 | オン |
| Git 実行ファイル | 自動 |
| 大きなメディアの警告しきい値（MB） | 50 |

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
- [`VersionControlTabView.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/Views/VersionControlTabView.axaml) / [`VersionControlTabViewModel.Remote.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlTabViewModel.Remote.cs) / [`VersionControlRemoteProgress.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/VersionControlRemoteProgress.cs)（リモートと進捗）
- [`ConnectRemoteDialog.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/Views/ConnectRemoteDialog.axaml) / [`ConnectRemoteDialogViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/VersionControlTab/ViewModels/ConnectRemoteDialogViewModel.cs) / [`HostedGitRepositoryConnection.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/VersionControl/HostedGitRepositoryConnection.cs)
- [`CloneRepositoryDialog.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Views/Dialogs/CloneRepositoryDialog.axaml) / [`RepositoryCloneWorkflow.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/RepositoryCloneWorkflow.cs) / [`GitRepositoryCloner.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor/VersionControl/GitRepositoryCloner.cs)（クローン）
- [`EditorHostViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/EditorHostViewModel.cs)（エディターの領域の進捗表示） / [`ProjectThumbnailService.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Services/ProjectThumbnailService.cs)（サムネイル）
- [`EditorSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Pages/SettingsPages/EditorSettingsPage.axaml)（設定）

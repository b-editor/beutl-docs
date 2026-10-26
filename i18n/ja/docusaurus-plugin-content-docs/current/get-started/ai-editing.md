---
title: AIエージェントと編集する
description: AIコーディングエージェントをセットアップして、対話でプロジェクトを編集する方法を説明します
sidebar_position: 8
---

Claude Code や Codex などの **AIコーディングエージェント** からBeutlのプロジェクトを編集できます。「タイトルをフェードインさせて」「全カットにビネットを追加して」のように、変更したい内容を自然な言葉で伝えると、エージェントが開いているプロジェクトに変更を適用します。編集は**プレビューとタイムラインに即時反映**され、各変更はアンドゥ履歴に記録されるため、エージェントの作業はいつでも取り消せます。

## 前提条件

- AIコーディングエージェント(例: [Claude Code](https://code.claude.com/docs/) や Codex)がインストールされていること。
- Beutlのプロジェクト。まだない場合は[プロジェクトを作成する](./create-project.md)を参照してください。

## 1. 連携をインストールする

1. **設定 → AI エージェント** を開きます。
2. **エージェント**を選びます(Claude Code、Codex、Cursor、Gemini CLI など多数に対応)。
3. **インストール範囲**を選びます。
   - **プロジェクト**: 1つのプロジェクトフォルダーにインストールします。試してみる場合に向いています。
   - **グローバル（ユーザープロファイル）**: どのフォルダーからでも使えます。
4. **コンポーネント**(スキル・サブエージェント・MCP サーバー)はチェックされたまま **インストール** を押します。

インストールすると、Beutlプロジェクトを編集するための手順とエージェントの接続設定が追加されます。Beutl が設定を書き込むか、エージェントの登録コマンドを実行します。自動登録に対応していない場合や失敗した場合は、ページに表示された案内に従ってください。

preview.8 から更新した場合は連携を再インストールしてください。旧 `beutl-live` 接続とそのトークンは、単一の `beutl-agent` サーバーに置き換わります。編集済みのスキル・サブエージェントファイルは、置き換える前にバックアップされます。

## 2. エージェントと編集する

1. Beutlでプロジェクトを開きます。
2. プロジェクトフォルダーでエージェントを起動します。組み込みの[ターミナルタブ](../reference/tool-tabs/terminal.md)は最初からそのフォルダーで開くため、この手順に利用できます。Claude Codeなら `claude` を実行します。
3. やりたいことを伝えます。例:

```text
濃紺の背景と、最初の1秒でフェードインするタイトルを追加して。
```

インストールされた `beutl-agent` サーバーは、`list_instances` で起動中のエディターを、`list_scenes` でシーンを検出します。エージェントは選んだ `instanceId` と `sceneId` をシーン編集の呼び出しに渡します。複数開いている場合は、どのプロジェクト・シーンを編集するか伝えてください。変更内容は作業中にプレビューとタイムラインへ表示されます。

:::tip
**設定 → AI エージェント**の **Live MCP の編集を追跡（実験的）** を有効にすると、エージェントの編集に合わせて画面のシーン、再生位置、プロパティエディターを表示します。`instanceId` を省略すると、起動中のエディターではなく、プロジェクトファイルのヘッドレス編集になります。
:::

## 3. 結果を確認する

- エージェントの編集はすべて**アンドゥ履歴**に記録されます。気に入らない変更は `Ctrl + Z` (`Cmd + Z`) で取り消せます。
- エージェントは静止画やストーリーボードをレンダリングして結果を確認できます。それでも、[エンコード](./encode.md)の前には必ず自分でシーンを再生して確認してください。

## さらに詳しく

- [AIエージェントによる編集(詳細)](../advanced/ai-agents.md) — 接続の詳細、自動化向けのヘッドレス編集、ツール一覧。

## 関連ドキュメント

- [内蔵のAIワークスペース](../reference/tool-tabs/ai-workspace.md)

## ソース

- [`AiAgentSettingsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/SettingsPages/AiAgentSettingsPageViewModel.cs)
- [`LiveInstanceTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Live/LiveInstanceTools.cs)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostTools.cs)
- [`AgentEditFollower.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentEditFollower.cs)

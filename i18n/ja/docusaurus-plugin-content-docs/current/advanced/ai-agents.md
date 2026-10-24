---
title: AIエージェントによる編集
description: MCPを通じてAIコーディングエージェントでBeutlプロジェクトを編集する
sidebar_position: 6
---

# AIエージェントによる編集

Beutlでは、**AIコーディングエージェント**(Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot など多数)から **Model Context Protocol (MCP)** を通じてプロジェクトを編集できます。エージェントはシーンを宣言的ドキュメントとして読み取り、JSON Merge PatchをBeutlのアンドゥ履歴経由で適用します。静止画やストーリーボードをレンダリングして、結果を確認することもできます。

インストールされる MCP サーバーは **`beutl-agent` の1つ**です。Live 編集とヘッドレスのファイル編集の両方に対応し、stdio で通信します。呼び出しごとに対象を指定します。

## アプリからのセットアップ

**設定 → AI エージェント** を開きます。

1. **エージェント**と**インストール範囲**（**プロジェクト**または**グローバル（ユーザープロファイル）**）を選びます。プロジェクトへのインストールでは**プロジェクトフォルダー**も選択します。
2. **コンポーネント**で**スキル**、**サブエージェント**（対応している場合）、**MCP サーバー**を選びます。
3. **インストール**を押します。Beutl が設定ファイルを書き込むか、エージェントの CLI で登録します。自動登録に対応していない場合や失敗した場合は、ページに表示された案内に従ってください。

MCP の実行ファイルは Beutl に同梱されています。見つからない場合は Beutl を再インストールするか、**詳細設定 → コマンド**と**引数（1 行に 1 つ）**で既存のサーバーを指定してください。生成される設定は `BEUTL_HOME` に Beutl のプロファイルディレクトリを指定し、同じプロファイルで起動中のエディターを検出します。Live 接続の URL や Bearer トークンをエージェント設定にコピーする必要はありません。

:::note[以前の連携から更新する場合]

Beutl の更新後に連携を再インストールしてください。従来の分離した構成が `beutl-agent` に置き換わり、別の `beutl-live` エントリとそのトークンが削除されます。編集済みのスキル・サブエージェントファイルは、置き換える前に `.bak` としてバックアップされます。JSON 設定にコメントがある場合は変更せず、手動で追加するエントリと削除する旧エントリを表示します。

:::

## 起動中のエディターを編集する

1. `list_instances` を呼び出し、プロセス ID、プロジェクト、アクティブなシーンから対象のエディターを確認します。
2. その `instanceId` を `list_scenes` に渡し、返された `sceneId` を選びます。
3. 以降の Live 呼び出しには、ジョブの状態確認も含めて毎回 `instanceId` を渡します。シーンの読み取り、編集、履歴操作、レンダリングには `sceneId` も渡します。カタログの問い合わせとジョブの状態確認には `sceneId` は不要です。

アタッチ操作や共有のシーン選択状態はありません。通常、シーン操作は画面で選択中のエディターを切り替えません。**設定 → AI エージェント**の **Live MCP の編集を追跡（実験的）** を有効にすると、編集や静止画のレンダリングに合わせて、シーンタブ、選択、再生位置、プロパティエディターを表示します。

インスタンスが利用できなくなった場合は、`list_instances` で検出し直してください。`instanceId` を省略するとヘッドレスのファイル編集になり、アクティブなエディターへの接続にはなりません。

## ファイルをヘッドレスで編集する

`instanceId` を指定しない場合、同じサーバーがファイルを対象とするセッションを使用します。`open_project` または `create_project` から始めてください。このセッションには `sceneId` も渡しません。編集後は `save_project` で保存します。

プロジェクト、入力メディア、出力先など、ツールに渡すファイルパスは**絶対パス**にしてください。従来の `BEUTL_WORKSPACE` 設定は使用されず、相対パスの基準となるワークスペースルートはありません。

手動登録する場合の一般的な JSON 設定例です。

```json
{
  "mcpServers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "/absolute/path/to/Beutl.AgentToolkit.Mcp",
      "env": { "BEUTL_HOME": "/absolute/path/to/beutl-profile" }
    }
  }
}
```

実行ファイルとプロファイルのパスはインストール環境に合わせてください（Windows の実行ファイル名は `Beutl.AgentToolkit.Mcp.exe`）。設定形式はエージェントによって異なります。**設定 → AI エージェント**からのインストールでは、適切な形式が選ばれます。

## 利用できるツール(概要)

最初に `get_started` を呼び出します。このツールから簡潔な利用ガイドが返されます。

| グループ | ツール |
|---------|-------|
| Live 対象の検出 | `list_instances`, `list_scenes` |
| セッション | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status` |
| クエリ / スキーマ | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_fonts`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds` |
| 編集 | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| 履歴 | `undo`, `redo`, `read_history` |
| レンダー / 確認 | `render_still`, `render_storyboard`, `measure_frame_differences`, `analyze_audio_rhythm`, `export_video`, `read_render_job`, `cancel_render_job` |
| AI生成（起動中のエディター） | `list_ai_models`, `generate_image`, `edit_image`, `generate_video`, `edit_video`, `transcribe_audio`, `list_ai_jobs`, `read_ai_job`, `cancel_ai_job` |

AI生成は、起動中の Beutl にサインインしたアカウントとその AI クレジットを使用します。生成の呼び出しごとに課金対象のリクエストが発生します。生成メディアは対象シーンの隣に保存され、`apply_edit` で配置できます。タイムアウト後は生成を繰り返さず、`read_ai_job` で既存ジョブを確認するか、`list_ai_jobs` で探してください。読み込んだ拡張機能がツールを追加することもあります。

`apply_edit` は完全な望ましい状態の `desired` または部分変更の `patch` の、いずれか一方を受け取ります。部分編集にはJSON Merge Patchの `patch` を使用し、`get_schema` で確認した `schemaVersion` も指定してください。完全な `desired` は状態全体を指定するため、省略した子要素の配列が削除されることがあります。

## 編集と確認

1. `get_started` で接続先の利用方法を確認し、`read_document_summary` や対象を絞った `get_schema` で現在の状態を確認します。
2. パッチを適用し、返された操作結果と検証内容を確認します。警告は参考情報です。
3. `render_still` や `render_storyboard` で描画結果を確認します。見た目や動きが指示に合っていることを確認してから次に進みます。
4. ファイルベースのセッションでは、大きな編集の成功後と最終調整後に `save_project` を呼び出します。Liveセッションではこのツールは保存に対応せず、エディターの自動保存またはBeutlの保存操作を使用します。

`undo`・`redo` は履歴経由で編集を取り消し・やり直します。Liveセッションはユーザーと同じ履歴を共有するため、取り消す前に `read_history` の `nextUndo` を確認してください。ファイルベースのセッションでは、取り消し後も `save_project` で保存します。

## ソース

- [`AgentToolkitMcpServer.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/AgentToolkitMcpServer.cs)
- [`LiveInstanceTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Live/LiveInstanceTools.cs)
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostTools.cs)
- [`AiAgentSettingsPageViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/SettingsPages/AiAgentSettingsPageViewModel.cs)
- [`AgentToolkitInstallModels.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Installation/AgentToolkitInstallModels.cs)
- [`ToolPaths.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.AgentToolkit/Common/ToolPaths.cs)
- [`AgentHostAiTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentHostAiTools.cs)
- [`AgentEditFollower.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/AgentHost/AgentEditFollower.cs)

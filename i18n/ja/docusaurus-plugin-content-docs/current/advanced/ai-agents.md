---
title: AIエージェントによる編集
description: MCPを通じてAIコーディングエージェントでBeutlプロジェクトを編集する
sidebar_position: 6
---

# AIエージェントによる編集

Beutlでは、**AIコーディングエージェント**(Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot など多数)から **Model Context Protocol (MCP)** を通じてプロジェクトを編集できます。エージェントはシーンを宣言的ドキュメントとして読み取り、JSON Merge PatchをBeutlのアンドゥ履歴経由で適用します。静止画やストーリーボードをレンダリングして、結果を確認することもできます。

Beutlには2つのMCPサーバーがあります。

- **Live MCP サーバー**(推奨): Beutlアプリ内で動作し、エージェントを**実行中のエディタ**に接続します。編集内容は作業中にプレビューとタイムラインへ反映され、すべての変更がアンドゥスタックに記録されます。
- **Stdio MCP サーバー**(オプション): ヘッドレスプロセスとして動作し、**GUIを起動せずに**プロジェクトファイルを編集します。自動化向けのサーバーです。

## アプリからのセットアップ

**設定 → AI エージェント** を開きます。

1. インストール対象の**エージェント**(Claude Code、Codex、Cursor、Gemini CLI、…、または「カスタム」)と、**インストール範囲**(**プロジェクト**(プロジェクトフォルダーへ)または**グローバル(ユーザープロファイル)**)を選びます。
2. **コンポーネント**からインストールする項目を選びます。
   - **スキル**: エージェントが必要に応じて読み込むBeutl編集ノウハウ
   - **サブエージェント**: タイムライン・ルック用の専用エージェント定義
   - エージェントのMCP設定への **Stdio MCP サーバー** / **Live MCP サーバー** の登録
3. **インストール**を押します。

MCP設定を自動で書き込めないエージェントでは、手動登録用のコマンド(例: `claude mcp add --scope user`、`codex mcp add`)が表示されます。

## Live MCP サーバー

アプリの起動時にLiveエンドポイントも自動で開始されます。待ち受けるのは**ループバックのみ**です。

```text
http://127.0.0.1:<port>/mcp
```

既定のポートは `59737` で、使用中の場合は次の空きポートが使われます。実際の **Live MCP URL** と**認証ヘッダー**は **設定 → AI エージェント** ページに表示されます。

すべてのリクエストで、標準ヘッダーにトークンを含める必要があります。トークンはパスワードと同様に扱ってください。

```text
Authorization: Bearer <token>
```

MCPクライアント設定の例:

```json
{
  "mcpServers": {
    "beutl-live": {
      "type": "http",
      "url": "http://127.0.0.1:59737/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

接続すると、エージェントは `attach_active_editor` ツールを呼び出し、エディタで開いているシーンにセッションをバインドします。

## Stdio MCP サーバー

ヘッドレスサーバーは独立したプロセスとして動作し、stdio経由でMCP通信を行います。環境変数 `BEUTL_WORKSPACE` で、サーバーがプロジェクトを作成・保存できるフォルダーを指定します(未指定時はカレントディレクトリ)。そのフォルダー外にあるファイルも読み取れます。

```json
{
  "mcpServers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "<path-to-stdio-server>",
      "env": { "BEUTL_WORKSPACE": "/path/to/workspace" }
    }
  }
}
```

:::note
設定ファイル名とトップレベルのプロパティ名はエージェントごとに異なります(多くは上記のとおり `mcpServers` ですが、例外もあります)。**設定 → AI エージェント** からインストールすれば、選択したエージェントに合った形式で書き込まれるため、通常は手動で編集する必要はありません。
:::

## 利用できるツール(概要)

エージェントがMCP URLしか把握していない場合は、最初に `get_started` を呼び出します。このツールから簡潔な利用ガイドが返されます。

| グループ | ツール |
|---------|-------|
| セッション | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status`, `attach_active_editor` (Liveサーバーのみ) |
| クエリ / スキーマ | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_fonts`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds` |
| 編集 | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| 要素 | `add_element`, `move_element`, `remove_element`, `duplicate_element`, `split_element`, `group_elements`, `ungroup_elements` |
| 履歴 | `undo`, `redo`, `read_history` |
| レンダー / 確認 | `render_still`, `render_storyboard`, `measure_frame_differences`, `analyze_audio_rhythm`, `export_video`, `read_render_job`, `cancel_render_job` |

`apply_edit` は完全な望ましい状態の `desired` または部分変更の `patch` の、いずれか一方を受け取ります。部分編集にはJSON Merge Patchの `patch` を使用し、`get_schema` で確認した `schemaVersion` も指定してください。完全な `desired` は状態全体を指定するため、省略した子要素の配列が削除されることがあります。

## 編集と確認

1. `get_started` で接続先の利用方法を確認し、`read_document_summary` や対象を絞った `get_schema` で現在の状態を確認します。
2. パッチを適用し、返された操作結果と検証内容を確認します。警告は参考情報です。
3. `render_still` や `render_storyboard` で描画結果を確認します。見た目や動きが指示に合っていることを確認してから次に進みます。
4. ファイルベースのセッションでは、大きな編集の成功後と最終調整後に `save_project` を呼び出します。Liveセッションではこのツールは保存に対応せず、エディターの自動保存またはBeutlの保存操作を使用します。

`undo`・`redo` は履歴経由で編集を取り消し・やり直します。Liveセッションはユーザーと同じ履歴を共有するため、取り消す前に `read_history` の `nextUndo` を確認してください。ファイルベースのセッションでは、取り消し後も `save_project` で保存します。

## ソース

- [`AgentHostEndpoint.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/AgentHost/AgentHostEndpoint.cs)（Liveサーバー）
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/AgentHost/AgentHostTools.cs)
- [`Beutl.AgentToolkit.Mcp/Program.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.AgentToolkit.Mcp/Program.cs)（Stdioサーバー）
- [`Beutl.AgentToolkit/Tools/`](https://github.com/b-editor/beutl/tree/v2.0.0-preview.8/src/Beutl.AgentToolkit/Tools)（ツール実装）
- [`AgentCatalog.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.AgentToolkit/Installation/AgentCatalog.cs)（対応エージェント一覧）

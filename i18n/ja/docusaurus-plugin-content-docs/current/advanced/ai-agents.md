---
title: AIエージェントによる編集
description: MCPを通じてAIコーディングエージェントでBeutlプロジェクトを編集する
sidebar_position: 6
---

# AIエージェントによる編集

Beutlは **AIコーディングエージェント**(Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot など多数)から **Model Context Protocol (MCP)** を通じてプロジェクトを編集できます。エージェントはシーンを宣言的ドキュメントとして読み取り、変更をJSON Merge PatchとしてBeutlのアンドゥ履歴経由で適用し、静止画やストーリーボードをレンダリングして結果を確認できます。

2つのMCPサーバーが提供されます。

- **Live MCP サーバー**(推奨): Beutlアプリ内で動作し、エージェントを**実行中のエディタ**に接続します。編集はプレビューとタイムラインに即時反映され、すべての変更がアンドゥスタックに記録されます。
- **Stdio MCP サーバー**(オプション): **GUIを起動せずに**プロジェクトファイルを編集するヘッドレスプロセスです。自動化に便利です。

## アプリからのセットアップ

**設定 → AI エージェント** を開きます。

1. インストール対象の**エージェント**(Claude Code、Codex、Cursor、Gemini CLI、…、または「カスタム」)と、**インストール範囲** — **プロジェクト**(プロジェクトフォルダーへ)または**グローバル(ユーザープロファイル)** — を選びます。
2. **コンポーネント**でインストールする項目を選びます。
   - **スキル**: エージェントが必要に応じて読み込むBeutl編集ノウハウ
   - **サブエージェント**: タイムライン・ルック・品質レビュー用の専用エージェント定義
   - エージェントのMCP設定への **Stdio MCP サーバー** / **Live MCP サーバー** の登録
3. **インストール**を押します。

一部のエージェントではMCP設定を自動で書き込めません。その場合は手動登録用のコマンド(例: `claude mcp add --scope user`、`codex mcp add`)が表示されます。

## Live MCP サーバー

Liveエンドポイントはアプリの起動時に自動で開始され、**ループバックのみ**で待ち受けます。

```
http://127.0.0.1:<port>/mcp
```

既定のポートは `59737` で、使用中の場合は次の空きポートが使われます。実際の **Live MCP URL** と**認証ヘッダー**は **設定 → AI エージェント** ページに表示されます。

すべてのリクエストに標準ヘッダーでトークンを含める必要があります。パスワードと同様に扱ってください。

```
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

接続後、エージェントは `attach_active_editor` ツールを呼び出して、エディタで開いているシーンにセッションをバインドします。

## Stdio MCP サーバー

ヘッドレスサーバーはstdioでMCPを話す独立したプロセスです。環境変数 `BEUTL_WORKSPACE` で、サーバーがプロジェクトの作成・保存を許可されるフォルダーを指定します(未指定時はカレントディレクトリ)。フォルダー外のファイルの読み取りは可能です。

```json
{
  "servers": {
    "beutl-agent": {
      "type": "stdio",
      "command": "<path-to-stdio-server>",
      "env": { "BEUTL_WORKSPACE": "/path/to/workspace" }
    }
  }
}
```

## 利用できるツール(概要)

MCP URLしか知らないエージェントは、まず `get_started` を呼び出してください。簡潔な利用ガイドが返されます。

| グループ | ツール |
|---------|-------|
| セッション | `open_project`, `create_project`, `add_scene`, `save_project`, `read_operation_status`, `attach_active_editor` (Liveサーバーのみ) |
| クエリ / スキーマ | `get_started`, `get_schema`, `read_document_summary`, `read_document`, `list_examples`, `get_examples`, `list_effects`, `list_effect_recipes`, `get_effect_recipe`, `list_compositions`, `get_composition`, `render_composition_patch`, `validate_shader`, `measure_object_bounds`, `compare_revisions`, `list_creative_directions`, `record_creative_direction`, `plan_original_scaffold` |
| デザイン | `derive_palette`, `get_background_grammar` |
| 編集 | `apply_edit`, `duplicate_object`, `plan_composition`, `apply_composition` |
| レンダー / 品質 | `render_still`, `render_storyboard`, `evaluate_motion_variation`, `analyze_audio_rhythm`, `evaluate_edit_quality`, `preview_quality_risks`, `suggest_quality_fixes`, `final_preflight`, `export_video`, `read_render_job`, `cancel_render_job` |

編集の中核ツールは `apply_edit` です。宣言的なdesiredドキュメント(JSON Merge Patch)を受け取り、検証したうえでBeutlの履歴経由でアトミックに適用するため、エージェントの変更はユーザーがアンドゥできます。

## ソース

- [`AgentHostEndpoint.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/AgentHost/AgentHostEndpoint.cs)（Liveサーバー）
- [`AgentHostTools.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/AgentHost/AgentHostTools.cs)
- [`Beutl.AgentToolkit.Mcp/Program.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.AgentToolkit.Mcp/Program.cs)（Stdioサーバー）
- [`Beutl.AgentToolkit/Tools/`](https://github.com/b-editor/beutl/tree/main/src/Beutl.AgentToolkit/Tools)（ツール実装）
- [`AgentCatalog.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.AgentToolkit/Installation/AgentCatalog.cs)（対応エージェント一覧）

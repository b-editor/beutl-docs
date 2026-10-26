---
title: 開発可能な拡張機能
description: Beutlに追加できる拡張機能の種類を挙げます。
sidebar_position: 3
---

Beutlでは以下の機能を拡張できます。

<div style={{ overflowX: 'auto' }}>

| 型名 | 説明 |
| --- | --- |
| DecodingExtension | 動画、音声の対応、入力ファイルを追加します |
| [ControllableEncodingExtension](media-providers.md) | 動画、音声の対応、出力ファイルを追加します |
| EditorExtension | ファイルの編集UIを追加します |
| OutputExtension | 出力UIを追加します。 |
| [Extension](sample-extensions.md#sugarshaker) | 拡張機能のベースクラス (Loadメソッドをoverrideして機能を登録できる) |
| ToolWindowExtension | ウィンドウメニューから開けるツールウィンドウを追加します |
| [PropertyEditorExtension](editor-integration.md#property-editors) | プロパティの特定の型の編集UIを追加します |
| [ToolTabExtension](sample-extensions.md#tooltabextension) | シーンの編集画面にタブを追加します |
| [ThemeExtension](implement-theme.md) | 「設定」→「表示」のテーマ選択にテーマを追加します |
| [ViewExtension](editor-integration.md#commands) | ID とハンドラーを持つコマンドを登録します |
| [McpToolExtension](editor-integration.md#mcp-tools) | ライブ MCP エンドポイントにツールを追加します |
| [ElementSourceHandlerExtension](editor-integration.md#element-sources) | 独自のソースからタイムラインの要素を作成します |
| ProxyExtension | メディアのプロキシ生成ファクトリーを登録します |
| TutorialExtension | チュートリアルを登録します |

</div>

`ProjectItemExtension` は削除されています。拡張機能のクラスには `[Export]` を付け、public かつ引数なしで構築できるようにしてください。`Extension.Unload()` は、途中で失敗した `Load()` の取り消しでも呼ばれるため、繰り返し呼ばれても安全に後始末できる実装にします。

## ソース

- [`Extension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/Extension.cs)
- [`ProxyExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ProxyExtension.cs)
- [`TutorialExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/TutorialExtension.cs)
- [`ViewExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensibility/ViewExtension.cs)

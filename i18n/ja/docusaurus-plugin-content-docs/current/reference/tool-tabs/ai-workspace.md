---
title: "AI"
description: "画像・動画の生成と編集、字幕の生成、AIジョブの管理を行います。"
sidebar_position: 21
---

# AI

AIワークスペースでは、Beutl内で有料の生成・編集機能を利用できます。選択できるモデル、入力の種類、オプションは、タスクとモデルに応じて変わります。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: はい（各タブが独立した作業内容を保持）

## 開き方

**表示 → ツール → AI** を開くか、シーンを開いた状態で **AI** メニューからタスクを選択します。

Beutlアカウントにログインしてください。アカウントでAIを利用できない場合は、Proプランの案内が表示されます。プランのボタンはブラウザーでアカウント管理を開き、Beutlに戻るとアカウント情報を更新します。

## セクション

| セクション | 用途 |
|------------|------|
| 画像生成 | プロンプトから画像を生成 |
| 画像編集 | 背景除去、オブジェクトの削除、アップスケール、参照画像からのスタイル変更、アウトペイント |
| 動画生成 | モデルが対応する参照素材を使って動画を生成 |
| 動画編集 | 動画の編集・延長、動画と人物・キャラクター画像を使ったモーション適用 |
| 字幕 | 選択した字幕テンプレートを使って字幕を生成 |
| ジョブ | AIリクエストとその結果を確認 |

動画生成では、対応するモデルで現在のシーンフレームや最初・最後のフレームを入力できます。一般の参照素材には画像・動画・音声を利用でき、使用可能な組み合わせは選択したモデルに応じて表示されます。既存の動画を編集する場合は、長さを別に選択せず入力動画の長さを使います。

画像編集の結果には **シーンに追加** と **ファイルに保存** があります。結果を確認してからプロジェクトに追加してください。

## 関連ドキュメント

- [ノードグラフ](./node-graph.md#ai生成ノード) — AIの生成手順をグラフで接続
- [AIエージェントで編集する](../../get-started/ai-editing.md) — 外部のコーディングエージェントをMCPで接続

## ソース

- [`AiWorkspaceTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PrimitiveImpls/AiWorkspaceTabExtension.cs)
- [`AiWorkspaceViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/Tools/AiWorkspaceViewModel.cs)
- [`AiPlanCoordinator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/AiPlanCoordinator.cs)
- [`AiVideoEditingViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/Dialogs/AiVideoEditingViewModel.cs)

---
title: "プロキシ"
description: "プロキシタブの役割とプロキシメディアワークフローを説明します。"
sidebar_position: 17
---

# プロキシ

このタブでは**プロキシメディアを生成・管理**できます。プロキシは重い動画クリップの低解像度コピーで、プレビューやスクラブを軽快にします。編集中のプレビューにはプロキシを使用できますが、**書き出しは常に元のメディアを使用します**。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数インスタンスの許可**: いいえ

## 開き方

メニューバーの **表示 → ツール → プロキシ** から開きます。

## プロキシの仕組み

- プロキシはこのタブから**手動で**生成します。クリップを読み込んだだけでは自動生成されません。
- プロキシ化されるのは**動画**クリップのみです。静止画と音声はスキップされます。
- プロキシはFFmpeg拡張機能でエンコードされた **H.264 (libx264) の `.mp4`** です。3つの品質プリセットがあります。

| プリセット | 縮小率 | 長辺の上限 |
|-----------|-------|-----------|
| プロキシ 1/2 | 50% | 1920 px |
| プロキシ 1/4 | 25% | 1280 px |
| プロキシ 1/8 | 12.5% | 960 px |

- ソースファイルの**パス・サイズ・更新日時**が、そのプロキシのキーになります。いずれかが変わるとプロキシは**期限切れ**になり、再生成するまで未生成として扱われます。同じファイルを参照する複数のクリップ(および複数のプロジェクト)は1つのプロキシを共有します。
- プロキシは**マシン全体で共有されるストア**(既定: Beutlのホームディレクトリ内の `proxies` フォルダー)に保存されます。ストアがサイズ上限を超えると、Beutlが最も使われていないプロキシから自動的に削除します。ストアの設定は[エディタ設定](../../settings/editor.md#プロキシメディア)を参照してください。

## タブの構成

- **ストアの使用状況(上部)**: プロジェクト / ストア / 上限の使用量。
- **クリップ一覧**: 開いているプロジェクト内(全シーン)の対象クリップごとに以下を表示します。
  - **状態ピル**: 準備完了 / 生成中 / 期限切れ / 失敗 / 未生成 / 一部生成
  - **品質プリセット**のドロップダウン(初期値は設定の「既定のプリセット」)
  - **生成** / **再生成** / **削除** ボタンと、生成中のプログレスバー+キャンセルボタン
- **ツールバー**: **選択項目を生成** / **すべて生成** / **選択項目を再生成** / **選択項目を削除** / **プロジェクトのプロキシを削除** / **更新**。

**すべて生成**の対象は、1920x1080以上(解像度が不明な場合は32 MB以上)のクリップだけです。それより軽いクリップには、クリップごとの**生成**ボタンを使用します。対象がない場合は「一括生成のしきい値を満たすクリップがありません」という通知が表示されます。

:::warning
プロキシストアはマシン全体で共有されます。**プロジェクトのプロキシを削除**を実行すると、同じソースファイルを参照する他のプロジェクトが使っているプロキシファイルも削除されます。削除前に確認ダイアログで警告されます。
:::

## エディタ上でのプロキシ

- タイムラインでは、プロキシ状態のあるクリップの右上に小さな**色付きドット**が表示されます(準備完了 / 生成中 / 期限切れ / 失敗)。ホバーすると詳細を確認できます。
- プレビューでプロキシを使うかどうかは、**「プレビューソース」** オプションで設定します。**設定 → エディタ → プロキシメディア** またはエディタの[プレビュー設定タブ](./preview-settings.md)で、**プロキシ優先**(既定)と**オリジナル強制**を切り替えられます。変更はプロジェクトを再読み込みせずに次のフレームから反映されます。
- プロキシが未生成・期限切れ・一部生成の場合、プレビューは自動的に元のメディアにフォールバックします。
- **書き出しはプロキシを使用しません。** 書き出し時に元のファイルが見つからない場合は、プロキシで代替せず、エラーになって書き出しに失敗します。

## 関連ドキュメント

- [エディタ設定](../../settings/editor.md#プロキシメディア)
- [タイムライン](./timeline.md)
- [出力](./output.md)

## ソース

- [`ProxiesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/ProxiesTabExtension.cs)
- [`ProxiesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/ViewModels/ProxiesTabViewModel.cs)
- [`ProxiesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/Views/ProxiesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/Views/ProxiesTabView.axaml.cs)
- [`ProxyPresetDefinitions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyPresetDefinitions.cs)（エンコードパラメータ）
- [`ProxyStore.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyStore.cs) / [`ProxyResolver.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyResolver.cs) / [`ProxyEvictionService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyEvictionService.cs)
- [`FFmpegProxyGenerator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensions.FFmpeg/Proxy/FFmpegProxyGenerator.cs)
- [`ProxyStoreConfig.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/ProxyStoreConfig.cs)
- [`ExportSourceValidator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/ExportSourceValidator.cs)（書き出しは常に元素材を使用）

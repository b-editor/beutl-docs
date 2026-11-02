---
title: "スマホプレビュー"
description: "スマホで映像と音声を確認し、再生を操作します。"
sidebar_position: 24
---

# スマホプレビュー

このタブでは、**スマホでプレビューの映像と音声を確認** し、スマホから再生を操作できます。スマホにはエディタの選択範囲の枠、オニオンスキン、ガイドのない映像が表示されます。ビューアーは Beutl Web のページなので、スマホに何かをインストールする必要はありません。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

プレビューのディスプレイボタン（**別画面にプレビューを表示**）を押し、**スマホプレビュー** を選びます。このタブは **「表示」→「ツール」** や空のタブのツール一覧には表示されません。

## 共有を開始する

1. **開始** を押します。Beutl Web にログインしていない場合は、先にログインを求められます。
2. スマホで QR コードを読み取るか、その下に表示されるリンクをコピーしてスマホで開きます。
3. スマホのブラウザに **接続コード** を入力します。タブにはコードの残り時間が表示されます。**コードを更新** で新しいコードを発行できます。

最初のスマホが接続すると、タブには接続中の端末の一覧が表示され、ツールバーに **接続中: *n* / 4台** と表示されます。端末ごとのボタンで 1 台を切断でき、**すべて切断** ですべての端末を切断できます。**端末を追加** を押すと QR コードと接続コードがもう一度表示されます。一時的に接続が切れても端末の一覧は残ります。

**停止** を押すと共有を終了します。タブを閉じたり別のエディタタブに切り替えたりしても共有は停止します。別のツールタブを選択しても共有は続きます。

## スマホが受信する内容

- **映像**: SDR は VP8、スマホが HDR を再生できる場合は BT.2020 PQ の 10 bit VP9 です。SDR のストリームはプレビューの[トーンマッピング](../../settings/editor.md#トーンマッピング)のモードに従います。
- **音声**: Opus です。[5.1ch / 7.1ch のプロジェクト](../../get-started/multichannel-audio.md)はステレオにダウンミックスされます。
- **再生**: スマホから再生、一時停止、コマ送り、シークができます。

## ネットワークの要件

接続は LAN、STUN、TURN の順に試行されます。Beutl はいずれの場合も送信の UDP を必要とし、TURN も同様です。デスクトップ側では TCP や TLS を使う TURN には対応していません。共有を開始できない場合は、接続と Beutl Web へのログインを確認して再試行してください。中継との接続が終了した場合は、**開始** を押して新しい共有を作成してください。

## 関連ドキュメント

- [プレビュー設定](./preview-settings.md)
- [マルチチャンネル音声](../../get-started/multichannel-audio.md)

## ソース

- [`MobilePreviewTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Services/PrimitiveImpls/MobilePreviewTabExtension.cs)
- [`MobilePreviewTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/ViewModels/MobilePreviewTabViewModel.cs)
- [`MobilePreviewTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/MobilePreviewTabView.axaml)
- [`MobilePreviewServer.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/PreviewStreaming/MobilePreviewServer.cs)
- [`PlayerView.axaml.Presentation.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PlayerView.axaml.Presentation.cs)

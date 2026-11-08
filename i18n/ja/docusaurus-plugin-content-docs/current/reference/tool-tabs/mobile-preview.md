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

- **映像**: SDR は VP8、スマホが HDR を再生できる場合は BT.2020 PQ の 10 bit VP9 です。SDR のストリームはプレビューの[トーンマッピング](../../settings/editor.md#トーンマッピング)のモードに従い、**自動** は **なし** として動作します。
- **音声**: Opus です。[5.1ch / 7.1ch のプロジェクト](../../get-started/multichannel-audio.md)はステレオにダウンミックスされます。
- **再生**: スマホから再生、一時停止、コマ送り、シークができます。

## 画質

映像の精細さと滑らかさは、スマホの接続方法によって変わります。

| 接続 | 長辺 | フレームレート | ビットレート（SDR / HDR） |
|------|------|----------------|---------------------------|
| LAN または STUN | 最大 1920 px | 30 fps | 8 / 12 Mbps |
| TURN の中継 | 最大 1280 px | 15 fps | 2 / 4 Mbps |

- ダイナミックレンジごとにすべてのスマホが同じストリームを受け取るので、中継を使うスマホが 1 台でもあれば、すべてのスマホが中継の設定になります。中継を使う最後のスマホが切断すると、一時停止中のフレームを直接接続の設定で送り直します。
- 直接接続のスマホがパケットを失い続けて 10 秒間に 3 回キーフレームを要求すると、ストリームは 30 秒間中継の設定になります。前回の保留の終了から 5 分以内に始まった保留は 2 倍の長さになり、最長 5 分です。スマホが接続してから最初の 5 秒間の要求は数えません。
- 再生を一時停止している間は、一時停止したフレームを最後のキーフレームから 30 回まで符号化し直すので、静止画は改善が止まるまで精細になっていきます。

## ネットワークの要件

接続は LAN、STUN、TURN の順に試行されます。Beutl はいずれの場合も送信の UDP を必要とし、TURN も同様です。デスクトップ側では TCP や TLS を使う TURN には対応していません。共有を開始できない場合は、接続と Beutl Web へのログインを確認して再試行してください。中継との接続が終了した場合は、**開始** を押して新しい共有を作成してください。

## 関連ドキュメント

- [プレビュー設定](./preview-settings.md)
- [マルチチャンネル音声](../../get-started/multichannel-audio.md)

## ソース

- [`MobilePreviewTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Services/PrimitiveImpls/MobilePreviewTabExtension.cs)
- [`MobilePreviewTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/ViewModels/MobilePreviewTabViewModel.cs)
- [`MobilePreviewTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/MobilePreviewTabView.axaml)
- [`MobilePreviewServer.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.cs) / [`MobilePreviewServer.Congestion.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.Congestion.cs) / [`MobilePreviewServer.Frames.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.Frames.cs)
- [`PreviewEncodingMessages.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.FFmpegIpc/Protocol/Messages/PreviewEncodingMessages.cs) / [`PreviewEncodingHandler.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.FFmpegWorker/Handlers/PreviewEncodingHandler.cs)
- [`PlayerView.axaml.Presentation.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PlayerView.axaml.Presentation.cs)

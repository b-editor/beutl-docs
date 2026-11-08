---
title: "リファレンス"
description: "Beutl 2.x の API およびライブラリのリファレンス。"
sidebar_position: 4
---

# リファレンス

Beutl のリファレンスドキュメントです。

- [ライブラリ](./library/index.md) — エディタの「ライブラリ」パネルに登録されている全オブジェクト
- [ツールタブ](./tool-tabs/index.md) — エディタで利用できるツールタブ一覧

## アプリの状態

タイトルバーの **フィードバック** の隣にある **ステータス** を開くと、描画環境、メモリやフレームキャッシュの使用量、バックグラウンド処理、Live MCP の状態と接続先、Beutl アカウントを確認できます。**AIジョブを開く** からジョブの一覧を開けます。起動処理・出力・AIジョブ・[アプリの更新](../get-started/install.md#beutl-を更新する)の実行中は、ボタンに進行状況のインジケーターが表示されます。更新のダウンロード中、ほかに実行中の処理がなければリングに割合が表示され、ポップアップとツールチップには割合とサイズが表示されます。

## ソース

- [`TitleBarStatusView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/TitleBarStatusView.axaml)
- [`TitleBarStatusViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/TitleBarStatusViewModel.cs)
- [`StatusStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/StatusStrings.ja.resx)

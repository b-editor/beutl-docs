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

タイトルバーの **フィードバック** の隣にある **ステータス** を開くと、描画環境、メモリやフレームキャッシュの使用量、バックグラウンド処理、Live MCP の状態と接続先、Beutl アカウントを確認できます。**AIジョブを開く** からジョブの一覧を開けます。バックグラウンドで何も実行していないときは、ボタンにパルスのアイコンが表示されます。処理の実行中は、処理の種類ごとのアニメーションが表示されます。

- **起動処理**: パルスのアイコンに沿って光が流れます。
- **出力**: 格子状に並んだ点が 1 つずつ埋まり、消えてからまた繰り返します。
- **AIジョブ**: 同じ格子状の点を、光の帯が角から角へ横切ります。
- **[アプリの更新](../get-started/install.md#beutl-を更新する)**: ダウンロードの進み具合に合わせて下向き矢印の周りのリングが埋まり、サイズが分からない間はリングが回ります。更新のインストール中は、矢印が回転する歯車に変わります。

複数の処理を同時に実行しているときは、2.4 秒ずつ交代で表示されます。更新のリングは、ほかの処理の実行中も自分の番に進み具合を示し、ポップアップとツールチップには割合とサイズが表示されます。

## ソース

- [`TitleBarStatusView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/TitleBarStatusView.axaml)
- [`TitleBarStatusViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/ViewModels/TitleBarStatusViewModel.cs)
- [`StatusStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/StatusStrings.ja.resx)
- [`TitleBarActivityIndicator.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/Views/TitleBarActivityIndicator.cs) / [`TitleBarStatusViewModel.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/ViewModels/TitleBarStatusViewModel.cs)

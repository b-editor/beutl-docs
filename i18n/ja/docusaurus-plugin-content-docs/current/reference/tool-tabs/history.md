---
title: "履歴"
description: "編集履歴を一覧表示し、任意の過去の状態へジャンプします。"
sidebar_position: 15
---

# 履歴

**現在のシーンの編集履歴** を一覧表示し、任意の過去の状態へジャンプできるタブです。元に戻す／やり直しを視覚化したもので、元に戻すを何度も押す代わりに、戻りたいステップを直接クリックできます。

## タブの特徴

- **初期状態で開く**: いいえ
- **複数インスタンスを許可**: いいえ

## 開き方

メニューバーの **「表示」→「ツール」→「履歴」** から開きます。

## レイアウト

- **元に戻す／やり直しボタン（上部）**: 1 ステップずつ前後に移動します。`Ctrl + Z` ／ `Ctrl + Y` と同じです。
- **現在位置（上部）**: 履歴内での現在の状態の位置を `#N` で表示します。
- **エントリ一覧**: 各エントリには操作内容を表すラベルと記録時刻（`HH:mm:ss`）が表示されます。

現在の状態のエントリが強調表示され、その先（やり直しで進める）のステップは未来のエントリとして表示されます。

## ステップへジャンプ

任意のエントリをクリックすると、その時点へ **直接ジャンプ** します。後方へのジャンプはそのエントリまでの操作をすべて元に戻すことと同じで、前方へのジャンプはそれらをやり直します。ジャンプして戻った後に新しい編集を行うと、通常の元に戻す／やり直しと同様に、その先にあったステップは破棄されます。

## ソース

- [`HistoryTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Services/PrimitiveImpls/HistoryTabExtension.cs)
- [`HistoryViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/ViewModels/Tools/HistoryViewModel.cs)
- [`HistoryView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/HistoryView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Tools/HistoryView.axaml.cs)

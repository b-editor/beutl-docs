---
title: "欠損メディアを再リンク"
description: "移動・欠損したメディアファイルやフォントの参照先を修復します。"
sidebar_position: 22
---

# 欠損メディアを再リンク

シーンが参照する動画・音声・画像・3Dモデル・LUT・フォントのファイルを見つけられない、または読み込めない場合に使います。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

欠損メディアの通知から **修復ツールを開く** を選びます。このタブは **「表示」→「ツール」** には表示されません。

## ファイルの再リンク

1. 欠損した項目の **差し替え** を押して、新しいファイルを選びます。Beutl が読み込めるファイルか確認します。
2. 差し替えるファイルを選ぶと、そのフォルダーから他の欠損項目の候補を探します。候補を確認して **この候補を使用**、または **候補をすべて使用** を選びます。
3. **適用して保存** でシーンの参照先を更新し、修復を保存します。参照先の修復は、通常の取り消し可能なプロパティ編集として履歴に記録せず、直接保存されます。

**詳細を表示** を開くと、元の参照・新しいファイル・参照元の要素を確認できます。候補は、使用を選んで **適用して保存** を押すまで適用されません。

項目の三点メニューで **無視（オフライン）** を選ぶと、その項目を未解決のままにして他のファイルを修復できます。元の場所にファイルを戻した場合は、**更新** で再確認します。

## 関連ドキュメント

- [要素の編集](../../get-started/edit-element.md)
- [プロジェクトの構造](../../get-started/project-structure.md)

## ソース

- [`MissingMediaTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/MissingMediaTabExtension.cs)
- [`MissingMediaViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/ViewModels/MissingMediaViewModel.cs)
- [`MissingMediaView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/MissingMediaTab/Views/MissingMediaView.axaml)
- [`EditViewModel.MissingMedia.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/EditViewModel.MissingMedia.cs)
- [`MissingMediaStrings.ja.resx`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Language/MissingMediaStrings.ja.resx)

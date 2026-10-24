---
title: "トランジション"
description: "クリップの境界のトランジションを編集します。"
sidebar_position: 23
---

# トランジション

クリップの開始・終了位置にあるトランジションの種類・長さ・イージングなどを編集します。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる

## 開き方

タイムラインの要素を右クリックし、**トランジション → 開始のトランジション** または **終了のトランジション** を選びます。その端にトランジションがなければ、クロスディゾルブを追加してからタブを開きます。このタブは **「表示」→「ツール」** には表示されません。

タイムラインに表示されたトランジションの傾斜部分をダブルクリックしても編集できます。同じレイヤーで隣接するクリップの境界をダブルクリックすると、そこにトランジションがなければクロスディゾルブを追加します。

## トランジションの編集

- 上部の種類を選ぶ欄でトランジションを変更します。種類を変えても、時間の設定とイージングは維持されます。
- 下に表示される **長さ**、**イージング**、選んだ種類の固有のプロパティを編集します。隣接する 2 つのクリップ間に追加した場合、初期の長さを境界の両側に等分します。それぞれのクリップ側が長さを持ちます。
- タイムラインの傾斜部分のハンドルをドラッグして、その側の長さを変更できます。
- 種類を選ぶ欄の横の **削除** で、共有する境界の両側からトランジションを取り除きます。
- タブのヘッダーを右クリックして **タブを固定** を有効にすると、別のトランジションを編集してもこの端を表示し続けます。

## 関連ドキュメント

- [タイムライン](./timeline.md)
- [トランジションの種類](../library/transitions/index.md)
- [ツールタブ](./index.md)

## ソース

- [`TransitionTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/TransitionTabExtension.cs)
- [`TransitionTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/ViewModels/TransitionTabViewModel.cs)
- [`TransitionTabView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TransitionTab/Views/TransitionTabView.axaml)
- [`ElementView.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/TimelineTab/Views/ElementView.axaml.cs)
- [`ElementAttributeService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor/Services/ElementAttributeService.cs)

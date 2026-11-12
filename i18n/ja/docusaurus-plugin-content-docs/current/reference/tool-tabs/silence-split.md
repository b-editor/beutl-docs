---
title: "無音区間で自動分割"
description: "音声要素の無音部分を検出し、分割または削除します。"
sidebar_position: 25
---

# 無音区間で自動分割

このタブでは、**音声要素の無音部分を検出** し、そこで要素を分割するか、無音部分を削除するか、削除して前詰めします。ナレーションの間を詰める作業などに便利です。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できない

## 開き方

[タイムライン](./timeline.md)で要素を右クリックし、**無音区間で自動分割** を選びます。このコマンドは、[サウンド](../library/sounds/sound.md)、[シーン参照（音声）](../library/references/scene-reference-audio.md)、音声のある[サウンドグループ](../library/containers/sound-group.md)を持つ、ロックされていない要素で使えます。このタブは **「表示」→「ツール」** や空のタブのツール一覧には表示されません。別の要素でコマンドを選ぶと、タブの対象が切り替わります。

## 無音を検出する

タブはサウンドグループの処理や参照先シーンを含めて合成した要素の音声を解析し、波形と検出した区間を表示します。ステレオの両チャンネルを読むので、逆相の音声や短いピークを無音と誤認しません。ソースを読み込めない場合は、その部分を無音として扱わず解析を停止します。

| 設定 | 既定値 | 意味 |
|------|--------|------|
| **閾値（dB）** | `-40` | ピークがこのレベル以下の音声を無音とみなします。`-120` から `0` の範囲で指定します。 |
| **最小無音時間（ms）** | `300` | これより短い無音は無視します。正の値で指定します。 |
| **前後の余白（ms）** | `100` | 発話が切れないよう、各区間の両側に残す音声です。0 以上で指定します。要素自体の先頭と末尾には残しません。 |

状態行には区間の数と合計の長さが表示されます。設定を変更すると、音声を解析し直さずにすぐ区間が更新されます。

波形を確認するには、`Ctrl`（macOS では `Cmd`）+ ホイールでポインターを中心にズームするか、ズームボタンを使います。操作で変わるのは表示だけで、適用するときは常に要素全体の計画を使います。

## 適用する

**適用モード** を選び、**全体に適用** を押します。

- **分割のみ**: 各区間で要素を切り、無音の部分も残します。
- **無音を削除**: 無音の部分も削除します。
- **無音を削除して前詰め**: さらに、残った部分を左に移動して空きを詰めます。

**グループにも適用** は、グループに属する要素で表示され、同じ分割と削除をグループの他の要素にも適用します。前詰めではグループの各レイヤーで同じ区間を詰めるので、同期が保たれます。グループ内にロックされた要素がある場合は、ロックを解除するかこのオプションをオフにするまで処理できません。

適用すると再生を一時停止し、フレームに揃えた位置で切り、各部分のソース位置を保ったまま 1 回の取り消し単位で処理します。解析の後にシーンが変更された場合は、適用する前に **更新** を押してもう一度解析してください。

## 関連ドキュメント

- [タイムライン](./timeline.md)
- [要素を編集する](../../get-started/edit-element.md)

## ソース

- [`SilenceSplitTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/SilenceSplitTabExtension.cs)
- [`SilenceSplitTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/ViewModels/SilenceSplitTabViewModel.cs)
- [`SilenceSplitTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SilenceSplitTab/Views/SilenceSplitTabView.axaml)
- [`SilenceSplitViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/TimelineTab/ViewModels/SilenceSplitViewModel.cs)
- [`SilenceDetector.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SilenceDetector.cs)
- [`SilenceSplitService.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SilenceSplitService.cs)

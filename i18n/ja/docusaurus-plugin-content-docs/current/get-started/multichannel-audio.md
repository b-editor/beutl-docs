---
title: マルチチャンネル音声
description: モノラル、ステレオ、5.1ch、7.1ch でミックスし、パンナーで音を配置して、ソースのチャンネルの割り当てやサラウンドの書き出しを行います。
sidebar_position: 11
---

プロジェクトは 1 つのスピーカー配置でミックスされます。既定はステレオで、パンナーが既定値のステレオプロジェクトは、マルチチャンネル音声が追加される前とまったく同じ音になります。

## スピーカー配置を選ぶ

| 配置 | チャンネル数 | チャンネルの順序 |
|------|--------------|------------------|
| モノラル | 1 | C |
| ステレオ | 2 | L, R |
| 5.1ch サラウンド | 6 | L, R, C, LFE, Ls, Rs |
| 7.1ch サラウンド | 8 | L, R, C, LFE, Lrs, Rrs, Ls, Rs |

配置は[プロジェクトの作成](./create-project.md)時に **音声チャンネル** で選びます。後から変更するには、[シーン設定](../reference/tool-tabs/scene-settings.md)タブで **プロジェクトの音声チャンネル** を選び、**適用** を押します。この変更は 1 回の操作として元に戻すことができ、適用時に再生を一時停止します。配置はシーンではなくプロジェクトの設定なので、すぐにプロジェクトファイルへ書き込まれます。

## パンナーで音を配置する

各サウンドの[要素プロパティ](../reference/tool-tabs/element-property.md)タブには、音声エフェクトの下に **パンナー** セクションがあります。展開すると、プロジェクトの配置に合わせたスピーカーの図とパックが表示されます。

- パックをドラッグすると、**パン** と **前後** を 1 回の取り消し単位でまとめて変更します。図をダブルクリックすると、両方を 0 に戻します。
- 正確な値、キーフレーム、式には図の下の数値エディターを使います。**パン** または **前後** に式を設定するとドラッグできなくなります。キーフレームがある場合、ドラッグは現在時刻以降で最初のキーフレームを編集します。

| プロパティ | 範囲 | 既定値 | 働き |
|------------|------|--------|------|
| **パン** | `-100`〜`100` | `0` | 左右のバランスを調整します。`0` では左右とも元のレベルで、`100` では左側が無音になります。 |
| **前後** | `0`〜`100` | `0` | フロントからサラウンドへ、音量感を保ったまま音を移動します。7.1ch では `50` がサイド、`100` がリアのスピーカーです。 |
| **センター** | `0`〜`100` | `0` | フロントの音の一部をセンタースピーカーに送ります。**パン** が中央から離れるほど少なくなります。 |
| **LFE** | `0`〜`100` | `0` | 音を 120 Hz のローパスに通して LFE チャンネルに送ります。 |

パンナーでできることは、プロジェクトとクリップによって異なります。

| プロジェクト | クリップ | 使えるプロパティ |
|--------------|----------|------------------|
| モノラル | すべて | なし。パンナーの効果がないため、コントロールは無効になります。 |
| ステレオ | すべて | **パン** |
| 5.1ch / 7.1ch | 1〜2 チャンネル | 4 つすべて |
| 5.1ch / 7.1ch | 3 チャンネル以上、サウンドグループ、シーン参照 | **パン** のみ。クリップの各チャンネルは自身のスピーカー位置を保ちます。 |

[音声エフェクト](../reference/library/audio-effects/index.md)はパンナーの後で処理されるため、サラウンドのプロジェクトではプロジェクトの全チャンネルを処理します。マスター出力はすべてのサンプルをフルスケール内に収めるので、ゲインを大きくしたりディレイを 100% でフィードバックしたりしても 0 dBFS を超えません。

## ソースのチャンネルを割り当てる

組み込みのデコーダーはソース自身のチャンネルを読み込み、クリップはパンナーでプロジェクトの配置に置かれるまでそのチャンネルを保ちます。[サウンド](../reference/library/sounds/sound.md)のクリップには **チャンネルの割り当て** セクションもあります（展開するまで折りたたまれています）。ソースの任意のチャンネルを使えるので、たとえば 4 チャンネルのカメラファイルのチャンネル 3 と 4 をステレオとして扱えます。

1. **形式** を **自動**、**モノラル**、**ステレオ**、**5.1ch**、**7.1ch** から選びます。**自動** はソース自身のチャンネルをそのまま使う既定の形式です。
2. 選んだ形式の既定の割り当てが入力されます。モノラルはチャンネル 1 を使います。ステレオはチャンネル 1 と 2 を使い、1 チャンネルのソースではチャンネル 1 を左右の両方に使います。5.1ch と 7.1ch は各スピーカーに対応するチャンネルを使います。
3. 各行で、そのクリップのチャンネルに使うソースのチャンネルを変更するか、無音にする **なし** を選びます。ソースのチャンネルは `3 (Ls)` のように表示され、スピーカー位置のないソースでは番号だけが表示されます。選択ごとに 1 回の取り消し単位になります。

ソースが見つからない場合や読み込めない場合に選べるのは **自動** だけです。割り当てには作成時のソースの配置が記録されます。チャンネル構成の異なるファイルに置き換えると、もう一度割り当てるまで **自動** として扱われるので、保存した「チャンネル 3」が気付かないうちに別のチャンネルを読むことはありません。

## 再生する

モノラルとステレオのプロジェクトは、常にステレオとしてデバイスに送られます。Windows と Linux では、サラウンド出力でもフロントの 2 チャンネルだけで再生されます。

5.1ch / 7.1ch のプロジェクトの再生方法はプラットフォームによって異なります。

- **Windows**（XAudio2）と **Linux**（同梱の OpenAL Soft）: デバイスにプロジェクトのスピーカーがすべてあれば、そのまま送られ、各チャンネルが対応するスピーカーで再生されます。それ以外の場合、Beutl がデバイスの配置に合わせてダウンミックスします。ステレオデバイスで聞こえるのは、ステレオで書き出した場合と同じ ITU-R BS.775 のダウンミックスです（センターとサラウンドは 0.7071 倍、LFE は破棄）。
- **macOS**: `AVSampleBufferAudioRenderer` で再生し、配置全体を macOS に渡します。そのため AirPods では空間オーディオを選択できます。レンダラーが 2 秒以内に開始できない場合は OpenAL Soft にフォールバックします。

[オーディオビジュアライザー](../reference/tool-tabs/audio-visualizer.md#メーター)タブのメーター表示は、サラウンドのプロジェクトではチャンネルごとのバーと、BS.1770 のマルチチャンネルラウドネスを表示します。タイムラインの波形、[オーディオビジュアライザーの描画オブジェクト](../reference/library/drawables/audio-visualizers/index.md)、[スマホプレビュー](../reference/tool-tabs/mobile-preview.md)ではステレオにダウンミックスした音声を使います。

## 書き出す

[出力](../reference/tool-tabs/output.md#audio-channels)タブの **チャンネル数** で、書き出す配置（モノラル、ステレオ、5.1ch サラウンド、7.1ch サラウンド）を選びます。新しい書き出し設定はプロジェクトの配置で始まり、別の配置を選ぶと再生と同じ方法でダウンミックスされます。たとえば 5.1ch のプロジェクトをステレオで書き出せます。

エンコーダーや出力先によっては、チャンネル数に制限があります。

| エンコーダー | 制限 |
|--------------|------|
| FFmpeg | 7.1ch の AAC は `.aac`（ADTS）や MPEG-TS に書き込めません。MP4、MOV、MKV を使うか、PCM などの別のコーデックを使ってください。 |
| AVFoundation | AAC は 1、2、6 チャンネルに対応します。それ以外のチャンネル数には Linear PCM または FFmpeg エンコーダーを使ってください。 |
| Media Foundation | AAC は 1、2、6 チャンネルに対応します（6 チャンネルは Windows 10 以降）。PCM と float はチャンネル数を問いません。 |

制限を超える書き出しは、チャンネルの配置が崩れたファイルを作る代わりに、エラーメッセージを表示して停止します。

## 関連ドキュメント

- [プロジェクトを作成する](./create-project.md)
- [シーン設定](../reference/tool-tabs/scene-settings.md)
- [出力](../reference/tool-tabs/output.md)
- [オーディオビジュアライザー](../reference/tool-tabs/audio-visualizer.md)
- [共通プロパティ](../reference/library/common-properties.md#サウンド-sound)

## ソース

- [`SpeakerLayout.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Core/SpeakerLayout.cs)
- [`AudioChannelLayout.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelLayout.cs)
- [`AudioChannelMap.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioChannelMap.cs)
- [`PannerNode.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/Graph/Nodes/PannerNode.cs)
- [`AudioPlaybackOutput.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Audio/AudioPlaybackOutput.cs)
- [`SoundPannerViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/SoundPannerProperties/ViewModels/SoundPannerViewModel.cs)
- [`ChannelMapEditorViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/ChannelMapProperties/ViewModels/ChannelMapEditorViewModel.cs)
- [`SceneSettingsService.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor/Services/SceneSettingsService.cs)
- [`AVFEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.AVFoundation/Encoding/AVFEncodingController.cs)
- [`MFEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingController.cs)
- [`FFmpegEncodingController.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.FFmpegWorker/Encoding/FFmpegEncodingController.cs)

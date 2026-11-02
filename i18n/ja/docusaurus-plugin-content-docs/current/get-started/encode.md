---
title: エンコード
description: Beutlで作成したプロジェクトを動画ファイルに出力する方法を説明します
sidebar_position: 7
---

:::note
作業中
:::

Beutlで作成したプロジェクトを動画ファイルに出力する方法を説明します。

1. __表示 > ツール > 出力__ をクリックします。
2. 出力設定のタブが開かれます。
3. 保存先のファイルを選択します。
4. エンコーダーを指定して、必要であれば詳細設定も変更できます。
5. エンコードボタンをクリックします。

新しいエンコーダー設定は、プロジェクトのフレームレート、音声のサンプリングレート、音声チャンネルで開始します。そのため 5.1ch / 7.1ch のプロジェクトは、既定で[サラウンドのチャンネルを書き出します](./multichannel-audio.md#書き出す)。FFmpeg では検索できるコーデックピッカーとコーデックごとのオプション編集を利用でき、Windows では Media Foundation のエンコードにも対応します。設定やプリセットの詳細は [出力](../reference/tool-tabs/output.md) を参照してください。

## ソース

- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`MFEncodingExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingExtension.cs)
- [`EncoderOptionsEditor.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.FFmpeg/PropertyEditors/EncoderOptionsEditor.cs)
- [`CodecPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Extensions.FFmpeg/PropertyEditors/CodecPickerViewModel.cs)
- [`AudioEncoderSettings.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Engine/Media/Encoding/AudioEncoderSettings.cs)

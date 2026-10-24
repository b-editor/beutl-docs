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

新しいエンコーダー設定は、プロジェクトのフレームレートと音声のサンプリングレートで開始します。FFmpeg ではコーデックごとのオプション編集を利用でき、Windows では Media Foundation のエンコードにも対応します。設定やプリセットの詳細は [出力](../reference/tool-tabs/output.md) を参照してください。

## ソース

- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`MFEncodingExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingExtension.cs)
- [`EncoderOptionsEditor.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.FFmpeg/PropertyEditors/EncoderOptionsEditor.cs)

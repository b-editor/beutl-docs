---
title: "動画"
description: "動画ファイルを描画オブジェクトとして読み込みます。"
sidebar_position: 1
---

# 動画

動画ファイルを読み込んで描画オブジェクトとして扱います。シーンの現在時刻に応じてフレームをサンプリングします。オフセット・再生速度・ループも設定できます。

## ライブラリでの場所

「ライブラリ」 → 動画

## プロパティ

### オフセット位置 (OffsetPosition)

ソース動画内のどの時刻から開始するか。

- **型:** `MediaTime`
- **既定値:** `00:00:00`
- **アニメーション:** 不可

### スピード (Speed)

再生速度の倍率（100 が等倍）。`スピード` にキーフレームがあるときは、各時点で曲線が示す速度で動画が進みます。キーフレームの間はイージングを含めて正確に計算され、たとえば 1 秒かけて `100` から `300` まで直線的に上がると、2 秒分の動画を再生します。キーフレームを編集すると、位置はすぐに反映されます。**グローバル時計を使う** では、キーフレームはシーンの時刻に置かれたまま、位置は要素の開始から数えます。タイムラインの **オリジナルの長さに変更** も同じ方法で長さを求めるので、要素は動画の終わりで終わります。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### ソース (Source)

再生する動画ファイル。**ソース** の行の ︙ メニューには、この要素でのファイルの読み方を決める [**伝達曲線**](#transfer-curve) と [**インターレース解除**](#deinterlacing) もあります。

- **型:** `VideoSource?`
- **既定値:** なし (`null`)
- **アニメーション:** 可

### ループ (IsLoop)

`true` のとき、再生が終端に達するとソースの先頭から再生し直します。`オフセット位置` は最初の再生の開始位置だけを決め、2 回目以降はソース全体を再生します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

## 伝達曲線 {/* #transfer-curve */}

**ソース** の行の ︙ メニューにある **伝達曲線** で、SDR 動画のコード値を光に変換する曲線を選びます。動画の色のタグがない場合や間違っている場合に使います。

| 選択肢 | 動画の読み方 |
|--------|--------------|
| **自動（タグに従う）**（既定） | 色のタグが示す曲線で読みます。BT.709、BT.601、BT.2020 の SDR 動画は QuickTime が表示に使う曲線で、タグのない動画は sRGB で読みます。[色のタグ](../../../tool-tabs/output.md#色のタグ)を参照してください |
| **QuickTime** | QuickTime が使う BT.709 の表示用の曲線 |
| **BT.1886** | ガンマ 2.4 の BT.1886 基準ディスプレイ |
| **sRGB** | sRGB の曲線 |
| **BT.709（撮影基準）** | BT.709 のカメラの曲線の逆変換で、撮影したシーンの光を復元します |

この設定が変えるのは SDR 動画だけで、HDR 動画（PQ や HLG）は元の曲線のままです。ICC プロファイルを埋め込んだ動画では、プロファイルの原色はそのままで曲線だけが変わるので、プロファイルがすでに sRGB の曲線を使っている場合、**sRGB** は **自動（タグに従う）** と同じ見た目になります。プレビューがプロキシを再生している間や書き出しでも、この設定が使われます。複数の要素を選択しているときは、選択したすべての要素に適用され、1 回の取り消し単位になります。

## インターレース解除 {/* #deinterlacing */}

インターレース動画は、異なる瞬間に撮影した 2 つのフィールドで各フレームを保存しているため、両方を重ねて描くと動いている部分に縞が出ます。**ソース** の行の ︙ メニューにある **インターレース解除** で、これを完全なフレームに変換します。

- **無効**（既定）: 保存されているフレームをそのまま描画します。
- **自動**: インターレースと記録されたフレームだけを解除します。すべてのフレームを確認するので、プログレッシブとインターレースが切り替わる映像も正しく再生されます。
- **有効**: すべてのフレームを解除します。

**自動** または **有効** の間は、3 つのサブメニューで解除の方法を設定します。

- **フィールド順序**: **自動**（既定）は各フレームに記録された順序に従います。**上位フィールド優先（TFF）** と **下位フィールド優先（BFF）** は、フラグが誤っている映像の順序を指定します。
- **解除方式**: **BWDIF**（既定）または **YADIF**。
- **フレームレート**: **フレーム（1倍）**（既定）は保存されている各フレームから 1 フレームを作ります。**フィールド（2倍）** は各フィールドから 1 フレームを作るので、フレームレートが 2 倍になり動きが滑らかになります。このとき、プログレッシブのフレームは 2 フィールド分の時間表示されます。

**インターレース解除** のサブメニューの先頭の行には、Beutl がファイルから検出した内容が表示されます。

- **無効** では、動画の先頭の走査方式（**プログレッシブ**、**上位フィールド優先（TFF）**、**下位フィールド優先（BFF）**）。
- **自動** では、**フレームごとに自動判定**。
- **有効** では、**上位フィールド優先（TFF） · インターレース解除を適用** のように、走査方式と **インターレース解除を適用**。**混在** は、先頭のフレームの走査方式が揃っていないことを示します。
- **プログレッシブのため解除不要** は、**自動** で、プログレッシブの動画をインターレース解除しないデコーダーで読んでいる場合です。
- **デコーダーがインターレース解除に非対応** は、利用できるデコーダーでファイルをインターレース解除できない場合です。

インターレース解除ができるのは FFmpeg のデコーダーだけです。インターレース解除を使っている間は、[デコーダーの優先順位](../../../../settings/extension.md)で別のデコーダーが上にあっても、FFmpeg で動画を読みます。[プロキシ](../../../tool-tabs/proxies.md)は要素のインターレース解除の設定で生成されるので、設定の異なる要素には別のプロキシが必要です。

## 共通プロパティ

このオブジェクトは `描画オブジェクト` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

動画ファイルをタイムラインへドラッグして追加できます。`オフセット位置` で開始位置を変え、`スピード` でスローモーションや早送り、`ループ` で背景用のループ再生にできます。

## ソース

[`src/Beutl.Engine/Graphics/SourceVideo.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Engine/Graphics/SourceVideo.cs)

- [`SourceVideo.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/SourceVideo.cs) / [`SpeedIntegrator.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/SpeedIntegrator.cs)（キーフレームのあるスピードと **オリジナルの長さに変更**）
- [`PropertyEditorMenu.axaml`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PropertyEditorMenu.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PropertyEditorMenu.axaml.cs)（**ソース** のメニュー）
- [`VideoTransferInterpretation.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/VideoTransferInterpretation.cs) / [`ImmediateCanvas.Drawing.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/ImmediateCanvas.Drawing.cs)（伝達曲線）
- [`VideoDeinterlaceOptions.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/Decoding/VideoDeinterlaceOptions.cs) / [`DecoderRegistry.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Media/Decoding/DecoderRegistry.cs) / [`FFmpegReader.Deinterlace.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.FFmpegWorker/Decoding/FFmpegReader.Deinterlace.cs)（インターレース解除）

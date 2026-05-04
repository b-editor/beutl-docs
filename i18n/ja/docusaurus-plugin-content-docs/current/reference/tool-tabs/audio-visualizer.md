---
title: "オーディオビジュアライザー"
description: "オーディオビジュアライザータブの役割と主な使い方を説明します。"
sidebar_position: 12
---

# オーディオビジュアライザー

シーンの **音声を可視化** するためのタブです。
波形・スペクトラム・レベルメーター・スペクトログラム・位相スコープといった複数の表示モードがあり、再生中はもちろん、停止中でも再生位置周辺の音声を解析して表示します。

## タブの特性

- **デフォルトで開く**: いいえ
- **複数同時に開く**: できる（異なる表示モードを並べて表示できます）

## 開き方

メニューバーの **「表示」→「ツール」→「オーディオビジュアライザー」** から開けます。

## 画面構成

- **ツールバー（上部）**: 左側に表示モードのドロップダウン、右側に設定ボタン（歯車アイコン）が並びます。
- **表示エリア（下部）**: 選択中のモードに対応するビジュアライザーが表示されます。

:::note
このタブは編集中のシーンの再生音声を解析するためのもので、エフェクトとしてシーンに **見た目を埋め込む** ためのオーディオビジュアライザーは [描画オブジェクト > オーディオビジュアライザー](../library/drawables/audio-visualizers/index.md) 側に別途用意されています。
:::

## 表示モード

ツールバー左側のドロップダウンで切り替えます。各項目にカーソルを合わせるとツールチップで簡単な説明が表示されます。

### 波形

直近の音声を時間軸の L/R 波形で表示します。

- 上段が左チャンネル、下段が右チャンネルで、それぞれ中心の点線軸を共有します。
- トランジェント、クリッピング、左右の非対称や DC オフセットの確認、また音声が実際に出力されているかを一目でチェックするのに使えます。

### スペクトラム

FFT によるリアルタイム周波数スペクトルです。

- 横軸は対数周波数（約 50 Hz〜ナイキスト周波数）で、`50 / 100 / 200 / 500 / 1k / 2k / 5k / 10k / 20k` の目盛りが破線と数値ラベルで描画されます。
- 縦軸は dB エネルギー（下が小さい、上が大きい）で、表示の下限は設定の **Min dB** で決まります。
- 設定フライアウトから **FFT サイズ**・**形状**・**スムージング**・**Min dB** を変更できます。
- EQ 調整、ハム音やホワイトノイズの検出、ミックスの高域含有量の確認などに使えます。

利用できる形状（Shape）は次の 4 種類です。

- **Bar**: 周波数バンドごとの縦棒
- **Line**: バンドの頂点を結ぶ折れ線
- **FilledArea**: 折れ線と下端で塗りつぶした面グラフ
- **MirroredBars**: 中央を基準に上下に対称展開した縦棒

### メーター

L/R ステレオレベルメーターです。放送用の各種読み値をまとめて表示します。

- **L / R バー**: RMS（短期平均レベル）。0 dB を上端、約 −60 dB を下端としたスケールで、`0 / -3 / -6 / -12 / -24 / -36 / -48 / -60` dB の目盛りが右側に表示されます。
- **ピークホールドマーカー**: 各バーに重ねて表示され、約 6 dB/秒で減衰します。0 dB 付近に達すると赤色になります。
- **クリップ LED（バー上部の赤い帯）**: 0 dBFS（±1.0）に達したときに点灯し、約 2 秒間ホールドされます。
- **M（瞬時 LUFS）**: BS.1770-4 K-weighting に基づくモメンタリ値（400 ms ウィンドウ）。バー下に数値表示されます。
- **TP L / TP R（True Peak）**: 4 倍ポリフェーズオーバーサンプリングによる左右のインターサンプルピーク（dBTP）。ピークホールドと同様に減衰します。
- 配信向けラウドネス目標（YouTube は −14 LUFS、EBU R128 は −23 LUFS など）のチェックや、エンコード前のインターサンプルピーク検出に使えます。

### スペクトログラム

直近約 4 秒の音声を時間–周波数のヒートマップで表示します。

- 横軸は時間（左が過去、右が現在）。
- 縦軸は対数周波数（下が低域、上が高域）。
- 明度（不透明度）がノイズフロアからの dB エネルギーを表します。
- 設定フライアウトから **FFT サイズ** と **Min dB** を変更できます。
- スイープフィルタ、ビブラート、ルームモード、持続音の倍音構造など、時間とともに変化する周波数特性の把握に使えます。

### 位相スコープ

ステレオを 45° 回転した Lissajous 図（ゴニオメータ）として表示する、位相モニタです。

- 画面中央の菱形が表示限界で、4 つの頂点には次の軸ラベルが付きます。
  - **M（上）**: 完全モノ。L=R の音声が縦軸上に直線状に並びます。
  - **S（下）**: 完全逆位相。L=−R の音声が下方向へ広がります。
  - **L（左）/ R（右）**: 片チャンネルだけの音声がそれぞれの対角線方向に表示されます。
- 左上の **corr** は L/R 間の Pearson 相関係数で、`+1` = 完全モノ、`0` = 無相関、`−1` = 完全逆位相を表します。
- チャンネル反転やモノ再生で消える位相干渉の検出に使えます。

## 設定フライアウト

ツールバー右側の歯車アイコンから設定パネルを開けます。設定はスペクトラムとスペクトログラム、レベルメーターの一部表示で共有されます。

### Spectrum

- **FFT Size**: スペクトラム / スペクトログラムで使う FFT のサイズ。`256 / 512 / 1024 / 2048 / 4096 / 8192` から選択します。値が大きいほど周波数分解能が上がり、小さいほど時間分解能（応答の速さ）が上がります。
- **Shape**: スペクトラムの描画形状（Bar / Line / FilledArea / MirroredBars）。
- **Smoothing**: スペクトラムの時間スムージングを `0%`〜`95%` で設定します。値が大きいほど表示が滑らかに、小さいほど反応が機敏になります。

### Display

- **Min dB**: 表示の下限 dB を `−120 dB`〜`−40 dB` の範囲で設定します。スペクトラムでは縦軸の下端、スペクトログラムでは「ノイズフロア」として扱われます。

### 設定の初期化

各設定項目（コンボボックスやスライダー）を **右クリック** すると、その項目だけが既定値に戻ります。各項目のツールチップにも同じ説明が表示されます。既定値は次のとおりです。

| 項目 | 既定値 |
|------|------|
| FFT Size | 2048 |
| Shape | Bar |
| Smoothing | 55% |
| Min dB | −90 dB |

## 再生位置への追従

- 再生中はリアルタイムにフレームが流れ込み、表示が随時更新されます。
- 再生停止中でも、再生位置を移動するたびにその位置周辺の音声が解析され、表示が更新されます（再生位置の細かいスクラブにも追従します）。
- タブが選択されていないときは更新を停止し、負荷を抑えます。

## 状態の保存

選択中の表示モード、FFT サイズ、形状、スムージング、Min dB はプロジェクトのレイアウトと一緒に保存され、次回起動時に復元されます。

## 関連ドキュメント

- [スコープ](./color-scopes.md)
- [シーン設定](./scene-settings.md)

## ソース

- [`AudioVisualizerTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/AudioVisualizerTabExtension.cs)
- [`AudioVisualizerTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/AudioVisualizerTabViewModel.cs)
- [`AudioVisualizerMode.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/AudioVisualizerMode.cs)
- [`SpectrumDisplayShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/ViewModels/SpectrumDisplayShape.cs)
- [`AudioVisualizerTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerTabView.axaml.cs)
- [`AudioVisualizerControlBase.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/AudioVisualizerControlBase.cs)
- [`WaveformControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/WaveformControl.cs)
- [`SpectrumControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/SpectrumControl.cs)
- [`LevelMeterControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/LevelMeterControl.cs)
- [`SpectrogramControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/SpectrogramControl.cs)
- [`PhaseScopeControl.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/AudioVisualizerTab/Views/PhaseScopeControl.cs)

---
title: "リサンプリング"
description: "サウンドをファイルのサンプルレートからプロジェクトのサンプルレートへ、選んだ補間方法で変換します。"
sidebar_position: 11
---

# リサンプリング

サウンドをファイルのサンプルレートからプロジェクトのサンプルレートへ、選んだ補間方法で変換します。このエフェクトがないときは、サウンドのすべてのエフェクトの後で変換されます。このエフェクトを置くと、置いた位置で変換されます。これより前のエフェクトはファイルのサンプルレートで、後のエフェクトはプロジェクトのサンプルレートで処理されます。8 kHz や 11.025 kHz のゲーム音やサンプラーの音のような低いレートの素材を、補間しなかった当時のハードウェアの段差を残したまま使うことも、きれいに変換することもできます。

## ライブラリでの場所

「ライブラリ」 → 音声エフェクト → リサンプリング

## プロパティ

### 方式 (Method)

音声をプロジェクトのサンプルレートに変換するときに、サンプルの間を埋める方法です。`ホールド` が最も荒く、`線形`、`Catmull–Rom` と `4点Lagrange` の順になめらかになります。`Sinc 16` と `Sinc 64` は変換で生じる余分な周波数も取り除き、最もきれいに変換します。

- **型:** `ResamplingMethod`
- **既定値:** `ResamplingMethod.Hold`
- **アニメーション:** 不可

選べる値は次のとおりです。

- `ホールド`: 最も単純なハードウェアのように、次のサンプルまで各サンプルの値を保ちます。
- `線形`: 隣り合うサンプルの間を直線で結びます。
- `Catmull–Rom`: 4 つのサンプルを通る 3 次曲線で、傾きは両隣のサンプルに沿います。
- `4点Lagrange`: 4 つのサンプルを通る 3 次多項式です。
- `Sinc 16`: 16 サンプルにわたる窓付き sinc 関数です。
- `Sinc 64`: 64 サンプルにわたる窓付き sinc 関数で、`Sinc 16` より急峻に、より深くカットします。

## 補足

- すでにプロジェクトのサンプルレートになっている音声は、そのまま通ります。プロジェクトと同じサンプルレートのファイルのほか、プロジェクトのサンプルレートでミックスされる[サウンドグループ](../containers/sound-group.md)や[シーン参照（音声）](../references/scene-reference-audio.md)も同じです。同じチェーンに 2 つ目のリサンプリングを置いても、1 つ目で変換済みなので音声はそのまま通ります。
- 96 kHz から 48 kHz のように低いレートへ変換するときは、sinc の方式はプロジェクトのサンプルレートの半分を超える成分もカットするので、それが折り返して音に混ざることはほとんどありません。最もよくカットするのは `Sinc 64` です。
- 入力を遅らせるのではなく先読みするので、処理遅延が加わらず、音は映像とずれません。シークしても再生時と同じサンプルになります。

## 使い方

サウンドの音声エフェクトの先頭に置くと、ほかのエフェクトをプロジェクトのサンプルレートで処理できます。きれいに変換するには `Sinc 16` か `Sinc 64` を、低いレートの素材の段差のある粗い音を残すには `ホールド` を選びます。

## ソース

[`src/Beutl.Engine/Audio/Effects/ResamplingEffect.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Effects/ResamplingEffect.cs)

- [`ResamplingMethod.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Effects/ResamplingMethod.cs)
- [`ResamplingNode.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Graph/Nodes/ResamplingNode.cs) / [`ResamplingKernel.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Graph/ResamplingKernel.cs)
- [`Sound.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Engine/Audio/Sound.cs)（エフェクトがないときの変換の位置）
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Language/AudioStrings.ja.resx)

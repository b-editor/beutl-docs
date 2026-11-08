---
title: "ビブラート"
description: "音声信号の高さを一定の速さで揺らします。"
sidebar_position: 9
---

# ビブラート

前後に揺れる遅延を通して音声信号を読み、音の高さを揺らします。遅延は `0` から `深さ` の 2 倍までの間で揺れ、揺れのはじめは遅延なしから始まるので、クリップは時間どおりに始まります。

## ライブラリでの場所

「ライブラリ」 → 音声エフェクト → ビブラート

## プロパティ

### 速さ (Hz) (Rate)

音の高さが 1 秒間に揺れる回数です。

- **型:** `float`
- **既定値:** `5`
- **アニメーション:** 可
- **範囲:** `[0, 20]`

### 深さ (ms) (Depth)

遅延が揺れる幅をミリ秒で指定します。大きくするほど音の高さが大きく揺れます。

- **型:** `float`
- **既定値:** `2`
- **アニメーション:** 可
- **範囲:** `[0, 20]`

## 補足

- 遅延により、音は最大で `深さ` の 2 倍だけ遅れます。エフェクトはその分の遅延（`深さ` をアニメーションしているときは 40 ms）を報告し、音声グラフはクリップの自然な終端でバッファ内の末尾を排出します。
- 揺れは時刻だけから計算するので、`速さ` が一定ならシークしても同じ結果になります。

## 使い方

穏やかなビブラートには既定値から始めます。揺れを大きくするには `深さ` を、細かく震わせるには `速さ` を上限に近づけます。

## ソース

[`src/Beutl.Engine/Audio/Effects/VibratoEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/VibratoEffect.cs)

- [`VibratoNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/VibratoNode.cs)
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.ja.resx)

---
title: "リングモジュレーター"
description: "音声信号に正弦波を掛け合わせ、金属的な音やロボットのような声にします。"
sidebar_position: 10
---

# リングモジュレーター

音声信号に `周波数` の正弦波を掛け合わせます。各音は 2 つの周波数の和と差の音に変わります。金属的な音、鐘のような音、ロボットのような声に使います。正弦波は時刻だけから計算するので、`周波数` が一定ならシークしても同じ結果になります。

## ライブラリでの場所

「ライブラリ」 → 音声エフェクト → リングモジュレーター

## プロパティ

### 周波数 (Hz) (Frequency)

信号に掛け合わせる正弦波の周波数です。およそ 20 Hz より低い値では、音色ではなく音量が脈打つように変わります。

- **型:** `float`
- **既定値:** `440`
- **アニメーション:** 可
- **範囲:** `[0, 5000]`

### ミックス (%) (Mix)

元の信号と変調した信号のバランスです。`0` では信号は変わらず、`100` で完全に変調します。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## 使い方

ロボットのような声には、`周波数` をおよそ 30〜100 Hz にします。鐘のような音には数百 Hz を使い、`ミックス` を下げて元の音を少し残します。

## ソース

[`src/Beutl.Engine/Audio/Effects/RingModulatorEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/RingModulatorEffect.cs)

- [`RingModulatorNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/RingModulatorNode.cs)
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.ja.resx)

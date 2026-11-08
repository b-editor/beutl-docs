---
title: "ピッチシフト"
description: "速さを変えずに、音声信号の高さを上げ下げします。"
sidebar_position: 8
---

# ピッチシフト

速さを保ったまま、音声信号の高さを上げ下げします。波形が揃う位置で短い粒をつなぐ WSOLA で音を伸び縮みさせ、音の高さに応じた速さで再生します。入力を遅らせるのではなく先読みするので、処理遅延が加わらず、音は映像とずれません。

## ライブラリでの場所

「ライブラリ」 → 音声エフェクト → ピッチシフト

## プロパティ

### 半音 (Semitones)

音の高さをずらす量を半音単位で指定します。`12` で 1 オクターブ上、`-12` で 1 オクターブ下です。`0` では入力をそのまま通します。式などで範囲外の値になった場合は、範囲内に収めます。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可
- **範囲:** `[-24, 24]`

## 使い方

サウンドの音声エフェクトに追加し、`半音` を設定すると、タイミングを変えずに声や楽器の高さを変えられます。高さを時間とともに変えるには、`半音` をキーフレームや式でアニメーションさせます。

## ソース

[`src/Beutl.Engine/Audio/Effects/PitchShiftEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Effects/PitchShiftEffect.cs)

- [`PitchShiftNode.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Audio/Graph/Nodes/PitchShiftNode.cs)
- [`AudioStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/AudioStrings.ja.resx)

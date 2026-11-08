---
title: "エッジ抽出"
description: "レイヤーの明るさ、色、透明度が変わる場所に線を引き、線画やマスクを作ります。"
sidebar_position: 45
---

# エッジ抽出

レイヤーの明るさ、色、透明度が変わる場所に線を引き、絵の輪郭を線画やマスクとして取り出します。元の画像は、表示しない、線の裏に表示する、線の表に表示する（周囲に縁取りが残ります）から選べます。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → エッジ抽出

## プロパティ

### 検出対象 (Target)

何の変化を測るかです。

- **型:** `EdgeDetectionTarget`
- **既定値:** `EdgeDetectionTarget.Luminance`
- **アニメーション:** 可

選べる値は次のとおりです。

- `輝度`: 絵の内側の、明るくなったり暗くなったりする場所に線を引きます。透明な部分は計算に入らないため、絵の外枠には線を引きません。
- `透明度`: 絵が透明へ変わる輪郭に沿って線を引きます。線は輪郭の両側に伸びます。
- `色`: 絵の内側の、色の明るさ、色相、彩度が変わる場所に線を引きます。明るさが同じでも色相が違えば区切ります。透明な部分は計算に入りません。

### 太さ (Thickness)

線がエッジの両側へ伸びる距離を、コンポジション上の単位で指定します。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0, 1000]`

### しきい値 (Threshold)

これより小さな変化には線を引きません。黒から白、または透明から不透明への変化が `100` です。

- **型:** `float`
- **既定値:** `10`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 強さ (Strength)

しきい値を超えた変化が、どれだけ濃い線になるかです。`100` ではしきい値より 10 ポイント大きい変化から、`50` では 20 ポイント、`20` では 50 ポイント大きい変化から濃い線になります。値を下げると、変化の大きさに応じて線が濃くなります。線が伸びる距離は変わりません。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

### 色 (Color)

線の色です。

- **型:** `Color`
- **既定値:** `#FFFFFFFF` (白)
- **アニメーション:** 可

### 元画像 (Original)

元の画像をどう表示するかです。

- **型:** `EdgeDetectionOriginal`
- **既定値:** `EdgeDetectionOriginal.Hidden`
- **アニメーション:** 可

選べる値は次のとおりです。

- `表示しない`: 線だけを表示します。
- `裏に表示`: 線の裏に元の画像を表示します。
- `表に表示`: 線の表に元の画像を表示します。線は画像の周囲と、画像の透明な部分からだけ見えます。

## 使い方

線画にするには `元画像` を `表示しない` のままにして、必要な線が出るまで `しきい値` を下げます。切り抜いた形を縁取るには `透明度` と `表に表示` を選び、`太さ` を上げます。明るさの近い 2 つの領域も区切りたいときは `色` を使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/EdgeDetection.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetection.cs)

- [`EdgeDetectionTarget.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetectionTarget.cs) / [`EdgeDetectionOriginal.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/EdgeDetectionOriginal.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.ja.resx)

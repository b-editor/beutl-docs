---
title: "テキスト"
description: "指定したフォントとスタイルで文字列を描画します。"
sidebar_position: 5
---

# テキスト

指定したフォント・ウェイト・スタイル・字間でテキストを描画します。`文字ごとに分割` を有効にすると、各文字が個別のオブジェクトとして扱われ、一文字ずつ別々にエフェクトを適用できます。

## ライブラリでの場所

「ライブラリ」 → テキスト

## プロパティ

### サイズ (Size)

フォントサイズ（ピクセル）。

- **型:** `float`
- **既定値:** `12`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### フォントファミリー (FontFamily)

描画に使用するフォントファミリー。

- **型:** `FontFamily?`
- **既定値:** システムのデフォルト (`FontFamily.Default`)
- **アニメーション:** 不可

### フォントスタイル (FontStyle)

フォントスタイル（標準・イタリック・斜体）。

- **型:** `FontStyle`
- **既定値:** `FontStyle.Normal`
- **アニメーション:** 不可

### フォントの太さ (FontWeight)

フォントウェイト（Thin 〜 Black）。

- **型:** `FontWeight`
- **既定値:** `FontWeight.Regular`
- **アニメーション:** 不可

### 字間 (Spacing)

文字間に追加で挿入される水平方向の余白（ピクセル）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 文字ごとに分割 (SplitByCharacters)

`true` のとき、各文字が個別のオブジェクトとして描画され、文字ごとにエフェクトを適用できます。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

### テキスト (Text)

描画する文字列。制御構文で範囲ごとにスタイルを変えることもできます。

- **型:** `string?`
- **既定値:** `""`
- **アニメーション:** 不可

**制御構文の例:**
```
<font="Noto Sans JP">この文字列はNoto Sans JPフォントで表示されます。</font>
<size=24>この文字列はサイズ24で表示されます。</size>
<color=#FF0000>この文字列は赤色で表示されます。</color>
<#FF0000>カラーコードを直接指定することも可能です。</color>
<stroke="#FF0000,2">この文字列は赤色で線が引かれ、線幅は2ピクセルです。</stroke>
<stroke="#FF0000,2,round,round,outside,10">キャップ (flat, round, square)、結合 (miter, round, bevel)、位置 (center, inside, outside)、鋭角の厚み上限も指定できます。</stroke>
<cspace=10>この文字列は字間が10ピクセルになります。</cspace>
<weight=bold>この文字列は太字になります。boldの他にthin, ultra-light, light, semi-light, regular, medium, semi-bold, bold, b, extra-bold, black, extra-blackが指定できます。</weight>
<b>単純にbをタグにすることでも太字にできます。</b>
<style=italic>フォントが対応していれば、この文字列はイタリック体になります。italicの他にnormalとobliqueが指定できます。</style>
<i>単純にiをタグにすることでもイタリック体にできます。</i>
<noparse>この文字列はタグを無効化します。<font="Noto Sans JP">この部分もNoto Sans JPにはなりません。</noparse>
<single-line>
この文字列は
改行されません。
</single-line>
```

### ストローク (Pen)

輪郭線（任意）。アウトラインを描く場合に設定します。

- **型:** `Pen?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 塗りつぶし (Fill)

グリフの塗りに使用するブラシ。

- **型:** `Brush?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `描画オブジェクト` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## 使い方

テキストを入力し、フォントを選び、サイズなどを調整します。歌詞や文字ごとのモーションを作りたい場合は `文字ごとに分割` を有効化し、トランスフォームやフィルターエフェクトを組み合わせてください。

## ソース

[`src/Beutl.Engine/Graphics/Shapes/TextBlock.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextBlock.cs)

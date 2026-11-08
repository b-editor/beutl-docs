---
title: "繰り返し配置"
description: "レイヤーのコピーを、間隔、オフセット、交互の反転を付けてグリッド状に並べます。"
sidebar_position: 47
---

# 繰り返し配置

レイヤーのコピーを、元の位置を中心にグリッド状に並べます。エフェクトチェーンの中の位置によって、何が繰り返されるかが決まります。これより前のエフェクトは絵と一緒に繰り返され、これより後のエフェクトとオブジェクトのトランスフォームは、グリッド全体を 1 枚の絵として扱います。グリッドの各ピクセルは絵の 1 か所を読むだけなので、コピーを増やしてもフレームあたりの負荷は増えず、フレームに映る部分だけが描画されます。このエフェクトには GPU テクスチャと GLSL の実行が必要です。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 繰り返し配置

## プロパティ

### 列数 (Columns)

横に並べるコピーの数です。

- **型:** `int`
- **既定値:** `3`
- **アニメーション:** 可
- **範囲:** `[1, 400]`

### 行数 (Rows)

縦に並べるコピーの数です。

- **型:** `int`
- **既定値:** `3`
- **アニメーション:** 可
- **範囲:** `[1, 400]`

### 間隔 (Spacing)

コピーどうしの横と縦の隙間です。`0` で隙間なく並び、つなぎ目は見えません。負の値にはできないので、コピーが重なることはありません。

- **型:** `Size`
- **既定値:** `(0, 0)`
- **アニメーション:** 可
- **範囲:** `[(0, 0), (∞, ∞))`

### オフセット (Offset)

グリッドの中でコピーを動かします。端から出たコピーは反対側から戻るので、アニメーションさせると途切れずにスクロールします。グリッドの範囲は動きません。

- **型:** `Point`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### 交互に反転 (Mirror)

コピーを 1 つおきに反転します。`なし`、`1 列おき`、`1 行おき`、`両方` から選びます。オフセットでスクロールしても、反転したコピーは交互に並んだままです。

- **型:** `RepeatEffectMirror`
- **既定値:** `RepeatEffectMirror.None`
- **アニメーション:** 可

## 使い方

図形やロゴなどの小さなタイルを置き、グリッドがフレームを埋めるまで `列数` と `行数` を設定します。スクロールする背景には `オフセット` をアニメーションさせ、端どうしをつなげたい模様には `交互に反転` を使います。オフセットが小数のときはコピーがピクセルの間でフィルタリングされ、わずかに柔らかくなります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/RepeatEffect.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/RepeatEffect.cs)

- [`RepeatEffectMirror.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Engine/Graphics/FilterEffects/RepeatEffectMirror.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Language/GraphicsStrings.ja.resx)

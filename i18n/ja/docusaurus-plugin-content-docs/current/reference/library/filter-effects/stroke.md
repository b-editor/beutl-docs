---
title: "ストローク"
description: "レイヤーの周囲にアウトライン（ストローク）を描画します。"
sidebar_position: 5
---

# ストローク

レイヤーの不透明領域の周囲にアウトライン（ストローク）を描画します。`スタイル` で元レイヤーの背面 / 前面を選べます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → ストローク

## プロパティ

### ストローク (Pen)

ストロークの色・太さ・破線などを記述する Pen。

- **型:** `Pen?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### オフセット (Offset)

元レイヤーに対するストロークのオフセット。

- **型:** `Point`
- **既定値:** `(0, 0)`
- **アニメーション:** 可

### ボーダースタイル (Style)

ストロークを元レイヤーの背面（Background）/ 前面（Foreground）どちらに描画するか。

- **型:** `StrokeStyles`
- **既定値:** `StrokeStyles.Background`
- **アニメーション:** 可

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/StrokeEffect.cs)

---
title: "明るさ調整"
description: "乗算と加算で明るさを調整します。"
sidebar_position: 11
---

# 明るさ調整

`乗算` と `加算` の 2 つのカラーで明るさを調整します（`out = src · Multiply + Add`）。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → 明るさ調整

## プロパティ

### 乗算 (Multiply)

元ピクセルと乗算するカラー。

- **型:** `Color`
- **既定値:** `#FFFFFFFF` (白)
- **アニメーション:** 可

### 加算 (Add)

乗算後に元ピクセルへ加算するカラー。

- **型:** `Color`
- **既定値:** `#00000000` (透明な黒)
- **アニメーション:** 可

## 使い方

`乗算` でティント（例：暖色のウォッシュ）、`加算` で黒の持ち上げ（例：フェードしたフィルム調）といった調整に使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/Lighting.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/Lighting.cs)

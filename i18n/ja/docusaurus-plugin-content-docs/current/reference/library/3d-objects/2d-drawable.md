---
title: "2D描画オブジェクト"
description: "2D描画オブジェクトを3Dシーン内の平面カードに配置します。"
sidebar_position: 9
---

# 2D描画オブジェクト

:::caution 試験的な機能

この3D機能は開発中であり、APIは予告なく変更される可能性があります。

:::

フロー内で先行する2D描画オブジェクト、または自身の子要素を3Dシーン内の平面カードに配置します。既定のカメラでは元の2D配置を保ち、位置・回転・スケールは内容の中心を基準にカードを変形します。

## ライブラリでの場所

「ライブラリ」 → 3D（実験的） → 2D描画オブジェクト

## プロパティ

### 子要素 (Children)

内容を直接指定する場合に、カードへ配置する2D描画オブジェクト。

- **型:** `IListProperty<Drawable>`
- **既定値:** 空のリスト
- **アニメーション:** 不可

## 共通プロパティ

[Object3Dの共通プロパティ](../common-properties.md#object3d)を継承します。マテリアルは内部の `UnlitMaterial` を使用し、プロパティエディターには表示しません。**影を投影する**（`CastShadows`）の既定値は `false` です。

## ソース

- [`DrawableObject3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/DrawableObject3D.cs)
- [`CoordinateSystem3D.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics3D/CoordinateSystem3D.cs)
- [`LibraryRegistrar.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/LibraryRegistrar.cs)

---
title: "回転3D"
description: "レイヤーを 3D 空間（X / Y / Z 軸）で回転します。"
sidebar_position: 5
---

# 回転3D

指定した中心点を基準にレイヤーを 3D 空間で回転させます。`深度` でパースの強さを制御します。

## ライブラリでの場所

「ライブラリ」 → トランスフォーム → 回転3D

## プロパティ

### X回転 (RotationX)

X 軸まわりの回転（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### Y回転 (RotationY)

Y 軸まわりの回転（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### Z回転 (RotationZ)

Z 軸まわりの回転（度）。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 中心X (CenterX)

回転中心の X 座標。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 中心Y (CenterY)

回転中心の Y 座標。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 中心Z (CenterZ)

回転中心の Z 座標。

- **型:** `float`
- **既定値:** `0`
- **アニメーション:** 可

### 深度 (Depth)

パース深度。大きいほどパースが強くかかります。

- **型:** `float`
- **既定値:** `500`
- **アニメーション:** 可

## 使い方

3D カードフリップ・ページめくり・キューブ面の演出などに使います。`深度` を大きくするとパースが強調され、小さくすると平行投影に近づきます。

## ソース

[`src/Beutl.Engine/Graphics/Transformation/Rotation3DTransform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/Rotation3DTransform.cs)

---
title: "ジオメトリー"
description: "任意のパスを描画します。"
sidebar_position: 4
---

# ジオメトリー

任意のパスを描画します。

## ライブラリでの場所

「ライブラリ」 → ジオメトリー

## プロパティ

### データ (Data)

描画するパスデータ。線分やベジェ曲線などのセグメントを組み合わせて定義します。

- **型:** `Geometry?`
- **既定値:** 空の `PathGeometry`
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `シェイプ` を継承しているため、基底クラスで宣言された[共通プロパティ](../../common-properties.md)も利用できます。

## パスジオメトリーの構造

`データ` (Data) の既定値は `PathGeometry` です。`PathGeometry` は `PathFigure` のリストを保持し、各 `PathFigure` は `PathSegment` のリストを保持します。

### PathGeometry

- **Figures:** `IList<PathFigure>`、既定値: 空のリスト、アニメーション不可。

### PathFigure

- **開始点 (StartPoint):** `Point`、既定値 `(NaN, NaN)`、アニメーション可。フィギュアの開始点。
- **閉じる (IsClosed):** `bool`、既定値 `false`、アニメーション可。`true` のときフィギュアが開始点に戻って閉じます。
- **セグメント (Segments):** `IList<PathSegment>`、既定値: 空のリスト。

### パスセグメント

`セグメント` (Segments) リストには `PathSegment` の派生クラスを追加できます。各セグメントは前の点からどのように曲線を継続するかを定義します。

#### 直線セグメント

直線で次の点まで描画します。

- **点 (Point):** `Point`、既定値 `(0, 0)`、アニメーション可。直線の終点。

#### 二次ベジェセグメント

二次ベジェ曲線を追加します。

- **制御点 (ControlPoint):** `Point`、既定値 `(0, 0)`、アニメーション可。
- **終点 (EndPoint):** `Point`、既定値 `(0, 0)`、アニメーション可。

#### 三次ベジェセグメント

三次ベジェ曲線を追加します。

- **制御点1 (ControlPoint1):** `Point`、既定値 `(0, 0)`、アニメーション可。
- **制御点2 (ControlPoint2):** `Point`、既定値 `(0, 0)`、アニメーション可。
- **終点 (EndPoint):** `Point`、既定値 `(0, 0)`、アニメーション可。

#### アークセグメント

楕円弧を追加します。

- **半径 (Radius):** `Size`、既定値 `(0, 0)`、アニメーション可。楕円の X / Y 半径。
- **回転角度 (RotationAngle):** `float`、既定値 `0`、アニメーション可。楕円の回転（度）。
- **大きい弧 (IsLargeArc):** `bool`、既定値 `false`、アニメーション可。`true` のとき長い方（180°以上）の弧が描画されます。
- **時計回り (SweepClockwise):** `bool`、既定値 `true`、アニメーション可。スイープ方向。
- **点 (Point):** `Point`、既定値 `(0, 0)`、アニメーション可。弧の終点。

#### コニックセグメント

有理二次曲線を追加します（厳密な円弧・楕円弧の表現に使用）。

- **制御点 (ControlPoint):** `Point`、既定値 `(0, 0)`、アニメーション可。
- **終点 (EndPoint):** `Point`、既定値 `(0, 0)`、アニメーション可。
- **重み (Weight):** `float`、既定値 `1`、アニメーション可。値が大きいほど制御点側に曲線が引き寄せられます。

## 使い方

セグメントを組み合わせて、ロゴ・アイコン・カスタム吹き出しといった複雑な形状を描けます。他のシェイプオブジェクトと同じく塗りつぶしやストロークを設定できます。

## ソース

[`src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/GeometryShape.cs)

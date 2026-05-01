---
title: "共通プロパティ"
description: "描画オブジェクト / シェイプ / フィルターエフェクト などに共通するプロパティの一覧。"
sidebar_position: 1
---

# 共通プロパティ

ライブラリに登録されている各オブジェクトは、共通の基底クラスからプロパティを継承しています。各オブジェクトの個別ページでは、そのクラスで新たに宣言されたプロパティのみを掲載しているため、継承される共通プロパティは本ページを参照してください。

以下は基底クラスの継承関係です：

```
EngineObject
 ├─ Drawable
 │   ├─ Shape (Pen, Fill)
 │   └─ AudioVisualizerDrawable
 ├─ FilterEffect
 ├─ Transform
 ├─ Sound
 ├─ AudioEffect
 ├─ Object3D
 │   └─ Group3D
 └─ Light3D
```

## EngineObject

宣言ファイル: [`src/Beutl.Engine/Engine/EngineObject.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Engine/EngineObject.cs)、継承元: `Hierarchical`。

_このクラス自体に新たなプロパティはありません。_

## 描画オブジェクト (Drawable)

宣言ファイル: [`src/Beutl.Engine/Graphics/Drawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Drawable.cs)、継承元: `EngineObject`。

### トランスフォーム (Transform)

描画オブジェクトに適用する 2D トランスフォーム（移動 / 拡大縮小 / 回転 / 歪み）。コンストラクタで空の `TransformGroup` がインスタンス化されるため、追加のトランスフォームを差し込めます。

- **型:** `Transform?`
- **既定値:** 空の `TransformGroup`
- **アニメーション:** 不可

### アライメントX (AlignmentX)

描画オブジェクトの境界内における水平方向の配置。

- **型:** `AlignmentX`
- **既定値:** 中心 (`AlignmentX.Center`)
- **アニメーション:** 可

### アライメントY (AlignmentY)

描画オブジェクトの境界内における垂直方向の配置。

- **型:** `AlignmentY`
- **既定値:** 中心 (`AlignmentY.Center`)
- **アニメーション:** 可

### トランスフォームの起点 (TransformOrigin)

`Transform` の基準点（相対座標、または絶対座標）。

- **型:** `RelativePoint`
- **既定値:** 中心 (`RelativePoint.Center`)
- **アニメーション:** 可

### フィルターエフェクト (FilterEffect)

描画後に適用するフィルターエフェクトチェーン（任意）。コンストラクタで空の `FilterEffectGroup` がインスタンス化されるため、エフェクトを追加で差し込めます。

- **型:** `FilterEffect?`
- **既定値:** 空の `FilterEffectGroup`
- **アニメーション:** 不可

### ブレンドモード (BlendMode)

この描画オブジェクトをキャンバスに合成する際のブレンドモード。

- **型:** `BlendMode`
- **既定値:** 前面合成 (`BlendMode.SrcOver`)
- **アニメーション:** 可

### 不透明度 (Opacity)

レイヤーの不透明度（パーセント。0 で透明、100 で完全不透明）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, 100]`

## シェイプ (Shape)

宣言ファイル: [`src/Beutl.Engine/Graphics/Shapes/Shape.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/Shape.cs)、継承元: `Drawable`。

### ストローク (Pen)

輪郭線を描画する Pen。なし (`null`) のとき輪郭は描画されません。

- **型:** `Pen?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 塗りつぶし (Fill)

内部を塗るブラシ。なし (`null`) のとき塗りなしになります。

- **型:** `Brush?`
- **既定値:** `#FFFFFFFF` (白)
- **アニメーション:** 不可

## サウンド (Sound)

宣言ファイル: [`src/Beutl.Engine/Audio/Sound.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Sound.cs)、継承元: `EngineObject`。

### オフセット位置 (OffsetPosition)

ソース音声内のどの時刻から再生を開始するか。

- **型:** `TimeSpan`
- **既定値:** `00:00:00`
- **アニメーション:** 不可

### ゲイン (Gain)

音量（パーセント。100 が原音）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### スピード (Speed)

再生速度（パーセント。100 が等倍）。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 音声エフェクト (Effect)

コンストラクタで空の `AudioEffectGroup` がインスタンス化されるため、エフェクトを追加で差し込めます。

- **型:** `AudioEffect?`
- **既定値:** 空の `AudioEffectGroup`
- **アニメーション:** 不可

## オーディオビジュアライザー (AudioVisualizerDrawable)

宣言ファイル: [`src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/AudioVisualizers/AudioVisualizerDrawable.cs)、継承元: `Drawable`。

### ソース (Source)

可視化対象のサウンドソース。

- **型:** `Sound?`
- **既定値:** なし (`null`)
- **アニメーション:** 不可

### 幅 (Width)

可視化の幅（ピクセル）。

- **型:** `float`
- **既定値:** `640`
- **アニメーション:** 可
- **範囲:** `[1, ∞)`

### 高さ (Height)

可視化の高さ（ピクセル）。

- **型:** `float`
- **既定値:** `120`
- **アニメーション:** 可
- **範囲:** `[1, ∞)`

### 塗りつぶし (Fill)

バーや線を描くブラシ。

- **型:** `Brush?`
- **既定値:** `#FFFFFFFF` (白)
- **アニメーション:** 不可

### ゲイン (Gain)

描画前に適用するビジュアライザー専用のゲイン（1 が原寸）。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0.01, 1000]`

## フィルターエフェクト (FilterEffect)

宣言ファイル: [`src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/FilterEffect.cs)、継承元: `EngineObject`。

_このクラス自体に新たなプロパティはありません。_

## トランスフォーム (Transform)

宣言ファイル: [`src/Beutl.Engine/Graphics/Transformation/Transform.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Transformation/Transform.cs)、継承元: `EngineObject`。

_このクラス自体に新たなプロパティはありません。_

## 音声エフェクト (AudioEffect)

宣言ファイル: [`src/Beutl.Engine/Audio/Effects/AudioEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/Effects/AudioEffect.cs)、継承元: `EngineObject`。

_このクラス自体に新たなプロパティはありません。_

## 3Dオブジェクト (Object3D)

宣言ファイル: [`src/Beutl.Engine/Graphics3D/Object3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Object3D.cs)、継承元: `EngineObject`。

### 位置 (Position)

3D 空間でのローカル位置。

- **型:** `Vector3`
- **既定値:** `(0, 0, 0)`
- **アニメーション:** 可

### 回転 (Rotation)

ローカル回転（オイラー角・度）。

- **型:** `Vector3`
- **既定値:** `(0, 0, 0)`
- **アニメーション:** 可

### スケール (Scale)

軸ごとのローカルスケール。

- **型:** `Vector3`
- **既定値:** `(1, 1, 1)`
- **アニメーション:** 可

### マテリアル (Material)

サーフェスのシェーディングを定義するマテリアル。

- **型:** `Material3D?`
- **既定値:** `PBRMaterial`（`Group3D` では `null` で上書きされます）
- **アニメーション:** 不可

### 影を投影する (CastShadows)

`true` のとき、このオブジェクトはシャドウを落とします。

- **型:** `bool`
- **既定値:** `true`
- **アニメーション:** 可

### 影を受ける (ReceiveShadows)

`true` のとき、このオブジェクトはシャドウを受け取ります。

- **型:** `bool`
- **既定値:** `true`
- **アニメーション:** 可

## 3Dグループ (Group3D)

宣言ファイル: [`src/Beutl.Engine/Graphics3D/Group3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Group3D.cs)、継承元: `Object3D`。

_このクラス自体に新たなプロパティはありません。_

## 3Dライト (Light3D)

宣言ファイル: [`src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics3D/Lighting/Light3D.cs)、継承元: `EngineObject`。

### 色 (Color)

ライトの色。

- **型:** `Color`
- **既定値:** 白 (`#FFFFFF`)
- **アニメーション:** 可

### 強度 (Intensity)

ライトの明るさの倍率。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0, ∞)`

### 影を投影 (CastsShadow)

`true` のとき、このライトはシャドウを生成します。

- **型:** `bool`
- **既定値:** `false`
- **アニメーション:** 可

### シャドウバイアス (ShadowBias)

シャドウ比較に加える定数バイアス（シャドウアクネ対策）。

- **型:** `float`
- **既定値:** `0.0001`
- **アニメーション:** 可
- **範囲:** `[0, 0.01]`

### シャドウ法線バイアス (ShadowNormalBias)

シャドウのにじみを抑えるための法線方向バイアス。

- **型:** `float`
- **既定値:** `0.02`
- **アニメーション:** 可
- **範囲:** `[0, 0.1]`

### 影の強度 (ShadowStrength)

通常のライティングとシャドウ領域のミックス比（1 でフルシャドウ）。

- **型:** `float`
- **既定値:** `1`
- **アニメーション:** 可
- **範囲:** `[0, 1]`

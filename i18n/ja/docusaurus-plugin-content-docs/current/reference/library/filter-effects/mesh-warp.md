---
title: "メッシュワープ"
description: "プレビューで格子の制御点をドラッグして、レイヤーを変形します。"
sidebar_position: 52
---

# メッシュワープ

レイヤーに重ねた格子の制御点を動かして、レイヤーを変形します。プレビューで点をドラッグすると、絵がそれに合わせて伸び縮みします。メッシュ全体が 1 つの値なので、`メッシュ` にキーフレームを打つと、ある形から次の形へ変化させられます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → メッシュワープ

## プレビューでメッシュを編集する

1. プロパティタブで、エフェクトの目のアイコンの左にある十字のボタン **フレームで編集** をクリックします。[エフェクトのハンドルをプレビューで編集する](../../tool-tabs/element-property.md#effect-handles)を参照してください。
2. プレビューにレイヤーに重なった格子が表示されます。点と点を結ぶ線、四隅のオレンジの点、ほかの点を示す青い点です。その間、オブジェクト自体のトランスフォームハンドルは隠れます。
3. 点をドラッグします。点はレイヤーの範囲の外にも動かせ、絵はそこまで引き伸ばされます。ドラッグ 1 回が 1 回の取り消し単位になり、`Esc` でキャンセルできます。

ハンドルは `強さ` にかかわらず、`0` のときでも、作ったとおりのメッシュの形を示します。`メッシュ` にキーフレームがあるときは、ドラッグすると現在のフレームのキーフレームが変わり、そこにキーフレームがなければスプラインイージングで追加されます。`メッシュ` に式が設定されている間は、ドラッグしても何も起こりません。

プロパティパネルの **メッシュ** の行には、`4 × 4` のような格子の大きさと **メッシュをリセット** ボタンが表示されます。このボタンでメッシュを均等な格子に戻します。`メッシュ` にキーフレームがあるときは現在のフレームのキーフレームをリセットし、そこにキーフレームがなければ追加します。

## プロパティ

### 行数 (Rows)

セルの行の数です。変更すると、メッシュとそのすべてのキーフレームを新しい格子で取り直すので、形はその格子で表せる範囲で保たれます。

- **型:** `int`
- **既定値:** `4`
- **アニメーション:** 不可
- **範囲:** `[1, 32]`

### 列数 (Columns)

セルの列の数です。変更すると、`行数` と同じくメッシュとそのすべてのキーフレームを取り直します。

- **型:** `int`
- **既定値:** `4`
- **アニメーション:** 不可
- **範囲:** `[1, 32]`

### 強さ (Strength)

変形をどれだけ適用するかをパーセントで指定します。`0` ではレイヤーを変更せず、`100` でメッシュのとおりに変形します。

- **型:** `float`
- **既定値:** `100`
- **アニメーション:** 可

### 補間 (Interpolation)

制御点の間で絵をどう曲げるかです。

- **型:** `MeshWarpInterpolation`
- **既定値:** `MeshWarpInterpolation.Smooth`（滑らか）
- **アニメーション:** 可

選べる値は次のとおりです。

- `線形`: 各セルを、4 つの点の間でまっすぐな辺のまま引き伸ばします。
- `滑らか`: 点を通るなめらかな曲線で絵を曲げます。

### メッシュ (Mesh)

制御点の位置です。プレビューでドラッグして編集します。

- **型:** `MeshWarpGrid`
- **既定値:** 均等な 4 × 4 の格子
- **アニメーション:** 可

## 使い方

**フレームで編集** をクリックしてから点をドラッグし、ロゴを曲げたり、顔を膨らませたり、絵を面に沿わせたりします。動きのある変形にするには、`メッシュ` にキーフレームを追加して各キーフレームで点をドラッグするか、`強さ` をアニメーションさせて一定の変形を出し入れします。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/MeshWarp.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/MeshWarp.cs)

- [`MeshWarpGrid.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/MeshWarpGrid.cs) / [`MeshWarpInterpolation.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Engine/Graphics/FilterEffects/MeshWarpInterpolation.cs)
- [`MeshWarpGridEditor.axaml`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Editor.Components/PropertyEditors/Views/MeshWarpGridEditor.axaml) / [`TransformHandlesOverlay.EditingHandles.cs`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl/Views/TransformHandlesOverlay.EditingHandles.cs)
- [`GraphicsStrings.ja.resx`](https://github.com/b-editor/beutl/blob/002aefdf04748db026dfeaf506d5e465576ca08c/src/Beutl.Language/GraphicsStrings.ja.resx)

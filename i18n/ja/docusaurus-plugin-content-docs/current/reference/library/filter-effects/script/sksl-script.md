---
title: "SKSLスクリプト"
description: "SkiaSharp Shading Language (SKSL) シェーダーでカスタムフィルターエフェクトを定義します。"
sidebar_position: 2
---

# SKSLスクリプト

SkiaSharp Shading Language (SKSL) シェーダーでカスタムフィルターエフェクトを定義します。Skia 上でピクセル単位のプログラムとして実行されます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → スクリプト → SKSLスクリプト

## プロパティ

### スクリプト (Script)

SKSL シェーダーのソース。

- **型:** `string`
- **既定値:**
    ```sksl
    uniform shader src;
    uniform float progress;  // 0.0 - 1.0
    uniform float duration;  // seconds
    uniform float time;      // seconds
    uniform float width;     // render target width (device px)
    uniform float height;    // render target height (device px)
    // Also available:
    // uniform float2 iResolution;  // (width, height) in device px
    // uniform float  iScale;       // working density (device px per logical px)
    // uniform float  iTime;

    half4 main(float2 fragCoord) {
        half4 c = src.eval(fragCoord);
        return c;
    }
    ```
- **アニメーション:** 不可

## 使い方

`main(float2 coord) → half4` のシェーダーを記述します。元レイヤーは `src`、アニメーション可能なパラメータは uniform として渡されます。

## 解像度スケーリング

Beutl は、プロジェクト解像度とは異なる作業密度でレンダリングすることがあります（縮小プレビューやスーパーサンプリングされた書き出しなど）。`width` / `height` / `iResolution` はその密度でのレンダーターゲットの **デバイスピクセル** サイズを表し、`iScale` は論理ピクセルあたりのデバイスピクセル数（作業密度）です（スケールなしのとき `1.0`）。

正規化座標で動作するシェーダー（例: `fragCoord / iResolution`）は自動的に解像度非依存になり、変更は不要です。**ピクセル単位の絶対値**（固定の半径・オフセット・境界幅など）を使う場合は、`iScale` を掛けることでどの密度でも画面上の見た目の大きさを保てます。`iScale` を参照しないシェーダーは、スケール `1.0` のとき従来とまったく同じ結果になります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs)

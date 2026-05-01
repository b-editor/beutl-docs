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
    uniform float width;     // render target width
    uniform float height;    // render target height
    // Also available:
    // uniform float2 iResolution;
    // uniform float iTime;

    half4 main(float2 fragCoord) {
        half4 c = src.eval(fragCoord);
        return c;
    }
    ```
- **アニメーション:** 不可

## 使い方

`main(float2 coord) → half4` のシェーダーを記述します。元レイヤーは `src`、アニメーション可能なパラメータは uniform として渡されます。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/SKSLScriptEffect.cs)

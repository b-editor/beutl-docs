---
title: "GLSLスクリプト"
description: "GLSL シェーダーでカスタムフィルターエフェクトを定義します。"
sidebar_position: 3
---

# GLSLスクリプト

GLSL フラグメントシェーダーでカスタムフィルターエフェクトを定義します。GPU レンダリングバックエンド上で実行されます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → スクリプト → GLSLスクリプト

## プロパティ

### スクリプト (FragmentShader)

GLSL フラグメントシェーダーのソース。

- **型:** `string`
- **既定値:**
    ```glsl
    #version 450

    layout(location = 0) in vec2 fragCoord; // 0.0 - 1.0
    layout(location = 0) out vec4 outColor;

    layout(set = 0, binding = 0) uniform sampler2D srcTexture;

    layout(push_constant) uniform PushConstants {
        float progress;   // 0.0 - 1.0
        float duration;   // seconds
        float time;       // seconds
        float width;      // render target width (device px)
        float height;     // render target height (device px)
        float scale;      // working scale w (1.0 = unscaled); multiply absolute-px literals by this
    } pc;

    void main() {
        vec4 c = texture(srcTexture, fragCoord);
        outColor = c;
    }
    ```
- **アニメーション:** 不可

## 使い方

入力ソーステクスチャと任意のアニメーション可能 uniform から出力色を書き込むフラグメントシェーダーを記述します。

## 解像度スケーリング

Beutl は、プロジェクト解像度とは異なる作業密度でレンダリングすることがあります（縮小プレビューやスーパーサンプリングされた書き出しなど）。`width` / `height` はその密度でのレンダーターゲットの **デバイスピクセル** サイズを表し、`scale` は論理ピクセルあたりのデバイスピクセル数（作業密度）です（スケールなしのとき `1.0`）。

既定の `fragCoord` 入力はすでに `0.0 – 1.0` に正規化されているため、それを使ってサンプリングするシェーダーは自動的に解像度非依存になり、変更は不要です。**ピクセル単位の絶対値**（固定の半径・オフセット・境界幅など）を使う場合は、`scale` を掛けることでどの密度でも画面上の見た目の大きさを保てます。`scale` を参照しないシェーダーは、スケール `1.0` のとき従来とまったく同じ結果になります。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs)

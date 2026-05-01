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
        float width;      // render target width
        float height;     // render target height
    } pc;

    void main() {
        vec4 c = texture(srcTexture, fragCoord);
        outColor = c;
    }
    ```
- **アニメーション:** 不可

## 使い方

入力ソーステクスチャと任意のアニメーション可能 uniform から出力色を書き込むフラグメントシェーダーを記述します。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/GLSLScriptEffect.cs)

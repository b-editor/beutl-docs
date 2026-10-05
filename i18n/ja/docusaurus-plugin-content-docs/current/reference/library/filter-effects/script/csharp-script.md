---
title: "C#スクリプト"
description: "C# でカスタムフィルターエフェクトを定義します。"
sidebar_position: 1
---

# C#スクリプト

C# スクリプトでカスタムフィルターエフェクトを定義します。スクリプトはレンダリングコンテキストにアクセスでき、任意のポストプロセスを実装できます。

## ライブラリでの場所

「ライブラリ」 → フィルターエフェクト → スクリプト → C#スクリプト

## プロパティ

### スクリプト (Script)

C# スクリプトのソース。

- **型:** `string`
- **既定値:**
    ```csharp
    // Available variables:
    // Context - FilterEffectContext
    // Progress - 0.0 to 1.0
    // Duration - total duration in seconds
    // Time - current time in seconds

    // Example: Apply a blur effect
    // Context.Blur(new Size(10, 10));

    // Prefer built-in composition and declarative shaders when they express the required effect.
    // Low-level GLSL fallback (inside a Context.CustomEffect callback; requires C#):
    // using var shader = CreateGlslShader(fragmentSource, inputCount: 2);
    // CreateGlslShader reuses compiled programs within this effect; dispose each returned wrapper.
    // shader.Render(execution, new[] { source, mask }, outputBounds, pushConstants)
    // returns an owned EffectTarget without changing its inputs. Dispose intermediate targets;
    // return the final target from execution.ForEach. If IsEmpty, dispose it and keep the source.
    // Use the Render overload with a destination callback for size/scale-dependent constants.
    // GLSL sampler2D inputs use set=0, bindings 0..inputCount-1; constants use layout(push_constant).
    // Constants must match the GLSL layout and occupy a multiple of 4 bytes, at most 128 bytes.
    ```
- **アニメーション:** 不可

## 使い方

組み込みフィルターでは表現できない処理のエスケープハッチとして使います。

### GLSLのカスタムパス

`Context.CustomEffect` のコールバック内から `CreateGlslShader(fragmentSource, inputCount: ...)` を使用できます。複数の入力を持つシェーダーや、前のパスの結果を次のパスへ渡す処理に利用します。

コンパイル済みプログラムはエフェクト内で再利用されますが、返されたシェーダーのラッパーと中間の `EffectTarget` は破棄してください。`Render` は入力を変更・破棄せず、新しいターゲットを返します。出力はリニア色空間の乗算済みアルファRGBAです。サイズや作業密度に依存する定数には、出力先を受け取るコールバック形式のオーバーロードを使用します。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs)

- [`CSharpScriptEffectGlobals.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffectGlobals.cs)
- [`GLSLShader.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Engine/Graphics/Shaders/GLSLShader.cs)

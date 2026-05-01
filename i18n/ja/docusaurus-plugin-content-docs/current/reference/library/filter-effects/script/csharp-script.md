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
    ```
- **アニメーション:** 不可

## 使い方

組み込みフィルターでは表現できない処理のエスケープハッチとして使います。

## ソース

[`src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/CSharpScriptEffect.cs)

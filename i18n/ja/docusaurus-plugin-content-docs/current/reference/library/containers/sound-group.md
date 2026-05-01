---
title: "サウンドグループ"
description: "複数のサウンドソースをグループ化し、1 つの出力にミックスします。"
sidebar_position: 3
---

# サウンドグループ

複数のサウンドソースをグループ化して 1 つの出力にミックスし、グループ全体に共通の音量・速度・エフェクトを適用できるようにします。
It can be used in conjunction with [Portal](../portal/portal-object.md).

## ライブラリでの場所

「ライブラリ」 → サウンドグループ

## プロパティ

### 子要素 (Children)

グループに含まれるサウンドソースのリスト。各要素はミックスされ、結果に対して共通の処理が適用されます。

- **型:** `IList<Sound>`
- **既定値:** 空のリスト
- **アニメーション:** 不可

## 共通プロパティ

このオブジェクトは `サウンド` を継承しているため、基底クラスで宣言された[共通プロパティ](../common-properties.md)も利用できます。なお、このオブジェクトでは `オフセット位置` と `速度` はエディタ上で非表示になります。

## 使い方

サブミックスバスとして使います。会話・音楽・SE などをグループにまとめて共通処理（ステム）を掛けるのに便利です。

## ソース

[`src/Beutl.Engine/Audio/SoundGroup.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Audio/SoundGroup.cs)

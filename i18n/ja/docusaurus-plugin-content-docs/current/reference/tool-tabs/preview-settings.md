---
title: "プレビュー設定"
description: "エディタのプレビューにのみ影響する設定（プレビュー解像度・オニオンスキン・レンダーキャッシュ）。"
sidebar_position: 14
---

# プレビュー設定

**エディタのプレビューにのみ影響する設定** をまとめたタブです。プレビュー解像度、オニオンスキン表示、フレーム／ノードのレンダーキャッシュを扱います。これらの設定はシーンの一部ではないため、エンコード結果には影響しません。

## タブの特徴

- **初期状態で開く**: いいえ
- **複数インスタンスを許可**: いいえ

## 開き方

メニューバーの **「表示」→「ツール」→「プレビュー設定」** から開きます。

## プレビュー解像度

エディタがプレビューをレンダリングする解像度を選びます。画質と引き換えに速度を得るもので、重いシーンでは下げると再生やスクラブが滑らかになります。

- **フル** — プロジェクト解像度でレンダリング（出力スケール `1.0`）。
- **1/2** — 1/2 解像度でレンダリング（`0.5`）。
- **1/4** — 1/4 解像度でレンダリング（`0.25`）。
- **プレビューに合わせる** — フレームを画面のプレビューアに合わせて縮小（フル解像度が上限）。

この設定は **再生中は変更できません**。またプロジェクトには保存されません。[解像度非依存のレンダリングパイプライン](../../advanced/rendering-process.md) により、プレビュー品質を下げてもベクター図形・テキスト・多くのエフェクトは縮小後もシャープに保たれ、単純にピクセル化することはありません。

## オニオンスキン

前後のフレームを半透明のゴーストとして重ねて表示し、フレーム間の動きを確認できます。手描きアニメーションやタイミング調整に便利です。このタブ、または **`Alt + O`** ショートカットで切り替えられます。

- **オニオンスキン** — 全体のオン／オフ（既定はオフ）。
- **前フレーム数** — 現在フレームより前を何フレーム重ねるか（既定 `1`）。
- **後フレーム数** — 現在フレームより後を何フレーム重ねるか（既定 `0`）。
- **前フレーム不透明度** — 前フレームのゴーストの不透明度（既定 `0.35`）。
- **後フレーム不透明度** — 後フレームのゴーストの不透明度（既定 `0.35`）。

## フレームキャッシュ／ノードキャッシュ

この2つのセクションでは、エディタのレンダーキャッシュの有効化と調整を行います。各キャッシュが保持する内容とサイズの目安は [レンダーキャッシュ](../../advanced/render-cache.md) を参照してください。

## ソース

- [`PreviewSettingsTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/PreviewSettingsTabExtension.cs)
- [`PreviewSettingsTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/ViewModels/PreviewSettingsTabViewModel.cs)
- [`PreviewSettingsTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/Views/PreviewSettingsTabView.axaml)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/EditorConfig.cs)（オニオンスキン・キャッシュ設定）

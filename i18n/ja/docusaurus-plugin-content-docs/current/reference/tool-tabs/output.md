---
title: "出力"
description: "出力タブの役割と主な使い方を説明します。"
sidebar_position: 5
---

# 出力

シーンを **動画ファイルとしてエンコード** するための設定とプリセットを扱うタブです。
出力プロファイルの追加・選択・編集や、エンコードの実行をここから行います。

## タブの特性

- **デフォルトで開く**: はい
- **複数同時に開く**: できない

## 開き方

メニューバーの **「表示」→「ツール」→「出力」** から開けます。

## 画面構成

タブの上部にプロファイル選択用のヘッダー、その下に選択中のプロファイルの編集領域が縦に並びます。

- **プロファイル選択ボタン（左）**: 現在選択中のプロファイル名を表示します。クリックでプロファイルピッカーが開きます。
- **追加ボタン（＋）**: 新しいプロファイルを追加します。シーンに対応する出力拡張機能が複数あるときは、拡張機能を選ぶダイアログが表示されます。1 種類しかない場合はそのまま追加されます。
- **その他メニュー（︙）**: 現在のプロファイルに対する **削除 / 名前を変更 / プリセットに変換** を行います。
- **編集領域**: 選択中のプロファイルの内容（保存先・エンコーダー・動画/音声設定など）が表示されます。プロファイルが未選択のときは何も表示されません。

タブを初めて開いたとき、シーンに既存のプロファイルが無く、対応する出力拡張機能が 1 種類しかなければ、自動で「Default」という名前のプロファイルが作成されます。

## プロファイルとプリセット

「出力」では、エンコード設定を **プロファイル** と **プリセット** の 2 つの形で管理します。

- **プロファイル**: シーンごとに保存される設定セットです。シーンの隣に作られる Beutl 用フォルダに保存され、同じシーンを次回開いたときに復元されます。
- **プリセット**: ユーザー全体で共有される設定テンプレートです。アプリのホームディレクトリに保存され、どのシーンからでも呼び出して適用できます。

プロファイルは保存先パスやエンコーダーの状態を含むのに対して、プリセットはエンコーダーの種類・動画/音声設定など **共有しても意味のある項目だけ** を持ちます。プリセットを適用しても、保存先・解像度・フレームレート・サンプリングレートなど現在のプロファイル固有の値は上書きされません。

## プロファイルピッカー

プロファイル選択ボタンを押すと、プロファイル/プリセットを選択するためのダイアログが開きます。

### 構成

- **検索ボタン**: 検索ボックスの表示/非表示を切り替えます。
- **プロファイルタブ**: 現在のシーンに保存されているプロファイル一覧。
- **プリセットタブ**: 共有プリセット一覧。
- **検索ボックス**: 名前のあいまい検索（半角スペース区切りでの AND 検索）。
- **項目リスト**: 各項目はカーソルを乗せると **ピン留めボタン** と **その他メニュー（︙）** が表示されます。
- **チェック / バツ ボタン**: 選択を確定 / 取り消してダイアログを閉じます。
- **× ボタン**: ダイアログをそのまま閉じます。

### 動作

- **プロファイルタブで確定**: 選択したプロファイルがアクティブなプロファイルになります。
- **プリセットタブで確定**: 選択したプリセットの内容が **現在選択中のプロファイル** に適用されます（拡張機能の種類が一致する場合のみ）。
- 確定せずに閉じた場合は、現在のプロファイルや設定はそのまま維持されます。

### キーボード操作

| 操作 | 動作 |
|------|------|
| `Tab` / `Shift + Tab` | プロファイルタブ ↔ プリセットタブを切り替え |
| `Ctrl + F` (`Cmd + F`) | 検索ボックスを表示してフォーカス |
| `↑` / `↓` | リスト内の選択を移動 |
| `Enter` | 選択を確定 |
| `Esc` | 検索ボックスを閉じる / フライアウトを閉じる |

### ピン留め

リスト項目の **ピンアイコン** で項目をピン留めできます。ピン留めした項目はリストの先頭に固定表示され、その状態は次回以降のセッションでも保持されます（プロファイルとプリセットで別々に管理されます）。

### 各項目のその他メニュー（︙）

| 種類 | メニュー項目 |
|------|------|
| プロファイル | **削除** / **名前を変更** / **プリセットに変換** |
| プリセット | **削除** / **名前を変更** |

## プロファイルの操作

### 追加

ヘッダーの **＋** ボタンを押します。シーンに対応する出力拡張機能が複数あるときは、追加するプロファイルの種類（拡張機能）を選ぶダイアログが表示されます。1 種類だけのときはそのまま追加されます。追加直後のプロファイルは「Default」または「Profile N」という名前になります。

### 削除

タブヘッダーの **︙** または、プロファイルピッカーの項目右側の **︙** から **削除** を選びます。

### 名前を変更

**︙** メニューから **名前を変更** を選ぶと、その場で名前編集用のフライアウトが開きます。

### プリセットに変換

**︙** メニューから **プリセットに変換** を選ぶと、現在のプロファイルの内容を新しいプリセットとして登録します。プリセット名は元のプロファイル名に「(Preset)」が付いたものになります。

## エンコード設定

選択中のプロファイルの編集領域には、エンコードに必要な項目が並びます。

### 保存先

書き出し先のファイルパスを指定します。テキストボックスに直接入力するか、右端のボタンからファイル選択ダイアログで指定できます。ダイアログでは、利用可能なエンコーダーごとの拡張子フィルターが選べます。

### エンコーダー

利用するエンコーダーを選びます。リストには、現在の **保存先の拡張子に対応している** エンコーダーだけが表示されます。保存先を変更するとリストの内容も追従します。
同じエンコーダーで保存先だけを変えた場合、現在の動画/音声設定はできるだけそのまま引き継がれます。

### 動画 / 音声

エンコーダーごとに用意された動画・音声の設定エディタが表示されます。各プロパティはプロパティの種類に応じた専用エディタで編集します。

- 動画の **元の解像度** はシーンのフレームサイズと連動します。
- 新しく作成したエンコーダー設定は、プロジェクトのフレームレート・サンプリングレートと、シーンのフレームサイズで開始します。
- 音声のサンプリングレートは、エンコード時にその設定値に従ってミックスダウンされます。
- プリセットを適用したときも、解像度・フレームレート・サンプリングレートのような **シーン固有の値** は維持されます。

### FFmpeg のエンコードオプション

FFmpeg のエンコーダーでは、選択したコーデックが対応する設定に応じて **エンコードオプション** の入力欄が表示されます。項目・選択肢・値の範囲はエンコーダーごとに異なります。**自動** で明示的な指定を解除し、エンコーダーの既定の動作に戻せます。

**詳細設定** を展開すると、オプション名と値を直接追加・編集できます。コーデックのオプション情報を取得できない場合も、この編集を利用できます。

### Windows の Media Foundation

**Media Foundation エンコーディング** は Windows のエンコーダーを使用します。MP4・WMV・AVI・WAV・MP3・FLAC など、対応する保存先を選びます。**自動** は保存先の拡張子に合うコーデックを選びます。HEVC には対応する Windows エンコーダーが必要です。音声専用の保存先では映像を出力せず、AVI は非圧縮 RGB32 の映像を使用します。

**ハードウェアアクセラレーションを使用** は既定で有効です。実際に利用できるコーデックは Windows の構成とハードウェアによって異なります。

## エンコードの実行

### 開始

編集領域上部の **エンコード** ボタンを押すとエンコードが開始されます。保存先とエンコーダーが両方指定されていないと押せません。
エンコードを開始すると、メモリ節約のため、レンダーキャッシュやフレームキャッシュは開始時にすべてクリアされます。

エンコード中も編集を続けられます。書き出しは開始時のシーンと設定のスナップショットを使用し、その後の編集は実行中の書き出しには反映されません。次の書き出しから反映されます。

### 進捗ダイアログ

エンコード中は専用のダイアログが表示され、以下が確認できます。

- **状態テキスト**（「エンコード中...」「完了しました」「キャンセル」など）
- **進捗バー**
- **経過時間**
- **残り時間**（経過と進捗から推定）
- **フレーム**（現在 / 総フレーム）
- **サイズ**（現在の出力サイズ / 推定総サイズ）

タブ側の編集領域にも、エンコード中は経過・残り時間・フレーム進捗が表示されます。

### キャンセル

進捗ダイアログの **キャンセル** ボタンで中断できます。Beutl は一時ファイルに書き出し、エンコードの成功後に保存先へ反映します。中断・失敗した場合は保存先にある既存のファイルを維持し、一時出力を削除します。

### 完了通知

エンコードが正常に終わると通知が表示され、その通知の **フォルダーを開く** ボタンから出力先のフォルダーを開けます。

## プリセット

プリセットはホームディレクトリに保存され、すべてのシーンで共通に使えます。

### 組み込みプリセット

#### 画質ベースのプリセット（H.264 / H.265）

- **High Quality** — 高ビットレート・低 CRF の高画質設定
- **Medium Quality** — 標準的な画質と書き出し速度のバランス
- **Low Quality** — 低ビットレート・高速エンコード
- **HDR10 (PQ)** — BT.2020 / SMPTE 2084 (PQ) の 10bit HDR 設定
- **HLG** — BT.2020 / ARIB STD-B67 (HLG) の 10bit HDR 設定

#### プラットフォーム向けプリセット

- **YouTube 1080p 60fps**
- **YouTube 4K 60fps**
- **Twitter (X) 1080p (最長 2:20)**
- **Instagram リール 9:16 (最長 90 秒)**
- **Instagram フィード 1:1**
- **TikTok 縦動画 9:16**
- **Discord 8MB 制限 (約 1 分)**

これらは目安となる初期値です。実際の各プラットフォームの仕様や用途に合わせて、適用後にプロファイル側でビットレートや尺などを調整してください。

## 関連ドキュメント

- [動画として出力する](../../get-started/encode.md)

## ソース

- [`OutputTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/OutputTabExtension.cs)
- [`SceneOutputExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/PrimitiveImpls/SceneOutputExtension.cs)
- [`OutputTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/ViewModels/OutputTabViewModel.cs)
- [`OutputViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/ViewModels/Tools/OutputViewModel.cs)
- [`OutputPickerViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/ViewModels/OutputPickerViewModel.cs)
- [`OutputTabView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputTabView.axaml.cs)
- [`OutputView.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/Tools/OutputView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/Tools/OutputView.axaml.cs)
- [`OutputPickerFlyout.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/OutputPickerFlyout.cs)
- [`OutputPickerFlyoutPresenter.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Controls/PropertyEditors/OutputPickerFlyoutPresenter.cs)
- [`OutputProgressDialog.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/Dialogs/OutputProgressDialog.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Views/Dialogs/OutputProgressDialog.axaml.cs)
- [`AddOutputProfileDialog.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/AddOutputProfileDialog.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/Views/AddOutputProfileDialog.axaml.cs)
- [`OutputService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/OutputTab/OutputService.cs)
- [`OutputPresetService.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Services/OutputPresetService.cs)
- [`MFEncodingExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.MediaFoundation/Encoding/MFEncodingExtension.cs)
- [`EncoderOptionsEditor.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Extensions.FFmpeg/PropertyEditors/EncoderOptionsEditor.cs)
- [`StagedOutputFile.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Core/IO/StagedOutputFile.cs)

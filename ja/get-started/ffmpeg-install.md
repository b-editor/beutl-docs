---
title: FFmpegの配置
description: Beutlでメディアファイルをエンコード/デコードするためにFFmpegを配置する方法を説明します
---

この操作を実行する前にFFmpegのライセンスをご確認ください。  
https://www.ffmpeg.org/legal.html

## 手動で配置する

**バージョンアップ等によって、ダウンロードするファイルが変わる可能があります。**

### Windows (64bit) の場合
以下のページから、`ffmpeg-n6.0-latest-win64-gpl-shared-6.0.zip`をダウンロードします。  
https://github.com/BtbN/FFmpeg-Builds/releases

ダウンロードしたファイルを展開して、
`ffmpeg-n6.0-latest-win64-gpl-shared-6.0\bin\`内のファイルを以下のように配置します。

```
C:\Users\(ユーザー)\.beutl\ffmpeg
┣━ avcodec-60.dll
┣━ avdevice-60.dll
┣━ avfilter-9.dll
┣━ avformat-60.dll
┣━ avutil-58.dll
┣━ ffmpeg.exe
┣━ ffplay.exe
┣━ ffprobe.exe
┣━ postproc-57.dll
┣━ swresample-4.dll
┗━ swscale-7.dll
```

### Linuxの場合
**パッケージマネージャからインストールしたFFmpegはバージョンの違いなどにより、正常に動作しない場合があります。
なので、Windowsと同様に操作を行ってください。**

以下のページから、`ffmpeg-n6.0-latest-linux64-gpl-shared-6.0.tar.xz`をダウンロードします。  
https://github.com/BtbN/FFmpeg-Builds/releases

ダウンロードしたファイルを展開して、
`bin/`および`lib/`内のファイルを以下のように配置します。

```
/home/(ユーザー)/.beutl/ffmpeg
┣━ ffmpeg
┣━ ffplay
┣━ ffprobe
┣━ libavcodec.so
┣━ libavcodec.so.60
┣━ libavdevice.so
┣━ libavdevice.so.60
┣━ libavfilter.so
┣━ libavfilter.so.9
┣━ libavformat.so
┣━ libavformat.so.60
┣━ libavutil.so
┣━ libavutil.so.58
┣━ libpostproc.so
┣━ libpostproc.so.57
┣━ libswresample.so
┣━ libswresample.so.4
┣━ libswscale.so
┣━ libswscale.so.7
┣━ libavcodec.so.60.x.xxx
┣━ libavdevice.so.60.x.xxx
┣━ libavfilter.so.9.x.xxx
┣━ libavformat.so.60.x.xxx
┣━ libavutil.so.58.x.xxx
┣━ libpostproc.so.57.x.xxx
┣━ libswresample.so.4.x.xxx
┗━ libswscale.so.7.x.xxx
```
共有ライブラリの内、Suffixに`x.xxx`がついているもの以外はシンボリックリンクです。

### macOSの場合
準備中

## [FFmpeg配置ツール](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator)を使う

バージョン`1.0.0-preview4`以降は[FFmpeg配置ツール](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator)を使うことができます。

> [!TIP]
> この方法を実行するにはBeutlアカウントが必要です。

1. 拡張機能ページを開きます
2. 左上の検索ボックスに `"Beutl.Extensions.FFmpegLocator"` と入力して、エンターを押します。
3. __"FFmpeg配置ツール"__ をクリックします。
4. インストールをクリックします。
5. Beutlを閉じます。
6. インストールダイアログが表示されるので指示に従って続行します。
7. Beutlを開きます。
8. サイドバーから __"FFmpeg配置ツール"__ を開きます。
9. __インストール__ をクリックするとFFmpegのインストールが開始されます。
10. インストールが終了したら、Beutlを再起動すると配置が完了します。

> [!TIP]
> この作業が終わったあとは、__"FFmpeg配置ツール"__ をアンインストールしていただいても構いません。

## トラブルシューティング

### FFmpegのバージョンの問題
インストール後も __"FFmpegがインストールされていることを確認してください。"__ と表示される場合、
FFmpegのバージョンが間違っている可能性があります。
正しいバージョンは[バージョンマッピング](./extensions/version-mapping.md)からご確認ください。

FFmpeg配置ツールを使用しているにもかかわらず、
メッセージが表示される場合、[こちら](https://github.com/b-editor/Beutl.Extensions.FFmpegLocator/issues)に報告していただけると助かります。

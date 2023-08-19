## FFmpegのインストール
この操作を実行する前にFFmpegのライセンスをご確認ください。
https://www.ffmpeg.org/legal.html

**バージョンアップ等によって、ダウンロードするファイルが変わる可能があります。**

### Windows (64bit) の場合
以下のページから、`ffmpeg-n6.0-latest-win64-gpl-shared-6.0.zip`をダウンロードします。
https://github.com/BtbN/FFmpeg-Builds/releases

ダウンロードしたファイルを展開して、
`ffmpeg-n6.0-latest-win64-gpl-shared-6.0\bin\`内のファイルを以下のように配置します。

拡張機能からインストールした場合、
`(beutl.exeがあるディレクトリ)`を`C:\Users\{ユーザー名}\.beutl\packages\Beutl.Extensions.FFmpeg\lib\net7.0\`に置き換えてください。
```
(beutl.exeがあるディレクトリ)\runtimes\win-x64\native
  .\avcodec-60.dll
  .\avdevice-60.dll
  .\avfilter-9.dll
  .\avformat-60.dll
  .\avutil-58.dll
  .\ffmpeg.exe
  .\ffplay.exe
  .\ffprobe.exe
  .\postproc-57.dll
  .\swresample-4.dll
  .\swscale-7.dll
```

### Linuxの場合
準備中

### macOSの場合
準備中
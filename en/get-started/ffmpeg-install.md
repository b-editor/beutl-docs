---
title: FFmpeg Configuration
description: How to configure FFmpeg for encoding/decoding media files in Beutl
---

Before performing this operation, please review the FFmpeg license.  
https://www.ffmpeg.org/legal.html

## Manual Configuration

**The files to be downloaded may change due to updates.**

### For Windows (64bit)
Download `ffmpeg-n6.0-latest-win64-gpl-shared-6.0.zip` from the following page:  
https://github.com/BtbN/FFmpeg-Builds/releases

Extract the downloaded file and place the files from `ffmpeg-n6.0-latest-win64-gpl-shared-6.0\bin\` as follows:

```
C:\Users\(your_username)\.beutl\ffmpeg
┣━ avcodec-60.dll
┣━ avdevice-60.dll
┣━ avfilter-9.dll
┣━ avformat-60.dll
┣━ avutil-58.dll
┣━ ffmpeg.exe
┣━ ffplay.exe
┣━ ffprobe.exe
┣━ postproc-57.dll
┗━ swresample-4.dll
    ┗━ swscale-7.dll
```

### For Linux
**FFmpeg installed via package manager may not work correctly due to version differences. Therefore, follow the same steps as for Windows.**

Download `ffmpeg-n6.0-latest-linux64-gpl-shared-6.0.tar.xz` from the following page:  
https://github.com/BtbN/FFmpeg-Builds/releases

Extract the downloaded file and place the files from `bin/` and `lib/` as follows:

```
/home/(your_username)/.beutl/ffmpeg
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
The files with the suffix `x.xxx` are symbolic links.

### For macOS

> [!IMPORTANT]
> This method is available from version `1.0.0-preview.6`.

> [!WARNING]
> Do not use Rosetta.

Run the following command in the terminal to install Homebrew:
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, run the following command to install FFmpeg:
```sh
brew install ffmpeg@6
```

## Using the [FFmpeg Configuration Tool](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator)

From version `1.0.0-preview4` onwards, you can use the [FFmpeg Configuration Tool](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator).

> [!TIP]
> You need a Beutl account to use this method.

1. Open the extensions page.
2. Enter `"Beutl.Extensions.FFmpegLocator"` in the search box at the top left and press Enter.
3. Click on __"FFmpeg Configuration Tool"__.
4. Click Install.
5. Close Beutl.
6. Follow the instructions in the installation dialog.
7. Open Beutl.
8. Open __"FFmpeg Configuration Tool"__ from the sidebar.
9. Click __Install__ to start the installation of FFmpeg.
10. After the installation is complete, restart Beutl to finish the configuration.

> [!TIP]
> After completing this task, you can uninstall the __"FFmpeg Configuration Tool"__ if you wish.

## Troubleshooting

### FFmpeg Version Issues
If the message __"Please ensure FFmpeg is installed."__ appears even after installation, the FFmpeg version may be incorrect. Please check the correct version from the [Version Mapping](../extensions/version-mapping.md).

If you see the message despite using the FFmpeg Configuration Tool, please report it [here](https://github.com/b-editor/Beutl.Extensions.FFmpegLocator/issues).

---
title: 安装 FFmpeg
description: Beutl 需要 FFmpeg 来进行视频编解码，此文档将说明 FFmpeg 的安装方法
---

在安装 FFmpeg 之前，您需要先确认 FFmpeg 的许可证。  
https://www.ffmpeg.org/legal.html

## 手动安装

**由于 FFmpeg 可能会有更新的版本，下列教程中的文件名可能会有所不同。**

### 64位 Windows
请从以下页面下载 `ffmpeg-n6.0-latest-win64-gpl-shared-6.0.zip`。  
https://github.com/BtbN/FFmpeg-Builds/releases

解压下载的文件，将 `ffmpeg-n6.0-latest-win64-gpl-shared-6.0\bin\` 中的文件放置到以下的位置：

```
C:\Users\(你的用户名)\.beutl\ffmpeg
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

### 基于 Linux 的操作系统
**通过包管理器安装的 FFmpeg 可能因版本差异而无法正常工作，所以可以按照与 Windows 相同的方法来手动安装。**

请从以下页面下载 `ffmpeg-n6.0-latest-linux64-gpl-shared-6.0.tar.xz`。  
https://github.com/BtbN/FFmpeg-Builds/releases

解压下载的文件，将 `bin/` 和 `lib/` 中的文件放置到以下的位置：

```
/home/(你的用户名)/.beutl/ffmpeg
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

注意：后缀为 `x.xxx` 的文件为符号链接。

### macOS

> [!IMPORTANT]  
> 此方法从版本 `1.0.0-preview.6` 开始可用。

> [!WARNING]  
> 请不要使用 Rosetta 来转译运行。

首先需要在终端（使用聚焦搜索 “Terminal” 或者 “终端” 并打开）执行下列命令来安装 Homebrew：
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后执行以下命令来安装 FFmpeg：
```sh
brew install ffmpeg@6
```

## 使用 [FFmpeg 配置工具](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator)

从版本 `1.0.0-preview4` 开始，可以使用 [FFmpeg 配置工具](https://beutl.beditor.net/store/packages/Beutl.Extensions.FFmpegLocator) 来自动安装 FFmpeg。

> [!TIP]  
> 执行此方法需要 Beutl 账户。

1. 在菜单中打开扩展功能页面。
2. 在左上角的搜索框中输入 `"Beutl.Extensions.FFmpegLocator"` 并按回车。
3. 点击 __"FFmpeg 配置工具"__。
4. 点击安装。
5. 关闭 Beutl。
6. 安装对话框将显示，请按照指示继续。
7. 打开 Beutl。
8. 从侧边栏打开 __"FFmpeg 配置工具"__。
9. 点击 __安装__，FFmpeg 的安装将开始。
10. 安装完成后，重新启动 Beutl 完成配置。

> [!TIP]  
> 完成此操作后，您可以选择卸载 __"FFmpeg 配置工具"__。

## 故障排除

### FFmpeg 版本问题
如果安装后仍显示 __"请确认 FFmpeg 已安装。"__，可能是 FFmpeg 版本错误。  
请从 [版本对照表](../extensions/version-mapping.md) 中确认正确版本。

如果您在使用 FFmpeg 配置工具的情况下仍收到该消息，请 [在此处](https://github.com/b-editor/Beutl.Extensions.FFmpegLocator/issues) 反馈。

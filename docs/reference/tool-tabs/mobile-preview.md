---
title: "Mobile preview"
description: "Preview video and audio and control playback from your phone."
sidebar_position: 24
---

# Mobile preview

Use this tab to **watch and hear the preview on your phone** and control playback from it. The phone shows a clean picture without the editor's selection boundaries, onion skin, or guides. The viewer is a page on Beutl Web, so there is nothing to install on the phone.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Press the display button on the preview (**Show Preview in Another Window**) and choose **Mobile preview**. The tab is not listed in **View → Tools** or the empty-tab picker.

## Start sharing

1. Press **Start**. If you are not signed in to Beutl Web, Beutl asks you to sign in first.
2. Scan the QR code with your phone, or copy the link shown below it and open it there.
3. Enter the **Connection code** in the phone's browser. The tab shows how long the code stays valid. Press **Renew code** for a new one.

After the first phone connects, the tab lists the connected devices with **Connected: *n* / 4** in its toolbar. Disconnect one device with its button, or all of them with **Disconnect all**. **Add device** shows the QR code and connection code again. The device list stays through a temporary disconnection.

Press **Stop** to end sharing. Sharing also stops when you close the tab or switch to another editor tab. Selecting a different tool tab keeps it running.

## What the phone receives

- **Video**: VP8 in SDR, or 10-bit VP9 with BT.2020 PQ when the phone can play HDR. The SDR stream follows the preview's [tone mapping](../../settings/editor.md#tone-mapping) mode, where **Auto** works as **None**.
- **Audio**: Opus. A [5.1 or 7.1 project](../../get-started/multichannel-audio.md) is folded to stereo.
- **Playback**: play, pause, step between frames, and seek from the phone.

## Picture quality

How sharp and smooth the video is depends on how the phone connects:

| Connection | Long edge | Frame rate | Bitrate (SDR / HDR) |
|------------|-----------|------------|---------------------|
| Local network or STUN | Up to 1920 px | 30 fps | 8 / 12 Mbps |
| TURN relay | Up to 1280 px | 15 fps | 2 / 4 Mbps |

- Every phone gets the same stream for its dynamic range, so while any phone is relayed, all of them get the relayed settings. When the last relayed phone leaves, a paused frame is sent again at the direct settings.
- A phone on a direct connection that keeps losing packets, asking for three key frames within 10 seconds, puts the stream on the relayed settings for 30 seconds. A hold that starts within 5 minutes of the end of the previous one lasts twice as long, up to 5 minutes. Requests in the first 5 seconds after a phone connects do not count.
- While playback is paused, Beutl keeps coding the paused frame, up to 30 times from its last key frame, so the still sharpens until it stops improving.

## Network requirements

The connection tries the local network first, then STUN, then TURN. Beutl needs outbound UDP for all of these, including TURN; TURN over TCP or TLS is not supported on the desktop. If sharing cannot start, check your connection and your Beutl Web sign-in and try again. If the relay connection ends, press **Start** to create a new session.

## Related documents

- [Preview Settings](./preview-settings.md)
- [Multichannel Audio](../../get-started/multichannel-audio.md)

## Source

- [`MobilePreviewTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Services/PrimitiveImpls/MobilePreviewTabExtension.cs)
- [`MobilePreviewTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/ViewModels/MobilePreviewTabViewModel.cs)
- [`MobilePreviewTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/MobilePreviewTabView.axaml)
- [`MobilePreviewServer.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.cs) / [`MobilePreviewServer.Congestion.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.Congestion.cs) / [`MobilePreviewServer.Frames.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl/PreviewStreaming/MobilePreviewServer.Frames.cs)
- [`PreviewEncodingMessages.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.FFmpegIpc/Protocol/Messages/PreviewEncodingMessages.cs) / [`PreviewEncodingHandler.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.FFmpegWorker/Handlers/PreviewEncodingHandler.cs)
- [`PlayerView.axaml.Presentation.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PlayerView.axaml.Presentation.cs)

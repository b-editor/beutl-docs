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

- **Video**: VP8 in SDR, or 10-bit VP9 with BT.2020 PQ when the phone can play HDR. The SDR stream follows the preview's [tone mapping](../../settings/editor.md#tone-mapping) mode.
- **Audio**: Opus. A [5.1 or 7.1 project](../../get-started/multichannel-audio.md) is folded to stereo.
- **Playback**: play, pause, step between frames, and seek from the phone.

## Network requirements

The connection tries the local network first, then STUN, then TURN. Beutl needs outbound UDP for all of these, including TURN; TURN over TCP or TLS is not supported on the desktop. If sharing cannot start, check your connection and your Beutl Web sign-in and try again. If the relay connection ends, press **Start** to create a new session.

## Related documents

- [Preview Settings](./preview-settings.md)
- [Multichannel Audio](../../get-started/multichannel-audio.md)

## Source

- [`MobilePreviewTabExtension.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Services/PrimitiveImpls/MobilePreviewTabExtension.cs)
- [`MobilePreviewTabViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/ViewModels/MobilePreviewTabViewModel.cs)
- [`MobilePreviewTabView.axaml`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/MobilePreviewTabView.axaml)
- [`MobilePreviewServer.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/PreviewStreaming/MobilePreviewServer.cs)
- [`PlayerView.axaml.Presentation.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PlayerView.axaml.Presentation.cs)

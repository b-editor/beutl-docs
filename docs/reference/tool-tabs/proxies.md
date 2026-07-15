---
title: "Proxies"
description: "Describes the role of the Proxies tab and the proxy media workflow."
sidebar_position: 15
---

# Proxies

Use this tab to **generate and manage proxy media**. Proxies are low-resolution copies of heavy video clips that make preview and scrubbing smoother. The preview can use a proxy while you edit, but **export always uses the original media**.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Proxies**.

## How proxies work

- Proxies are generated **manually** from this tab; importing a clip does not create one automatically.
- Only **video** clips are proxied; still images and audio are skipped.
- A proxy is an **H.264 (libx264) `.mp4`** encoded by the FFmpeg extension. Three quality presets are available:

| Preset | Scale | Long edge limit |
|--------|-------|-----------------|
| Half proxy (1/2) | 50% | 1920 px |
| Quarter proxy (1/4) | 25% | 1280 px |
| Eighth proxy (1/8) | 12.5% | 960 px |

- The source file's **path, size, and modification time** form the key for its proxy. If any of them change, the proxy becomes **Stale** and is treated as missing until you regenerate it. Multiple clips (and multiple projects) that reference the same file share one proxy.
- A **machine-wide shared store** holds the proxies (default: the `proxies` folder in Beutl's home directory). When the store exceeds its size cap, Beutl automatically removes the least-recently-used proxies. See [Editor settings](../../settings/editor.md#proxy-media) to configure the store.

## Tab layout

- **Store metrics (top)**: project / store / cap usage.
- **Clip list**: every eligible video clip in the open project (all scenes), each with:
  - a **state pill**: Ready / Generating / Stale / Failed / Missing / Partial
  - a **quality preset** dropdown (initialized from the *Default preset* setting)
  - **Generate** / **Regenerate** / **Delete** buttons and a progress bar with a cancel button while generating
- **Toolbar**: **Generate selected** / **Generate all** / **Regenerate selected** / **Delete selected** / **Delete project proxies** / **Refresh**.

**Generate all** processes only clips at or above 1920x1080 (or at least 32 MB when the resolution is unknown). For lighter clips, use the per-clip **Generate** button. If nothing qualifies, a "No clips met the bulk-generation threshold" notice is shown.

:::warning
The proxy store is shared machine-wide. **Delete project proxies** also removes proxy files used by other projects that reference the same source files. A confirmation dialog warns about this before deletion.
:::

## Proxies in the editor

- On the timeline, each clip with proxy state shows a small **colored dot** in its top-right corner (ready / generating / stale / failed); hover it for details.
- The **Preview source** option controls whether the preview uses proxies. Choose **Prefer proxy** (default) or **Force original** in **Settings → Editor → Proxy media** or the editor's Preview Settings tab. The change takes effect on the next frame without reloading the project.
- When a proxy is missing, stale, or partial, the preview silently falls back to the original media.
- **Export never uses proxies.** If an original file is missing at export time, export fails with an error rather than using the proxy as a substitute.

## Related documents

- [Editor settings](../../settings/editor.md#proxy-media)
- [Timeline](./timeline.md)
- [Output](./output.md)

## Source

- [`ProxiesTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/ProxiesTabExtension.cs)
- [`ProxiesTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/ViewModels/ProxiesTabViewModel.cs)
- [`ProxiesTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/Views/ProxiesTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ProxiesTab/Views/ProxiesTabView.axaml.cs)
- [`ProxyPresetDefinitions.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyPresetDefinitions.cs) (encode parameters)
- [`ProxyStore.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyStore.cs) / [`ProxyResolver.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyResolver.cs) / [`ProxyEvictionService.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Media/Proxy/ProxyEvictionService.cs)
- [`FFmpegProxyGenerator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Extensions.FFmpeg/Proxy/FFmpegProxyGenerator.cs)
- [`ProxyStoreConfig.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/ProxyStoreConfig.cs)
- [`ExportSourceValidator.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor/ExportSourceValidator.cs) (export always uses originals)

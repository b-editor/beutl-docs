---
title: "Preview Settings"
description: "Per-editor preview options: preview render quality, onion skin, guides, and the render caches. Also covers showing the preview in another window."
sidebar_position: 14
---

# Preview Settings

A tab that gathers the **options that affect only the editor preview** — preview render quality, the onion-skin overlay, guides, and the frame/node render caches. None of these settings are part of the scene, so they do not change the encoded output.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Preview Settings**, or with the gear button on the preview.

![Preview quality, onion skin, and cache settings](_images/preview-settings.png)

## Preview render quality

Selects the resolution at which the editor renders the preview, trading image quality for speed. Lowering it makes playback and scrubbing smoother on heavy scenes.

- **Full** — render at the project resolution (output scale `1.0`).
- **Half (1/2)** — render at half resolution (`0.5`).
- **Quarter (1/4)** — render at quarter resolution (`0.25`).
- **Fit to previewer** — scale the frame to fit the on-screen previewer, capped at full resolution.

This setting **cannot be changed during playback**, and it is not saved with the project. Thanks to the [resolution-independent rendering pipeline](../../advanced/rendering-process.md), lowering the preview quality keeps vector shapes, text, and most effects sharp at the reduced size rather than simply pixelating the result.

## Preview source

Selects whether the preview plays [proxy media](./proxies.md) or the original files.

- **Prefer proxy** *(default)* — use a clip's proxy when one is available; fall back to the original otherwise.
- **Force original** — always decode the original media.

The change takes effect on the next frame without reloading the project. The same option is available in **Settings → Editor → Proxy media**, and export always uses the originals regardless of this setting.

## Onion skin

Overlays neighboring frames as translucent ghosts so you can see motion across frames — useful for hand-drawn animation and timing. Toggle it from this tab or with the **`Alt + O`** shortcut.

- **Onion skin** — master switch (off by default).
- **Previous frames** — how many frames before the current one to overlay (default `1`).
- **Next frames** — how many frames after the current one to overlay (default `0`).
- **Previous opacity** — opacity of the previous-frame ghosts (default `0.35`).
- **Next opacity** — opacity of the next-frame ghosts (default `0.35`).

## Guides

Draws safe areas and composition guides over the preview so you can check framing while you edit. Toggle them from this tab or with the **`Alt + G`** shortcut. Guides are off by default. The same settings are on the [Editor settings](../../settings/editor.md#guides) page.

Guides are drawn over the editor's preview only. They never appear in an export, the [preview window](#show-the-preview-in-another-window), or the [mobile preview](./mobile-preview.md). The HDR preview does not show them.

- **Title safe** — the centered 90% of the frame (on by default).
- **Action safe** — the centered 95% of the frame (on by default).
- **Rule of thirds** — lines at each third of the frame.
- **Center cross** — a cross at the center of the frame (on by default).
- **Diagonals** — lines between opposite corners.
- **Custom grid** — a grid of **Grid columns** by **Grid rows**, from `1` to `64` each (default `4` by `4`).
- **Aspect ratios** — centered frames for the ratios in **Aspect ratio frames**.
- **Guide color** — the color of the lines (default white). Each line has a dark halo so it stays visible over any frame.
- **Guide opacity** — the opacity of the lines (default 80%).

**Aspect ratio frames** takes ratios separated by commas (default `9:16, 1:1, 4:5, 2.39:1`). Each one is outlined as the largest frame of that shape, centered. **Preset** fills in the frames of a platform: YouTube, YouTube Shorts, TikTok, Instagram Feed, Instagram Reels, or X.

## Show the preview in another window {/* #show-the-preview-in-another-window */}

The display button on the preview (**Show Preview in Another Window**) opens the preview's output in its own window, for example on a second monitor. The window shares the editor's playback, audio, and position, and leaves out selection boundaries, onion skin, and 3D editing handles. It keeps the HDR and tone-mapping settings.

- **Open in a Window** opens it on the editor's display.
- **Full Screen: *display* (*width* × *height*)** opens it full screen on that display. Each connected display is listed.
- While it is open, the menu offers **Toggle Full Screen (F11)** and **Close Preview Output**.
- **Mobile preview** opens the [Mobile preview](./mobile-preview.md) tab.

| Key in the preview window | Action |
|---------------------------|--------|
| `Space` | Play / pause |
| `←` / `→` | Pause, then step one frame back / forward |
| `F11` | Toggle full screen |
| `Esc` | Close the window |

Switching editor tabs, closing the source tab, or closing the editor also closes the window. Closing the window alone does not pause playback.

## Tone mapping and the HDR preview

**HDR Preview** and the tone mapping mode, including **Fit to display**, are in the [Editor settings](../../settings/editor.md#tone-mapping).

## Frame cache / Node cache

These two sections enable and tune the editor's render caches. See [Render cache](../../advanced/render-cache.md) for what each cache stores and how to size it.

## Source

- [`PreviewSettingsTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/PreviewSettingsTabExtension.cs)
- [`PreviewSettingsTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/ViewModels/PreviewSettingsTabViewModel.cs)
- [`PreviewSettingsTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/Views/PreviewSettingsTabView.axaml)
- [`PreviewGuideSettingsViewModel.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/PreviewSettingsTab/ViewModels/PreviewGuideSettingsViewModel.cs)
- [`PreviewGuideOverlay.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PreviewGuideOverlay.cs)
- [`PlayerView.axaml.Presentation.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PlayerView.axaml.Presentation.cs) / [`PresentationWindow.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl/Views/PresentationWindow.cs)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/EditorConfig.cs) (onion-skin and cache settings)

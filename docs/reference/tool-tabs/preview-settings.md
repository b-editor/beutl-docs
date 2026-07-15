---
title: "Preview Settings"
description: "Per-editor preview options: preview render quality, onion skin, and the render caches."
sidebar_position: 14
---

# Preview Settings

A tab that gathers the **options that affect only the editor preview** — preview render quality, the onion-skin overlay, and the frame/node render caches. None of these settings are part of the scene, so they do not change the encoded output.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: No

## How to open

Open it from the menu bar via **View → Tools → Preview Settings**.

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

## Frame cache / Node cache

These two sections enable and tune the editor's render caches. See [Render cache](../../advanced/render-cache.md) for what each cache stores and how to size it.

## Source

- [`PreviewSettingsTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/PreviewSettingsTabExtension.cs)
- [`PreviewSettingsTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/ViewModels/PreviewSettingsTabViewModel.cs)
- [`PreviewSettingsTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/PreviewSettingsTab/Views/PreviewSettingsTabView.axaml)
- [`EditorConfig.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Configuration/EditorConfig.cs) (onion-skin and cache settings)

---
title: "Browser"
description: "Browse websites and download media inside the editor."
sidebar_position: 20
---

# Browser

Browse websites in a dockable tab, bookmark pages, and download media for your project.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

Open **View → Tools → Browser**. Each instance can show a different page. If the browser engine is unavailable, follow the runtime-installation guidance shown in the tab.

## Navigation and page tools

Enter an HTTP/HTTPS URL or search terms in the address bar. Use back, forward, and reload. On a new tab’s blank page, choose **Add bookmark** to register a URL and name. The tab menu includes **New Tab**, **Find in page**, zoom, **Open in Default Browser**, and **Print**.

- **`Ctrl + F`** (**`Cmd + F`** on macOS): Find in page. `Enter` moves to the next match, `Shift + Enter` to the previous match, and `Esc` closes the search.
- **`Ctrl + +` / `Ctrl + -`** (**`Cmd`** on macOS): Zoom. **`Ctrl + 0`** (**`Cmd + 0`** on macOS) resets to 100%. Zoom ranges from 50% to 200%.

## Downloads

Downloads offer a destination in the project (`resources/downloads`) or the shared **Materials** folder. Supported image, video, and audio files can also be added to the timeline.

Open **Download history** from the tab menu to open downloaded files or their folder, import supported media, retry a download, or remove a history entry. Removing an entry leaves the downloaded file on disk. **Download media** opens media-download options for the current page.

## Search and privacy

Open **Search and privacy** from the tab menu, or open the browser settings page:

| Setting | Default |
|---------|---------|
| Search engine | Google (Bing is also available) |
| Search suggestions | On |
| Keep download history | On |
| Block ads | Off |
| Filter list | EasyList |

For ad blocking, enter HTTPS filter URLs, one per line, then use **Update filters**. EasyList is supported with some rule limitations; updates are manual.

You can clear local download history and delete browser cookies. Cookie deletion asks for confirmation because it signs you out of websites, and is available only when the browser engine supports it.

## Related documents

- [Files](./file-browser.md)
- [Materials and templates](../../get-started/packages.md)

## Source

- [`WebBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/WebBrowserTabExtension.cs)
- [`WebBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/ViewModels/WebBrowserTabViewModel.cs)
- [`WebBrowserTabView.PageTools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.PageTools.cs)
- [`WebBrowserTabView.Tools.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.Tools.cs)
- [`BrowserProfile.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl.Editor.Components/WebBrowserTab/BrowserProfile.cs)
- [`BrowserSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Pages/SettingsPages/BrowserSettingsPage.axaml)

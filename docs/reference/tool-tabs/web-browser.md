---
title: "Browser"
description: "Browse websites and download files inside the editor."
sidebar_position: 20
---

# Browser

Browse websites in a dockable tab, bookmark pages, and download files for your project.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

Open **View → Tools → Browser**. Each instance can show a different page. If the browser engine is unavailable, follow the runtime-installation guidance shown in the tab.

## Navigation and page tools

Enter an HTTP/HTTPS URL or search terms in the address bar. Use back, forward, and reload. On a new tab’s blank page, choose **Add bookmark** to register a URL and name. The tab menu includes **New Tab**, **Find in page**, zoom, **Open in Default Browser**, and **Print**.

While viewing a web page, the tab menu's **Add bookmark** saves its current URL and page title directly to your bookmarks.

A page's `window.open()` and links that open a new window open in a new tab. That tab sends the opening page's origin as its referrer, so material sites that refuse hotlinks accept the request. Tabs that are not shown keep their pages, so switching back does not reload them (except with WPE WebKit on Linux). On Linux, cookies are kept across restarts.

- **`Ctrl + F`** (**`Cmd + F`** on macOS): Find in page. `Enter` moves to the next match, `Shift + Enter` to the previous match, and `Esc` closes the search.
- **`Ctrl + +` / `Ctrl + -`** (**`Cmd`** on macOS): Zoom. **`Ctrl + 0`** (**`Cmd + 0`** on macOS) resets to 100%. Zoom ranges from 50% to 200%.

## Downloads

Downloads offer a destination in the project (`resources/downloads`) or the shared **Materials** folder. Any file can be saved, such as a ZIP of sound effects, fonts, or LUTs. The one exception is a web page served in place of the file, for example a sign-in page. Supported image, video, and audio files can also be added to the timeline.

On Windows and macOS, every file the tab saves is marked as downloaded from the internet before it appears: a `Zone.Identifier` stream on Windows, with the address it came from, and the `com.apple.quarantine` attribute on macOS. SmartScreen, Protected View, and Gatekeeper then check it as they check a file a web browser downloaded. A volume that cannot hold the mark, such as FAT, leaves the file unmarked, and Linux has no such mark.

Files a page generates in script (`blob:` and `data:` URLs) are offered on the same bar, with the name the page gave them. The bar and the history credit the file to the page, or to another site when the browser engine names one as its creator.

Open **Download history** from the tab menu to open a downloaded media file or the folder of any file, import supported media, retry a download, or remove a history entry. Only media files can be opened from the history, because opening other files could run a downloaded program. A generated file cannot be retried. Removing an entry leaves the downloaded file on disk. **Download file** opens download options for the current page.

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

- [`WebBrowserTabExtension.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/WebBrowserTabExtension.cs)
- [`WebBrowserTabViewModel.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/ViewModels/WebBrowserTabViewModel.cs)
- [`WebBrowserTabView.PageTools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.PageTools.cs)
- [`WebBrowserTabView.Tools.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/Views/WebBrowserTabView.Tools.cs)
- [`BrowserProfile.cs`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl.Editor.Components/WebBrowserTab/BrowserProfile.cs)
- [`BrowserSettingsPage.axaml`](https://github.com/b-editor/beutl/blob/f9cbaeef9da0077f6745010a2d69955e12c45187/src/Beutl/Pages/SettingsPages/BrowserSettingsPage.axaml)
- [`BrowserMediaDownload.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/WebBrowserTab/BrowserMediaDownload.cs)
- [`BrowserDownloadHistoryItem.cs`](https://github.com/b-editor/beutl/blob/fb0eb00b07159f8c1a96c308b38958e29590686a/src/Beutl.Editor.Components/WebBrowserTab/Views/BrowserDownloadHistoryItem.cs)
- [`BrowserDownloadProvenance.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/WebBrowserTab/BrowserDownloadProvenance.cs)

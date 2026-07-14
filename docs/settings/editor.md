---
title: Editor
description: Settings related to the editor screen
---
![](_images/editor-settings.png)
## Automatically Adjust Scene Length

When enabled, the scene length will be automatically adjusted when an element is added if necessary.

## Enable Auto-Save

When enabled, files will be automatically saved after performing actions.

## Show Precise Boundaries

When enabled, the boundaries displayed during the preview will be shown precisely.

For objects like rectangles, the boundary lines might overlap with the drawing content, making the boundaries invisible.

## Frame Cache

![](_images/frame-cache.png)

### Enable Frame Cache

When enabled, frame caching is activated.

The default setting is __"On"__.

### Maximum Byte Size

Adjust the cache size to not exceed this byte size (in megabytes).

The default value is half of the device's memory capacity.

### Scale

When saving the cache to memory, use this setting to reduce resolution to save memory.

- Original
- Match preview screen __(default value)__
- Half
- Quarter

:::tip
:::
  If the preview screen size is equal to or larger than the original size, the resolution remains unchanged.

### Color Space

When saving the cache to memory, use this setting to change the color space to save memory.

- RGBA __(default value)__
- YUV

:::tip
YUV uses I420.
:::

## Node Cache

![](_images/node-cache.png)

### Enable Node Cache

When enabled, node caching is activated.

The default setting is __"On"__.

### Maximum Pixel Count

Nodes exceeding this pixel count will not be cached.

The default value is __"1000000"__.

### Minimum Pixel Count

Nodes below this pixel count will not be cached.

The default value is __"1"__.

## Proxy Media

Settings for the [proxy media workflow](../reference/tool-tabs/proxies.md).

### Preview Source

Selects whether the preview uses proxy media.

- Prefer proxy __(default value)__
- Force original

### Store Location

The folder where proxy files are stored.

The default value is the `proxies` folder in Beutl's home directory. Changes take effect after restart.

### Maximum Store Size

When the store exceeds this size (in GiB), least-recently-used proxies are removed.

The default value is __"50"__ GiB (allowed range: 5–500). Changes take effect after restart.

### Default Preset

The quality preset selected by default in the Proxies tool tab.

- Half proxy (1/2)
- Quarter proxy (1/4) __(default value)__
- Eighth proxy (1/8)

## Property Editor

![](_images/property-editor.png)

### Enable Pointer Lock

Locks the cursor and hides it during drag operations in the property editor (Windows only).

The default setting is __"On"__.

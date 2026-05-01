---
title: "Text"
description: "Renders a string with the given font and style."
sidebar_position: 5
---

# Text

Renders a string with a configurable font, weight, style and per-character spacing. When `Split by characters` is on, every character becomes its own object so you can apply effects to characters individually.

## Library location

Library → Text

## Properties

### Size

Font size in pixels.

- **Type:** `float`
- **Default:** `12`
- **Animatable:** Yes
- **Range:** `[0, ∞)`

### Font Family (FontFamily)

Font family used to render the text.

- **Type:** `FontFamily?`
- **Default:** `Media.FontFamily.Default`
- **Animatable:** No

### Font Style (FontStyle)

Font style (normal / italic / oblique).

- **Type:** `FontStyle`
- **Default:** `Media.FontStyle.Normal`
- **Animatable:** No

### Font Weight (FontWeight)

Font weight (Thin … Black).

- **Type:** `FontWeight`
- **Default:** `Media.FontWeight.Regular`
- **Animatable:** No

### Character Spacing (Spacing)

Extra horizontal space inserted between characters in pixels.

- **Type:** `float`
- **Default:** `0`
- **Animatable:** Yes

### Split by characters (SplitByCharacters)

When `true`, each character is rendered as a separate object so effects can be applied per character.

- **Type:** `bool`
- **Default:** `false`
- **Animatable:** Yes

### Text

The string to render. Inline tags can be used to vary the style across ranges of the text.

- **Type:** `string?`
- **Default:** `""`
- **Animatable:** No

**Inline tag examples:**
```
<font="Inter">This text is rendered with the Inter font.</font>
<size=24>This text is rendered at size 24.</size>
<color=#FF0000>This text is rendered in red.</color>
<#FF0000>You can also specify the color directly with a hex code.</color>
<stroke="#FF0000,2">This text has a red 2-pixel stroke.</stroke>
<stroke="#FF0000,2,round,round,outside,10">You can also specify cap (flat, round, square), join (miter, round, bevel), alignment (center, inside, outside), and miter limit.</stroke>
<cspace=10>This text has a 10-pixel character spacing.</cspace>
<weight=bold>This text is bold. In addition to "bold", you can specify thin, ultra-light, light, semi-light, regular, medium, semi-bold, bold, b, extra-bold, black, extra-black.</weight>
<b>You can also use a simple "b" tag to make text bold.</b>
<style=italic>If the font supports it, this text is italic. In addition to "italic", you can specify normal and oblique.</style>
<i>You can also use a simple "i" tag to make text italic.</i>
<noparse>This text disables tag parsing. <font="Inter">This part is not parsed as Inter either.</noparse>
<single-line>
This text
is not wrapped to a new line.
</single-line>
```

### Stroke (Pen)

Optional outline pen. Set to draw an outline.

- **Type:** `Pen?`
- **Default:** `null`
- **Animatable:** No

### Fill

Glyph fill brush.

- **Type:** `Brush?`
- **Default:** `null`
- **Animatable:** No

## Common properties

This object inherits from `Drawable` and exposes the [common properties](../../common-properties.md) declared on its base classes.

## Usage

Enter the text, pick a font, and adjust the size and other properties. For animated lyrics or per-letter motion, enable `Split by characters` and combine with transforms or filter effects.

## Source

[`src/Beutl.Engine/Graphics/Shapes/TextBlock.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/Shapes/TextBlock.cs)

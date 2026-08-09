---
title: Implementing a Theme
description: Ship a custom theme from an extension with ThemeExtension.
---

A `ThemeExtension` adds a theme to the picker in **Settings → Display → Theme**. The extension describes the theme with a `ThemeDescriptor`, and Beutl applies it by switching the app to the descriptor's base variant and merging the descriptor's resource dictionary on top.

Beutl's own default dark theme is written this way, so an extension theme is not a second-class citizen: it can replace every brush the built-in themes define.

:::info
`ThemeExtension` was added in Beutl 2.0.0-preview.7. Your project needs `Beutl.Extensibility.Sdk` version `2.0.0-preview.7` or later — see [Creating a C# Project for Extensions](create-csproj.md).
:::

## 1. The minimal theme extension

```cs
using Avalonia.Styling;
using Beutl.Extensibility;

namespace MyExtension;

[Export]
public sealed class MyThemeExtension : ThemeExtension
{
    // One instance for the life of the extension. The registry keys ownership on the descriptor
    // instance, and the host skips a re-apply when the instance is unchanged, so a fresh record
    // per call would turn every reload into a full revert/apply cycle.
    private static readonly ThemeDescriptor s_descriptor = new(
        Id: "myextension.midnight",
        DisplayName: "Midnight",
        BaseVariant: ThemeVariant.Dark,
        ResourceUri: new Uri("avares://MyExtension/Themes/Midnight.axaml"));

    public override string Name => "MyTheme";

    public override string DisplayName => "Midnight";

    public override ThemeDescriptor GetThemeDescriptor() => s_descriptor;
}
```

`ThemeExtension.Load` registers the descriptor and `Unload` removes it — you do not override either. The picker updates live, so a theme installed at runtime appears without a restart.

## 2. The descriptor

`ThemeDescriptor` is a record with the following members:

| Member | Meaning |
| --- | --- |
| `Id` | The stable identifier persisted in `settings.json`. Never change it after release, or users lose their selection. |
| `DisplayName` | The name shown in the theme picker. |
| `BaseVariant` | The `ThemeVariant` the theme builds on (`ThemeVariant.Light`, `ThemeVariant.Dark`, or `FluentAvaloniaTheme.HighContrastTheme`). |
| `ResourceUri` | Optional. A `ResourceDictionary` merged over the base variant. |
| `IsSystemFollowing` | Optional. `true` makes the theme follow the OS light/dark setting. |
| `AccentColor` | Optional. Seeds FluentAvalonia's `SystemAccentColor` shades. `null` keeps the OS accent. |

Two rules the registry enforces by throwing `ArgumentException`:

- **Reserved ids.** An extension cannot register `light`, `dark`, `highcontrast`, or `system`, nor any value that settings normalization would rewrite — a legacy alias such as `Dark` or `2`, a blank string, or an id with surrounding whitespace. Prefix the id with something unique to your extension.
- **`IsSystemFollowing` with `ResourceUri`.** The host applies the OS-resolved variant for a system-following theme and cannot honor per-variant resources, so the combination is rejected.

If two extensions register the same id, the later registration wins. Unregistering only removes your own descriptor, so an extension that was replaced cannot evict its successor when it unloads.

## 3. The resource dictionary

`ResourceUri` points at a `ResourceDictionary` inside your extension assembly. It is merged **after** the base variant, so it only needs to contain the keys you want to override.

```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="SolidBackgroundFillColorBaseBrush" Color="#0B1020" />
    <SolidColorBrush x:Key="TextFillColorPrimaryBrush" Color="#E6EAF2" />
</ResourceDictionary>
```

Keep the dictionary self-contained: every `StaticResource` it references should be a key it defines itself.

If the dictionary fails to load, Beutl logs a warning and keeps the theme that is currently applied. When there is none yet — the failure happened during startup — it falls back to the built-in dark theme rather than leaving the app unthemed.

## 4. Reacting to apply and revert

Override the callbacks when the theme needs side effects beyond resources — regenerating a gradient, recoloring an owner-drawn surface, and so on.

```cs
public override void OnApplied(ThemeApplyContext context)
{
    // context.Descriptor is this theme; context.Accent is the accent the host resolved.
}

public override void OnAccentChanged(ThemeApplyContext context)
{
    // Raised while the theme stays active and the accent moves.
}

public override void OnReverted()
{
    // Raised when another theme becomes active.
}
```

`ThemeApplyContext.Accent` is the user's custom accent when one is configured, otherwise the descriptor's `AccentColor`. `null` means the OS accent, which the host does not resolve itself — read `SystemAccentColor` from the application resources for the value FluentAvalonia settled on.

An exception thrown from any of these callbacks is caught and logged; it does not abort the theme switch.

## Reference files in the Beutl source

| File | What it teaches |
| --- | --- |
| `src/Beutl/Services/PrimitiveImpls/DarkBorderThemeExtension.cs` | The first-party dark theme, written as a `ThemeExtension`. |
| `src/Beutl.Extensibility/ThemeDescriptor.cs` | The descriptor record. |
| `src/Beutl.Extensibility/ThemeRegistry.cs` | Registration rules, ownership, and the `Changed` event. |
| `src/Beutl/Services/ThemeService.cs` | How the host resolves, applies, and reverts a theme. |

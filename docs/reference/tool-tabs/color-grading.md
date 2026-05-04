---
title: "Color Grading"
description: "Explains the role of the Color Grading tab and its main operations."
sidebar_position: 10
---

# Color Grading

A tab for **color correction and color grading** of video.
You can use color wheels and number boxes to adjust the color and brightness for each tonal region (Shadows, Midtones, Highlights, etc.).

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

There are two ways to open this tab.

- From the menu bar, choose **View → Tools → Color Grading**.
- On the properties of a **Color Grading** filter effect added to a drawable, click the **Edit in tab** button.

If you simply open the tab on its own, no effect is associated with it yet, and the message **"No Color Grading effect is selected."** is shown. Opening the tab from the filter effect's properties links the tab to that effect so you can edit its values.

## Layout

The tab is divided into three main areas.

- **Header (top)**: The tab name, a toggle for the number editors, and a wheel-mode selector.
- **Number editor row (middle)**: An area for entering correction values numerically (laid out in a wrap panel).
- **Color wheels (bottom)**: An area with color wheels you drag to adjust color.

If the underlying Color Grading effect is removed, the tab closes automatically.

## Header

### Toggling the number editors

The pencil-icon toggle button on the right of the header shows or hides the number editor row.
Hide the number editors when you want a wider view for rough wheel adjustments, and show them only when you need fine numeric control.

### Wheel mode selector

The dropdown at the far right of the header switches the layout of the color wheels in the lower area.

- **Shadows / Midtones / Highlights**: Three wheels, one per luminance region.
- **Lift / Gamma / Gain / Offset**: Four wheels for raising the toe of the tone curve, stretching the midtones, scaling the maximum, and offsetting the whole signal.

## Number editors

When the number editors are visible, the following fields are laid out in a wrap panel. You can change values by dragging or by typing.
To animate a value, work from the Properties tab rather than this tab.

| Field | Range | Description |
|------|------|------|
| Temperature | -100 to 100 | Cool / warm balance |
| Tint | -100 to 100 | Green / magenta balance |
| Exposure | -5 to +5 EV | Overall brightness (acts exponentially) |
| Contrast | -100 to 100 | Strength of contrast |
| Contrast Pivot | 0 to 1 | Reference luminance around which contrast is applied |
| Saturation | -100 to 100 | Overall saturation |
| Vibrance | -100 to 100 | Boosts low-saturation colors preferentially |
| Hue | -180 to 180 | Overall hue rotation (degrees) |
| Low Range | 0 to 100 | Boundary between Shadows and Midtones |
| High Range | 0 to 100 | Boundary between Midtones and Highlights |

**Low Range** and **High Range** are used to split tonal regions when the wheel mode is set to **Shadows / Midtones / Highlights**.

## Color wheels

### Common operations

- **Drag inside the wheel**: Push the color in the dragged direction.
- **Drag the slider below the wheel**: Change brightness.

### Wheels by mode

- **Shadows / Midtones / Highlights** mode
  - **Shadows**: Color of the dark tones.
  - **Midtones**: Color of the mid tones.
  - **Highlights**: Color of the bright tones.
  - The boundaries between regions are set with **Low Range** and **High Range** in the number editors.
- **Lift / Gamma / Gain / Offset** mode
  - **Lift**: Lifts the dark tones.
  - **Gamma**: Adjusts the curve of the mid tones.
  - **Gain**: Scales the bright tones.
  - **Offset**: Adds a constant to the whole signal.

## Persisted tab state

The following state is restored when the tab is reopened, even after it has been closed:

- The selected wheel mode.
- Whether the number editors are visible.
- The associated Color Grading effect.

## Related documents

- [Scopes](./color-scopes.md)
- [Curves](./curves.md)
- [Timeline](./timeline.md)

## Source

- [`ColorGradingTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ColorGradingTabExtension.cs)
- [`ColorGradingTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ViewModels/ColorGradingTabViewModel.cs)
- [`ColorGradingTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml.cs)
- [`ColorGradingResources.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/Resources/ColorGradingResources.axaml)
- [`ColorGrading.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs) (the filter effect itself)
- [`ColorGradingWheel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/ColorGradingWheel.cs) / [`GradingColorPicker.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Controls/PropertyEditors/GradingColorPicker.cs) (wheel interaction logic)
- [`ColorGradingPropertiesEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingProperties/Views/ColorGradingPropertiesEditor.axaml.cs) (the "Edit in tab" button on the properties side)

---
title: "Color Grading"
description: "Explains the role of the Color Grading tab and its main operations."
sidebar_position: 10
---

# Color Grading

A tab for **color correction and color grading** of video.
You can shift the color of each tonal region (Shadows, Midtones, Highlights, and so on) with color wheels laid out like the [vectorscope](./color-scopes.md), and adjust white balance, tone, and color with sliders.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes

## How to open

There are two ways to open this tab.

- From the menu bar, choose **View → Tools → Color Grading**.
- On the properties of a **Color Grading** filter effect added to a drawable, click the **Edit in tab** button.

If you simply open the tab on its own, no effect is associated with it yet, and the message **"No Color Grading effect is selected."** is shown. Opening the tab from the filter effect's properties links the tab to that effect so you can edit its values.

## Layout

The tab has three parts.

- **Toolbar (top)**: The tab name, **Show Adjustments**, **Reset All**, and the wheel-mode selector.
- **Adjustment sliders**: Sliders in three groups, **White Balance**, **Tone**, and **Color**.
- **Color wheels**: The wheels of the selected mode. In **Shadows / Midtones / Highlights** mode, a **Tonal Range** bar sits under them.

The layout follows the shape of the tab:

- In a wide, low tab, such as one docked at the bottom, the sliders stand in a scrolling column beside the wheels, and the wheels keep one row.
- In a low tab too narrow for that column, only the sliders' names and number boxes stand beside the wheels.
- Elsewhere, the sliders stand above the wheels.

The wheels stay in the middle of the height they have. They move their controls beside their pads, or use fewer columns, when that makes the pads larger. The numbers they show never change the layout, so a drag does not move them.

If the underlying Color Grading effect is removed, the tab closes automatically.

## Toolbar

### Show Adjustments

The toggle button shows or hides the adjustment sliders. Hide them for a larger view of the wheels.

### Reset All

Returns every value of the effect to its default in one undo step. As each property's own reset does, it writes the default to the value, or to the keyframe being edited, and leaves expressions and other keyframes in place.

### Wheel mode selector

The drop-down at the right end of the toolbar switches the color wheels.

- **Shadows / Midtones / Highlights**: Three wheels, one per luminance region.
- **Lift / Gamma / Gain / Offset**: Four wheels for raising the toe of the tone curve, stretching the midtones, scaling the maximum, and offsetting the whole signal.

## Adjustment sliders

| Group | Slider | Range |
|-------|--------|-------|
| White Balance | Temperature | -100 to 100 |
| White Balance | Tint | -100 to 100 |
| Tone | Exposure | -5 to 5 EV |
| Tone | Contrast | -100 to 100 |
| Tone | Pivot | 0 to 1 |
| Color | Saturation | -100 to 100 |
| Color | Vibrance | -100 to 100 |
| Color | Hue | -180 to 180 |

**Pivot** is the effect's **Contrast Pivot**, the luminance around which contrast is applied. Temperature balances cool against warm, Tint balances green against magenta, and Vibrance raises low-saturation colors first.

Each slider spans its property's range, and its fill starts at the default. A press on the rail puts the value there, a press on the thumb grabs it where it is, and a drag follows the pointer, a tenth as fast with `Alt` (`Command` on macOS). A double click returns the slider to its default. You can also type a value into the box beside it.

Every slider has the same **⋮** menu as the Properties tab, so you can add keyframes, edit the animation, or set an expression from here. A value driven by an expression is read-only.

## Color wheels

Each wheel is a puck on a disk laid out like the vectorscope: the Cb axis runs to the right and the Cr axis up, so moving the puck toward a hue moves the scope's trace the same way.

- **Drag the disk**: Shifts the color's chroma and keeps its luma. Hold `Alt` (`Command` on macOS) to move a tenth as far. As with a drag of a number box, the cursor hides only once the drag has moved 3 pixels, so a click or a double click leaves it in place; see **Enable pointer lock** in the [Editor settings](../../settings/editor.md#property-editor).
- **Double-click the disk**: Removes the chroma and keeps the luma.
- **Drag the jog under the disk**: Adds to R, G, and B together, which brightens or darkens the region.
- **Number boxes**: Set R, G, and B one at a time, in steps of `0.01`.
- **Reset button**: Returns the wheel to neutral: `1` for Gamma and Gain, `0` for the others.

Every wheel also has the **⋮** menu for keyframes and expressions.

### Wheels by mode

- **Shadows / Midtones / Highlights** mode
  - **Shadows**: Color of the dark tones.
  - **Midtones**: Color of the mid tones.
  - **Highlights**: Color of the bright tones.
  - The **Tonal Range** bar sets **Low Range** and **High Range**, the boundaries between the regions. Drag its two handles, which stop at each other, or type into the boxes beside it.
- **Lift / Gamma / Gain / Offset** mode
  - **Lift**: Lifts the dark tones.
  - **Gamma**: Adjusts the curve of the mid tones.
  - **Gain**: Scales the bright tones.
  - **Offset**: Adds a constant to the whole signal.

## Persisted tab state

The following state is restored when the tab is reopened, even after it has been closed:

- The selected wheel mode.
- Whether the adjustment sliders are visible.
- The associated Color Grading effect.

## Related documents

- [Scopes](./color-scopes.md)
- [Curves](./curves.md)
- [Timeline](./timeline.md)

## Source

- [`ColorGradingTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/ColorGradingTab/ColorGradingTabExtension.cs)
- [`ColorGradingTabViewModel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/ViewModels/ColorGradingTabViewModel.cs)
- [`ColorGradingTabView.axaml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Views/ColorGradingTabView.axaml.cs)
- [`ColorGradingResources.axaml`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingTab/Resources/ColorGradingResources.axaml)
- [`ColorGrading.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Engine/Graphics/FilterEffects/ColorGrading.cs) (the filter effect itself)
- [`ColorGradingWheel.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/ColorGradingWheel.cs) / [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs) (wheel interaction logic)
- [`NumberSliderEditor.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/NumberSliderEditor.cs) / [`TonalRangeSlider.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Controls/PropertyEditors/TonalRangeSlider.cs) (sliders)
- [`ColorGradingPropertiesEditor.axaml.cs`](https://github.com/b-editor/beutl/blob/dadee0db956ddb874ab88f48329bc84a5ce5cf6b/src/Beutl.Editor.Components/ColorGradingProperties/Views/ColorGradingPropertiesEditor.axaml.cs) (the "Edit in tab" button on the properties side)
- [`ColorBalancePad.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Controls/PropertyEditors/ColorBalancePad.cs) / [`HeaderScrubGesture.cs`](https://github.com/b-editor/beutl/blob/70d09a97d4491bf6616e248fec809faa58e47db7/src/Beutl.Controls/PropertyEditors/HeaderScrubGesture.cs) (when a drag on a wheel begins)

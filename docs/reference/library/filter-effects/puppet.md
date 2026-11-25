---
title: "Puppet"
description: "Bends the layer around pins that you place and drag in the preview."
sidebar_position: 56
---

# Puppet

Bends the layer around pins that you place on it. You click the picture in the preview to place pins and drag them, and the picture follows: it bends between the pins as stiffly as it can, so each part keeps its shape as far as the pins allow. Each pin's position can be animated on its own, so keyframes on the pins make the layer move like a puppet.

Only the visible parts of the picture bend, and transparent holes stay holes. Parts that do not touch each other, such as the letters of a text, bend separately: a part with one pin moves with that pin without turning, a part with two or more pins bends between them, and a part without a pin stays where it is. The edges of the bent picture are smoothed over about a pixel, so they show no jagged steps.

## Library location

Library → Filter Effect → Puppet

## Editing pins in the preview

### Placing pins

1. In the Properties tab, click the `+` button (**Add pin**) in the header of the **Pins** list. The effect is selected, playback stops, and the preview switches to the **Move** tool. A note at the bottom of the preview says **Preparing pin placement…** and then **Click the image to place pins. Esc to finish.**
2. Click the picture where a pin should hold it. Each click adds a pin and selects it, as one undo step. A click on a transparent spot or off the frame waits for another click. You can still zoom and pan the preview meanwhile; see [Controls on the preview](../../tool-tabs/preview-settings.md#controls-on-the-preview).
3. To stop placing, press `Esc`, click the same button, which shows ✓ (**Finish placing**) meanwhile, or right-click the preview. Moving the playhead, starting playback, choosing another preview tool, or selecting something else stops it too. Pressing an existing pin stops placing and starts dragging that pin.

You can place pins on a picture that is already bent: a new pin holds the point of the picture you click, where it is drawn now. Undo while placing takes back the last pin, and placing goes on. When the layer shows nothing at the playhead, a notification says **There is no visible image to place pins on in this frame.**

### Moving and removing pins

Click **Edit in frame**, the crosshair button left of the effect's eye, or click a pin's row in the **Pins** list, to show the pins in the preview. They show while the **Move** tool is active and playback is stopped, and clicking a row switches to the **Move** tool. See [Editing an effect's handles in the preview](../../tool-tabs/element-property.md#effect-handles).

- Each pin is a circle that shows the number of its row in the **Pins** list. The selected pin is white with a blue ring and sits over the others. Pins keep their size on screen when you zoom the preview.
- The object's own transform handles and pivot hide meanwhile, also while the effect has no pins.
- When effects come after Puppet, the preview hides them meanwhile, so the pins stay on the picture that Puppet makes, and the note at the bottom of the preview says **Editing Puppet pins. Later effects are hidden in the preview.** They show again during playback, with a tool other than **Move**, or once you select something else.

Drag a pin to move it; the press also selects it. A pin can go outside the layer's bounds, and the picture follows it. Modifier keys do not change a drag. Each drag is one undo step. `Esc` or Undo during the drag puts the pin back, and starting playback ends the drag where the pin is.

When the pin's **Position** has keyframes, a drag changes the keyframe at the current frame, or adds one there with spline easing. When its X and Y are animated with [Separate components](../../../get-started/keyframe.md#separate-components), a drag changes both, except one that has an expression. While **Position** has an expression, dragging the pin does nothing.

To remove a pin, select it and click the `−` button (**Remove selected pin**) in the header of the **Pins** list. The pin after it, or the last pin, is selected next.

### Pin rows in the property panel

The **Pins** list is always open. Each pin has a row with its number and its **X** and **Y** boxes; point at the number to see what the coordinates mean. Clicking a row, or a box in it, selects that pin and shows the pins in the preview, and the selected pin's row is highlighted.

- Type into **X** and **Y** to put a pin at an exact place.
- Drag a pin's number up or down to change the order of the pins. The numbers in the preview follow.
- The row's ⋮ button gives the pin's position keyframes and an expression, as for any property; see [Keyframes](../../../get-started/keyframe.md). Once the pin has keyframes, the arrows in its row go to the previous and next keyframe. After **Separate components**, the button opens the separate **X** and **Y** rows in a pop-up.
- **Reset** in the row's menu returns the pin to where its point lies in the unbent picture, so the pin no longer moves that point. When the position has keyframes, only the keyframe at the playhead changes. A separated **X** or **Y** row resets only its own coordinate.

## Properties

### Pins

The pins, in the order of their numbers. Each pin holds the point of the picture where it was placed, and its **Position** says where that point goes. Until a pin moves its point, the layer is unchanged.

- **Type:** `IListProperty<PuppetPin>`
- **Default:** Empty list
- **Animatable:** No (each pin's **Position** is)

#### Position

Where the pin's point of the picture goes, relative to the picture that Puppet receives: `(0, 0)` is its top-left corner and `(1, 1)` its bottom-right corner. A value outside `0` to `1` takes the point beyond the picture's original area.

- **Type:** `Point`
- **Default:** Where you clicked to place the pin
- **Animatable:** Yes

## Usage

Place pins on the joints of a character drawn as one picture, such as the shoulders, elbows, hands, and feet. Drag the hand pins and add keyframes to them to make the arms wave; the pins you leave in place, such as the feet, hold their parts still. On a text, give each letter its own pins: a letter with one pin only moves, and two pins let it tilt or bend.

## Source

[`src/Beutl.Engine/Graphics/FilterEffects/Puppet.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/Puppet.cs)

- [`PuppetPin.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PuppetPin.cs) / [`PuppetDeformer.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PuppetDeformer.cs) / [`PuppetMeshCache.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/PuppetMeshCache.cs) / [`TriangleWarpRenderer.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Engine/Graphics/FilterEffects/TriangleWarpRenderer.cs)
- [`PuppetPinsEditor.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PuppetPinsEditor.cs) / [`PuppetPinItemEditor.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/Views/PuppetPinItemEditor.cs) / [`PuppetPinItemViewModel.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Editor.Components/PropertyEditors/ViewModels/PuppetPinItemViewModel.cs)
- [`PlayerViewModel.Puppet.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/ViewModels/PlayerViewModel.Puppet.cs) / [`PlayerView.axaml.Eyedropper.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Views/PlayerView.axaml.Eyedropper.cs) / [`TransformHandlesOverlay.EditingHandles.cs`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl/Views/TransformHandlesOverlay.EditingHandles.cs)
- [`GraphicsStrings.resx`](https://github.com/b-editor/beutl/blob/2c662378061e338f16e0f6f70e03704c172c5891/src/Beutl.Language/GraphicsStrings.resx)

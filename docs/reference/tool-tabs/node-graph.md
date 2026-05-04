---
title: "Node Graph"
description: "Role of the Node Graph tab and how to use it."
sidebar_position: 8
---

# Node Graph

A tab for **placing and connecting nodes** in node-based drawables (node graph drawables and filter effects).
Add, move, and delete nodes, and wire ports together to build up the processing flow.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes (each graph being edited can be opened in its own tab)

## How to open

There are two ways to open this tab.

- From the menu bar, choose **View → Tools → GraphNode Tree** to open the node graph for the currently selected element.
- In the Properties tab, click the **Open in tab** button on a graph property of a node-based drawable or filter effect to open the same graph in this tab.

## Layout

- **Breadcrumb bar (top)**: Shows the hierarchy of the graph currently being edited. After entering a group node, click an item to return to a parent graph.
- **Graph panel (center)**: A workspace with a dotted background where nodes and connection lines are placed. The background scrolls together with panning and zooming.
- **Selection overlay**: A semi-transparent blue rectangle is shown only while you are box-selecting.

## Adding nodes

### From the right-click menu

Right-clicking on an empty area of the graph panel shows the following items.

- **Add node**: Lists the registered nodes in category submenus. The selected node is placed at the click position.
- **Reset zoom**: Returns the graph panel zoom level to 100%.

### Drag and drop

Drop a node entry from the Library onto the graph panel to add that node at the drop position.

## Working with nodes

Each node has a colored header at the top, with ports, property editors, and monitor items lined up below it.

### Header

- **Expand toggle** (arrow on the left): Toggles the visibility of the node's contents (ports and properties). When collapsed, connection lines emerge from the center of the left and right edges of the node.
- **Name**: Shows the node name in the center. When the name is empty, the display name registered for the node is used.
- **Open** button (right side, group nodes only): Navigates into the inner graph of a group node. The breadcrumb bar is updated; click a breadcrumb to go back.

### Moving

- Left-drag the header to move the node.
- If multiple nodes are selected, all selected nodes move together.
- The node being dragged is brought to the front and returns to its original z-order after release.

### Selecting

- Click a header to select that node alone.
- **`Ctrl` + click** to add to or remove from the selection.
- **`Ctrl` + drag** on an empty area of the graph panel to box-select multiple nodes at once.

### Right-click menu (header)

- **Delete** (`Delete`): Deletes the node together with all of its connections.
- **Rename**: Opens a flyout for editing the node name.

## Working with ports and connections

The small circles at the left and right ends of each row inside a node are ports. Their color depends on the value type; they are filled when something is connected and shown in a faint color when unconnected.

### Connecting

- Left-drag a port to draw a line to another port and release to connect them.
- Only input/output combinations can be connected. If the types differ, an automatic conversion is attempted; when no conversion is possible, the connection line is shown in an error color.

### Disconnecting

- **Double-click** a port to disconnect every connection attached to it.
- The right-click menu on a port also has **Disconnect** (removes all connections).

### Connection line colors

Connection lines change color according to the connection state.

- **Unconnected** (only while dragging): Default color
- **Connected, valid**: Green
- **Type-converted**: Yellow
- **Error**: Red

### Dynamic ports (addable ports)

Group nodes and some other nodes have ports that can be added or removed dynamically. An empty placeholder port is provided; dragging from another port to connect to it adds a new port.

Right-click menu on a port (when it is a dynamic port)

- **Delete**: Deletes that port. Any connection attached to it is also removed.
- **Rename**: Renames the port.

### List-type ports

On a list-type port that accepts multiple ordered connections, each connection has its own point arranged vertically.

- **Vertical drag** reorders the connection slots within the list.
- **Horizontal drag** reconnects that connection to a different port.
- **Double-click** disconnects only that single connection.

## Monitor nodes

Monitor nodes that visualize execution results display the values of the graph being edited as follows.

- **Text display**: Shows the current value as-is in a monospace font.
- **Image display**: Drawn inside the node as a thumbnail up to 200×200 in size.

During playback, monitor updates are paused for performance, and they are only updated while the node is **expanded**.

## Working with the graph panel

### Mouse

- **Left-drag** an empty area to pan the entire graph.
- Use the wheel to zoom in/out (centered on the pointer position).

### Keyboard

- With nodes selected, press `Delete` to delete them (the same behavior as the context menu).

## Navigating group nodes

A group node has its own inner node graph.

- The **Open** button on the right side of the node header enters the inside of the group. The breadcrumb bar at the top of the tab gains one more level.
- Click a higher-level breadcrumb item to return to that level. Levels below it are closed.
- Inside a group, dedicated nodes correspond to the group's inputs and outputs; only one of each can be placed.

## Persistence

Node positions, expansion states, and the graph's pan/zoom position are kept even after the scene is closed. The next time the tab is opened, the graph hierarchy and view state that were last shown are restored.

## Related documents

- [Library reference: node-based](../library/drawables/index.md)

## Source

- [`NodeGraphTabExtension.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/NodeGraphTabExtension.cs)
- [`NodeGraphTabViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeGraphTabViewModel.cs)
- [`NodeGraphViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeGraphViewModel.cs)
- [`GraphNodeViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/GraphNodeViewModel.cs)
- [`NodePortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodePortViewModel.cs)
- [`InputPortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/InputPortViewModel.cs) / [`OutputPortViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/OutputPortViewModel.cs)
- [`ConnectionViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/ConnectionViewModel.cs)
- [`NodeMemberViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeMemberViewModel.cs) / [`NodeMonitorViewModel.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/ViewModels/NodeMonitorViewModel.cs)
- [`NodeGraphTabView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphTabView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphTabView.axaml.cs)
- [`NodeGraphView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphView.axaml.cs)
- [`GraphNodeView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/GraphNodeView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/GraphNodeView.axaml.cs)
- [`NodePortView.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortView.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortView.axaml.cs)
- [`NodeGraphBackground.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphBackground.cs) / [`NodeGraphOverlay.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodeGraphOverlay.cs)
- [`ConnectionLine.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/ConnectionLine.cs) / [`NodePortPoint.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/NodePortPoint.cs)
- [`ListPortDragBehavior.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl.Editor.Components/NodeGraphTab/Views/ListPortDragBehavior.cs)
- [`GraphModelEditor.axaml`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/GraphModelEditor.axaml) / [`.axaml.cs`](https://github.com/b-editor/beutl/blob/main/src/Beutl/Views/Editors/GraphModelEditor.axaml.cs) (entry point for opening the tab from the property side)

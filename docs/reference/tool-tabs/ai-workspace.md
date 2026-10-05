---
title: "AI"
description: "Generate and edit images and videos, create subtitles, and manage AI jobs."
sidebar_position: 21
---

# AI

The AI workspace provides paid generation and editing tools inside Beutl. Available models, input types, and options depend on the selected task and model.

## Tab characteristics

- **Open by default**: No
- **Allow multiple instances**: Yes (each tab keeps its own work)

## How to open

Open **View → Tools → AI**, or choose a task from the **AI** menu while a scene is open.

Sign in to your Beutl account. If your account cannot use AI, the workspace offers Pro-plan guidance. The plan button opens account management in your browser; returning to Beutl refreshes the account information.

## Sections

| Section | Purpose |
|---------|---------|
| Image generation | Generate an image from a prompt |
| Image editing | Remove a background or object, upscale, restyle from a reference image, or outpaint |
| Video generation | Generate video with references supported by the model |
| Video editing | Edit or extend a video, or apply motion using a video and a person/character image |
| Subtitles | Generate subtitles using a selected subtitle template |
| Jobs | Follow AI requests and their results |

Video generation can use the current scene frame or first/last-frame inputs where supported. General references may include images, videos, or audio; supported combinations are shown for the selected model. Editing an existing video uses its duration rather than a separate duration choice.

Image editing results offer **Add to scene** and **Save to file** actions. Review the result before adding it to your project.

## Related documents

- [Node Graph](./node-graph.md#ai-generation-nodes) — Connect AI generation steps in a graph
- [Editing with AI Agents](../../get-started/ai-editing.md) — Connect an external coding agent through MCP

## Source

- [`AiWorkspaceTabExtension.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/PrimitiveImpls/AiWorkspaceTabExtension.cs)
- [`AiWorkspaceViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/Tools/AiWorkspaceViewModel.cs)
- [`AiPlanCoordinator.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/Services/AiPlanCoordinator.cs)
- [`AiVideoEditingViewModel.cs`](https://github.com/b-editor/beutl/blob/v2.0.0-preview.8/src/Beutl/ViewModels/Dialogs/AiVideoEditingViewModel.cs)

using System.Globalization;
using System.Numerics;
using System.Reflection;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.VisualTree;
using Beutl.Animation;
using Beutl.Animation.Easings;
using Beutl.Api.Services;
using Beutl.Editor.Components.ElementPropertyTab.ViewModels;
using Beutl.Editor.Components.ElementPropertyTab.Views;
using Beutl.Editor.Components.GraphEditorTab.ViewModels;
using Beutl.Editor.Components.GraphEditorTab.Views;
using Beutl.Editor.Components.LibraryTab.ViewModels;
using Beutl.Editor.Components.LibraryTab.Views;
using Beutl.Editor.Components.NodeGraphTab.ViewModels;
using Beutl.Editor.Components.NodeGraphTab.Views;
using Beutl.Editor.Components.PreviewSettingsTab.ViewModels;
using Beutl.Editor.Components.PreviewSettingsTab.Views;
using Beutl.Editor.Components.SceneSettingsTab.ViewModels;
using Beutl.Editor.Components.SceneSettingsTab.Views;
using Beutl.Editor.Components.TimelineTab.ViewModels;
using Beutl.Editor.Components.TimelineTab.Views;
using Beutl.Editor.Models;
using Beutl.Editor.Services;
using Beutl.Extensibility;
using Beutl.Graphics.Shapes;
using Beutl.NodeGraph;
using Beutl.NodeGraph.Nodes;
using Beutl.Pages.SettingsPages;
using Beutl.ProjectSystem;
using Beutl.Services;
using Beutl.Services.StartupTasks;
using Beutl.Testing.Headless;
using Beutl.ViewModels;
using Beutl.ViewModels.SettingsPages;
using Beutl.Views;
using Beutl.Views.Editors;
using static Beutl.Docs.Screenshots.Scenarios;

namespace Beutl.Docs.Screenshots;

internal static class EditorScreenshots
{
    private static bool Japanese => CultureInfo.CurrentUICulture.TwoLetterISOLanguageName == "ja";

    public static async Task Render(string id, string output)
    {
        if (id == "telemetry-settings")
        {
            using var model = new TelemetrySettingsPageViewModel();
            var view = new TelemetrySettingsPage { DataContext = model };
            using var host = new CaptureHost(view, 960, 650);
            host.SaveContent(output, view);
            return;
        }
        if (id is not ("editor-overview" or "library-tab" or "library-easings" or "timeline-tab"
            or "element-properties" or "keyframe-property" or "scene-settings-tab" or "preview-settings-tab"
            or "graph-editor-tab" or "node-graph-tab"))
            throw new ArgumentException($"Unknown screenshot scenario: {id}");

        await using var fixture = await EditorFixture.Create();
        var editor = fixture.Editor;
        switch (id)
        {
            case "editor-overview":
            {
                using var host = new CaptureHost(new EditView { DataContext = editor }, 1500, 900);
                host.Save(output);
                break;
            }
            case "library-tab":
            case "library-easings":
            {
                using var model = new LibraryTabViewModel(editor);
                var view = new LibraryTabView { DataContext = model };
                using var host = new CaptureHost(view, 620, 650);
                if (id == "library-easings")
                {
                    view.FindControl<Carousel>("carousel")!.PageTransition = null;
                    view.FindControl<TabStrip>("tabStrip")!.SelectedIndex = 1;
                    Settle();
                }
                else
                {
                    foreach (var item in view.GetVisualDescendants().OfType<TreeViewItem>().Take(3))
                        item.IsExpanded = true;
                    Settle();
                }
                host.Save(output);
                break;
            }
            case "timeline-tab":
            {
                using var model = new TimelineTabViewModel(editor);
                model.Options.Value = model.Options.Value with { Scale = 1.2f, Offset = Vector2.Zero };
                using var host = new CaptureHost(new TimelineTabView { DataContext = model }, 1200, 430);
                host.Save(output);
                break;
            }
            case "element-properties":
            case "keyframe-property":
            {
                using var model = new ElementPropertyTabViewModel(editor);
                using var host = new CaptureHost(new ElementPropertyTabView { DataContext = model }, 520, 850);
                // These editors use ExpandTransitionHelper's own CrossFade, including on initial
                // attachment. Let it finish while the headless dispatcher runs before capturing.
                await Task.Delay(ExpandTransitionHelper.DefaultDuration + TimeSpan.FromMilliseconds(100));
                Settle();
                if (id == "keyframe-property")
                    host.Save(output, new Rect(0, 0, 520, 88));
                else
                    host.Save(output);
                break;
            }
            case "scene-settings-tab":
            {
                using var model = new SceneSettingsTabViewModel(editor);
                var view = new SceneSettingsTabView { DataContext = model };
                using var host = new CaptureHost(view, 520, 460);
                host.Save(output);
                break;
            }
            case "preview-settings-tab":
            {
                using var model = new PreviewSettingsTabViewModel(editor);
                using var host = new CaptureHost(new PreviewSettingsTabView { DataContext = model }, 620, 850);
                host.Save(output);
                break;
            }
            case "graph-editor-tab":
            {
                using var model = new GraphEditorTabViewModel(editor);
                model.Element.Value = fixture.RectangleElement;
                model.Select(fixture.WidthAnimation);
                model.SelectedAnimation.Value!.Options.Value = model.SelectedAnimation.Value.Options.Value
                    with { Scale = 1.2f, Offset = Vector2.Zero };
                model.SelectedAnimation.Value.SelectedView.Value!.SetSelection(fixture.WidthAnimation.KeyFrames);
                using var host = new CaptureHost(new GraphEditorTabView { DataContext = model }, 1120, 650);
                host.Save(output);
                break;
            }
            case "node-graph-tab":
            {
                var rectangle = new RectGeometryNode { Position = (28, 70) };
                rectangle.Object.Width.CurrentValue = 320;
                rectangle.Object.Height.CurrentValue = 180;
                var shape = new GeometryShapeNode { Position = (340, 110) };
                shape.Fill.Property!.SetValue(new Beutl.Media.SolidColorBrush(0xFF2563EB));
                var outputNode = new OutputNode { Position = (650, 150) };
                var graph = new GraphModel();
                graph.Nodes.AddRange([rectangle, shape, outputNode]);
                graph.Connect(shape.Geometry, rectangle.OutputPort);
                graph.Connect(outputNode.InputPort, shape.Output);
                using var model = new NodeGraphViewModel(graph, editor);
                using var host = new CaptureHost(new NodeGraphView { DataContext = model }, 940, 600);
                await Task.Delay(ExpandTransitionHelper.DefaultDuration + TimeSpan.FromMilliseconds(100));
                Settle();
                host.Save(output);
                break;
            }
        }
    }

    private sealed class EditorFixture : IAsyncDisposable
    {
        private readonly MainViewModel _main;
        private readonly ProjectService _projects;
        private readonly EditorService _editors;

        private EditorFixture(MainViewModel main, ProjectService projects, EditorService editors,
            EditViewModel editor, Element element, KeyFrameAnimation<float> animation)
        {
            _main = main;
            _projects = projects;
            _editors = editors;
            Editor = editor;
            RectangleElement = element;
            WidthAnimation = animation;
        }

        public EditViewModel Editor { get; }
        public Element RectangleElement { get; }
        public KeyFrameAnimation<float> WidthAnimation { get; }

        public static async Task<EditorFixture> Create()
        {
            var main = new MainViewModel();
            var provider = DesktopInternals.Property<ExtensionProvider>(main, "ExtensionProvider");
            DesktopInternals.Method(typeof(ExtensionProvider), "AddExtensions")
                .Invoke(provider, [0, LoadPrimitiveExtensionTask.PrimitiveExtensions]);
            foreach (var extension in LoadPrimitiveExtensionTask.PrimitiveExtensions.OfType<ViewExtension>())
                main.ContextCommandManager!.Register(extension);
            var projects = DesktopInternals.Property<ProjectService>(main, "ProjectService");
            var editors = DesktopInternals.Property<EditorService>(main, "EditorService");
            string location = Path.Combine(BeutlHomeIsolation.CurrentHome!, "samples", Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(location);
            var project = await projects.CreateProject(1280, 720, 30, 44100, "Storyboard", location)
                ?? throw new InvalidOperationException("Could not create the screenshot sample project.");
            var scene = project.Items.OfType<Scene>().Single();
            scene.Duration = TimeSpan.FromSeconds(8);
            editors.ActivateTabItem(scene);
            Settle();
            var editor = (EditViewModel)editors.SelectedTabItem.Value!.Context.Value!;
            var animation = new KeyFrameAnimation<float>();
            animation.KeyFrames.Add(new KeyFrame<float> { KeyTime = TimeSpan.Zero, Value = 180 });
            animation.KeyFrames.Add(new KeyFrame<float>
                { KeyTime = TimeSpan.FromSeconds(4), Value = 420, Easing = new SplineEasing(0.25f, 0.1f, 0.75f, 0.9f) });
            var shape = new RectShape();
            shape.Width.Animation = animation;
            shape.Height.CurrentValue = 180;
            shape.Fill.CurrentValue = new Beutl.Media.SolidColorBrush(0xFF2563EB);
            var text = new Beutl.Graphics.Shapes.TextBlock();
            text.Text.CurrentValue = "Beutl";
            text.Size.CurrentValue = 72;
            text.FontFamily.CurrentValue = new Beutl.Media.FontFamily("Noto Sans JP");
            var adder = (IElementAdder)editor.GetService(typeof(IElementAdder))!;
            await adder.AddAsync([
                new ElementDescription(TimeSpan.Zero, TimeSpan.FromSeconds(6), 1, new ElementSource.EngineObject(() => shape)),
                new ElementDescription(TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(5), 2, new ElementSource.EngineObject(() => text))
            ], CancellationToken.None);
            var element = scene.Children.Single(item => item.Objects.Contains(shape));
            element.Name = Japanese ? "長方形" : "Rectangle";
            scene.Children.Single(item => item.Objects.Contains(text)).Name = Japanese ? "タイトル" : "Title";
            ((IEditorSelection)editor.GetService(typeof(IEditorSelection))!).SelectedObject.Value = element;
            ((IEditorClock)editor.GetService(typeof(IEditorClock))!).CurrentTime.Value = TimeSpan.FromSeconds(2);
            editor.HistoryManager.Commit();
            Settle();
            return new EditorFixture(main, projects, editors, editor, element, animation);
        }

        public async ValueTask DisposeAsync()
        {
            foreach (var tab in _editors.TabItems.ToArray())
            {
                var close = typeof(EditorService).GetMethod("CloseTabItem", BindingFlags.Instance | BindingFlags.NonPublic,
                    [typeof(EditorTabItem), typeof(bool)])!;
                await (ValueTask)close.Invoke(_editors, [tab, false])!;
            }
            await (Task)DesktopInternals.Method(typeof(ProjectService), "CloseProjectAsync")
                .Invoke(_projects, [CancellationToken.None])!;
            _main.Dispose();
            BeutlApplication.Current.Items.Clear();
            Settle();
        }
    }
}

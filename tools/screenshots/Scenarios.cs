using Avalonia;
using Avalonia.Controls;
using Avalonia.Headless;
using Avalonia.Media;
using Avalonia.Threading;
using Avalonia.VisualTree;
using Beutl.Api.Services;
using Beutl.Configuration;
using Beutl.Controls;
using Beutl.Editor.Components.Helpers;
using Beutl.Extensibility;
using Beutl.Extensions.FFmpeg.Decoding;
using Beutl.Language;
using Beutl.Media.Decoding;
using Beutl.Pages.SettingsPages;
using Beutl.Services;
using Beutl.Services.StartupTasks;
using Beutl.Testing.Headless;
using Beutl.ViewModels;
using Beutl.ViewModels.Dialogs;
using Beutl.ViewModels.SettingsPages;
using Beutl.Views;
using Beutl.Views.Dialogs;
using FluentAvalonia.UI.Controls;
using SkiaSharp;

namespace Beutl.Docs.Screenshots;

internal static class Scenarios
{
    public static async Task Render(string id, string output)
    {
        switch (id)
        {
            case "create-project-menu":
                using (var model = new MainViewModel())
                {
                    foreach (var extension in LoadPrimitiveExtensionTask.PrimitiveExtensions.OfType<ViewExtension>())
                        model.ContextCommandManager!.Register(extension);
                    AppHelper.GetContextCommandManager = () => model.ContextCommandManager;
                    var view = new MainView { DataContext = model };
                    using var host = new CaptureHost(view, 1100, 650);
                    var file = view.FindControl<Menu>("MenuBar")!.Items.OfType<MenuItem>()
                        .Single(item => Equals(item.Header, Strings.File));
                    file.IsSubMenuOpen = true;
                    Settle();
                    file.Items.OfType<MenuItem>().Single(item => Equals(item.Header, Strings.CreateNew))
                        .IsSubMenuOpen = true;
                    Settle();
                    double menuRight = host.Window.GetVisualDescendants().OfType<MenuItem>()
                        .Where(item => item.IsEffectivelyVisible)
                        .Select(item => CaptureHost.Bounds(item, host.Window).Right).Max();
                    host.Save(output, new Rect(0, 0, Math.Min(1100, Math.Max(700, menuRight + 24)), 360));
                    file.IsSubMenuOpen = false;
                    AppHelper.GetContextCommandManager = null;
                }
                break;
            case "create-project-start":
            {
                var view = new EditorHostFallback();
                using var host = new CaptureHost(view, 1100, 650);
                var create = view.FindControl<OptionsDisplayItem>("createNewButton")!;
                create.ContextMenu!.Open(create);
                Settle();
                host.Save(output, new Rect(24, 24, 1000, 400));
                create.ContextMenu.Close();
                break;
            }
            case "create-project-name":
            case "create-project-options":
            {
                var model = new CreateNewProjectViewModel(new ProjectService());
                model.Name.Value = "MyProject";
                // Display a sample path only; screenshots never create a project there.
                model.Location.Value = "/home/user/Projects";
                model.IsGitAvailable.Value = true;
                model.TrackHistory.Value = true;
                var dialog = new CreateNewProject { DataContext = model };
                dialog.FindControl<Carousel>("carousel")!.PageTransition = null;
                using var host = new CaptureHost(new Border(), 900, 650);
                Task<FAContentDialogResult> shown = dialog.ShowAsync(host.Window);
                try
                {
                    Settle();
                    if (id == "create-project-options")
                    {
                        var next = dialog.GetVisualDescendants().OfType<Button>()
                            .Single(button => Equals(button.Content, Strings.Next));
                        var point = next.TranslatePoint(new Point(next.Bounds.Width / 2, next.Bounds.Height / 2), host.Window)!.Value;
                        host.Window.MouseDown(point, Avalonia.Input.MouseButton.Left);
                        host.Window.MouseUp(point, Avalonia.Input.MouseButton.Left);
                        Settle();
                        if (dialog.FindControl<Carousel>("carousel")!.SelectedIndex != 1)
                            throw new InvalidOperationException("The project wizard did not advance.");
                    }
                    var background = dialog.GetVisualDescendants().OfType<Border>()
                        .Single(part => part.Name == "BackgroundElement");
                    host.Save(output, CaptureHost.Bounds(background, host.Window).Inflate(12));
                }
                finally
                {
                    dialog.Hide();
                    await shown;
                }
                break;
            }
            case "view-settings":
            case "accent-color":
            {
                using var editor = new EditorSettingsPageViewModel();
                using var model = new ViewSettingsPageViewModel(new Lazy<EditorSettingsPageViewModel>(() => editor));
                var view = new ViewSettingsPage { DataContext = model };
                using var host = new CaptureHost(view, 960, 760);
                if (id == "accent-color")
                {
                    var accent = view.GetVisualDescendants().OfType<OptionsDisplayItem>()
                        .Single(item => Equals(item.Header, SettingsStrings.AccentColor));
                    bool previous = model.UseCustomAccent.Value;
                    try
                    {
                        model.UseCustomAccent.Value = true;
                        accent.IsExpanded = true;
                        Settle();
                        host.Save(output, accent);
                    }
                    finally
                    {
                        model.UseCustomAccent.Value = previous;
                    }
                }
                else
                {
                    var content = view.GetVisualDescendants().OfType<StackPanel>()
                        .First(panel => panel.Parent is ScrollViewer);
                    host.Save(output, new Rect(0, 0, 960, Math.Min(760, CaptureHost.Bounds(content.Children[^1], host.Window).Bottom + 24)));
                }
                break;
            }
            case "editor-settings":
            case "frame-cache":
            case "node-cache":
            case "property-editor":
            {
                using var model = new EditorSettingsPageViewModel();
                var view = new EditorSettingsPage { DataContext = model };
                using var host = new CaptureHost(view, 960, 720);
                string header = id switch
                {
                    "frame-cache" => Strings.FrameCache,
                    "node-cache" => SettingsStrings.NodeCache,
                    "property-editor" => SettingsStrings.PropertyEditor,
                    _ => Strings.Editor
                };
                var title = view.GetVisualDescendants().OfType<TextBlock>()
                    .First(block => block.Text == header && block.Parent is StackPanel);
                var group = ((StackPanel)title.Parent!).Children;
                var body = group[group.IndexOf(title) + 1];
                var scroll = view.GetVisualDescendants().OfType<ScrollViewer>().First();
                Point target = title.TranslatePoint(default, scroll)!.Value;
                scroll.Offset = new Vector(0, scroll.Offset.Y + target.Y - 16);
                Settle();
                host.Save(output, CaptureHost.Bounds(title, host.Window).Union(CaptureHost.Bounds(body, host.Window)));
                break;
            }
            case "font-settings-linux":
            case "font-settings-windows":
            {
                var fonts = GlobalConfiguration.Instance.FontConfig.FontDirectories;
                fonts.Clear();
                foreach (string path in id == "font-settings-linux"
                    ? new[] { "/usr/share/fonts", "/home/user/.local/share/fonts" }
                    : new[] { @"C:\Windows\Fonts", @"C:\Users\User\AppData\Local\Microsoft\Windows\Fonts" })
                    fonts.Add(path);
                using var model = new FontSettingsPageViewModel();
                using var host = new CaptureHost(new FontSettingsPage { DataContext = model }, 960, 220);
                host.Save(output);
                break;
            }
            case "extension-settings":
            case "decoder-priority":
            case "ffmpeg-decoder":
            {
                var provider = new ExtensionProvider();
                var ffmpeg = new FFmpegDecodingExtension();
                Extension[] extensions = [.. LoadPrimitiveExtensionTask.PrimitiveExtensions, ffmpeg];
                DesktopInternals.Method(typeof(ExtensionProvider), "AddExtensions").Invoke(provider, [0, extensions]);
                // Settings and supported extensions do not require starting an FFmpeg worker.
                if (!DecoderRegistry.EnumerateDecoder().Any(info => info is FFmpegDecoderInfo))
                    DecoderRegistry.Register(ffmpeg.GetDecoderInfo());
                Action cleanup;
                Control view;
                if (id == "decoder-priority")
                {
                    var context = new DecoderPriorityPageViewModel();
                    cleanup = context.Dispose;
                    view = new DecoderPriorityPage { DataContext = context };
                }
                else if (id == "ffmpeg-decoder")
                {
                    var context = new AnExtensionSettingsPageViewModel(ffmpeg, provider);
                    cleanup = () =>
                    {
                        context.NavigateParent.Dispose();
                        foreach (var property in context.Properties.OfType<IDisposable>())
                            property.Dispose();
                    };
                    view = new AnExtensionSettingsPage { DataContext = context };
                }
                else
                {
                    var context = new ExtensionsSettingsPageViewModel(provider);
                    cleanup = context.Dispose;
                    view = new ExtensionsSettingsPage { DataContext = context };
                }
                try
                {
                    using var host = new CaptureHost(view, 960, 680);
                    if (id == "extension-settings")
                    {
                        view.GetVisualDescendants().OfType<OptionsDisplayItem>()
                            .Single(item => Equals(item.Header, SettingsStrings.ExtensionsSettings)).IsExpanded = true;
                        Settle();
                    }
                    host.SaveContent(output, view);
                }
                finally
                {
                    cleanup();
                }
                break;
            }
            default:
                throw new ArgumentException($"Unknown screenshot scenario: {id}");
        }
    }

    private static void Settle()
    {
        // Fixed render ticks, with Fluent animations disabled, avoid wall-clock timing races.
        HeadlessTestHelpers.Settle(3);
        HeadlessTestHelpers.Render(3);
    }

    private sealed class CaptureHost : IDisposable
    {
        public Window Window { get; }

        public CaptureHost(Control content, int width, int height)
        {
            Window = new Window
            {
                Width = width,
                Height = height,
                WindowDecorations = WindowDecorations.None,
                Content = content
            };
            Window.SetRenderScaling(1);
            Window.Show();
            Settle();
            DisableAnimations();
        }

        public static Rect Bounds(Control control, Window window) => new(
            control.TranslatePoint(default, window) ?? throw new InvalidOperationException("Detached screenshot target."),
            control.Bounds.Size);

        public void Save(string output, Control target) => Save(output, Bounds(target, Window));

        public void SaveContent(string output, Control view)
        {
            double bottom = view.GetVisualDescendants().OfType<TextBlock>()
                .Where(block => block.IsEffectivelyVisible && !string.IsNullOrWhiteSpace(block.Text))
                .Select(block => Bounds(block, Window).Bottom).Max();
            Save(output, new Rect(0, 0, Window.ClientSize.Width, Math.Min(Window.ClientSize.Height, bottom + 32)));
        }

        public void Save(string output, Rect? crop = null)
        {
            DisableAnimations();
            Settle();
            using var frame = Window.CaptureRenderedFrame()
                ?? throw new InvalidOperationException("The window did not render a frame.");
            using var stream = new MemoryStream();
            frame.Save(stream, new Avalonia.Media.Imaging.PngBitmapEncoderOptions());
            stream.Position = 0;
            using var bitmap = SKBitmap.Decode(stream);
            using var result = new SKBitmap();
            Rect rect = crop ?? new Rect(0, 0, bitmap.Width, bitmap.Height);
            if (rect.Width <= 0 || rect.Height <= 0 || rect.X < -1 || rect.Y < -1
                || rect.Right > bitmap.Width + 1 || rect.Bottom > bitmap.Height + 1)
                throw new InvalidOperationException($"Screenshot target is clipped: {rect} in {bitmap.Width}x{bitmap.Height}");
            var pixels = new SKRectI(Math.Max(0, (int)Math.Floor(rect.X)), Math.Max(0, (int)Math.Floor(rect.Y)),
                Math.Min(bitmap.Width, (int)Math.Ceiling(rect.Right)), Math.Min(bitmap.Height, (int)Math.Ceiling(rect.Bottom)));
            if (!bitmap.ExtractSubset(result, pixels))
                throw new InvalidOperationException("Could not crop the screenshot.");
            if (result.Pixels.Distinct().Take(2).Count() < 2)
                throw new InvalidOperationException("The screenshot is blank.");
            Directory.CreateDirectory(Path.GetDirectoryName(output)!);
            using var encoded = result.Encode(SKEncodedImageFormat.Png, 100);
            using var file = File.Create(output);
            encoded.SaveTo(file);
        }

        private void DisableAnimations()
        {
            // Settings cards use a CrossFade and animated chevrons independently of FAUISettings.
            // Apply this before state changes and again for controls created by expanded content.
            foreach (var control in Window.GetVisualDescendants().OfType<Control>())
            {
                control.Transitions = null;
                if (control is OptionsDisplayItem item)
                    item.ContentTransition = null;
            }
        }

        public void Dispose()
        {
            Window.Close();
            Window.Content = null;
            Dispatcher.UIThread.RunJobs();
        }
    }
}

using System.Globalization;
using System.Reflection;
using System.Reactive.Concurrency;
using Avalonia;
using Avalonia.Headless;
using Avalonia.Markup.Xaml;
using Beutl;
using Beutl.Api.Services;
using Beutl.Controls.Styling;
using Beutl.Editor.Components.Helpers;
using Beutl.Extensibility;
using Beutl.Helpers;
using Beutl.NodeGraph.Nodes;
using Beutl.Services;
using Beutl.Services.StartupTasks;
using Beutl.Testing.Headless;
using FluentAvalonia.Core;
using FluentAvalonia.Styling;
using Reactive.Bindings;
using ReactiveUI.Avalonia.Reactive;

namespace Beutl.Docs.Screenshots;

public sealed class ScreenshotApp : Application
{
    private IDisposable? _themeService;

    public static AppBuilder BuildAvaloniaApp()
    {
        OpenALPreload.EnsureLoaded();
        return AppBuilder.Configure<ScreenshotApp>()
            .UseReactiveUI(builder => builder.WithMainThreadScheduler(DesktopInternals.UiScheduler))
            .UseSkia()
            .With(UiFonts.CreateFontManagerOptions(CultureInfo.CurrentUICulture))
            .UseHeadless(new AvaloniaHeadlessPlatformOptions { UseHeadlessDrawing = false });
    }

    public override void Initialize()
    {
        // Generated from the selected checkout's App.axaml; no copied style list to go stale.
        AvaloniaXamlLoader.Load(this);
        FAUISettings.SetAnimationsEnabledAtAppLevel(false);
        Resources["PaletteColors"] = DesktopInternals.Method(DesktopInternals.Type("Beutl.AppHelpers"), "GetPaletteColors")
            .Invoke(null, null)!;
        DesktopInternals.Method(typeof(App), "RegisterBundledEngineFonts").Invoke(null, null);

        var themeType = DesktopInternals.Type("Beutl.Services.ThemeService");
        _themeService = (IDisposable)Activator.CreateInstance(themeType,
            Styles.OfType<FluentAvaloniaTheme>().Single(),
            Beutl.Configuration.GlobalConfiguration.Instance.ViewConfig)!;
        DesktopInternals.Method(themeType, "Start").Invoke(_themeService, null);
    }

    public override void RegisterServices()
    {
        base.RegisterServices();
        ReactivePropertyScheduler.SetDefault(DesktopInternals.UiScheduler);
        var implementation = DesktopInternals.Type("Beutl.Services.PropertyEditorService+PropertyEditorExtensionImpl");
        typeof(PropertyEditorExtension).GetProperty("DefaultHandler", BindingFlags.Static | BindingFlags.NonPublic)!
            .SetValue(null, Activator.CreateInstance(implementation, true));
        LibraryRegistrar.RegisterAll();
        NodesRegistrar.RegisterAll();
        foreach (var extension in LoadPrimitiveExtensionTask.PrimitiveExtensions)
            extension.Load();
    }

    public void Stop() => _themeService?.Dispose();

    // App.axaml's native-menu handlers are not invoked by these scenarios.
    private void AboutBeutlClicked(object? sender, EventArgs args) { }
    private void OpenSettingsClicked(object? sender, EventArgs args) { }
}

// These initialization services are internal in the desktop assembly. Reuse the real services
// instead of maintaining another theme/property-editor implementation in the docs repository.
internal static class DesktopInternals
{
    public static T Property<T>(object instance, string name) =>
        (T)(instance.GetType().GetProperty(name, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance)
            ?.GetValue(instance) ?? throw new InvalidOperationException($"Desktop property changed: {instance.GetType().FullName}.{name}"));

    public static IScheduler UiScheduler => (IScheduler)Type("Beutl.Helpers.UiThreadScheduler")
        .GetProperty("Instance", BindingFlags.Static | BindingFlags.Public)!.GetValue(null)!;

    public static Type Type(string name) => typeof(App).Assembly.GetType(name)
        ?? throw new InvalidOperationException($"Desktop initialization type changed: {name}");

    public static MethodInfo Method(Type type, string name) => type.GetMethod(name,
        BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance)
        ?? throw new InvalidOperationException($"Desktop initialization method changed: {type.FullName}.{name}");
}

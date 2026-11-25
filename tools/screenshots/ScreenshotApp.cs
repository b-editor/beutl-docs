using System.Globalization;
using System.Reflection;
using System.Reactive.Concurrency;
using Avalonia;
using Avalonia.Headless;
using Avalonia.Markup.Xaml;
using Beutl;
using Beutl.Configuration;
using Beutl.Controls.Styling;
using Beutl.Editor.Components.FileBrowserTab.Services;
using Beutl.Editor.Services;
using Beutl.Extensibility;
using Beutl.Media.Decoding;
using Beutl.Services;
using Beutl.Services.StartupTasks;
using Beutl.Services.Tutorials;
using Beutl.Testing.Headless;
using Beutl.ViewModels;
using FluentAvalonia.Core;
using FluentAvalonia.Styling;
using ReactiveUI.Avalonia.Reactive;

namespace Beutl.Docs.Screenshots;

public sealed class ScreenshotApp : Application
{
    private readonly ServiceMap _services = new();
    private readonly FileThumbnailService _thumbnails;
    private IDisposable? _themeService;

    public ScreenshotApp()
    {
        // The services the desktop's App creates and hands to its view models and windows. The configuration is
        // a new one, which never reads or saves settings.json.
        Configuration.ViewConfig.UICulture.Value = CultureInfo.CurrentUICulture;
        Configuration.EditorConfig.FrameCacheMaxSize.Value = 1024;
        Configuration.TelemetryConfig.Beutl_Application.Value = false;
        Configuration.TelemetryConfig.Beutl_Logging.Value = false;
        Configuration.TelemetryConfig.Beutl_Api_Client.Value = false;
        Configuration.TelemetryConfig.Beutl_PackageManagement.Value = false;

        Decoders = new DecoderRegistry(Configuration.ExtensionConfig);
        Fonts = new Beutl.Media.FontManager(Configuration.FontConfig);
        Templates = new ObjectTemplateService(new SceneRenderServices(Fonts, Decoders, Configuration.EditorConfig,
            Configuration.ProxyStoreConfig));
        _thumbnails = new FileThumbnailService(Decoders, Templates);
        object updates = DesktopInternals.Create(DesktopInternals.Type("Beutl.Services.AppUpdateController"),
            Configuration.UpdateConfig, Notifications);
        object palettes = DesktopInternals.Method(
            DesktopInternals.Type(typeof(Beutl.Controls.ControlFonts).Assembly, "Beutl.Controls.PropertyEditors.ColorPaletteService"),
            "CreateDefault").Invoke(null, null)!;
        _services
            .Add(Configuration)
            .Add(Fonts)
            .Add(Decoders)
            .Add<INotificationService>(Notifications)
            .Add(updates.GetType(), updates)
            .Add(Library)
            .Add(Templates)
            .Add(_thumbnails)
            .Add<ITutorialService>(new TutorialServiceHandler(Configuration.TutorialConfig))
            .Add(palettes.GetType(), palettes);
        ExtensionContext = new ExtensionContext(_services);
    }

    public static ScreenshotApp Instance => (ScreenshotApp)Current!;

    public GlobalConfiguration Configuration { get; } = new();

    public Beutl.Media.FontManager Fonts { get; }

    public DecoderRegistry Decoders { get; }

    public INotificationService Notifications { get; } = new NotificationService();

    public Beutl.Services.LibraryService Library { get; } = new();

    public ObjectTemplateService Templates { get; }

    public IServiceProvider Services => _services;

    public IExtensionContext ExtensionContext { get; }

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
        DesktopInternals.Method(typeof(App), "RegisterBundledEngineFonts").Invoke(null, [Fonts]);

        var themeType = DesktopInternals.Type("Beutl.Services.ThemeService");
        _themeService = (IDisposable)Activator.CreateInstance(themeType,
            Styles.OfType<FluentAvaloniaTheme>().Single(), Configuration.ViewConfig, ExtensionContext)!;
        DesktopInternals.Method(themeType, "Start").Invoke(_themeService, null);
    }

    public override void RegisterServices()
    {
        base.RegisterServices();
        // The hooks the desktop and its UI tests share: property editors, the library and node registries, and
        // the UI scheduler. No command manager here; the scenarios that show key gestures set their own.
        DesktopInternals.Method(typeof(App), "RegisterProcessServices").Invoke(null, [Library, null, null]);
        foreach (var extension in LoadPrimitiveExtensionTask.PrimitiveExtensions)
            extension.Load(ExtensionContext);
    }

    // App's public constructor passes no telemetry session either.
    public MainViewModel CreateMainViewModel() => new(Services, string.Empty);

    // A window has no owner to inherit the services from, so the desktop sets them on each one it opens.
    public void SetHostServices(AvaloniaObject window) =>
        DesktopInternals.Method(DesktopInternals.Type("Beutl.Helpers.HostServices"), "SetFrom")
            .Invoke(null, [window, Services]);

    public void Stop()
    {
        _themeService?.Dispose();
        _thumbnails.Dispose();
        Templates.Dispose();
        Library.Dispose();
    }

    // App.axaml's native-menu handlers are not invoked by these scenarios.
    private void AboutBeutlClicked(object? sender, EventArgs args) { }
    private void OpenSettingsClicked(object? sender, EventArgs args) { }

    // The desktop's registry (EditorServiceRegistry) is internal; this finds services the same way, by exact type.
    private sealed class ServiceMap : IServiceProvider
    {
        private readonly Dictionary<Type, object> _services = [];

        public ServiceMap Add<T>(T service) where T : class => Add(typeof(T), service);

        public ServiceMap Add(Type type, object service)
        {
            _services.Add(type, service);
            return this;
        }

        public object? GetService(Type serviceType) => _services.GetValueOrDefault(serviceType);
    }
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

    public static Type Type(string name) => Type(typeof(App).Assembly, name);

    public static Type Type(Assembly assembly, string name) => assembly.GetType(name)
        ?? throw new InvalidOperationException($"Desktop initialization type changed: {name}");

    public static MethodInfo Method(Type type, string name) => type.GetMethod(name,
        BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance)
        ?? throw new InvalidOperationException($"Desktop initialization method changed: {type.FullName}.{name}");

    public static T Create<T>(params object[] args) => (T)Create(typeof(T), args);

    public static object Create(Type type, params object[] args)
    {
        Type[] types = [.. args.Select(arg => arg.GetType())];
        var constructor = type.GetConstructor(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance, types)
            ?? throw new InvalidOperationException(
                $"Desktop constructor changed: {type.FullName}({string.Join(", ", types.Select(argument => argument.Name))})");
        return constructor.Invoke(args);
    }
}

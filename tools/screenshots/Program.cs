using System.Globalization;
using System.Text.Json;
using Avalonia.Headless;
using Beutl.Configuration;
using Beutl.Testing.Headless;

namespace Beutl.Docs.Screenshots;

internal static class Program
{
    public static async Task<int> Main(string[] args)
    {
        try
        {
            if (args.Length != 1)
                throw new ArgumentException("Expected a screenshot request JSON file.");
            var request = JsonSerializer.Deserialize<Request>(File.ReadAllText(args[0]),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                ?? throw new ArgumentException("Invalid screenshot request.");
            var culture = CultureInfo.GetCultureInfo(request.Culture);
            CultureInfo.CurrentCulture = CultureInfo.DefaultThreadCurrentCulture = culture;
            CultureInfo.CurrentUICulture = CultureInfo.DefaultThreadCurrentUICulture = culture;

            BeutlHomeIsolation.Begin("beutl-docs-screenshots");
            try
            {
                var config = GlobalConfiguration.Instance;
                config.ViewConfig.UICulture = culture;
                config.EditorConfig.FrameCacheMaxSize = 1024;
                config.TelemetryConfig.Beutl_Application = false;
                config.TelemetryConfig.Beutl_Logging = false;
                config.TelemetryConfig.Beutl_Api_Client = false;
                config.TelemetryConfig.Beutl_PackageManagement = false;

                // Dispatch may complete its task inline on the UI thread. Async disposal lets that
                // thread finish the dispatch before waiting for the session loop to stop.
                await using var session = HeadlessUnitTestSession.StartNew(typeof(ScreenshotApp),
                    AvaloniaTestIsolationLevel.PerAssembly);
                using var timeout = new CancellationTokenSource(TimeSpan.FromMinutes(2));
                await session.Dispatch(async () =>
                {
                    foreach (var capture in request.Captures)
                    {
                        Console.WriteLine($"Rendering {request.Culture}/{capture.Id}");
                        await Scenarios.Render(capture.Id, capture.Output);
                    }
                    ((ScreenshotApp)Avalonia.Application.Current!).Stop();
                    return 0;
                }, timeout.Token);
            }
            finally
            {
                BeutlHomeIsolation.End();
            }
            return 0;
        }
        catch (Exception exception)
        {
            Console.Error.WriteLine(exception);
            return 1;
        }
    }

    private sealed record Request(string Culture, Capture[] Captures);
    private sealed record Capture(string Id, string Output);
}

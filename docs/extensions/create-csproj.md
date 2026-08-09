---
title: Creating a C# Project for Extensions
description: Explanation of how to create an empty C# project for Beutl extensions.
sidebar_position: 2
---

This article explains how to create an empty C# project for Beutl extensions.

This guide introduces the methods using __Visual Studio Code__ or __Visual Studio__.
Beutl 2.0 ships an MSBuild SDK called `Beutl.Extensibility.Sdk` that wires up the target framework, language defaults, the standard package references (`Beutl.Extensibility`, `Beutl.ProjectSystem`, `Beutl.NodeGraph`, `Beutl.Editor`, `Beutl.Engine.SourceGenerators`), and the sideload output path. Using it keeps the csproj small.

:::tip
Pick the SDK version that matches the Beutl release you target. The SDK and the Beutl runtime packages are versioned together (for example, `2.0.0-preview.7`). You can override the resolved package versions with the `BeutlPackagesVersion` property if you need a different combination.
:::

## Visual Studio Code
1. Use the terminal to create a class library.
```sh
dotnet new classlib -o MyBeutlExtension
```

Ensure the directory structure is as follows:
```
MyBeutlExtension
┣━ obj
┃  ┗━ (...)
┣━ Class1.cs
┗━ MyBeutlExtension.csproj
```

2. Run the following commands to generate `nuget.config` and add the package source. The Beutl SDK and runtime packages are distributed via the `nuget.beditor.net` feed.
```sh
dotnet new nugetconfig
dotnet nuget add source "https://nuget.beditor.net/v3/index.json" --name nuget.beditor.net
```

3. Edit the generated `MyBeutlExtension.csproj` as follows:
```xml
<Project Sdk="Beutl.Extensibility.Sdk/2.0.0-preview.7">
  <PropertyGroup>
    <PackageId>MyBeutlExtension</PackageId>
    <Title>Sample Extension</Title>
    <Description>Sample</Description>
    <PackageTags>sample</PackageTags>
    <Version>1.0.0</Version>
    <Authors>Author Name</Authors>
    <RepositoryUrl>url/to/repository</RepositoryUrl>

    <!-- During Debug builds, copy the output to ~/.beutl/sideloads/<AssemblyName>
         so Beutl can pick the assembly up as a sideload extension. -->
    <DebugApplication Condition="'$(Configuration)'=='Debug'">true</DebugApplication>
  </PropertyGroup>
</Project>
```

The SDK takes care of:

- Setting `TargetFramework` to `net10.0`, plus `ImplicitUsings` and `Nullable` to `enable`.
- Adding `PackageReference`s to `Beutl.Extensibility`, `Beutl.ProjectSystem`, `Beutl.NodeGraph`, `Beutl.Editor`, and the `Beutl.Engine.SourceGenerators` analyzer.
- Redirecting the output path to `~/.beutl/sideloads/<AssemblyName>` when `DebugApplication` is `true`.

This completes the creation of an empty C# project for extensions.

### Customizing references

Set any of these properties to `false` if you want to opt out of a specific auto-reference:

- `BeutlAutoReferenceAll`
- `BeutlAutoReferenceExtensibility`
- `BeutlAutoReferenceProjectSystem`
- `BeutlAutoReferenceNodeGraph`
- `BeutlAutoReferenceEditor`
- `BeutlAutoReferenceSourceGenerators`

## Visual Studio
1. Open Visual Studio and click __File > New > Project__.
![Create Visual Studio Project](_images/2.create-csproj/visual-studio/create-new-project.png)

2. Select Class Library and click Next.
![Select Class Library](_images/2.create-csproj/visual-studio/select-classlib.png)

3. Enter the project name and location, then click Next.
![Confirm Name and Location](_images/2.create-csproj/visual-studio/confirm-name-and-location.png)

4. Select `.NET 10.0` as the framework. (The `Beutl.Extensibility.Sdk` will override this anyway, but pick a framework that matches the Beutl release you target so IntelliSense is correct from the start.)

5. Click Create.

Ensure the directory structure is as follows:
```
MyBeutlExtension
┣━ MyBeutlExtension
┃  ┣━ obj
┃  ┃  ┗━ (...)
┃  ┣━ Class1.cs
┃  ┗━ MyBeutlExtension.csproj
┗━ MyBeutlExtension.sln
```

6. Run the following commands to generate `nuget.config` and add the package source.
```sh
dotnet new nugetconfig
dotnet nuget add source "https://nuget.beditor.net/v3/index.json" --name nuget.beditor.net
```

7. Edit the generated `MyBeutlExtension.csproj` as follows:
```xml
<Project Sdk="Beutl.Extensibility.Sdk/2.0.0-preview.7">
  <PropertyGroup>
    <PackageId>MyBeutlExtension</PackageId>
    <Title>Sample Extension</Title>
    <Description>Sample</Description>
    <PackageTags>sample</PackageTags>
    <Version>1.0.0</Version>
    <Authors>Author Name</Authors>
    <RepositoryUrl>url/to/repository</RepositoryUrl>

    <DebugApplication Condition="'$(Configuration)'=='Debug'">true</DebugApplication>
  </PropertyGroup>
</Project>
```

8. Click __Restore NuGet Packages__ to ensure that NuGet dependencies are restored correctly.
![Restore NuGet Packages](_images/2.create-csproj/visual-studio/restore-nuget-packages.png)

This completes the creation of an empty C# project for extensions.

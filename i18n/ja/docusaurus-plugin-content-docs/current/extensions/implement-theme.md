---
title: テーマを実装する
description: ThemeExtension で拡張機能から独自のテーマを提供します。
---

`ThemeExtension` を使うと、**「設定」→「表示」→「テーマ」** のテーマ選択に独自のテーマを追加できます。拡張機能は `ThemeDescriptor` でテーマを記述し、Beutl はアプリのベースバリアントを切り替えたうえで、そのリソースディクショナリを上に重ねて適用します。

Beutl 自身の既定のダークテーマもこの仕組みで書かれているため、拡張機能のテーマが機能面で劣ることはありません。組み込みテーマが定義するブラシはすべて差し替えられます。

## 1. 最小のテーマ拡張機能

```cs
using Avalonia.Styling;
using Beutl.Extensibility;

namespace MyExtension;

[Export]
public sealed class MyThemeExtension : ThemeExtension
{
    // 拡張機能の生存期間を通して 1 つのインスタンスを使います。レジストリは所有権をディスクリプタの
    // インスタンスで管理し、ホストはインスタンスが同じなら再適用をスキップするため、呼び出しごとに
    // 新しいレコードを返すと、再読み込みのたびに解除と適用が一巡してしまいます。
    private static readonly ThemeDescriptor s_descriptor = new(
        Id: "myextension.midnight",
        DisplayName: "Midnight",
        BaseVariant: ThemeVariant.Dark,
        ResourceUri: new Uri("avares://MyExtension/Themes/Midnight.axaml"));

    public override string Name => "MyTheme";

    public override string DisplayName => "Midnight";

    public override ThemeDescriptor GetThemeDescriptor() => s_descriptor;
}
```

ディスクリプタの登録は `ThemeExtension.Load`、解除は `Unload` が行うので、どちらもオーバーライドする必要はありません。テーマ選択は動的に更新されるため、実行中にインストールしたテーマも再起動なしで一覧に現れます。

## 2. ディスクリプタ

`ThemeDescriptor` は次のメンバを持つレコードです。

| メンバ | 意味 |
| --- | --- |
| `Id` | `settings.json` に保存される安定した識別子。リリース後に変更するとユーザーの選択が失われるため、変更しないでください。 |
| `DisplayName` | テーマ選択に表示される名前。 |
| `BaseVariant` | 土台にする `ThemeVariant`（`ThemeVariant.Light`、`ThemeVariant.Dark`、`FluentAvaloniaTheme.HighContrastTheme`）。 |
| `ResourceUri` | 省略可。ベースバリアントの上にマージする `ResourceDictionary`。 |
| `IsSystemFollowing` | 省略可。`true` にすると OS のライト／ダーク設定に追従します。 |
| `AccentColor` | 省略可。FluentAvalonia の `SystemAccentColor` 系の色を生成する元になります。`null` のときは OS のアクセントカラーが保たれます。 |

レジストリが `ArgumentException` で弾く条件が 2 つあります。

- **予約済みの ID。** 拡張機能は `light`・`dark`・`highcontrast`・`system` を登録できません。設定の正規化で書き換えられる値（`Dark` や `2` といった旧形式の別名、空文字列、前後に空白がある ID）も同様です。ID には拡張機能固有の接頭辞を付けてください。
- **`IsSystemFollowing` と `ResourceUri` の併用。** システム追従テーマでは OS が解決したバリアントをホストが適用するため、バリアントごとのリソースを扱えず、この組み合わせは拒否されます。

2 つの拡張機能が同じ ID を登録した場合は、あとから登録したほうが有効になります。登録解除は自分のディスクリプタしか取り除かないため、置き換えられた側の拡張機能がアンロードされても、あとから登録したテーマが巻き込まれて消えることはありません。

## 3. リソースディクショナリ

`ResourceUri` は、拡張機能アセンブリ内の `ResourceDictionary` を指します。ベースバリアントの **あとに** マージされるので、上書きしたいキーだけを書けば十分です。

```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="SolidBackgroundFillColorBaseBrush" Color="#0B1020" />
    <SolidColorBrush x:Key="TextFillColorPrimaryBrush" Color="#E6EAF2" />
</ResourceDictionary>
```

ディクショナリは自己完結させてください。参照する `StaticResource` は、そのディクショナリ自身が定義しているキーにします。

ディクショナリの読み込みに失敗した場合、Beutl は警告をログに出したうえで、そのとき適用されているテーマを維持します。起動時などで適用済みのテーマがまだない場合は、組み込みのダークテーマにフォールバックするため、テーマが未適用の状態でアプリが表示されることはありません。

## 4. 適用・解除に反応する

リソースの差し替えだけでは足りない副作用（グラデーションの再生成、独自描画部分の色の更新など）が必要なときは、コールバックをオーバーライドします。

```cs
public override void OnApplied(ThemeApplyContext context)
{
    // context.Descriptor はこのテーマ、context.Accent はホストが解決したアクセントカラーです。
}

public override void OnAccentChanged(ThemeApplyContext context)
{
    // テーマが有効なままアクセントカラーが変わったときに呼ばれます。
}

public override void OnReverted()
{
    // 別のテーマが有効になったときに呼ばれます。
}
```

`ThemeApplyContext.Accent` は、ユーザーがアクセントカラーを設定していればその色、していなければディスクリプタの `AccentColor` です。`null` は OS のアクセントカラーを意味します。この場合ホストは色を解決しないので、FluentAvalonia が確定させた値はアプリケーションリソースの `SystemAccentColor` から読み取ってください。

これらのコールバックが例外を投げても、捕捉されてログに記録されるだけで、テーマの切り替え自体は中断されません。

## Beutl ソースの参考ファイル

| ファイル | 学べること |
| --- | --- |
| `src/Beutl/Services/PrimitiveImpls/DarkBorderThemeExtension.cs` | `ThemeExtension` として実装された、ファーストパーティのダークテーマ。 |
| `src/Beutl.Extensibility/ThemeDescriptor.cs` | ディスクリプタのレコード定義。 |
| `src/Beutl.Extensibility/ThemeRegistry.cs` | 登録のルール、所有権の扱い、`Changed` イベント。 |
| `src/Beutl/Services/ThemeService.cs` | ホストがテーマを解決・適用・解除する流れ。 |

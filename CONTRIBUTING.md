# beutl-docs への貢献についてのガイドライン

## マークダウン

### ファイル名 / ディレクトリ名

- `/{locale}/**/*.md` にマッチするファイルがドキュメントとして使用されます。

- パスに`_`アンダーバーから始まるセグメントがある場合、それ以下のファイルは目次に表示されません。

- `*.md` ファイルが `1.document.md` のように数字から始まる場合、その数字と直後のドットを無視します。

例
```
GitHub: /ja/get-started/1.install.md
Beutl Docs: /get-started/install

GitHub: /ja/_noindex/abcdefg.md
Beutl Docs: /_noindex/abcdefg
URLから直接アクセスできるがサイドメニューには表示されない。
通常、画像ファイルなどを置く

GitHub: /ja/get-started/README.md
Beutl Docs: /get-started
```

### Frontmatter
Frontmatterには以下の値を指定できます。

- title: タイトル
- description: 説明
- type: `auto`, `ignore`

#### typeにautoを指定した場合
以下のようなマークダウンを生成します。
```md
## タイトル

説明

&lt;!-- 以下はREADME.mdの場合 --&gt;
- [Article 1](1.article-1.md)
- [Article 2](2.article-2.md)
- [Article 3](3.article-3.md)
- [Article 3](4.article-4.md)

```

#### typeにignoreを指定した場合

パスに`_`から始まるセグメントを含める方法とは違って、URLからもアクセスできないようにします。

### GitHub Flavored Markdown (GFM)

テーブル、自動リンクなどの機能を利用できます。

詳しくは[こちら](https://mdxjs.com/guides/gfm/)をご覧ください。

### アラート

以下のようなアラートを表示できます

```md
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

https://github.com/myl7/remark-github-beta-blockquote-admonitions


# Beutl Documentation

Documentation site for [Beutl](https://beutl.beditor.net), built with [Docusaurus](https://docusaurus.io) v3 and deployed to Cloudflare Workers (Static Assets).

- Default locale: English (`/`)
- Additional locale: Japanese (`/ja`)

## Layout

```
docs/                                              # English content (default locale)
i18n/ja/docusaurus-plugin-content-docs/current/    # Japanese content
i18n/ja/docusaurus-theme-classic/                  # Localized footer/navbar strings
src/css/custom.css                                 # Brand color overrides
static/img/                                        # Logos, favicon
scripts/migrate-content.mjs                        # One-shot migration from ../beutl-docs
redirects.generated.json                           # Output of migration; consumed by docusaurus.config.ts
wrangler.toml                                      # Cloudflare Workers Static Assets
.github/workflows/deploy.yml                       # Build + deploy on push to main
```

## Development

```bash
pnpm install
pnpm start              # English at http://localhost:3000
pnpm start --locale ja  # Japanese at http://localhost:3000
```

## Build & local Workers preview

```bash
pnpm run build
pnpm exec wrangler dev  # http://localhost:8787
```

## Deployment

GitHub Actions runs `pnpm install`, `pnpm run build`, then `wrangler deploy` on every push to `main`. Required repository secrets:

- `CLOUDFLARE_API_TOKEN` — minimum scope: `Account.Workers Scripts: Edit`
- `CLOUDFLARE_ACCOUNT_ID`

## Content migration

The initial content was migrated from [b-editor/beutl-docs](https://github.com/b-editor/beutl-docs) using `scripts/migrate-content.mjs`. The script:

- Strips the leading `1.` numeric prefix from filenames and writes `sidebar_position` to frontmatter
- Converts GFM admonitions (`> [!NOTE]`) to Docusaurus admonitions (`:::note`)
- Generates `_category_.json` from each section's `README.md`
- Resolves `type: ignore` stub files into client-side redirects
- Promotes `![](*.mp4)` references to inline `<video>` tags

The migration is idempotent and can be re-run if the upstream `../beutl-docs` repo is updated:

```bash
node scripts/migrate-content.mjs --src ../beutl-docs
```

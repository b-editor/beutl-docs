import { themes as prismThemes } from 'prism-react-renderer';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const require = createRequire(import.meta.url);

const generatedRedirects: { from: string; to: string }[] = (() => {
  try {
    return JSON.parse(
      readFileSync(path.resolve('./redirects.generated.json'), 'utf8'),
    );
  } catch {
    return [];
  }
})();

const config: Config = {
  title: 'Beutl Documentation',
  tagline: 'Documentation for the Beutl video editor',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.beutl.beditor.net',
  baseUrl: '/',

  organizationName: 'b-editor',
  projectName: 'beutl-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap',
      rel: 'stylesheet',
    },
  ],
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/b-editor/beutl-docs/edit/main/',
          editLocalizedFiles: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.0.0-preview',
            },
            '1': {
              label: '1.x',
              path: '1',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'ja'],
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: generatedRedirects,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Beutl',
      logo: {
        alt: 'Beutl',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/b-editor/beutl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Project',
          items: [
            { label: 'Beutl', href: 'https://beutl.beditor.net' },
            { label: 'GitHub', href: 'https://github.com/b-editor/beutl' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/Bm3pnVc928' },
            { label: 'X', href: 'https://x.com/yuto_daisensei' },
          ],
        },
        {
          title: 'Docs',
          items: [
            { label: 'Edit on GitHub', href: 'https://github.com/b-editor/beutl-docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} b-editor.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'bash', 'json', 'yaml', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

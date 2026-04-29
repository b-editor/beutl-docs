#!/usr/bin/env node
// One-shot migration: ../beutl-docs (ja/, en/) -> Docusaurus layout.
// Idempotent: cleans destination dirs before writing.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = parseArgs(process.argv.slice(2));
const SRC = path.resolve(ROOT, args.src ?? '../beutl-docs');

const DEST_EN = path.join(ROOT, 'docs');
const DEST_JA = path.join(ROOT, 'i18n', 'ja', 'docusaurus-plugin-content-docs', 'current');

const SECTION_POSITIONS = {
  'get-started': 1,
  advanced: 2,
  extensions: 3,
  settings: 4,
};

const SECTION_TITLES = {
  en: {
    'get-started': 'Getting Started',
    advanced: 'Advanced',
    extensions: 'Extension Development',
    settings: 'Settings',
  },
  ja: {
    'get-started': 'はじめに',
    advanced: 'アドバンスド',
    extensions: '拡張機能開発',
    settings: '設定',
  },
};

const ADMONITION_MAP = {
  NOTE: 'note',
  TIP: 'tip',
  WARNING: 'warning',
  IMPORTANT: 'info',
  CAUTION: 'danger',
};

const NUMBERED_FILE_RE = /^(\d+)\.(.+)\.md$/;
const STATS = { copied: 0, redirects: 0, categories: 0, warnings: 0 };
const REDIRECTS = [];
// Per-locale collision tracking (translations of the same doc reuse the same URL).
const URL_OWNERS = { en: new Map(), ja: new Map() };

await rmrf(DEST_EN);
await rmrf(DEST_JA);
await fs.mkdir(DEST_EN, { recursive: true });
await fs.mkdir(DEST_JA, { recursive: true });

// Locale URL prefix is intentionally '' for both locales. Docusaurus' client-
// redirects plugin applies the locale prefix to both `from` and `to` at build
// time, so we store routes locale-agnostic.
await processLocale('en', DEST_EN, '');
await processLocale('ja', DEST_JA, '');

// Root landing pages so that "/" resolves to a doc (required when routeBasePath: '/').
await fs.writeFile(path.join(DEST_EN, 'index.mdx'), buildLandingMd('en'));
await fs.writeFile(path.join(DEST_JA, 'index.mdx'), buildLandingMd('ja'));

await fs.writeFile(
  path.join(ROOT, 'redirects.generated.json'),
  JSON.stringify(REDIRECTS, null, 2) + '\n',
);

console.log('\n=== Migration summary ===');
console.log(`copied md/asset files : ${STATS.copied}`);
console.log(`category metadata     : ${STATS.categories}`);
console.log(`redirects (type:ignore): ${STATS.redirects}`);
console.log(`warnings              : ${STATS.warnings}`);
console.log(`output: ${DEST_EN}, ${DEST_JA}`);

await assertSymmetry();

async function processLocale(locale, destRoot, localeUrlPrefix) {
  const srcRoot = path.join(SRC, locale);
  await walk(srcRoot, srcRoot, destRoot, localeUrlPrefix, locale);
}

async function walk(rootSrc, dirSrc, destBase, localeUrlPrefix, locale) {
  const entries = await fs.readdir(dirSrc, { withFileTypes: true });
  const relDir = path.relative(rootSrc, dirSrc);
  const isImagesDir = path.basename(dirSrc) === '_images';

  if (relDir !== '') {
    await fs.mkdir(path.join(destBase, relDir), { recursive: true });
  }

  for (const ent of entries) {
    const srcPath = path.join(dirSrc, ent.name);
    if (ent.isDirectory()) {
      await walk(rootSrc, srcPath, destBase, localeUrlPrefix, locale);
      continue;
    }
    if (!ent.isFile()) continue;

    if (isImagesDir) {
      const destPath = path.join(destBase, relDir, ent.name);
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
      STATS.copied++;
      continue;
    }

    if (!ent.name.endsWith('.md')) {
      const destPath = path.join(destBase, relDir, ent.name);
      await fs.copyFile(srcPath, destPath);
      STATS.copied++;
      continue;
    }

    await handleMarkdown({
      srcPath,
      relDir,
      filename: ent.name,
      destBase,
      localeUrlPrefix,
      locale,
    });
  }
}

async function handleMarkdown({ srcPath, relDir, filename, destBase, localeUrlPrefix, locale }) {
  const raw = await fs.readFile(srcPath, 'utf8');
  const parsed = matter(raw);
  const fm = { ...parsed.data };
  const body = parsed.content;

  if (fm.type === 'ignore') {
    const sourceUrl = mdFileToUrl(relDir, filename, localeUrlPrefix);
    const target = extractFirstLink(body);
    let targetUrl;
    if (target) targetUrl = resolveLinkToUrl(target, relDir, localeUrlPrefix);
    if (sourceUrl && targetUrl) {
      REDIRECTS.push({ from: sourceUrl, to: targetUrl });
      STATS.redirects++;
    } else {
      console.warn(`[warn] type:ignore could not resolve redirect: ${srcPath}`);
      STATS.warnings++;
    }
    return;
  }

  if (filename === 'README.md') {
    const categoryName = path.basename(relDir);
    const fallbackTitle = SECTION_TITLES[locale]?.[categoryName] ?? toTitleCase(categoryName);
    const label = fm.title ?? fallbackTitle;
    const position = SECTION_POSITIONS[categoryName];
    const category = {
      label,
      position,
      link: { type: 'generated-index', slug: `/${categoryName}` },
    };
    if (fm.description) category.link.description = fm.description;
    await fs.writeFile(
      path.join(destBase, relDir, '_category_.json'),
      JSON.stringify(category, null, 2) + '\n',
    );
    STATS.categories++;
    return;
  }

  const numbered = NUMBERED_FILE_RE.exec(filename);
  let outName = filename;
  if (numbered) {
    outName = `${numbered[2]}.md`;
    if (fm.sidebar_position == null) fm.sidebar_position = Number(numbered[1]);
  }

  const transformed = transformBody(body);

  const url = mdFileToUrl(relDir, outName, localeUrlPrefix);
  const owners = URL_OWNERS[locale];
  if (owners.has(url)) {
    throw new Error(
      `URL collision after number-prefix removal (${locale}): ${url}\n  ${owners.get(url)}\n  ${srcPath}`,
    );
  }
  owners.set(url, srcPath);

  const out = matter.stringify(transformed, fm);
  await fs.writeFile(path.join(destBase, relDir, outName), out);
  STATS.copied++;
}

function transformBody(body) {
  const lines = body.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*$/.exec(lines[i]);
    if (m) {
      const kind = ADMONITION_MAP[m[1]];
      out.push(`:::${kind}`);
      i++;
      while (i < lines.length && /^>\s?(.*)$/.test(lines[i])) {
        out.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(':::');
      i--;
      continue;
    }
    out.push(lines[i]);
  }
  let text = out.join('\n');
  // Promote ![](path.mp4|webm|mov) to <video> so MDX doesn't try to size it as an image.
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+\.(?:mp4|webm|mov))(?:\s+"[^"]*")?\)/gi,
    (_full, alt, src) => {
      const safeAlt = alt.replace(/"/g, '&quot;');
      return `<video controls muted playsInline title="${safeAlt}" src="${src}" />`;
    },
  );
  // Strip leading number prefix on cross-link basenames; never touch images.
  text = text.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (full, bang, alt, url) => {
    if (bang === '!') return full;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('#') || url.startsWith('//')) return full;
    const rewritten = stripNumericPrefixOnLastSegment(url);
    return `[${alt}](${rewritten})`;
  });
  return text;
}

function stripNumericPrefixOnLastSegment(url) {
  const hashIdx = url.indexOf('#');
  const rawHash = hashIdx >= 0 ? url.slice(hashIdx) : '';
  // Docusaurus slugifies headings to lowercase, so rewrite anchor case for .md links.
  const hash = rawHash && url.includes('.md') ? rawHash.toLowerCase() : rawHash;
  const noHash = hashIdx >= 0 ? url.slice(0, hashIdx) : url;
  const segs = noHash.split('/');
  const last = segs[segs.length - 1];
  const m = NUMBERED_FILE_RE.exec(last);
  if (m) {
    segs[segs.length - 1] = `${m[2]}.md`;
    return segs.join('/') + hash;
  }
  return noHash + hash;
}

function extractFirstLink(body) {
  const m = body.match(/\[[^\]]+\]\(([^)]+)\)/);
  return m ? m[1] : null;
}

function resolveLinkToUrl(linkTarget, fromRelDir, localeUrlPrefix) {
  let segments = (fromRelDir ? fromRelDir.split('/') : []).filter(Boolean);
  let target = linkTarget.split('#')[0];
  const hash = linkTarget.includes('#') ? '#' + linkTarget.split('#').slice(1).join('#') : '';
  if (target.startsWith('./')) target = target.slice(2);
  while (target.startsWith('../')) {
    segments.pop();
    target = target.slice(3);
  }
  const targetSegs = target.split('/').filter(Boolean);
  const all = [...segments, ...targetSegs];
  const last = all[all.length - 1];
  if (last && last.endsWith('.md')) {
    const base = last.slice(0, -3);
    const m = /^(\d+)\.(.+)$/.exec(base);
    all[all.length - 1] = m ? m[2] : base;
  }
  return `${localeUrlPrefix}/${all.join('/')}${hash}`;
}

function mdFileToUrl(relDir, filename, localeUrlPrefix) {
  let base = filename.endsWith('.md') ? filename.slice(0, -3) : filename;
  const m = NUMBERED_FILE_RE.exec(filename);
  if (m) base = m[2];
  const segs = (relDir ? relDir.split('/') : []).filter(Boolean);
  segs.push(base);
  return `${localeUrlPrefix}/${segs.join('/')}`;
}

async function assertSymmetry() {
  const enFiles = await collectMdRoutes(DEST_EN);
  const jaFiles = await collectMdRoutes(DEST_JA);
  const onlyEn = [...enFiles].filter((p) => !jaFiles.has(p)).sort();
  const onlyJa = [...jaFiles].filter((p) => !enFiles.has(p)).sort();
  if (onlyEn.length || onlyJa.length) {
    console.log('\n[symmetry] difference between en and ja:');
    onlyEn.forEach((p) => console.log(`  only en: ${p}`));
    onlyJa.forEach((p) => console.log(`  only ja: ${p}`));
  } else {
    console.log('\n[symmetry] en and ja have matching routes.');
  }
}

async function collectMdRoutes(dir) {
  const out = new Set();
  async function rec(d, prefix) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        if (ent.name === '_images') continue;
        await rec(path.join(d, ent.name), `${prefix}${ent.name}/`);
      } else if (ent.isFile() && ent.name.endsWith('.md')) {
        out.add(`${prefix}${ent.name}`);
      }
    }
  }
  await rec(dir, '');
  return out;
}

async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
      out[k] = v;
    }
  }
  return out;
}

function toTitleCase(slug) {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildLandingMd(locale) {
  if (locale === 'ja') {
    return `---
title: Beutl ドキュメント
description: 動画編集ソフト Beutl の公式ドキュメント
slug: /
sidebar_position: 0
sidebar_label: ホーム
hide_table_of_contents: true
hide_title: true
pagination_next: null
pagination_prev: null
---

import HomePage from '@site/src/components/HomePage';

<HomePage locale="ja" />
`;
  }
  return `---
title: Beutl Documentation
description: Official documentation for the Beutl video editor
slug: /
sidebar_position: 0
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
pagination_next: null
pagination_prev: null
---

import HomePage from '@site/src/components/HomePage';

<HomePage locale="en" />
`;
}

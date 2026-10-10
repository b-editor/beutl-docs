import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  useDocsSidebar,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

const GITHUB_HREF = 'https://github.com/b-editor/beutl';
const INSTALL_DOC_ID = 'get-started/install';

type Copy = {
  title: string;
  version: (label: string) => string;
  pageCount: (count: number) => string;
};

const COPY: Record<'en' | 'ja', Copy> = {
  en: {
    title: 'Beutl Documentation',
    version: (label) => `Version ${label}`,
    pageCount: (count) => (count === 1 ? '1 page' : `${count} pages`),
  },
  ja: {
    title: 'Beutl ドキュメント',
    version: (label) => `バージョン ${label}`,
    pageCount: (count) => `${count} ページ`,
  },
};

/** These sections are read in order, so their pages are numbered. */
const ORDERED_SECTIONS = new Set(['get-started']);

type NavItem = PropSidebarItemLink | PropSidebarItemCategory;

function isNavItem(item: PropSidebarItem): item is NavItem {
  if (item.type === 'link') return !item.unlisted;
  return item.type === 'category';
}

/** The last segment of the category's path, e.g. "get-started". */
function sectionKey(category: PropSidebarItemCategory): string | undefined {
  return category.href?.replace(/\/$/, '').split('/').pop();
}

function itemHref(item: NavItem): string | undefined {
  return item.type === 'link' ? item.href : (item.href ?? findFirstSidebarItemLink(item));
}

function countPages(category: PropSidebarItemCategory): number {
  return category.items.reduce((count, item) => {
    if (item.type === 'category') return count + countPages(item) + (item.href ? 1 : 0);
    return item.type === 'link' && !item.unlisted ? count + 1 : count;
  }, 0);
}

function findDocLink(items: PropSidebarItem[], docId: string): PropSidebarItemLink | undefined {
  for (const item of items) {
    if (item.type === 'link' && item.docId === docId) return item;
    if (item.type === 'category') {
      const found = findDocLink(item.items, docId);
      if (found) return found;
    }
  }
  return undefined;
}

function GithubIcon(): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-5-2" />
    </svg>
  );
}

function Section({
  category,
  t,
}: {
  category: PropSidebarItemCategory;
  t: Copy;
}): ReactNode {
  const key = sectionKey(category);
  const ordered = key !== undefined && ORDERED_SECTIONS.has(key);
  const items = category.items.filter(isNavItem);
  const List = ordered ? 'ol' : 'ul';

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{category.label}</h2>
      <List className={styles.pages}>
        {items.map((item, index) => {
          const href = itemHref(item);
          if (!href) return null;
          return (
            <li key={href} className={styles.pageItem}>
              <Link to={href} className={styles.page}>
                {ordered ? (
                  <span className={styles.pageIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ) : null}
                <span className={styles.pageLabel}>{item.label}</span>
                {item.type === 'category' ? (
                  <span className={styles.pageCount}>{t.pageCount(countPages(item))}</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </List>
    </section>
  );
}

type Props = {
  locale?: 'en' | 'ja';
};

export default function HomePage({ locale = 'en' }: Props): ReactNode {
  const t = COPY[locale];
  const version = useDocsVersion();
  const sidebarItems = useDocsSidebar()?.items ?? [];

  const categories = sidebarItems.filter(
    (item): item is PropSidebarItemCategory => item.type === 'category',
  );
  const installLink = findDocLink(sidebarItems, INSTALL_DOC_ID);

  return (
    <div className={`${styles.home} home-hero-root`}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>{t.version(version.label)}</span>
        <h1 className={styles.title}>{t.title}</h1>
        <div className={styles.ctaRow}>
          {installLink ? (
            <Link to={installLink.href} className={`${styles.button} ${styles.buttonPrimary}`}>
              {installLink.label}
            </Link>
          ) : null}
          <Link to={GITHUB_HREF} className={`${styles.button} ${styles.buttonGhost}`}>
            <GithubIcon />
            GitHub
          </Link>
        </div>
      </header>

      <div className={styles.sections}>
        {categories.map((category) => (
          <Section key={category.label} category={category} t={t} />
        ))}
      </div>
    </div>
  );
}

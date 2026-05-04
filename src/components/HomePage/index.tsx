import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type Card = {
  title: string;
  description: string;
  to: string;
  badge: string;
};

const EN_CARDS: Card[] = [
  {
    title: 'Getting Started',
    description: 'Install Beutl, create your first project, and learn the basic editing flow.',
    to: '/get-started',
    badge: '01',
  },
  {
    title: 'Advanced',
    description: 'Rendering pipeline, filter effects, and supported types.',
    to: '/advanced',
    badge: '02',
  },
  {
    title: 'Extension Development',
    description: 'Build your own Beutl extensions and publish them to the store.',
    to: '/extensions',
    badge: '03',
  },
  {
    title: 'Settings',
    description: 'Configure the editor, display, fonts, and extension preferences.',
    to: '/settings',
    badge: '04',
  },
];

const JA_CARDS: Card[] = [
  {
    title: 'はじめに',
    description: 'インストールから最初のプロジェクト作成まで、基本的な操作を学べます。',
    to: '/ja/get-started',
    badge: '01',
  },
  {
    title: 'アドバンスド',
    description: 'レンダリングパイプライン、フィルターエフェクトを解説します。',
    to: '/ja/advanced',
    badge: '02',
  },
  {
    title: '拡張機能開発',
    description: 'Beutl の拡張機能を自作し、ストアに公開する方法を紹介します。',
    to: '/ja/extensions',
    badge: '03',
  },
  {
    title: '設定',
    description: 'エディター、表示、フォント、拡張機能などの設定項目をまとめています。',
    to: '/ja/settings',
    badge: '04',
  },
];

type Props = {
  locale?: 'en' | 'ja';
};

export default function HomePage({ locale = 'en' }: Props): ReactNode {
  const cards = locale === 'ja' ? JA_CARDS : EN_CARDS;
  const isJa = locale === 'ja';

  return (
    <div className={`${styles.home} home-hero-root`}>
      <div className={styles.mesh} aria-hidden>
        <span className={`${styles.blob} ${styles.blob1}`} />
        <span className={`${styles.blob} ${styles.blob2}`} />
        <span className={`${styles.blob} ${styles.blob3}`} />
      </div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            {isJa ? '公式ドキュメント' : 'Official Documentation'}
          </span>
          <h1 className={styles.title}>
            {isJa ? (
              <>
                Beutl で映像を、
                <br />
                自由に組み立てよう。
              </>
            ) : (
              <>
                Build motion graphics with Beutl.
              </>
            )}
          </h1>
          <p className={styles.subtitle}>
            {isJa
              ? '無料・オープンソースの映像制作ソフト Beutl の、使い方・拡張・設定をひとまとめに。'
              : 'A free, open-source motion graphics editor. Learn the workflow, extend it, and tune every detail.'}
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.ctaPrimary} to={isJa ? '/ja/get-started/install' : '/get-started/install'}>
              {isJa ? 'インストール手順を見る' : 'Install Beutl'}
              <span className={styles.ctaArrow} aria-hidden>→</span>
            </Link>
            <Link
              className={styles.ctaSecondary}
              to="https://github.com/b-editor/beutl"
            >
              <Translate id="home.github" description="GitHub link on homepage">
                GitHub
              </Translate>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <Link key={card.to} to={card.to} className={styles.card}>
              <span className={styles.cardBadge}>{card.badge}</span>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDescription}>{card.description}</p>
              <span className={styles.cardArrow} aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

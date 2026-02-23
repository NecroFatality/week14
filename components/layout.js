import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const name = 'Santiago\'s Kitchen';
export const siteTitle = 'Santiago\'s Kitchen | Family Cookbook';

export default function Layout({ children, home }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Discover delicious recipes for breakfast, lunch, and dinner"
        />
        <meta property="og:image" content="/images/desserts.png" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.themeToggle}>
        <span className={styles.themeIcon}>☀️</span>
        <button
          className={`${styles.toggleSwitch} ${darkMode ? styles.active : ''}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <span className={styles.toggleSlider}></span>
        </button>
        <span className={styles.themeIcon}>🌙</span>
      </div>
      
      <header className={styles.header}>
        {home ? (
          <>
            <div className={styles.logoContainer}>
              <Image
                priority
                src="/images/desserts.png"
                className={styles.logo}
                height={120}
                width={120}
                alt="Recipe logo"
              />
            </div>
            <h1 className={styles.siteTitle}>{name}</h1>
            <p className={styles.tagline}>Our family cookbook, passed down with love</p>
          </>
        ) : (
          <>
            <Link href="/" className={styles.headerLink}>
              <Image
                priority
                src="/images/desserts.png"
                className={styles.logoSmall}
                height={60}
                width={60}
                alt="Recipe logo"
              />
              <span className={styles.siteTitleSmall}>{name}</span>
            </Link>
          </>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        {!home && (
          <Link href="/" className={styles.backLink}>
            ← Back to all recipes
          </Link>
        )}
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {name}. All recipes made with ❤️
        </p>
      </footer>
    </div>
  );
}

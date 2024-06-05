import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Accueil</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">À propos</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/signup">Inscription</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/signin">Connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

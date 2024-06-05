"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/home/Navbar";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/library");
  };

  const handleLearnMore = () => {
    router.push("/about");
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <header className={styles.header}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>Bienvenue à Lite-Library</h1>
          <p>Votre solution moderne pour la bibliothèque. Stockez, gérez et partagez vos fichiers en toute sécurité.</p>
          <div className={styles.actions}>
            <button onClick={handleSignUp} className={styles.button}>bibliothèque</button>
            <button onClick={handleLearnMore} className={styles.button}>En savoir plus</button>
          </div>
        </div>
      </header>
    </main>
  );
}

"use client";

import Navbar from "../../components/home/Navbar";
import styles from "./about.module.css";

export default function About() {
    return (
        <main className={styles.main}>
            <Navbar />
            <section className={styles.content}>
                <div className={styles.card}>
                    <h2>À propos de Lite-Library</h2>
                    <p>Lite-Library est votre solution moderne pour la gestion de bibliothèque universitaire. Notre mission est de faciliter le stockage, la gestion et le partage de vos fichiers de manière sécurisée et efficace.</p>
                </div>
                <div className={styles.card}>
                    <h2>Notre Mission</h2>
                    <p>Nous visons à fournir une plateforme intuitive et sécurisée pour gérer vos ressources académiques. Avec Lite-Library, accédez facilement à vos documents et partagez-les avec vos collègues et étudiants.</p>
                </div>
                <div className={styles.card}>
                    <h2>Notre Équipe</h2>
                    <p>Notre équipe est composée de développeurs passionnés, de bibliothécaires expérimentés et de spécialistes de l'éducation, tous dédiés à améliorer votre expérience de gestion de bibliothèque.</p>
                    <img src="/images/team.jpg" alt="Équipe Lite-Library" className={styles.teamImage} />
                </div>
                <div className={styles.card}>
                    <h2>Contactez-nous</h2>
                    <p>Pour toute question ou demande d'information, n'hésitez pas à nous contacter à l'adresse suivante : <a className={styles.link} href="mailto:contact@lite-library.com">contact@lite-library.com</a>.</p>
                </div>
            </section>
        </main>
    );
}

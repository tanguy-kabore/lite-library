import React from "react"; // Importe la bibliothèque React
import styles from "./StorageUsage.module.css"; // Importe les styles CSS spécifiques à ce composant

const StorageUsage = ({ storageUsed, storageLimit }) => {
    // Calcule le pourcentage d'espace de stockage utilisé par rapport à la limite
    const percentageUsed = (storageUsed / storageLimit) * 100;

    // Renvoie le composant d'affichage de l'utilisation de stockage
    return (
        <div className={styles.storageUsageContainer}> {/* Conteneur principal */}
            <p>Stockage utilisé: {storageUsed.toFixed(2)} MB / {storageLimit} MB</p> {/* Affiche l'espace utilisé et la limite */}
            <div className={styles.storageBar}> {/* Barre de progression */}
                <div
                    className={styles.storageUsed} // Classe CSS pour la partie remplie de la barre
                    style={{ width: `${percentageUsed}%` }} // Définit la largeur en fonction du pourcentage utilisé
                />
            </div>
        </div>
    );
};

export default StorageUsage; // Exporte le composant StorageUsage pour une utilisation ailleurs

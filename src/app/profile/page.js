"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/dashboard/Navbar";
import { useRouter } from "next/navigation"; // Utilisez `next/navigation` au lieu de `next/router`
import { auth, storage } from "../../firebase/config"; // Importez la configuration Firebase
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./Profile.module.css"; // Créez ce fichier CSS pour styliser le formulaire

const Profile = () => {
    const router = useRouter();
    const user = auth.currentUser;

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [photoFile, setPhotoFile] = useState(null);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user) {
            router.push("/signin");
        }
    }, [user, router]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            let updatedPhotoURL = photoURL;

            if (photoFile) {
                const storageRef = ref(storage, `profilePictures/${user.uid}`);
                console.log("Uploading file to:", storageRef);
                const snapshot = await uploadBytes(storageRef, photoFile);
                console.log("File uploaded:", snapshot);
                updatedPhotoURL = await getDownloadURL(snapshot.ref);
                console.log("Download URL:", updatedPhotoURL);
            }

            await updateProfile(user, { displayName, photoURL: updatedPhotoURL });
            console.log("Profile updated");
            router.push("/dashboard");
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(`Error updating profile: ${err.message}`);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
            setPhotoURL(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    return (
        // Conteneur principal de la page de profil
        <div>
            {/* Barre de navigation, avec l'utilisateur et le routeur passés en props */}
            <Navbar user={user} router={router} />

            {/* Conteneur du profil avec des styles appliqués */}
            <div className={styles.profileDiv}>
                <div className={styles.profileContainer}>
                    {/* Titre de la section du profil */}
                    <h2 className={styles.profileTitle}>Profil</h2>

                    {/* Formulaire de mise à jour du profil */}
                    <form onSubmit={handleUpdateProfile} className={styles.form}>

                        {/* Conteneur de la photo de profil */}
                        <div className={styles.photoContainer}>
                            {/* Image de profil, affiche une image par défaut si aucune photoURL n'est disponible */}
                            <img
                                src={photoURL || "/images/profil.jpg"}
                                alt="Profile"
                                className={styles.profileImage}
                                onClick={handlePhotoClick} // Gestionnaire de clic sur l'image de profil
                            />
                            {/* Champ de téléchargement de fichier caché */}
                            <input
                                type="file"
                                onChange={handleFileChange} // Gestionnaire de changement de fichier
                                ref={fileInputRef} // Référence pour accéder à cet input via un ref React
                                style={{ display: "none" }} // Cache l'input de fichier
                            />
                        </div>

                        {/* Champ pour modifier le nom d'affichage */}
                        <label className={styles.formLabel}>
                            Nom utilisateur:
                            <input
                                type="text"
                                value={displayName} // Valeur contrôlée par l'état displayName
                                onChange={(e) => setDisplayName(e.target.value)} // Met à jour l'état displayName
                                required
                                className={styles.formInput}
                            />
                        </label>

                        {/* Affichage des erreurs éventuelles */}
                        {error && <p className={styles.error}>{error}</p>}

                        {/* Bouton pour soumettre le formulaire de mise à jour du profil */}
                        <button type="submit" className={styles.formButton}>Mettre à jour le Profil</button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default Profile;

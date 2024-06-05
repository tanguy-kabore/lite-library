// src/components/dashboard/Navbar.js
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import styles from "./Navbar.module.css"; // Importez le fichier de style

const Navbar = ({ user, router }) => {
    const auth = getAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/signin");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className={styles.navbar}> {/* Appliquez la classe de style */}
            {user ? (
                <>
                    <div className={styles.user}>{user.displayName}</div> {/* Appliquez la classe de style */}
                    <Link href="/profile" className={styles.link}>Profil</Link> {/* Appliquez la classe de style */}
                    <button onClick={handleSignOut} className={styles.button}>Déconnexion</button> {/* Appliquez la classe de style */}
                </>
            ) : (
                <Link href="/signin" className={styles.link}>Connexion</Link>
            )}
        </nav>
    );
};

export default Navbar;
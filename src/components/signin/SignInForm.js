// src/components/SignInForm.js
"use client"; // Indique que ce composant est destiné au côté client

// Importation des fonctions nécessaires de Firebase pour l'authentification
import { signInWithEmailAndPassword } from "firebase/auth";
// Importation de useRouter de next/navigation pour la navigation
import { useRouter } from "next/navigation";
// Importation de useState pour gérer l'état local du composant
import { useState } from "react";
// Importation des configurations Firebase et des fournisseurs d'authentification
import { auth } from "../../firebase/config";
// Importation des styles CSS pour ce composant
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  // États locaux pour stocker l'email, le mot de passe et les erreurs potentielles
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Utilisation du hook useRouter pour la navigation
  const router = useRouter();

  // Fonction de gestion de la soumission du formulaire de connexion par email et mot de passe
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Tentative de connexion avec Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redirection vers le tableau de bord après une connexion réussie
      router.push("/dashboard");
    } catch (err) {
      // Gestion des erreurs en cas de problème lors de la connexion
      setError(err.message);
    }
  };

  return (
    // Formulaire de connexion
    <form onSubmit={handleSignIn} className={styles.form}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* Affichage d'un message d'erreur si une erreur est présente */}
      {error && <p className={styles.error}>{error}</p>}
      {/* Bouton de soumission du formulaire de connexion */}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default SignInForm;

// src/app/signin/page.js
"use client";

import Navbar from "../../components/home/Navbar";
import SignInForm from "../../components/signin/SignInForm";
import styles from "../auth.module.css";

export default function SignIn() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
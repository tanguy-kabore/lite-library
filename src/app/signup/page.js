// src/app/signup/page.js
"use client";

import Navbar from "../../components/home/Navbar";
import SignUpForm from "../../components/signup/SignUpForm";
import styles from "../auth.module.css";

export default function SignUp() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

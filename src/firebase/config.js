// src/firebase/config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlxN-ZFVJx2i2ua770GTwIig-TuN8fwSw",
    authDomain: "lite-library-115cb.firebaseapp.com",
    projectId: "lite-library-115cb",
    storageBucket: "lite-library-115cb.appspot.com",
    messagingSenderId: "121310986117",
    appId: "1:121310986117:web:1ac5e01616fb6385b94eec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, storage, firestore };

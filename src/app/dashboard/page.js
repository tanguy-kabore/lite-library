"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import Navbar from "../../components/dashboard/Navbar";
import Dashboard from "../../components/dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./page.module.css";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/signin");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div>
            <Navbar user={user} router={router} />
            <div className={styles.container}>
                {user && (
                    <Dashboard />
                )}
            </div>
        </div>
    );
}

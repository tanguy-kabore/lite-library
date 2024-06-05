"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, storage, firestore } from "../../firebase/config";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import Navbar from "../../components/home/Navbar"
import styles from "./page.module.css";
import LibraryItem from "@/components/dashboard/LibraryItem";


const Library = () => {
    const router = useRouter();
    const user = auth.currentUser;

    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchFiles();
    }, [user, router]);

    const fetchFiles = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "files"));
            const filesList = [];
            querySnapshot.forEach(doc => {
                filesList.push({ id: doc.id, ...doc.data() });
            });
            setFiles(filesList);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };


    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar user={user} router={router} />
            <div className={styles.container}>
                <h1>bibliothèque</h1>

                <input
                    type="text"
                    placeholder="Rechercher des fichiers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />

                <div className={styles.fileList}>
                    {filteredFiles.map(file => (
                        <LibraryItem
                            key={file.id}
                            file={file}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Library;
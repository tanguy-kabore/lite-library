"use client";

// Dashboard.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, storage, firestore } from "../../firebase/config";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import FileItem from "../../components/dashboard/FileItem";
import UploadArea from "../../components/dashboard/UploadArea";
import StorageUsage from "../../components/dashboard/StorageUsage";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const router = useRouter();
    const user = auth.currentUser;

    const [files, setFiles] = useState([]);
    const [storageUsed, setStorageUsed] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const storageLimit = 100; // Set storage limit in MB
    const storage = getStorage();

    useEffect(() => {
        if (user) {
            fetchFiles();
            calculateStorageUsed();
        } else {
            router.push("/signin");
        }
    }, [user, router]);

    const fetchFiles = async () => {
        const querySnapshot = await getDocs(collection(firestore, `files`));
        const filesList = [];
        querySnapshot.forEach(doc => {
            filesList.push({ id: doc.id, ...doc.data() });
        });
        setFiles(filesList);
    };

    const calculateStorageUsed = async () => {
        const querySnapshot = await getDocs(collection(firestore, `files`));
        let totalSize = 0;
        querySnapshot.forEach(doc => {
            totalSize += doc.data().size;
        });
        setStorageUsed(totalSize / (1024 * 1024)); // Convert bytes to MB
    };

    const handleFileUpload = async (file, category) => {
        if (storageUsed + file.size / (1024 * 1024) > storageLimit) {
            alert("Storage limit exceeded. Cannot upload file.");
            return;
        }

        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        await addDoc(collection(firestore, `files`), {
            name: file.name,
            size: file.size,
            type: file.type,
            url: downloadURL,
            category: category,
        });

        fetchFiles();
        calculateStorageUsed();
    };

    const handleFileDelete = async (fileId, fileName) => {
        const fileRef = ref(storage, `files/${fileName}`);

        try {
            await getDownloadURL(fileRef);
            await deleteObject(fileRef);
            await deleteDoc(doc(firestore, `files`, fileId));
            fetchFiles();
            calculateStorageUsed();
        } catch (error) {
            console.log("File does not exist or has already been deleted");
        }
    };

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.dashboard}>
            <h1>Tableau de bord</h1>

            <UploadArea onFileUpload={handleFileUpload} />

            <StorageUsage storageUsed={storageUsed} storageLimit={storageLimit} />

            <input
                type="text"
                placeholder="Rechercher des fichiers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />

            <div className={styles.fileList}>
                {filteredFiles.map(file => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onDelete={() => handleFileDelete(file.id, file.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
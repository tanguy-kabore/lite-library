import React, { useRef, useState } from "react";
import styles from "./UploadArea.module.css";

const UploadArea = ({ onFileUpload }) => {
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file, selectedCategory);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            onFileUpload(file, selectedCategory);
        }
    };

    const handleUploadAreaClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.uploadArea}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleUploadAreaClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    style={{ display: 'none' }}
                />
                <p>Faites glisser et déposez les fichiers ici ou cliquez pour télécharger</p>
            </div>
            <select
                className={styles.categorySelect}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Sélectionnez une catégorie</option>
                <option value="livres">Livres</option>
                <option value="articles">Articles</option>
                <option value="theses">Thèses</option>
                <option value="rapports">Rapports</option>
                <option value="autres">Autres</option>
            </select>
        </div>
    );
};

export default UploadArea;
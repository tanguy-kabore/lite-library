import React from "react";
import { FiDownload, FiTrash2, FiShare2 } from "react-icons/fi";
import { FaFileImage, FaFileVideo, FaFileAlt, FaFile } from "react-icons/fa";
import styles from "./FileItem.module.css";

const getFileIcon = (type) => {
    if (type.startsWith("image/")) return <FaFileImage className={styles.icon} />;
    if (type.startsWith("video/")) return <FaFileVideo className={styles.icon} />;
    if (type.startsWith("application/")) return <FaFileAlt className={styles.icon} />;
    return <FaFile className={styles.icon} />;
};

const FileItem = ({ file, onDelete }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = file.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
    };

    const handleDelete = () => {
        onDelete(file.id, file.name);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(file.url);
        alert("Link copied to clipboard!");
    };

    return (
        <div className={styles.fileItem}>
            <div className={styles.fileIcon}>{getFileIcon(file.type)}</div>
            <div className={styles.fileDetails}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileSize}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                <div className={styles.fileCategory}>Catégorie: {file.category}</div>
            </div>
            <div className={styles.fileActions}>
                <FiDownload className={styles.actionIcon} onClick={handleDownload} />
                <FiShare2 className={styles.actionIcon} onClick={handleShare} />
                <FiTrash2 className={styles.actionIcon} onClick={handleDelete} />
            </div>
        </div>
    );
};

export default FileItem;
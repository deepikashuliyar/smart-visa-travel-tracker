import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    createDocument,
    getDocuments,
    deleteDocument
} from "../../api/documentApi";

import {
    formatDate,
    getExpiryStatus
} from "../../utils/dateUtils";

function Documents() {

    const fileInputRef = useRef(null);

    const [documents, setDocuments] = useState([]);

    const [documentType, setDocumentType] = useState("Passport");
    const [expiryDate, setExpiryDate] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(true);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const documentCategories = [
        {
            icon: "🪪",
            title: "Passports",
            description:
                "Manage passports, passport validity and primary travel identification.",
            path: "/documents/passports",
            className: "passport-category"
        },
        {
            icon: "📄",
            title: "Visas",
            description:
                "Track destination visas, validity periods and entry permissions.",
            path: "/documents/visas",
            className: "visa-category"
        },
        {
            icon: "🛡️",
            title: "Travel Insurance",
            description:
                "Store insurance policies, coverage periods and emergency contacts.",
            path: "/documents/insurance",
            className: "insurance-category"
        },
        {
            icon: "💉",
            title: "Vaccinations",
            description:
                "Manage vaccination records and health certificates for travel.",
            path: "/documents/vaccinations",
            className: "vaccination-category"
        }
    ];

    const loadDocuments = async () => {

        try {

            setLoadingDocuments(true);

            const data = await getDocuments();

            setDocuments(data.documents || []);

        } catch (error) {

            console.error("Load documents error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load documents."
            );

        } finally {

            setLoadingDocuments(false);

        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setError("");
        setMessage("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {

            setSelectedFile(null);

            setError(
                "Only PDF, JPG, JPEG and PNG files are allowed."
            );

            return;
        }

        if (file.size > 5 * 1024 * 1024) {

            setSelectedFile(null);

            setError(
                "File size must be less than 5 MB."
            );

            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async (event) => {

        event.preventDefault();

        setError("");
        setMessage("");

        if (!selectedFile) {

            setError("Please select a document.");

            return;
        }

        try {

            setUploading(true);

            await createDocument({
                documentType,
                expiryDate,
                file: selectedFile
            });

            setMessage(
                "Document uploaded successfully."
            );

            setSelectedFile(null);
            setExpiryDate("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await loadDocuments();

        } catch (error) {

            console.error(
                "Upload document error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to upload document."
            );

        } finally {

            setUploading(false);

        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setMessage("");

            await deleteDocument(id);

            setMessage(
                "Document deleted successfully."
            );

            await loadDocuments();

        } catch (error) {

            console.error(
                "Delete document error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete document."
            );
        }
    };

    const getFileUrl = (fileUrl) => {

        if (!fileUrl) {
            return "#";
        }

        if (fileUrl.startsWith("http")) {
            return fileUrl;
        }

        return `http://localhost:5000${fileUrl}`;
    };

    return (

        <div className="documents-vault-page">

            {/* PAGE HEADER */}

            <div className="documents-vault-header">

                <div>

                    <h1>
                        Travel Documents
                    </h1>

                    <p>
                        Manage your passports, visas, insurance
                        and vaccination records in one secure place.
                    </p>

                </div>

            </div>


            {/* UPLOAD */}

            <div className="document-upload-card">

                <div className="document-upload-header">

                    <div>

                        <span className="vault-banner-label">
                            SECURE FILE UPLOAD
                        </span>

                        <h2>
                            Upload Travel Document
                        </h2>

                        <p>
                            Upload your passport, visa, insurance
                            or vaccination document.
                        </p>

                    </div>

                    <div className="document-upload-icon">
                        📤
                    </div>

                </div>


                <form onSubmit={handleUpload}>

                    <div className="document-upload-grid">

                        <div className="form-group">

                            <label>
                                Document Type
                            </label>

                            <select
                                value={documentType}
                                onChange={(event) =>
                                    setDocumentType(event.target.value)
                                }
                            >
                                <option value="Passport">
                                    Passport
                                </option>

                                <option value="Visa">
                                    Visa
                                </option>

                                <option value="Insurance">
                                    Travel Insurance
                                </option>

                                <option value="Vaccination">
                                    Vaccination
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                value={expiryDate}
                                onChange={(event) =>
                                    setExpiryDate(event.target.value)
                                }
                            />

                        </div>


                        <div className="form-group document-file-input">

                            <label>
                                Select File
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />

                        </div>

                    </div>


                    {selectedFile && (

                        <div className="selected-document">

                            <span>
                                📎
                            </span>

                            <strong>
                                {selectedFile.name}
                            </strong>

                            <span>
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </span>

                        </div>

                    )}


                    {error && (

                        <div className="error-message">
                            {error}
                        </div>

                    )}


                    {message && (

                        <div className="success-message">
                            {message}
                        </div>

                    )}


                    <div className="document-upload-actions">

                        <button
                            type="submit"
                            className="add-document-button"
                            disabled={uploading}
                        >
                            {uploading
                                ? "Uploading..."
                                : "Upload Document"}
                        </button>

                    </div>

                </form>

            </div>


            {/* UPLOADED DOCUMENTS */}

            <div className="uploaded-documents-section">

                <div className="section-heading">

                    <div>

                        <span className="vault-banner-label">
                            DOCUMENT VAULT
                        </span>

                        <h2>
                            Uploaded Documents
                        </h2>

                    </div>

                    <span>
                        {documents.length} document
                        {documents.length !== 1 ? "s" : ""}
                    </span>

                </div>


                {loadingDocuments ? (

                    <div className="documents-loading">
                        Loading documents...
                    </div>

                ) : documents.length === 0 ? (

                    <div className="documents-empty-state">

                        <div className="documents-empty-icon">
                            📂
                        </div>

                        <h2>
                            No Documents Uploaded
                        </h2>

                        <p>
                            Upload your first travel document
                            using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="uploaded-document-grid">

                        {documents.map((document) => {

                            const status = getExpiryStatus(
                                document.expiryDate
                            );

                            return (

                                <div
                                    key={document.id}
                                    className="uploaded-document-card"
                                >

                                    <div className="uploaded-document-top">

                                        <div className="uploaded-document-icon">
                                            📄
                                        </div>

                                        <span
                                            className={`document-status ${status.toLowerCase()}`}
                                        >
                                            {status}
                                        </span>

                                    </div>


                                    <h3>
                                        {document.fileName}
                                    </h3>


                                    <div className="uploaded-document-info">

                                        <div>

                                            <span>
                                                Type
                                            </span>

                                            <strong>
                                                {document.documentType}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Uploaded
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    document.uploadedAt
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Expiry
                                            </span>

                                            <strong>
                                                {document.expiryDate
                                                    ? formatDate(
                                                        document.expiryDate
                                                    )
                                                    : "Not specified"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="uploaded-document-actions">

                                        <a
                                            href={getFileUrl(
                                                document.fileUrl
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-document-button"
                                        >
                                            View File
                                        </a>


                                        <button
                                            className="delete-document-button"
                                            onClick={() =>
                                                handleDelete(
                                                    document.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>


            {/* VAULT BANNER */}

            <div className="document-vault-banner">

                <div className="vault-banner-icon">
                    🔐
                </div>

                <div className="vault-banner-content">

                    <span className="vault-banner-label">
                        SECURE DOCUMENT MANAGEMENT
                    </span>

                    <h2>
                        Travel Document Vault
                    </h2>

                    <p>
                        Keep your important travel documents organized,
                        monitor expiry dates and stay prepared for your
                        next journey.
                    </p>

                </div>

                <Link
                    to="/dashboard"
                    className="vault-dashboard-button"
                >
                    View Dashboard
                </Link>

            </div>


            {/* CATEGORIES */}

            <div className="document-category-grid">

                {documentCategories.map((document) => (

                    <Link
                        key={document.path}
                        to={document.path}
                        className={`document-vault-card ${document.className}`}
                    >

                        <div className="document-vault-icon">
                            {document.icon}
                        </div>

                        <div className="document-vault-card-content">

                            <h2>
                                {document.title}
                            </h2>

                            <p>
                                {document.description}
                            </p>

                        </div>

                        <div className="document-vault-card-footer">

                            <span>
                                Manage documents
                            </span>

                            <span className="document-arrow">
                                →
                            </span>

                        </div>

                    </Link>

                ))}

            </div>


            {/* FEATURES */}

            <div className="document-feature-grid">

                <div className="document-feature-card">

                    <div className="document-feature-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            Expiry Monitoring
                        </h3>

                        <p>
                            Your document expiry dates are monitored
                            so you can identify documents that need
                            attention before travelling.
                        </p>

                    </div>

                </div>


                <div className="document-feature-card">

                    <div className="document-feature-icon reminder-feature">
                        🔔
                    </div>

                    <div>

                        <h3>
                            Smart Reminders
                        </h3>

                        <p>
                            Expiring documents can be connected with
                            the reminder system for timely renewal alerts.
                        </p>

                    </div>

                </div>


                <div className="document-feature-card">

                    <div className="document-feature-icon travel-feature">
                        🌎
                    </div>

                    <div>

                        <h3>
                            Travel Readiness
                        </h3>

                        <p>
                            Use your document information with the
                            dashboard and destination checklist before
                            your journey.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Documents;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Document() {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        documentType: "",
        fileName: "",
        fileUrl: "",
        expiryDate: ""
    });

    const loadDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/documents");
            setDocuments(response.data.documents || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load documents"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadDocuments();
    }, [navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setMessage("");

            let response;

            if (editingId) {
                response = await api.put(
                    `/documents/${editingId}`,
                    formData
                );
            } else {
                response = await api.post(
                    "/documents",
                    formData
                );
            }

            setMessage(response.data.message);

            setFormData({
                documentType: "",
                fileName: "",
                fileUrl: "",
                expiryDate: ""
            });

            setEditingId(null);

            await loadDocuments();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save document"
            );
        }
    };

    const handleEdit = (document) => {
        setEditingId(document.id);

        setFormData({
            documentType: document.documentType,
            fileName: document.fileName,
            fileUrl: document.fileUrl,
            expiryDate: document.expiryDate
                ? document.expiryDate.split("T")[0]
                : ""
        });

        setMessage("");
        setError("");
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) return;

        try {
            setError("");
            setMessage("");

            const response = await api.delete(
                `/documents/${id}`
            );

            setMessage(response.data.message);

            await loadDocuments();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete document"
            );
        }
    };

    const handleCancel = () => {
        setEditingId(null);

        setFormData({
            documentType: "",
            fileName: "",
            fileUrl: "",
            expiryDate: ""
        });

        setMessage("");
        setError("");
    };

    if (loading) {
        return <p>Loading documents...</p>;
    }

    return (
        <div>
            <h1>Documents</h1>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Document Type</label>
                    <input
                        type="text"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        placeholder="Passport, Visa, Insurance..."
                        required
                    />
                </div>

                <div>
                    <label>File Name</label>
                    <input
                        type="text"
                        name="fileName"
                        value={formData.fileName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>File URL</label>
                    <input
                        type="text"
                        name="fileUrl"
                        value={formData.fileUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/document.pdf"
                        required
                    />
                </div>

                <div>
                    <label>Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    {editingId
                        ? "Update Document"
                        : "Add Document"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <hr />

            <h2>My Documents</h2>

            {documents.length === 0 ? (
                <p>No documents found.</p>
            ) : (
                documents.map((document) => (
                    <div key={document.id}>
                        <h3>{document.documentType}</h3>

                        <p>
                            <strong>File Name:</strong>{" "}
                            {document.fileName}
                        </p>

                        <p>
                            <strong>File URL:</strong>{" "}
                            <a
                                href={document.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open Document
                            </a>
                        </p>

                        <p>
                            <strong>Expiry Date:</strong>{" "}
                            {document.expiryDate
                                ? new Date(
                                      document.expiryDate
                                  ).toLocaleDateString()
                                : "N/A"}
                        </p>

                        <button
                            onClick={() => handleEdit(document)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(document.id)}
                        >
                            Delete
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Document;
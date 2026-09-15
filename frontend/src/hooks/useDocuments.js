import { useEffect, useState } from "react";
import api from "../services/api";

function useDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/documents");

            setDocuments(response.data.documents || []);
        } catch (error) {
            console.error("Error fetching documents:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load documents"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return {
        documents,
        loading,
        error,
        refreshDocuments: fetchDocuments
    };
}

export default useDocuments;
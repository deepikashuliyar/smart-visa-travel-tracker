import api from "./axios";

export const getDocuments = async () => {
    const response = await api.get("/document");
    return response.data;
};

export const getDocumentById = async (id) => {
    const response = await api.get(`/document/${id}`);
    return response.data;
};

export const createDocument = async (documentData) => {
    const formData = new FormData();

    formData.append("documentType", documentData.documentType);
    formData.append("expiryDate", documentData.expiryDate || "");
    formData.append("file", documentData.file);

    const response = await api.post("/document", formData);

    return response.data;
};

export const updateDocument = async (id, documentData) => {
    const response = await api.put(`/document/${id}`, documentData);
    return response.data;
};

export const deleteDocument = async (id) => {
    const response = await api.delete(`/document/${id}`);
    return response.data;
};
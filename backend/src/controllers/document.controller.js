const documentService = require("../services/document.service");

const createDocument = async (req, res) => {
    try {
        const {
            documentType,
            expiryDate
        } = req.body;

        if (!documentType) {
            return res.status(400).json({
                success: false,
                message: "Document type is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file"
            });
        }

        const fileName = req.file.originalname;
        const fileUrl = `/uploads/${req.file.filename}`;

        const document = await documentService.createDocument(
            req.user.userId,
            {
                documentType,
                fileName,
                fileUrl,
                expiryDate
            }
        );

        res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {
        console.error("Create document error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to upload document"
        });
    }
};


const getDocuments = async (req, res) => {
    try {
        const documents = await documentService.getDocuments(
            req.user.userId
        );

        res.json({
            success: true,
            documents
        });

    } catch (error) {
        console.error("Get documents error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get documents"
        });
    }
};


const getDocumentById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid document ID"
            });
        }

        const document = await documentService.getDocumentById(
            req.user.userId,
            id
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        res.json({
            success: true,
            document
        });

    } catch (error) {
        console.error("Get document error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get document"
        });
    }
};


const updateDocument = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid document ID"
            });
        }

        const {
            documentType,
            expiryDate
        } = req.body;

        if (!documentType) {
            return res.status(400).json({
                success: false,
                message: "Document type is required"
            });
        }

        const updateData = {
            documentType,
            expiryDate
        };

        if (req.file) {
            updateData.fileName = req.file.originalname;
            updateData.fileUrl = `/uploads/${req.file.filename}`;
        }

        const document = await documentService.updateDocument(
            req.user.userId,
            id,
            updateData
        );

        res.json({
            success: true,
            message: "Document updated successfully",
            document
        });

    } catch (error) {
        console.error("Update document error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to update document"
        });
    }
};


const deleteDocument = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid document ID"
            });
        }

        await documentService.deleteDocument(
            req.user.userId,
            id
        );

        res.json({
            success: true,
            message: "Document deleted successfully"
        });

    } catch (error) {
        console.error("Delete document error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to delete document"
        });
    }
};


module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};
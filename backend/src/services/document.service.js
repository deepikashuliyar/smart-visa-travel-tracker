const prisma = require("../config/database");

const createDocument = async (userId, documentData) => {
    return prisma.document.create({
        data: {
            userId,
            documentType: documentData.documentType,
            fileName: documentData.fileName,
            fileUrl: documentData.fileUrl,
            expiryDate: documentData.expiryDate
                ? new Date(documentData.expiryDate)
                : null
        }
    });
};

const getDocuments = async (userId) => {
    return prisma.document.findMany({
        where: {
            userId
        },
        orderBy: {
            uploadedAt: "desc"
        }
    });
};

const getDocumentById = async (userId, id) => {
    return prisma.document.findFirst({
        where: {
            id,
            userId
        }
    });
};

const updateDocument = async (userId, id, documentData) => {
    const existingDocument = await getDocumentById(userId, id);

    if (!existingDocument) {
        const error = new Error("Document not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.document.update({
        where: {
            id
        },
        data: {
            documentType: documentData.documentType,
            fileName: documentData.fileName,
            fileUrl: documentData.fileUrl,
            expiryDate: documentData.expiryDate
                ? new Date(documentData.expiryDate)
                : null
        }
    });
};

const deleteDocument = async (userId, id) => {
    const existingDocument = await getDocumentById(userId, id);

    if (!existingDocument) {
        const error = new Error("Document not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.document.delete({
        where: {
            id
        }
    });
};

module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};
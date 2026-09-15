const prisma = require("../config/database");

const createVisa = async (userId, visaData) => {
    return prisma.visa.create({
        data: {
            userId,
            country: visaData.country,
            visaType: visaData.visaType,
            visaNumber: visaData.visaNumber || null,
            issueDate: new Date(visaData.issueDate),
            expiryDate: new Date(visaData.expiryDate),
            status: visaData.status
        }
    });
};

const getVisas = async (userId) => {
    return prisma.visa.findMany({
        where: {
            userId
        },
        orderBy: {
            expiryDate: "asc"
        }
    });
};

const getVisaById = async (userId, visaId) => {
    return prisma.visa.findFirst({
        where: {
            id: visaId,
            userId
        }
    });
};

const updateVisa = async (userId, visaId, visaData) => {
    const existingVisa = await prisma.visa.findFirst({
        where: {
            id: visaId,
            userId
        }
    });

    if (!existingVisa) {
        const error = new Error("Visa not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.visa.update({
        where: {
            id: visaId
        },
        data: {
            country: visaData.country,
            visaType: visaData.visaType,
            visaNumber: visaData.visaNumber || null,
            issueDate: new Date(visaData.issueDate),
            expiryDate: new Date(visaData.expiryDate),
            status: visaData.status
        }
    });
};

const deleteVisa = async (userId, visaId) => {
    const existingVisa = await prisma.visa.findFirst({
        where: {
            id: visaId,
            userId
        }
    });

    if (!existingVisa) {
        const error = new Error("Visa not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.visa.delete({
        where: {
            id: visaId
        }
    });
};

module.exports = {
    createVisa,
    getVisas,
    getVisaById,
    updateVisa,
    deleteVisa
};
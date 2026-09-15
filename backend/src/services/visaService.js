const prisma = require("../config/database");

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

const createVisa = async (userId, visaData) => {
    const {
        country,
        visaType,
        visaNumber,
        issueDate,
        expiryDate,
        status
    } = visaData;

    return prisma.visa.create({
        data: {
            userId,
            country,
            visaType,
            visaNumber: visaNumber || null,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate),
            status
        }
    });
};

const updateVisa = async (
    userId,
    visaId,
    visaData
) => {
    const visa = await prisma.visa.findFirst({
        where: {
            id: Number(visaId),
            userId
        }
    });

    if (!visa) {
        const error = new Error("Visa not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        country,
        visaType,
        visaNumber,
        issueDate,
        expiryDate,
        status
    } = visaData;

    return prisma.visa.update({
        where: {
            id: Number(visaId)
        },
        data: {
            country,
            visaType,
            visaNumber: visaNumber || null,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate),
            status
        }
    });
};

const deleteVisa = async (
    userId,
    visaId
) => {
    const visa = await prisma.visa.findFirst({
        where: {
            id: Number(visaId),
            userId
        }
    });

    if (!visa) {
        const error = new Error("Visa not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.visa.delete({
        where: {
            id: Number(visaId)
        }
    });
};

module.exports = {
    getVisas,
    createVisa,
    updateVisa,
    deleteVisa
};
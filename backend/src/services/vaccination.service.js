const prisma = require("../config/database");

const getVaccinations = async (userId) => {
    return prisma.vaccination.findMany({
        where: { userId },
        orderBy: { vaccinationDate: "desc" }
    });
};

const createVaccination = async (userId, vaccinationData) => {
    const {
        vaccineName,
        vaccinationDate,
        expiryDate,
        certificateNumber
    } = vaccinationData;

    return prisma.vaccination.create({
        data: {
            userId,
            vaccineName,
            vaccinationDate: new Date(vaccinationDate),
            expiryDate: expiryDate
                ? new Date(expiryDate)
                : null,
            certificateNumber: certificateNumber || null
        }
    });
};

const updateVaccination = async (
    userId,
    vaccinationId,
    vaccinationData
) => {
    const vaccination = await prisma.vaccination.findFirst({
        where: {
            id: Number(vaccinationId),
            userId
        }
    });

    if (!vaccination) {
        const error = new Error("Vaccination not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        vaccineName,
        vaccinationDate,
        expiryDate,
        certificateNumber
    } = vaccinationData;

    return prisma.vaccination.update({
        where: {
            id: Number(vaccinationId)
        },
        data: {
            vaccineName,
            vaccinationDate: new Date(vaccinationDate),
            expiryDate: expiryDate
                ? new Date(expiryDate)
                : null,
            certificateNumber: certificateNumber || null
        }
    });
};

const deleteVaccination = async (
    userId,
    vaccinationId
) => {
    const vaccination = await prisma.vaccination.findFirst({
        where: {
            id: Number(vaccinationId),
            userId
        }
    });

    if (!vaccination) {
        const error = new Error("Vaccination not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.vaccination.delete({
        where: {
            id: Number(vaccinationId)
        }
    });
};

module.exports = {
    getVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination
};
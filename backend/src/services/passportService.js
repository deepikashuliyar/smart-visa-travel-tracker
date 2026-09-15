const prisma = require("../config/database");

const getPassport = async (userId) => {
    return prisma.passport.findUnique({
        where: {
            userId
        }
    });
};

const createPassport = async (userId, passportData) => {
    const existingPassport = await prisma.passport.findUnique({
        where: {
            userId
        }
    });

    if (existingPassport) {
        const error = new Error(
            "Passport already exists for this user"
        );

        error.statusCode = 409;
        throw error;
    }

    const {
        passportNumber,
        country,
        issueDate,
        expiryDate
    } = passportData;

    return prisma.passport.create({
        data: {
            userId,
            passportNumber,
            country,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate)
        }
    });
};

const updatePassport = async (
    userId,
    passportId,
    passportData
) => {
    const passport = await prisma.passport.findFirst({
        where: {
            id: Number(passportId),
            userId
        }
    });

    if (!passport) {
        const error = new Error("Passport not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        passportNumber,
        country,
        issueDate,
        expiryDate
    } = passportData;

    return prisma.passport.update({
        where: {
            id: Number(passportId)
        },
        data: {
            passportNumber,
            country,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate)
        }
    });
};

const deletePassport = async (userId, passportId) => {
    const passport = await prisma.passport.findFirst({
        where: {
            id: Number(passportId),
            userId
        }
    });

    if (!passport) {
        const error = new Error("Passport not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.passport.delete({
        where: {
            id: Number(passportId)
        }
    });
};

module.exports = {
    getPassport,
    createPassport,
    updatePassport,
    deletePassport
};
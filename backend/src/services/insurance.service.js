const prisma = require("../config/database");

const getInsurances = async (userId) => {
    return prisma.insurance.findMany({
        where: { userId },
        orderBy: { expiryDate: "asc" }
    });
};

const createInsurance = async (userId, insuranceData) => {
    const {
        provider,
        policyNumber,
        issueDate,
        expiryDate,
        coverage
    } = insuranceData;

    return prisma.insurance.create({
        data: {
            userId,
            provider,
            policyNumber,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate),
            coverage: coverage || null
        }
    });
};

const updateInsurance = async (
    userId,
    insuranceId,
    insuranceData
) => {
    const insurance = await prisma.insurance.findFirst({
        where: {
            id: Number(insuranceId),
            userId
        }
    });

    if (!insurance) {
        const error = new Error("Insurance not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        provider,
        policyNumber,
        issueDate,
        expiryDate,
        coverage
    } = insuranceData;

    return prisma.insurance.update({
        where: {
            id: Number(insuranceId)
        },
        data: {
            provider,
            policyNumber,
            issueDate: new Date(issueDate),
            expiryDate: new Date(expiryDate),
            coverage: coverage || null
        }
    });
};

const deleteInsurance = async (
    userId,
    insuranceId
) => {
    const insurance = await prisma.insurance.findFirst({
        where: {
            id: Number(insuranceId),
            userId
        }
    });

    if (!insurance) {
        const error = new Error("Insurance not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.insurance.delete({
        where: {
            id: Number(insuranceId)
        }
    });
};

module.exports = {
    getInsurances,
    createInsurance,
    updateInsurance,
    deleteInsurance
};
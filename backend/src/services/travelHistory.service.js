const prisma = require("../config/database");

const createTravelHistory = async (userId, travelData) => {
    return prisma.travelHistory.create({
        data: {
            userId,
            country: travelData.country,
            purpose: travelData.purpose || null,
            departureDate: new Date(travelData.departureDate),
            returnDate: travelData.returnDate
                ? new Date(travelData.returnDate)
                : null,
            notes: travelData.notes || null
        }
    });
};

const getTravelHistory = async (userId) => {
    return prisma.travelHistory.findMany({
        where: { userId },
        orderBy: { departureDate: "desc" }
    });
};

const getTravelHistoryById = async (userId, travelId) => {
    return prisma.travelHistory.findFirst({
        where: {
            id: travelId,
            userId
        }
    });
};

const updateTravelHistory = async (userId, travelId, travelData) => {
    const existingTravel = await prisma.travelHistory.findFirst({
        where: {
            id: travelId,
            userId
        }
    });

    if (!existingTravel) {
        const error = new Error("Travel history not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.travelHistory.update({
        where: {
            id: travelId
        },
        data: {
            country: travelData.country,
            purpose: travelData.purpose || null,
            departureDate: new Date(travelData.departureDate),
            returnDate: travelData.returnDate
                ? new Date(travelData.returnDate)
                : null,
            notes: travelData.notes || null
        }
    });
};

const deleteTravelHistory = async (userId, travelId) => {
    const existingTravel = await prisma.travelHistory.findFirst({
        where: {
            id: travelId,
            userId
        }
    });

    if (!existingTravel) {
        const error = new Error("Travel history not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.travelHistory.delete({
        where: {
            id: travelId
        }
    });
};

module.exports = {
    createTravelHistory,
    getTravelHistory,
    getTravelHistoryById,
    updateTravelHistory,
    deleteTravelHistory
};
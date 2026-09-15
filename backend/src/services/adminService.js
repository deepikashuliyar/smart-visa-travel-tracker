const prisma = require("../config/database");

const getUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

const getCompliance = async () => {
    const totalUsers = await prisma.user.count();

    const users = await prisma.user.findMany({
        select: {
            id: true,
            passport: {
                select: {
                    expiryDate: true
                }
            },
            visas: {
                select: {
                    expiryDate: true
                }
            },
            insurances: {
                select: {
                    expiryDate: true
                }
            },
            vaccinations: {
                select: {
                    expiryDate: true
                }
            }
        }
    });

    let compliantUsers = 0;
    let nonCompliantUsers = 0;
    let expiringDocuments = 0;

    const today = new Date();
    const ninetyDaysFromNow = new Date();
    ninetyDaysFromNow.setDate(today.getDate() + 90);

    users.forEach((user) => {
        const expiryDates = [];

        if (user.passport?.expiryDate) {
            expiryDates.push(user.passport.expiryDate);
        }

        user.visas.forEach((visa) => {
            if (visa.expiryDate) {
                expiryDates.push(visa.expiryDate);
            }
        });

        user.insurances.forEach((insurance) => {
            if (insurance.expiryDate) {
                expiryDates.push(insurance.expiryDate);
            }
        });

        user.vaccinations.forEach((vaccination) => {
            if (vaccination.expiryDate) {
                expiryDates.push(vaccination.expiryDate);
            }
        });

        const hasExpiredDocument = expiryDates.some(
            (date) => new Date(date) < today
        );

        if (hasExpiredDocument) {
            nonCompliantUsers++;
        } else {
            compliantUsers++;
        }

        expiryDates.forEach((date) => {
            const expiryDate = new Date(date);

            if (
                expiryDate >= today &&
                expiryDate <= ninetyDaysFromNow
            ) {
                expiringDocuments++;
            }
        });
    });

    return {
        totalUsers,
        compliantUsers,
        nonCompliantUsers,
        expiringDocuments
    };
};

const getAnalytics = async () => {
    const [
        totalUsers,
        totalPassports,
        totalVisas,
        totalInsurances,
        totalVaccinations,
        totalTravelHistory,
        totalReminders,
        totalDocuments
    ] = await Promise.all([
        prisma.user.count(),
        prisma.passport.count(),
        prisma.visa.count(),
        prisma.insurance.count(),
        prisma.vaccination.count(),
        prisma.travelHistory.count(),
        prisma.reminder.count(),
        prisma.document.count()
    ]);

    return {
        totalUsers,
        totalPassports,
        totalVisas,
        totalInsurances,
        totalVaccinations,
        totalTravelHistory,
        totalReminders,
        totalDocuments
    };
};

module.exports = {
    getUsers,
    getCompliance,
    getAnalytics
};
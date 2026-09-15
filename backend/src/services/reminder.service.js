const prisma = require("../config/database");

const createReminder = async (userId, reminderData) => {
    return prisma.reminder.create({
        data: {
            userId,
            title: reminderData.title,
            description: reminderData.description || null,
            reminderDate: new Date(reminderData.reminderDate),
            type: reminderData.type,
            isCompleted: reminderData.isCompleted || false
        }
    });
};

const getReminders = async (userId) => {
    return prisma.reminder.findMany({
        where: { userId },
        orderBy: { reminderDate: "asc" }
    });
};

const getReminderById = async (userId, id) => {
    return prisma.reminder.findFirst({
        where: {
            id,
            userId
        }
    });
};

const updateReminder = async (userId, id, reminderData) => {
    const existingReminder = await getReminderById(userId, id);

    if (!existingReminder) {
        const error = new Error("Reminder not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.reminder.update({
        where: { id },
        data: {
            title: reminderData.title,
            description: reminderData.description || null,
            reminderDate: new Date(reminderData.reminderDate),
            type: reminderData.type,
            isCompleted: reminderData.isCompleted || false
        }
    });
};

const deleteReminder = async (userId, id) => {
    const existingReminder = await getReminderById(userId, id);

    if (!existingReminder) {
        const error = new Error("Reminder not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.reminder.delete({
        where: { id }
    });
};

const getReminderPreferences = async (userId) => {
    return prisma.reminderPreference.findUnique({
        where: {
            userId
        }
    });
};

const createReminderPreferences = async (userId) => {
    return prisma.reminderPreference.create({
        data: {
            userId
        }
    });
};

const updateReminderPreferences = async (userId, preferenceData) => {
    return prisma.reminderPreference.upsert({
        where: {
            userId
        },

        update: {
            emailNotifications:
                preferenceData.emailNotifications,
            reminder30Days:
                preferenceData.reminder30Days,
            reminder60Days:
                preferenceData.reminder60Days,
            reminder90Days:
                preferenceData.reminder90Days
        },

        create: {
            userId,
            emailNotifications:
                preferenceData.emailNotifications ?? true,
            reminder30Days:
                preferenceData.reminder30Days ?? true,
            reminder60Days:
                preferenceData.reminder60Days ?? true,
            reminder90Days:
                preferenceData.reminder90Days ?? true
        }
    });
};


const generateExpiryReminders = async () => {
    const users = await prisma.user.findMany({
        include: {
            passport: true,
            visas: true,
            insurances: true,
            vaccinations: true,
            documents: true,
            reminderPreference: true
        }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reminderDays = [90, 60, 30];

    for (const user of users) {
        const preferences = user.reminderPreference || {
            emailNotifications: true,
            reminder30Days: true,
            reminder60Days: true,
            reminder90Days: true
        };

        const documents = [];

        if (user.passport) {
            documents.push({
                type: "Passport",
                name: "Passport",
                expiryDate: user.passport.expiryDate
            });
        }

        for (const visa of user.visas) {
            documents.push({
                type: "Visa",
                name: `Visa - ${visa.country}`,
                expiryDate: visa.expiryDate
            });
        }

        for (const insurance of user.insurances) {
            documents.push({
                type: "Insurance",
                name: `Insurance - ${insurance.provider}`,
                expiryDate: insurance.expiryDate
            });
        }

        for (const vaccination of user.vaccinations) {
            if (vaccination.expiryDate) {
                documents.push({
                    type: "Vaccination",
                    name: `Vaccination - ${vaccination.vaccineName}`,
                    expiryDate: vaccination.expiryDate
                });
            }
        }

        for (const document of user.documents) {
            if (document.expiryDate) {
                documents.push({
                    type: "Document",
                    name: document.fileName,
                    expiryDate: document.expiryDate
                });
            }
        }

        for (const document of documents) {
            const expiryDate = new Date(document.expiryDate);
            expiryDate.setHours(0, 0, 0, 0);

            const difference =
                expiryDate.getTime() - today.getTime();

            const daysUntilExpiry =
                Math.round(
                    difference / (1000 * 60 * 60 * 24)
                );

            if (!reminderDays.includes(daysUntilExpiry)) {
                continue;
            }

            const preferenceEnabled =
                daysUntilExpiry === 90
                    ? preferences.reminder90Days
                    : daysUntilExpiry === 60
                        ? preferences.reminder60Days
                        : preferences.reminder30Days;

            if (!preferenceEnabled) {
                continue;
            }

            const reminderDate = new Date(expiryDate);
            reminderDate.setHours(9, 0, 0, 0);

            const existingReminder =
                await prisma.reminder.findFirst({
                    where: {
                        userId: user.id,
                        title: `${document.name} expires in ${daysUntilExpiry} days`,
                        reminderDate
                    }
                });

            if (existingReminder) {
                continue;
            }

            await prisma.reminder.create({
                data: {
                    userId: user.id,
                    title: `${document.name} expires in ${daysUntilExpiry} days`,
                    description:
                        `Your ${document.type.toLowerCase()} will expire in ${daysUntilExpiry} days.`,
                    reminderDate,
                    type: document.type,
                    isCompleted: false
                }
            });

            console.log(
                `Created ${daysUntilExpiry}-day reminder for user ${user.id}: ${document.name}`
            );
        }
    }
};



module.exports = {
    createReminder,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
    getReminderPreferences,
    createReminderPreferences,
    updateReminderPreferences,
    generateExpiryReminders
};
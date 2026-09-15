const reminderService = require("../services/reminder.service");

const createReminder = async (req, res) => {
    try {
        const {
            title,
            description,
            reminderDate,
            type,
            isCompleted
        } = req.body;

        if (!title || !reminderDate || !type) {
            return res.status(400).json({
                success: false,
                message: "Title, reminder date and type are required"
            });
        }

        const reminder = await reminderService.createReminder(
            req.user.userId,
            {
                title,
                description,
                reminderDate,
                type,
                isCompleted
            }
        );

        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder
        });
    } catch (error) {
        console.error("Create reminder error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to create reminder"
        });
    }
};

const getReminders = async (req, res) => {
    try {
        const reminders = await reminderService.getReminders(
            req.user.userId
        );

        res.json({
            success: true,
            reminders
        });
    } catch (error) {
        console.error("Get reminders error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get reminders"
        });
    }
};

const getReminderById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid reminder ID"
            });
        }

        const reminder = await reminderService.getReminderById(
            req.user.userId,
            id
        );

        if (!reminder) {
            return res.status(404).json({
                success: false,
                message: "Reminder not found"
            });
        }

        res.json({
            success: true,
            reminder
        });
    } catch (error) {
        console.error("Get reminder error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get reminder"
        });
    }
};

const updateReminder = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid reminder ID"
            });
        }

        const {
            title,
            description,
            reminderDate,
            type,
            isCompleted
        } = req.body;

        if (!title || !reminderDate || !type) {
            return res.status(400).json({
                success: false,
                message: "Title, reminder date and type are required"
            });
        }

        const reminder = await reminderService.updateReminder(
            req.user.userId,
            id,
            {
                title,
                description,
                reminderDate,
                type,
                isCompleted
            }
        );

        res.json({
            success: true,
            message: "Reminder updated successfully",
            reminder
        });
    } catch (error) {
        console.error("Update reminder error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to update reminder"
        });
    }
};

const deleteReminder = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid reminder ID"
            });
        }

        await reminderService.deleteReminder(
            req.user.userId,
            id
        );

        res.json({
            success: true,
            message: "Reminder deleted successfully"
        });
    } catch (error) {
        console.error("Delete reminder error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to delete reminder"
        });
    }
};

const getReminderPreferences = async (req, res) => {
    try {
        let preferences =
            await reminderService.getReminderPreferences(
                req.user.userId
            );

        if (!preferences) {
            preferences =
                await reminderService.createReminderPreferences(
                    req.user.userId
                );
        }

        res.json({
            success: true,
            preferences
        });
    } catch (error) {
        console.error(
            "Get reminder preferences error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get reminder preferences"
        });
    }
};

const updateReminderPreferences = async (req, res) => {
    try {
        const {
            emailNotifications,
            reminder30Days,
            reminder60Days,
            reminder90Days
        } = req.body;

        const preferences =
            await reminderService.updateReminderPreferences(
                req.user.userId,
                {
                    emailNotifications,
                    reminder30Days,
                    reminder60Days,
                    reminder90Days
                }
            );

        res.json({
            success: true,
            message: "Reminder preferences updated successfully",
            preferences
        });
    } catch (error) {
        console.error(
            "Update reminder preferences error:",
            error
        );

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to update reminder preferences"
        });
    }
};

module.exports = {
    createReminder,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
    getReminderPreferences,
    updateReminderPreferences
};
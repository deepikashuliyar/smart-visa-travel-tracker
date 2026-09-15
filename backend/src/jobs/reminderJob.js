const reminderService = require("../services/reminder.service");

const runReminderJob = async () => {
    try {
        console.log("Running reminder generation job...");

        await reminderService.generateExpiryReminders();

        console.log("Reminder generation completed.");
    } catch (error) {
        console.error(
            "Reminder generation job failed:",
            error
        );
    }
};

module.exports = runReminderJob;
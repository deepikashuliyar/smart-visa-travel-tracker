const express = require("express");

const reminderController = require("../controllers/reminder.controller");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

// Create reminder
router.post(
    "/",
    reminderController.createReminder
);

// Get all reminders
router.get(
    "/",
    reminderController.getReminders
);

// Get reminder preferences
router.get(
    "/preferences",
    reminderController.getReminderPreferences
);

// Update reminder preferences
router.put(
    "/preferences",
    reminderController.updateReminderPreferences
);

// Get reminder by ID
router.get(
    "/:id",
    reminderController.getReminderById
);

// Update reminder
router.put(
    "/:id",
    reminderController.updateReminder
);

// Delete reminder
router.delete(
    "/:id",
    reminderController.deleteReminder
);

module.exports = router;
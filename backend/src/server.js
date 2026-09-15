const app = require("./app");
const env = require("./config/env");
const cron = require("node-cron");
const reminderJob = require("./jobs/reminderJob");

const PORT = env.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

cron.schedule("0 9 * * *", () => {
    reminderJob();
});
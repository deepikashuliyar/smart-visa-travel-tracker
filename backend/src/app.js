const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const prisma = require("./config/prisma");
const authRoutes = require("./routes/auth.routes");
const passportRoutes = require("./routes/passportRoutes");
const visaRoutes = require("./routes/visaRoutes");
const insuranceRoutes = require("./routes/insurance.routes");
const vaccinationRoutes = require("./routes/vaccination.routes");
const travelHistoryRoutes = require("./routes/travelHistory.routes");
const documentRoutes = require("./routes/document.routes");
const reminderRoutes = require("./routes/reminder.routes");
const errorMiddleware = require("./middleware/errorMiddleware");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/vaccination", vaccinationRoutes);
app.use("/api/travel-history", travelHistoryRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Visa & Travel Document Tracker API is running"
    });
});

app.get("/api/health/db", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            success: true,
            message: "Database connection is working"
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

app.use(errorMiddleware);

module.exports = app;
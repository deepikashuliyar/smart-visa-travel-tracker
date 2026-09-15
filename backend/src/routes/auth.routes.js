const express = require("express");

const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Test auth route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working"
    });
});

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get(
    "/protected",
    authenticateToken,
    authController.protectedRoute
);

router.get(
    "/me",
    authenticateToken,
    authController.getMe
);

module.exports = router;
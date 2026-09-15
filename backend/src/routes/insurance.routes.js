const express = require("express");

const insuranceController = require("../controllers/insurance.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// All insurance routes require authentication
router.use(authenticateToken);

// Add insurance
router.post("/", insuranceController.createInsurance);

// Get current user's insurance
router.get("/", insuranceController.getInsurances);

// Update insurance
router.put("/:id", insuranceController.updateInsurance);

// Delete insurance
router.delete("/:id", insuranceController.deleteInsurance);

module.exports = router;
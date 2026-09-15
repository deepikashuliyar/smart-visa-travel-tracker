const express = require("express");

const vaccinationController = require("../controllers/vaccination.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// All vaccination routes require authentication
router.use(authenticateToken);

// Add vaccination
router.post("/", vaccinationController.createVaccination);

// Get current user's vaccinations
router.get("/", vaccinationController.getVaccinations);

// Update vaccination
router.put("/:id", vaccinationController.updateVaccination);

// Delete vaccination
router.delete("/:id", vaccinationController.deleteVaccination);

module.exports = router;
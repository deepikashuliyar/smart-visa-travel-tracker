const express = require("express");

const visaController = require("../controllers/visa.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// All visa routes require authentication
router.use(authenticateToken);

// Add visa
router.post("/", visaController.createVisa);

// Get all visas for current user
router.get("/", visaController.getVisas);

// Get one visa
router.get("/:id", visaController.getVisaById);

// Update visa
router.put("/:id", visaController.updateVisa);

// Delete visa
router.delete("/:id", visaController.deleteVisa);

module.exports = router;
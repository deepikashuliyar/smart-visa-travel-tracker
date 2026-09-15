const express = require("express");

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/users", adminController.getUsers);
router.get("/compliance", adminController.getCompliance);
router.get("/analytics", adminController.getAnalytics);

module.exports = router;
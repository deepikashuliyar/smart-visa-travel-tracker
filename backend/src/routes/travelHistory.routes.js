const express = require("express");
const router = express.Router();

const travelHistoryController = require("../controllers/travelHistory.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", travelHistoryController.createTravelHistory);

router.get("/", travelHistoryController.getTravelHistory);

router.get("/:id", travelHistoryController.getTravelHistoryById);

router.put("/:id", travelHistoryController.updateTravelHistory);

router.delete("/:id", travelHistoryController.deleteTravelHistory);

module.exports = router;
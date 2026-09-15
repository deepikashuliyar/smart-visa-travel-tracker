const express = require("express");

const visaController = require("../controllers/visaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    visaController.getVisas
);

router.post(
    "/",
    authMiddleware,
    visaController.createVisa
);

router.put(
    "/:id",
    authMiddleware,
    visaController.updateVisa
);

router.delete(
    "/:id",
    authMiddleware,
    visaController.deleteVisa
);

module.exports = router;
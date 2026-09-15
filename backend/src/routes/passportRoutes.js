const express = require("express");

const passportController = require("../controllers/passportController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    passportController.getPassport
);

router.post(
    "/",
    authMiddleware,
    passportController.createPassport
);

router.put(
    "/:id",
    authMiddleware,
    passportController.updatePassport
);

router.delete(
    "/:id",
    authMiddleware,
    passportController.deletePassport
);

module.exports = router;
const express = require("express");

const documentController = require("../controllers/document.controller");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.post("/", upload.single("file"), documentController.createDocument);

router.get("/", documentController.getDocuments);

router.get("/:id", documentController.getDocumentById);

router.put("/:id", upload.single("file"), documentController.updateDocument);

router.delete("/:id", documentController.deleteDocument);

module.exports = router;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];

        const extension = path.extname(file.originalname).toLowerCase();

        if (!allowedTypes.includes(extension)) {
            return cb(
                new Error("Only PDF, JPG, JPEG and PNG files are allowed")
            );
        }

        cb(null, true);
    }
});

module.exports = upload;
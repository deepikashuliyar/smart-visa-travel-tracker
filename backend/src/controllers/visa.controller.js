const visaService = require("../services/visa.service");

const createVisa = async (req, res) => {
    try {
        const {
            country,
            visaType,
            visaNumber,
            issueDate,
            expiryDate,
            status
        } = req.body;

        if (!country || !visaType || !issueDate || !expiryDate || !status) {
            return res.status(400).json({
                success: false,
                message: "Country, visa type, issue date, expiry date and status are required"
            });
        }

        const visa = await visaService.createVisa(
            req.user.userId,
            {
                country,
                visaType,
                visaNumber,
                issueDate,
                expiryDate,
                status
            }
        );

        res.status(201).json({
            success: true,
            message: "Visa added successfully",
            visa
        });

    } catch (error) {
        console.error("Create visa error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to add visa"
        });
    }
};

const getVisas = async (req, res) => {
    try {
        const visas = await visaService.getVisas(req.user.userId);

        res.json({
            success: true,
            visas
        });

    } catch (error) {
        console.error("Get visas error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get visas"
        });
    }
};

const getVisaById = async (req, res) => {
    try {
        const visaId = Number(req.params.id);

        if (Number.isNaN(visaId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid visa ID"
            });
        }

        const visa = await visaService.getVisaById(
            req.user.userId,
            visaId
        );

        if (!visa) {
            return res.status(404).json({
                success: false,
                message: "Visa not found"
            });
        }

        res.json({
            success: true,
            visa
        });

    } catch (error) {
        console.error("Get visa error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get visa"
        });
    }
};

const updateVisa = async (req, res) => {
    try {
        const visaId = Number(req.params.id);

        if (Number.isNaN(visaId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid visa ID"
            });
        }

        const {
            country,
            visaType,
            visaNumber,
            issueDate,
            expiryDate,
            status
        } = req.body;

        if (!country || !visaType || !issueDate || !expiryDate || !status) {
            return res.status(400).json({
                success: false,
                message: "Country, visa type, issue date, expiry date and status are required"
            });
        }

        const visa = await visaService.updateVisa(
            req.user.userId,
            visaId,
            {
                country,
                visaType,
                visaNumber,
                issueDate,
                expiryDate,
                status
            }
        );

        res.json({
            success: true,
            message: "Visa updated successfully",
            visa
        });

    } catch (error) {
        console.error("Update visa error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to update visa"
        });
    }
};

const deleteVisa = async (req, res) => {
    try {
        const visaId = Number(req.params.id);

        if (Number.isNaN(visaId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid visa ID"
            });
        }

        await visaService.deleteVisa(
            req.user.userId,
            visaId
        );

        res.json({
            success: true,
            message: "Visa deleted successfully"
        });

    } catch (error) {
        console.error("Delete visa error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to delete visa"
        });
    }
};

module.exports = {
    createVisa,
    getVisas,
    getVisaById,
    updateVisa,
    deleteVisa
};
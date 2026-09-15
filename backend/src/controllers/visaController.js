const visaService = require("../services/visaService");

const getVisas = async (req, res, next) => {
    try {
        const visas = await visaService.getVisas(
            req.user.userId
        );

        res.json({
            success: true,
            visas
        });
    } catch (error) {
        next(error);
    }
};

const createVisa = async (req, res, next) => {
    try {
        const visa = await visaService.createVisa(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Visa created successfully",
            visa
        });
    } catch (error) {
        next(error);
    }
};

const updateVisa = async (req, res, next) => {
    try {
        const visa = await visaService.updateVisa(
            req.user.userId,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Visa updated successfully",
            visa
        });
    } catch (error) {
        next(error);
    }
};

const deleteVisa = async (req, res, next) => {
    try {
        await visaService.deleteVisa(
            req.user.userId,
            req.params.id
        );

        res.json({
            success: true,
            message: "Visa deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVisas,
    createVisa,
    updateVisa,
    deleteVisa
};
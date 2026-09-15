const vaccinationService = require("../services/vaccination.service");

const getVaccinations = async (req, res, next) => {
    try {
        const vaccinations = await vaccinationService.getVaccinations(
            req.user.userId
        );

        res.json({
            success: true,
            vaccinations
        });
    } catch (error) {
        next(error);
    }
};

const createVaccination = async (req, res, next) => {
    try {
        const vaccination = await vaccinationService.createVaccination(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Vaccination created successfully",
            vaccination
        });
    } catch (error) {
        next(error);
    }
};

const updateVaccination = async (req, res, next) => {
    try {
        const vaccination = await vaccinationService.updateVaccination(
            req.user.userId,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Vaccination updated successfully",
            vaccination
        });
    } catch (error) {
        next(error);
    }
};

const deleteVaccination = async (req, res, next) => {
    try {
        await vaccinationService.deleteVaccination(
            req.user.userId,
            req.params.id
        );

        res.json({
            success: true,
            message: "Vaccination deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination
};
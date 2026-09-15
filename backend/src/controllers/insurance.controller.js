const insuranceService = require("../services/insurance.service");

const getInsurances = async (req, res, next) => {
    try {
        const insurances = await insuranceService.getInsurances(
            req.user.userId
        );

        res.json({
            success: true,
            insurances
        });
    } catch (error) {
        next(error);
    }
};

const createInsurance = async (req, res, next) => {
    try {
        const insurance = await insuranceService.createInsurance(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Insurance created successfully",
            insurance
        });
    } catch (error) {
        next(error);
    }
};

const updateInsurance = async (req, res, next) => {
    try {
        const insurance = await insuranceService.updateInsurance(
            req.user.userId,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Insurance updated successfully",
            insurance
        });
    } catch (error) {
        next(error);
    }
};

const deleteInsurance = async (req, res, next) => {
    try {
        await insuranceService.deleteInsurance(
            req.user.userId,
            req.params.id
        );

        res.json({
            success: true,
            message: "Insurance deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getInsurances,
    createInsurance,
    updateInsurance,
    deleteInsurance
};
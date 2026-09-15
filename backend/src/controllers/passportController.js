const passportService = require("../services/passportService");

const getPassport = async (req, res, next) => {
    try {
        const passport = await passportService.getPassport(
            req.user.userId
        );

        res.json({
            success: true,
            passport
        });
    } catch (error) {
        next(error);
    }
};

const createPassport = async (req, res, next) => {
    try {
        const passport = await passportService.createPassport(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Passport created successfully",
            passport
        });
    } catch (error) {
        next(error);
    }
};

const updatePassport = async (req, res, next) => {
    try {
        const passport = await passportService.updatePassport(
            req.user.userId,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Passport updated successfully",
            passport
        });
    } catch (error) {
        next(error);
    }
};

const deletePassport = async (req, res, next) => {
    try {
        await passportService.deletePassport(
            req.user.userId,
            req.params.id
        );

        res.json({
            success: true,
            message: "Passport deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPassport,
    createPassport,
    updatePassport,
    deletePassport
};
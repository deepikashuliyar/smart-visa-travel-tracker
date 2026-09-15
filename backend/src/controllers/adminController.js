const adminService = require("../services/adminService");

const getUsers = async (req, res, next) => {
    try {
        const users = await adminService.getUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getCompliance = async (req, res, next) => {
    try {
        const compliance = await adminService.getCompliance();

        res.json(compliance);
    } catch (error) {
        next(error);
    }
};

const getAnalytics = async (req, res, next) => {
    try {
        const analytics = await adminService.getAnalytics();

        res.json(analytics);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getCompliance,
    getAnalytics
};
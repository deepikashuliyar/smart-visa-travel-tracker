const travelHistoryService = require("../services/travelHistory.service");

const createTravelHistory = async (req, res) => {
    try {
        const travel = await travelHistoryService.createTravelHistory(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            message: "Travel history added successfully",
            travel
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

const getTravelHistory = async (req, res) => {
    try {
        const travels = await travelHistoryService.getTravelHistory(req.user.userId);

        res.status(200).json({
            travels
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

const getTravelHistoryById = async (req, res) => {
    try {
        const travel = await travelHistoryService.getTravelHistoryById(
            req.user.userId,
            Number(req.params.id)
        );

        if (!travel) {
            return res.status(404).json({
                message: "Travel history not found"
            });
        }

        res.status(200).json({
            travel
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

const updateTravelHistory = async (req, res) => {
    try {
        const travel = await travelHistoryService.updateTravelHistory(
            req.user.userId,
            Number(req.params.id),
            req.body
        );

        res.status(200).json({
            message: "Travel history updated successfully",
            travel
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

const deleteTravelHistory = async (req, res) => {
    try {
        await travelHistoryService.deleteTravelHistory(
            req.user.userId,
            Number(req.params.id)
        );

        res.status(200).json({
            message: "Travel history deleted successfully"
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTravelHistory,
    getTravelHistory,
    getTravelHistoryById,
    updateTravelHistory,
    deleteTravelHistory
};
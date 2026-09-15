const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const user = await authService.registerUser(
            name,
            email,
            password
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Registration failed"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await authService.loginUser(
            email,
            password
        );

        res.json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: result.user
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Login failed"
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await authService.getCurrentUser(
            req.user.userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Get current user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get user information"
        });
    }
};

const protectedRoute = (req, res) => {
    res.json({
        success: true,
        message: "You have access to the protected route",
        user: req.user
    });
};

module.exports = {
    register,
    login,
    getMe,
    protectedRoute
};
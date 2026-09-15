const prisma = require("../config/database");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const registerUser = async (name, email, password) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await hashPassword(password);

    return prisma.user.create({
        data: {
            name,
            email,
            passwordHash
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });
};

const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const passwordMatch = await comparePassword(
        password,
        user.passwordHash
    );

    if (!passwordMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const getCurrentUser = async (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};
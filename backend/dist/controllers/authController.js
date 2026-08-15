"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getCurrentUser = exports.loginUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = require("../models/User");
const generateToken_1 = require("../utils/generateToken");
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both email and password');
    }
    const user = await User_1.User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            user: {
                id: user._id,
                customId: user.customId,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            token: (0, generateToken_1.generateToken)(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authenticated');
    }
    res.json({
        id: req.user._id,
        customId: req.user.customId,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
    });
});
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await User_1.User.findById(req.user?._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.avatar = req.body.avatar || user.avatar;
        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            customId: updatedUser.customId,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
// @desc    Change user password
// @route   PUT /api/auth/password
// @access  Private
exports.changePassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        res.status(400);
        throw new Error('New password must be at least 6 characters');
    }
    const user = await User_1.User.findById(req.user?._id);
    if (user) {
        if (currentPassword && !(await user.matchPassword(currentPassword))) {
            res.status(400);
            throw new Error('Current password is incorrect');
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.getActivities = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ActivityLog_1 = require("../models/ActivityLog");
// @desc    Get recent activity logs
// @route   GET /api/activities
// @access  Private (Admin)
exports.getActivities = (0, express_async_handler_1.default)(async (req, res) => {
    const logs = await ActivityLog_1.ActivityLog.find().sort({ createdAt: -1 }).limit(30);
    res.json(logs);
});
// @desc    Create new activity log
// @route   POST /api/activities
// @access  Private (Admin)
exports.createActivity = (0, express_async_handler_1.default)(async (req, res) => {
    const { action, section } = req.body;
    if (!action || !section) {
        res.status(400);
        throw new Error('Action and section are required');
    }
    const customId = `act_${Date.now()}`;
    const log = await ActivityLog_1.ActivityLog.create({
        customId,
        action,
        section,
        timestamp: 'Just now',
    });
    res.status(201).json(log);
});

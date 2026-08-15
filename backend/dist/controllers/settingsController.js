"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Settings_1 = require("../models/Settings");
// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = (0, express_async_handler_1.default)(async (req, res) => {
    const settings = await Settings_1.Settings.findOne();
    if (!settings) {
        res.status(404);
        throw new Error('Website settings not found');
    }
    res.json(settings);
});
// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
exports.updateSettings = (0, express_async_handler_1.default)(async (req, res) => {
    let settings = await Settings_1.Settings.findOne();
    if (settings) {
        Object.assign(settings, req.body);
        const updated = await settings.save();
        res.json(updated);
    }
    else {
        const created = await Settings_1.Settings.create(req.body);
        res.status(201).json(created);
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutData = exports.getAboutData = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const About_1 = require("../models/About");
// @desc    Get About data
// @route   GET /api/about
// @access  Public
exports.getAboutData = (0, express_async_handler_1.default)(async (req, res) => {
    const aboutData = await About_1.About.findOne();
    if (!aboutData) {
        res.status(404);
        throw new Error('About data not found');
    }
    res.json(aboutData);
});
// @desc    Update About data
// @route   PUT /api/about
// @access  Private (Admin)
exports.updateAboutData = (0, express_async_handler_1.default)(async (req, res) => {
    let aboutData = await About_1.About.findOne();
    if (aboutData) {
        Object.assign(aboutData, req.body);
        const updated = await aboutData.save();
        res.json(updated);
    }
    else {
        const created = await About_1.About.create(req.body);
        res.status(201).json(created);
    }
});

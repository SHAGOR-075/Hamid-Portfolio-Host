"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAllEducation = exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducation = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Education_1 = require("../models/Education");
const buildIdQuery_1 = require("../utils/buildIdQuery");
// @desc    Get all education items
// @route   GET /api/education
// @access  Public
exports.getEducation = (0, express_async_handler_1.default)(async (req, res) => {
    const education = await Education_1.Education.find().sort({ order: 1 });
    res.json(education);
});
// @desc    Create education item
// @route   POST /api/education
// @access  Private (Admin)
exports.createEducation = (0, express_async_handler_1.default)(async (req, res) => {
    const customId = req.body.id || req.body.customId || `edu_${Date.now()}`;
    const edu = await Education_1.Education.create({ ...req.body, customId });
    res.status(201).json(edu);
});
// @desc    Update education item
// @route   PUT /api/education/:id
// @access  Private (Admin)
exports.updateEducation = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let edu = await Education_1.Education.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!edu) {
        res.status(404);
        throw new Error('Education item not found');
    }
    Object.assign(edu, req.body);
    const updated = await edu.save();
    res.json(updated);
});
// @desc    Delete education item
// @route   DELETE /api/education/:id
// @access  Private (Admin)
exports.deleteEducation = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const edu = await Education_1.Education.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!edu) {
        res.status(404);
        throw new Error('Education item not found');
    }
    res.json({ message: 'Education item deleted', id });
});
// @desc    Bulk update/replace education
// @route   PUT /api/education
// @access  Private (Admin)
exports.saveAllEducation = (0, express_async_handler_1.default)(async (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) {
        res.status(400);
        throw new Error('Expected array of education items');
    }
    await Education_1.Education.deleteMany({});
    const inserted = await Education_1.Education.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `edu_${Date.now()}_${idx}`, order: idx + 1 })));
    res.json(inserted);
});

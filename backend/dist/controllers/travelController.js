"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAllTravelPosts = exports.deleteTravelPost = exports.updateTravelPost = exports.createTravelPost = exports.getTravelPostById = exports.getTravelPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Travel_1 = require("../models/Travel");
const buildIdQuery_1 = require("../utils/buildIdQuery");
// @desc    Get all travel posts
// @route   GET /api/travel
// @access  Public
exports.getTravelPosts = (0, express_async_handler_1.default)(async (req, res) => {
    const posts = await Travel_1.Travel.find().sort({ order: 1 });
    res.json(posts);
});
// @desc    Get single travel post
// @route   GET /api/travel/:id
// @access  Public
exports.getTravelPostById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const post = await Travel_1.Travel.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!post) {
        res.status(404);
        throw new Error('Travel post not found');
    }
    res.json(post);
});
// @desc    Create travel post
// @route   POST /api/travel
// @access  Private (Admin)
exports.createTravelPost = (0, express_async_handler_1.default)(async (req, res) => {
    const customId = req.body.id || req.body.customId || `trv_${Date.now()}`;
    const post = await Travel_1.Travel.create({ ...req.body, customId });
    res.status(201).json(post);
});
// @desc    Update travel post
// @route   PUT /api/travel/:id
// @access  Private (Admin)
exports.updateTravelPost = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let post = await Travel_1.Travel.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!post) {
        res.status(404);
        throw new Error('Travel post not found');
    }
    Object.assign(post, req.body);
    const updated = await post.save();
    res.json(updated);
});
// @desc    Delete travel post
// @route   DELETE /api/travel/:id
// @access  Private (Admin)
exports.deleteTravelPost = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const post = await Travel_1.Travel.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!post) {
        res.status(404);
        throw new Error('Travel post not found');
    }
    res.json({ message: 'Travel post deleted', id });
});
// @desc    Save all travel posts array
// @route   PUT /api/travel
// @access  Private (Admin)
exports.saveAllTravelPosts = (0, express_async_handler_1.default)(async (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) {
        res.status(400);
        throw new Error('Expected array of travel posts');
    }
    await Travel_1.Travel.deleteMany({});
    const inserted = await Travel_1.Travel.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `trv_${Date.now()}_${idx}`, order: idx + 1 })));
    res.json(inserted);
});

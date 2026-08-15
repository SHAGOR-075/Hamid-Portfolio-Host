"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAllSocialLinks = exports.deleteSocialLink = exports.updateSocialLink = exports.createSocialLink = exports.getSocialLinks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Social_1 = require("../models/Social");
const buildIdQuery_1 = require("../utils/buildIdQuery");
// @desc    Get all social links
// @route   GET /api/socials
// @access  Public
exports.getSocialLinks = (0, express_async_handler_1.default)(async (req, res) => {
    const socials = await Social_1.Social.find().sort({ order: 1 }).lean();
    res.json(socials);
});
// @desc    Create social link
// @route   POST /api/socials
// @access  Private (Admin)
exports.createSocialLink = (0, express_async_handler_1.default)(async (req, res) => {
    const customId = req.body.id || req.body.customId || `soc_${Date.now()}`;
    const social = await Social_1.Social.create({ ...req.body, customId });
    res.status(201).json(social);
});
// @desc    Update social link
// @route   PUT /api/socials/:id
// @access  Private (Admin)
exports.updateSocialLink = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let social = await Social_1.Social.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!social) {
        res.status(404);
        throw new Error('Social link not found');
    }
    Object.assign(social, req.body);
    const updated = await social.save();
    res.json(updated);
});
// @desc    Delete social link
// @route   DELETE /api/socials/:id
// @access  Private (Admin)
exports.deleteSocialLink = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const social = await Social_1.Social.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!social) {
        res.status(404);
        throw new Error('Social link not found');
    }
    res.json({ message: 'Social link deleted', id });
});
// @desc    Save all social links
// @route   PUT /api/socials
// @access  Private (Admin)
exports.saveAllSocialLinks = (0, express_async_handler_1.default)(async (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) {
        res.status(400);
        throw new Error('Expected array of social links');
    }
    await Social_1.Social.deleteMany({});
    const inserted = await Social_1.Social.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `soc_${Date.now()}_${idx}`, order: idx + 1 })));
    res.json(inserted);
});

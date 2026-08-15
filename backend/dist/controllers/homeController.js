"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomeData = exports.getHomeData = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Home_1 = require("../models/Home");
// @desc    Get Home data
// @route   GET /api/home
// @access  Public
exports.getHomeData = (0, express_async_handler_1.default)(async (req, res) => {
    let homeData = await Home_1.Home.findOne().lean();
    if (!homeData) {
        res.status(404);
        throw new Error('Home data not found');
    }
    res.json(homeData);
});
// @desc    Update Home data
// @route   PUT /api/home
// @access  Private (Admin)
exports.updateHomeData = (0, express_async_handler_1.default)(async (req, res) => {
    let homeData = await Home_1.Home.findOne();
    if (homeData) {
        Object.assign(homeData, req.body);
        const updated = await homeData.save();
        res.json(updated);
    }
    else {
        const created = await Home_1.Home.create(req.body);
        res.status(201).json(created);
    }
});

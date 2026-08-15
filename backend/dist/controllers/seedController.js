"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const seeder_1 = require("../utils/seeder");
// @desc    Trigger database reset and seed
// @route   POST /api/seed
// @access  Public or Admin
exports.runSeed = (0, express_async_handler_1.default)(async (req, res) => {
    await (0, seeder_1.seedDatabase)();
    res.json({ message: 'Database seeded with default portfolio data & super admin user successfully!' });
});

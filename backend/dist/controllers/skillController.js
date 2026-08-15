"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderSkills = exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkills = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Skill_1 = require("../models/Skill");
const buildIdQuery_1 = require("../utils/buildIdQuery");
// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = (0, express_async_handler_1.default)(async (req, res) => {
    const skills = await Skill_1.Skill.find().sort({ order: 1 });
    res.json(skills);
});
// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
exports.createSkill = (0, express_async_handler_1.default)(async (req, res) => {
    const customId = req.body.id || req.body.customId || `sk_${Date.now()}`;
    const skill = await Skill_1.Skill.create({ ...req.body, customId });
    res.status(201).json(skill);
});
// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
exports.updateSkill = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let skill = await Skill_1.Skill.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }
    Object.assign(skill, req.body);
    const updated = await skill.save();
    res.json(updated);
});
// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
exports.deleteSkill = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const skill = await Skill_1.Skill.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }
    res.json({ message: 'Skill deleted successfully', id });
});
// @desc    Reorder skills array
// @route   PUT /api/skills/reorder
// @access  Private (Admin)
exports.reorderSkills = (0, express_async_handler_1.default)(async (req, res) => {
    const skillsArray = req.body;
    if (!Array.isArray(skillsArray)) {
        res.status(400);
        throw new Error('Expected array of skills');
    }
    await Skill_1.Skill.deleteMany({});
    const inserted = await Skill_1.Skill.insertMany(skillsArray.map((s, idx) => ({ ...s, customId: s.id || s.customId || `sk_${Date.now()}_${idx}`, order: idx + 1 })));
    res.json(inserted);
});

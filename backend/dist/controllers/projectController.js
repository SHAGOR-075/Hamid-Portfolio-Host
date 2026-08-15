"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAllProjects = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByIdOrSlug = exports.getProjects = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Project_1 = require("../models/Project");
const buildIdQuery_1 = require("../utils/buildIdQuery");
// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = (0, express_async_handler_1.default)(async (req, res) => {
    const projects = await Project_1.Project.find().sort({ order: 1 });
    res.json(projects);
});
// @desc    Get single project by ID or Slug
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectByIdOrSlug = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const project = await Project_1.Project.findOne((0, buildIdQuery_1.buildIdQuery)(id)) || await Project_1.Project.findOne({ slug: id });
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.json(project);
});
// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
exports.createProject = (0, express_async_handler_1.default)(async (req, res) => {
    const customId = req.body.id || req.body.customId || `proj_${Date.now()}`;
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const project = await Project_1.Project.create({ ...req.body, customId, slug });
    res.status(201).json(project);
});
// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
exports.updateProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let project = await Project_1.Project.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    Object.assign(project, req.body);
    const updated = await project.save();
    res.json(updated);
});
// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
exports.deleteProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const project = await Project_1.Project.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.json({ message: 'Project deleted', id });
});
// @desc    Save all projects array
// @route   PUT /api/projects
// @access  Private (Admin)
exports.saveAllProjects = (0, express_async_handler_1.default)(async (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) {
        res.status(400);
        throw new Error('Expected array of projects');
    }
    await Project_1.Project.deleteMany({});
    const inserted = await Project_1.Project.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `proj_${Date.now()}_${idx}`, order: idx + 1 })));
    res.json(inserted);
});

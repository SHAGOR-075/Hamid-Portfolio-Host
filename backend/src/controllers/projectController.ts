import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Project } from '../models/Project';
import { buildIdQuery } from '../utils/buildIdQuery';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
});

// @desc    Get single project by ID or Slug
// @route   GET /api/projects/:id
// @access  Public
export const getProjectByIdOrSlug = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findOne(buildIdQuery(id)) || await Project.findOne({ slug: id });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json(project);
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const customId = req.body.id || req.body.customId || `proj_${Date.now()}`;
  const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const project = await Project.create({ ...req.body, customId, slug });
  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let project = await Project.findOne(buildIdQuery(id));
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
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findOneAndDelete(buildIdQuery(id));
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ message: 'Project deleted', id });
});

// @desc    Save all projects array
// @route   PUT /api/projects
// @access  Private (Admin)
export const saveAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const items = req.body;
  if (!Array.isArray(items)) {
    res.status(400);
    throw new Error('Expected array of projects');
  }
  await Project.deleteMany({});
  const inserted = await Project.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `proj_${Date.now()}_${idx}`, order: idx + 1 })));
  res.json(inserted);
});

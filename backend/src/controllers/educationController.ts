import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Education } from '../models/Education';
import { buildIdQuery } from '../utils/buildIdQuery';

// @desc    Get all education items
// @route   GET /api/education
// @access  Public
export const getEducation = asyncHandler(async (req: Request, res: Response) => {
  const education = await Education.find().sort({ order: 1 }).lean();
  res.json(education);
});

// @desc    Create education item
// @route   POST /api/education
// @access  Private (Admin)
export const createEducation = asyncHandler(async (req: Request, res: Response) => {
  const customId = req.body.id || req.body.customId || `edu_${Date.now()}`;
  const edu = await Education.create({ ...req.body, customId });
  res.status(201).json(edu);
});

// @desc    Update education item
// @route   PUT /api/education/:id
// @access  Private (Admin)
export const updateEducation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let edu = await Education.findOne(buildIdQuery(id));
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
export const deleteEducation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const edu = await Education.findOneAndDelete(buildIdQuery(id));
  if (!edu) {
    res.status(404);
    throw new Error('Education item not found');
  }
  res.json({ message: 'Education item deleted', id });
});

// @desc    Bulk update/replace education
// @route   PUT /api/education
// @access  Private (Admin)
export const saveAllEducation = asyncHandler(async (req: Request, res: Response) => {
  const items = req.body;
  if (!Array.isArray(items)) {
    res.status(400);
    throw new Error('Expected array of education items');
  }
  await Education.deleteMany({});
  const inserted = await Education.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `edu_${Date.now()}_${idx}`, order: idx + 1 })));
  res.json(inserted);
});

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Skill } from '../models/Skill';
import { buildIdQuery } from '../utils/buildIdQuery';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.json(skills);
});

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const customId = req.body.id || req.body.customId || `sk_${Date.now()}`;
  const skill = await Skill.create({ ...req.body, customId });
  res.status(201).json(skill);
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let skill = await Skill.findOne(buildIdQuery(id));
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
export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const skill = await Skill.findOneAndDelete(buildIdQuery(id));
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  res.json({ message: 'Skill deleted successfully', id });
});

// @desc    Reorder skills array
// @route   PUT /api/skills/reorder
// @access  Private (Admin)
export const reorderSkills = asyncHandler(async (req: Request, res: Response) => {
  const skillsArray = req.body;
  if (!Array.isArray(skillsArray)) {
    res.status(400);
    throw new Error('Expected array of skills');
  }

  await Skill.deleteMany({});
  const inserted = await Skill.insertMany(skillsArray.map((s, idx) => ({ ...s, customId: s.id || s.customId || `sk_${Date.now()}_${idx}`, order: idx + 1 })));
  res.json(inserted);
});

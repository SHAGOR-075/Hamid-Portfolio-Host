import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Social } from '../models/Social';
import { buildIdQuery } from '../utils/buildIdQuery';

// @desc    Get all social links
// @route   GET /api/socials
// @access  Public
export const getSocialLinks = asyncHandler(async (req: Request, res: Response) => {
  const socials = await Social.find().sort({ order: 1 }).lean();
  res.json(socials);
});

// @desc    Create social link
// @route   POST /api/socials
// @access  Private (Admin)
export const createSocialLink = asyncHandler(async (req: Request, res: Response) => {
  const customId = req.body.id || req.body.customId || `soc_${Date.now()}`;
  const social = await Social.create({ ...req.body, customId });
  res.status(201).json(social);
});

// @desc    Update social link
// @route   PUT /api/socials/:id
// @access  Private (Admin)
export const updateSocialLink = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let social = await Social.findOne(buildIdQuery(id));
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
export const deleteSocialLink = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const social = await Social.findOneAndDelete(buildIdQuery(id));
  if (!social) {
    res.status(404);
    throw new Error('Social link not found');
  }
  res.json({ message: 'Social link deleted', id });
});

// @desc    Save all social links
// @route   PUT /api/socials
// @access  Private (Admin)
export const saveAllSocialLinks = asyncHandler(async (req: Request, res: Response) => {
  const items = req.body;
  if (!Array.isArray(items)) {
    res.status(400);
    throw new Error('Expected array of social links');
  }
  await Social.deleteMany({});
  const inserted = await Social.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `soc_${Date.now()}_${idx}`, order: idx + 1 })));
  res.json(inserted);
});

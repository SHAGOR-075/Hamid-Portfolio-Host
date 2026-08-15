import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Travel } from '../models/Travel';
import { buildIdQuery } from '../utils/buildIdQuery';

// @desc    Get all travel posts
// @route   GET /api/travel
// @access  Public
export const getTravelPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Travel.find().sort({ order: 1 }).lean();
  res.json(posts);
});

// @desc    Get single travel post
// @route   GET /api/travel/:id
// @access  Public
export const getTravelPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Travel.findOne(buildIdQuery(id));
  if (!post) {
    res.status(404);
    throw new Error('Travel post not found');
  }
  res.json(post);
});

// @desc    Create travel post
// @route   POST /api/travel
// @access  Private (Admin)
export const createTravelPost = asyncHandler(async (req: Request, res: Response) => {
  const customId = req.body.id || req.body.customId || `trv_${Date.now()}`;
  const post = await Travel.create({ ...req.body, customId });
  res.status(201).json(post);
});

// @desc    Update travel post
// @route   PUT /api/travel/:id
// @access  Private (Admin)
export const updateTravelPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let post = await Travel.findOne(buildIdQuery(id));
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
export const deleteTravelPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Travel.findOneAndDelete(buildIdQuery(id));
  if (!post) {
    res.status(404);
    throw new Error('Travel post not found');
  }
  res.json({ message: 'Travel post deleted', id });
});

// @desc    Save all travel posts array
// @route   PUT /api/travel
// @access  Private (Admin)
export const saveAllTravelPosts = asyncHandler(async (req: Request, res: Response) => {
  const items = req.body;
  if (!Array.isArray(items)) {
    res.status(400);
    throw new Error('Expected array of travel posts');
  }
  await Travel.deleteMany({});
  const inserted = await Travel.insertMany(items.map((item, idx) => ({ ...item, customId: item.id || item.customId || `trv_${Date.now()}_${idx}`, order: idx + 1 })));
  res.json(inserted);
});

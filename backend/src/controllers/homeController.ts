import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Home } from '../models/Home';

// @desc    Get Home data
// @route   GET /api/home
// @access  Public
export const getHomeData = asyncHandler(async (req: Request, res: Response) => {
  let homeData = await Home.findOne().lean();
  if (!homeData) {
    res.status(404);
    throw new Error('Home data not found');
  }
  res.json(homeData);
});

// @desc    Update Home data
// @route   PUT /api/home
// @access  Private (Admin)
export const updateHomeData = asyncHandler(async (req: Request, res: Response) => {
  let homeData = await Home.findOne();
  if (homeData) {
    Object.assign(homeData, req.body);
    const updated = await homeData.save();
    res.json(updated);
  } else {
    const created = await Home.create(req.body);
    res.status(201).json(created);
  }
});

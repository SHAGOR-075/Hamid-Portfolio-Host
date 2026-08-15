import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { About } from '../models/About';

// @desc    Get About data
// @route   GET /api/about
// @access  Public
export const getAboutData = asyncHandler(async (req: Request, res: Response) => {
  const aboutData = await About.findOne();
  if (!aboutData) {
    res.status(404);
    throw new Error('About data not found');
  }
  res.json(aboutData);
});

// @desc    Update About data
// @route   PUT /api/about
// @access  Private (Admin)
export const updateAboutData = asyncHandler(async (req: Request, res: Response) => {
  let aboutData = await About.findOne();
  if (aboutData) {
    Object.assign(aboutData, req.body);
    const updated = await aboutData.save();
    res.json(updated);
  } else {
    const created = await About.create(req.body);
    res.status(201).json(created);
  }
});

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Settings } from '../models/Settings';

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await Settings.findOne();
  if (!settings) {
    res.status(404);
    throw new Error('Website settings not found');
  }
  res.json(settings);
});

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  let settings = await Settings.findOne();
  if (settings) {
    Object.assign(settings, req.body);
    const updated = await settings.save();
    res.json(updated);
  } else {
    const created = await Settings.create(req.body);
    res.status(201).json(created);
  }
});

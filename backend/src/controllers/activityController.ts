import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ActivityLog } from '../models/ActivityLog';

// @desc    Get recent activity logs
// @route   GET /api/activities
// @access  Private (Admin)
export const getActivities = asyncHandler(async (req: Request, res: Response) => {
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(30);
  res.json(logs);
});

// @desc    Create new activity log
// @route   POST /api/activities
// @access  Private (Admin)
export const createActivity = asyncHandler(async (req: Request, res: Response) => {
  const { action, section } = req.body;
  if (!action || !section) {
    res.status(400);
    throw new Error('Action and section are required');
  }

  const customId = `act_${Date.now()}`;
  const log = await ActivityLog.create({
    customId,
    action,
    section,
    timestamp: 'Just now',
  });

  res.status(201).json(log);
});

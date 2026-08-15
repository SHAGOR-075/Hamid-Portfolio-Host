import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { seedDatabase } from '../utils/seeder';

// @desc    Trigger database reset and seed
// @route   POST /api/seed
// @access  Public or Admin
export const runSeed = asyncHandler(async (req: Request, res: Response) => {
  await seedDatabase();
  res.json({ message: 'Database seeded with default portfolio data & super admin user successfully!' });
});

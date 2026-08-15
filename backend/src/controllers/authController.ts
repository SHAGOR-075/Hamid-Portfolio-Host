import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { AuthRequest } from '../middleware/auth';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide both email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        id: user._id,
        customId: user.customId,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token: generateToken((user._id as unknown) as string),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }

  res.json({
    id: req.user._id,
    customId: req.user.customId,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar,
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      customId: updatedUser.customId,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Change user password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    res.status(400);
    throw new Error('New password must be at least 6 characters');
  }

  const user = await User.findById(req.user?._id);

  if (user) {
    if (currentPassword && !(await user.matchPassword(currentPassword))) {
      res.status(400);
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

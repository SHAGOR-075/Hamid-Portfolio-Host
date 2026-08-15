import express from 'express';
import {
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

export default router;

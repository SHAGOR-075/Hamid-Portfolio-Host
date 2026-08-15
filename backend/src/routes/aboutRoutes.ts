import express from 'express';
import { getAboutData, updateAboutData } from '../controllers/aboutController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getAboutData)
  .put(protect, updateAboutData);

export default router;

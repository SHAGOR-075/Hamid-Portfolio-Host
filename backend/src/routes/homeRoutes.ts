import express from 'express';
import { getHomeData, updateHomeData } from '../controllers/homeController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getHomeData)
  .put(protect, updateHomeData);

export default router;

import express from 'express';
import { getActivities, createActivity } from '../controllers/activityController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(protect, getActivities)
  .post(protect, createActivity);

export default router;

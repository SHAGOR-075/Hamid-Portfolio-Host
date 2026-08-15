import express from 'express';
import {
  getTravelPosts,
  getTravelPostById,
  createTravelPost,
  updateTravelPost,
  deleteTravelPost,
  saveAllTravelPosts,
} from '../controllers/travelController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getTravelPosts)
  .post(protect, createTravelPost)
  .put(protect, saveAllTravelPosts);

router.route('/:id')
  .get(getTravelPostById)
  .put(protect, updateTravelPost)
  .delete(protect, deleteTravelPost);

export default router;

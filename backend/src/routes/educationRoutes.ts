import express from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  saveAllEducation,
} from '../controllers/educationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getEducation)
  .post(protect, createEducation)
  .put(protect, saveAllEducation);

router.route('/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;

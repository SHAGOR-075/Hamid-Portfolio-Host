import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from '../controllers/skillController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, createSkill)
  .put(protect, reorderSkills);

router.route('/:id')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;

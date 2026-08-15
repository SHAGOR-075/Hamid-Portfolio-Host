import express from 'express';
import {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject,
  saveAllProjects,
} from '../controllers/projectController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject)
  .put(protect, saveAllProjects);

router.route('/:id')
  .get(getProjectByIdOrSlug)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;

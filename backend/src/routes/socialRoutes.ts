import express from 'express';
import {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  saveAllSocialLinks,
} from '../controllers/socialController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getSocialLinks)
  .post(protect, createSocialLink)
  .put(protect, saveAllSocialLinks);

router.route('/:id')
  .put(protect, updateSocialLink)
  .delete(protect, deleteSocialLink);

export default router;

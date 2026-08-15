import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
  submitContactMessage,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Info routes
router.route('/')
  .get(getContactInfo)
  .put(protect, updateContactInfo);

// Message inbox routes
router.route('/messages')
  .get(protect, getContactMessages)
  .post(submitContactMessage);

router.route('/messages/:id')
  .patch(protect, updateContactMessageStatus)
  .delete(protect, deleteContactMessage);

export default router;

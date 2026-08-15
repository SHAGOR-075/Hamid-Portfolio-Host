import express from 'express';
import { exportDatabase, importDatabase } from '../controllers/backupController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/export', protect, exportDatabase);
router.post('/import', protect, importDatabase);

export default router;

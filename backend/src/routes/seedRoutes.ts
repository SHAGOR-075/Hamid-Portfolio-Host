import express from 'express';
import { runSeed } from '../controllers/seedController';

const router = express.Router();

router.post('/', runSeed);

export default router;

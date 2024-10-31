import { Router } from 'express';
import boardsRouter from './board.js';

const router = Router();
router.use('/boards', boardsRouter);

export default router;

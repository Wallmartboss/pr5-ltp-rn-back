import { Router } from 'express';
import boardsRouter from './board.js';
import usersRouter from './users.js';
import authRouter from './auth.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/boards', boardsRouter);
export default router;

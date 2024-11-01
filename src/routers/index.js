import { Router } from 'express';
import boardsRouter from './board.js';
import usersRouter from './users.js';
import authRouter from './auth.js';
import columnsRouter from './column.js';
import tasksRouter from './tasks.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/columns', columnsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/boards', boardsRouter);
router.use('/tasks', authenticate, tasksRouter);

export default router;

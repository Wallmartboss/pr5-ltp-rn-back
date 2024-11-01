import { Router } from 'express';
import boardsRouter from './board.js';
import usersRouter from './users.js';
import authRouter from './auth.js';
import columnsRouter from './column.js';
import helpRouter from './help.js';

const router = Router();

router.use('/columns', columnsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/boards', boardsRouter);
router.use('/help', helpRouter);
export default router;

import { Router } from 'express';

import usersRouter from './users.js';
import authRouter from './auth.js';
import columnsRouter from './column.js';

const router = Router();

router.use('/columns', columnsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;

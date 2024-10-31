import { Router } from 'express';
import userRouter from './user.js';

const router = Router();

router.use('/user', userRouter);

// export default router;

import { Router } from 'express';
import boardsRouter from './board.js';

const router = Router();
router.use('/boards', boardsRouter);

export default router;
export default router;

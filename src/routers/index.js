import { Router } from 'express';

import columnsRouter from './column.js';
const router = Router();

router.use('/columns', columnsRouter);

export default router;

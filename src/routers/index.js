import { Router } from 'express';
import userRouter from './user.js';

const router = Router();

router.use('/user', userRouter);
app.use("/columns", columnsRouter)

export default router;

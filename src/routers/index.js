import { Router } from 'express';
import boardsRouter from './board.js';
import usersRouter from './users.js';
import authRouter from './auth.js';
import { authenticate } from '../middlewares/authenticate.js'; 
import cardsRouter from './cards.js';
import columnsRouter from './column.js';
import helpRouter from './help.js';


const router = Router();

router.use('/cards', authenticate, cardsRouter);
router.use('/columns', columnsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/boards', authenticate, boardsRouter); 
router.use('/help', helpRouter);


export default router;

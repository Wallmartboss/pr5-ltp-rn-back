// import { Router } from 'express';
// import contactsRouter from './contacts.js';


// const router = Router();

// router.use('/contacts', contactsRouter);
// router.use('/auth', authRouter);

// export default router;

// src/routes/index.js
import { Router } from 'express';
import authRouter from './auth.js';
import boardsRouter from './board.js'; 
import { authenticate } from '../middlewares/authenticate.js'; 
import cardsRouter from './cards.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/boards', authenticate, boardsRouter); 
router.use('/cards', cardsRouter);

export default router;



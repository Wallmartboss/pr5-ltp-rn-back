// import { Router } from 'express';
// import contactsRouter from './contacts.js';


// const router = Router();

// router.use('/contacts', contactsRouter);
// router.use('/auth', authRouter);

// export default router;

// src/routes/index.js
import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import { authenticate } from '../middlewares/authenticate.js'; 

const router = Router();


router.use('/auth', authRouter);

router.use('/tasks', authenticate, tasksRouter);

export default router;



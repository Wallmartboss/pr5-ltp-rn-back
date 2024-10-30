// import { Router } from 'express';
// import contactsRouter from './contacts.js';
// import authRouter from './auth.js';

// const router = Router();

// router.use('/contacts', contactsRouter);
// router.use('/auth', authRouter);

// export default router;

import { Router } from 'express';
import boardsRouter from './board.js';

const router = Router();
router.use('/boards', boardsRouter);

export default router;

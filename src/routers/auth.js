import { Router } from 'express';
import cors from 'cors';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',

  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;

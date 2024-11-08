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
  cors({
    origin: ['https://pr5-ltp-rn-front.vercel.app', 'http://localhost:5173'],
    methods: ['POST'],
    credentials: true,
  }),
  (req, res) => {
    validateBody(registerUserSchema),
      ctrlWrapper(registerUserController),
      res.send({ message: 'Registered successfully' });
  },
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;

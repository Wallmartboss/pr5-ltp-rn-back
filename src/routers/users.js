import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserSchema } from '../validation/users.js';
import {
  getCurrentUserController,
  updateThemeController,
  updateUserController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));

router.patch('/theme', authenticate, ctrlWrapper(updateThemeController));

router.patch(
  '/info',
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;

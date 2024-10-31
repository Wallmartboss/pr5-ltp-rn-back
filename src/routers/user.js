import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, updateUserSchema } from '../validation/user.js';
import { getCurrentUserController, loginUserController, logoutUserController, registerUserController, updateThemeController, updateUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from "../middlewares/multer.js";
import { validateBody } from '../middlewares/validateBody.js';
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
router.post(
    '/logout',
    ctrlWrapper(logoutUserController)
);

router.get(
    '/current',
    authenticate,
    ctrlWrapper(getCurrentUserController)
);

router.patch('/themes',
    authenticate,
    ctrlWrapper(updateThemeController));

router.patch('/update',
    authenticate,
    upload.single('avatar'),
    validateBody(updateUserSchema),
    ctrlWrapper(updateUserController));

export default router;

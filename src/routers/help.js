import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { needHelpSchema } from '../validation/help.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { requestNeedHelpController } from '../controllers/help.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(needHelpSchema),
  ctrlWrapper(requestNeedHelpController),
);

export default router;

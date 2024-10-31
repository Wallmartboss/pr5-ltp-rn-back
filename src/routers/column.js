import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { columnSchema } from '../validation/column.js';
import {
  deleteById,
  postColumn,
  updateById,
} from '../controllers/columnController.js';

import { isValidId } from '../middlewares/isValidId.js';

const columnsRouter = express.Router();

columnsRouter.post(
  '/:dashboardId',
  authenticate,
  isValidId,
  validateBody(columnSchema, `missing fields`),
  postColumn,
);

columnsRouter.patch('/:id', authenticate, isValidId, updateById);

columnsRouter.delete('/:id', authenticate, isValidId, deleteById);

export default columnsRouter;

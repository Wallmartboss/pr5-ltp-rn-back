import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { validateBody } from '../middlewares/validateBody';
import { columnSchema } from '../db/columnSchema';
import { deleteById, postColumn, updateById } from '../controllers/columnController';

import { isValidId } from '../middlewares/isValidId';

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

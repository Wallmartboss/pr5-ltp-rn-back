import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { columnSchema } from '../validation/column.js';
import {
  getAllColumnsController,
  deleteById,
  postColumn,
  updateById,
} from '../controllers/columnController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const columnsRouter = express.Router();
columnsRouter.get(
  '/:boardId',
  authenticate,
  ctrlWrapper(getAllColumnsController),
);

// Маршрут для створення нової колонки
columnsRouter.post(
  '/:boardId',
  authenticate,
  isValidId('boardId'),
  validateBody(columnSchema),
  ctrlWrapper(postColumn),
);
columnsRouter.patch(
  '/:columnId',
  authenticate,
  isValidId('columnId'),
  validateBody(columnSchema),
  ctrlWrapper(updateById),
);

columnsRouter.delete(
  '/:columnId',
  authenticate,
  isValidId('columnId'),
  ctrlWrapper(deleteById),
);

export default columnsRouter;

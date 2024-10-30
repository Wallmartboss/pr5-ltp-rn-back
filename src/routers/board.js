import { Router } from 'express';

import {
  getBoardByIdController,
  createBoardController,
  updateBoardController,
  deleteBoardController,
} from '../controllers/boardController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authorizeUserBoards } from '../middlewares/authorizeUserBoards.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardSchema, updateBoardSchema } from '../validation/board.js';

const boardsRouter = Router();

boardsRouter.get('/:id', ctrlWrapper(getBoardByIdController));

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);

boardsRouter.patch(
  '/:id',
  authenticate,
  authorizeUserBoards,
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);

boardsRouter.delete(
  '/:id',
  authenticate,
  authorizeUserBoards,
  ctrlWrapper(deleteBoardController),
);

export default boardsRouter;

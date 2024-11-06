import { Router } from 'express';

import {
  getAllBoardsController,
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

boardsRouter.get('/', authenticate, ctrlWrapper(getAllBoardsController));
boardsRouter.get(
  '/:id',
  authenticate,
  authorizeUserBoards,
  ctrlWrapper(getBoardByIdController),
); // додала щоб лише власник дошки міг її отримати за id

boardsRouter.post(
  '/',
  authenticate,
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

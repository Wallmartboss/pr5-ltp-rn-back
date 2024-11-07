import { Router } from 'express';
import {
  getAllBoardsController,
  getBoardByIdController,
  createBoardController,
  updateBoardController,
  deleteBoardController,
} from '../controllers/boardController.js';
import cardsRouter from './cards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authorizeUserBoards } from '../middlewares/authorizeUserBoards.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardSchema, updateBoardSchema } from '../validation/board.js';
import { authenticate } from '../middlewares/authenticate.js';

const boardsRouter = Router();

boardsRouter.use(authenticate); // Додаємо аутентифікацію для всіх маршрутів

boardsRouter.get('/', ctrlWrapper(getAllBoardsController));

boardsRouter.get('/:id', authorizeUserBoards, ctrlWrapper(getBoardByIdController));

boardsRouter.post('/', validateBody(createBoardSchema), ctrlWrapper(createBoardController));

boardsRouter.patch('/:id', authorizeUserBoards, validateBody(updateBoardSchema), ctrlWrapper(updateBoardController));

boardsRouter.delete('/:id', authorizeUserBoards, ctrlWrapper(deleteBoardController));

// Підмаршрут для карток, зв'язаних із дошкою та колонкою
boardsRouter.use('/:boardId/columns/:columnId/cards', cardsRouter);

export default boardsRouter;

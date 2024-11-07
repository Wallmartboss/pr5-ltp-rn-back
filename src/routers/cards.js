import { Router } from 'express';
import {
  getAllCardsController,
  getCardByIdController,
  createCardController,
  updateCardController,
  deleteCardController,
  moveCardController,
} from '../controllers/cards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { cardSchema } from '../validation/cards.js';

const cardsRouter = Router({ mergeParams: true }); // `mergeParams` для доступу до `boardId` і `columnId`

cardsRouter.get('/', getAllCardsController);
cardsRouter.get('/:cardId', isValidId, getCardByIdController);
cardsRouter.post('/', validateBody(cardSchema), createCardController);
cardsRouter.patch(
  '/:cardId',
  isValidId,
  validateBody(cardSchema),
  updateCardController,
);
cardsRouter.delete('/:cardId', isValidId, deleteCardController);
cardsRouter.patch('/move/:cardId', moveCardController);

export default cardsRouter;

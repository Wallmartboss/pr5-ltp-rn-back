import { Card } from '../db/cards.js';

import createError from 'http-errors';
import { Column } from '../db/columnSchema.js';

export const getAllCards = async (boardId) => {
  return await Card.find({ boardId });
};

export const getCardById = async (cardId, boardId) => {
  return await Card.findOne({ _id: cardId, boardId });
};

export const createCard = async (payload) => {
  return await Card.create(payload);
};

export const updateCard = async (cardId, boardId, payload) => {
  const { newColumnId } = payload;


  if (newColumnId) {
    payload.columnId = newColumnId;
  }
  return await Card.findOneAndUpdate({ _id: cardId, boardId }, payload, { new: true });
};


export const deleteCard = async (cardId) => {
  return await Card.findByIdAndDelete(cardId);
};




export const moveCard = async (cardId, newColumnId, boardId) => {
  const card = await Card.findById(cardId);
  if (!card) {
    throw createError(404, 'Card not found');
  }

  if (card.boardId.toString() !== boardId) {
    throw createError(400, 'Card does not belong to the specified board');
  }

  const newColumn = await Column.findById(newColumnId);
  if (!newColumn || newColumn.board.toString() !== boardId) {
    throw createError(400, 'Invalid column or column does not belong to the specified board');
  }

  if (card.columnId) {
    await Column.findByIdAndUpdate(card.columnId, { $pull: { cards: cardId } });
  }

  await Column.findByIdAndUpdate(newColumnId, { $push: { cards: cardId } });

  card.columnId = newColumnId;
  await card.save();

  return card;
};

import { Card } from '../db/cards.js';

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


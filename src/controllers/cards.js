import createError from 'http-errors';
import { Card } from '../db/cards.js';
import mongoose from 'mongoose';
import { updateCard } from '../services/cards.js';

export const getAllCardsController = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params; // отримуємо boardId та columnId з параметрів запиту

    // Шукаємо картки, що належать до зазначеної дошки та колонки
    const cards = await Card.find({ boardId, columnId });

    if (!cards || cards.length === 0) {
      throw createError(404, 'No cards found in this column');
    }

    res.json({
      status: 200,
      message: `Cards retrieved successfully for boardId ${boardId} and columnId ${columnId}`,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};



export const getCardByIdController = async (req, res, next) => { 
  try {
    const { boardId, cardId } = req.params;
    const card = await Card.findOne({ _id: cardId, boardId });
    
    if (!card) {
      throw createError(404, 'Card not found');
    }

    res.json({
      status: 200,
      message: 'Successfully found the card!',
      data: card,
    });
  } catch (error) {
    next(error);
  }
};


export const createCardController = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const { boardId, columnId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId) || !mongoose.Types.ObjectId.isValid(columnId)) {
      return res.status(400).json({ message: 'Invalid boardId or columnId' });
    }

    const cardData = { title, description, priority, boardId, columnId };
    const card = await Card.create(cardData);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a card!',
      data: card,
    });
  } catch (error) {
    next(error);
  }
};




export const deleteCardController = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const task = await Card.findByIdAndDelete(cardId);
    if (!task) {
      throw createError(404, 'Card not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateCardController = async (req, res, next) => {
  try {
    const { boardId, cardId } = req.params;
    const { newColumnId } = req.body;  

    const updatedTask = await updateCard(cardId, boardId, { 
      ...req.body, 
      newColumnId 
    });

    if (!updatedTask) {
      throw createError(404, 'Card not found');
    }

    res.json({
      status: 200,
      message: `Successfully updated Card with id ${cardId}!`,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};



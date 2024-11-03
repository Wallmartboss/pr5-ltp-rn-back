import createError from 'http-errors';
import { Card } from '../db/cards.js';

export const getAllCardsController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const cards = await Card.find({ boardId });
    res.json({
      status: 200,
      message: 'Successfully found cards!',
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
    const { boardId } = req.params; 
    const { title, description, color, columnId } = req.body;

  
    if (!title || !description || !color || !columnId) {
      throw createError(400, 'All fields (title, description, color, columnId) are required.');
    }

    const cardData = { title, description, color, columnId, boardId }; 
    const card = await Card.create(cardData);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a task!',
      data: card,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteCardController = async (req, res, next) => {
  try {
    const { boardId, cardId } = req.params;
    const task = await Card.findOneAndDelete({ _id: cardId, boardId });
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
    const updatedTask = await Card.findOneAndUpdate(
      { _id: cardId, boardId },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      throw createError(404, 'Task not found');
    }
    res.json({
      status: 200,
      message: `Successfully updated task with id ${cardId}!`,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

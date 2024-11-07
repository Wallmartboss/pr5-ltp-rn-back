import createError from 'http-errors';
import { Card } from '../db/cards.js';
import mongoose from 'mongoose';

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
    const { boardId, columnId, cardId } = req.params;

    const updatedTask = await Card.findOneAndUpdate(
      { _id: cardId, boardId, columnId },
      req.body,
      { new: true }
    );

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


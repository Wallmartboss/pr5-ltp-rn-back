import createError from 'http-errors';
import { Card } from '../db/cards.js';
import mongoose from 'mongoose';
import { Column } from '../db/columnSchema.js'; //Леся

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
    const { title, description, color, boardId, columnId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(boardId) ||
      !mongoose.Types.ObjectId.isValid(columnId)
    ) {
      return res.status(400).json({ message: 'Invalid boardId or columnId' });
    }

    const cardData = { title, description, color, boardId, columnId };
    const newCard = await Card.create(cardData); // Змінено на newCard Леся
    console.log('Created card:', newCard);

    // Додавання картки в колонку Леся
    const updatedColumn = await Column.findByIdAndUpdate(
      columnId,
      { $push: { cards: newCard._id } },
      { new: true }, // Повертає оновлену колонку
    );
    console.log('Column after adding card:', updatedColumn);
    if (!updatedColumn) {
      //Леся
      return res.status(404).json({ message: 'Column not found' });
    }

    console.log('Updated column with new card:', updatedColumn);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a card!',
      data: newCard,
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
      { new: true },
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

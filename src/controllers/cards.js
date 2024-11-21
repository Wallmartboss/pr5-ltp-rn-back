import createError from 'http-errors';
import { Card } from '../db/cards.js';
import { Column } from '../db/columnSchema.js';
import mongoose from 'mongoose';
import { updateCard } from '../services/cards.js';

export const getAllCardsController = async (req, res, next) => {
  try {
    const { boardId } = req.params; 

    const cards = await Card.find({ boardId });

    if (!cards || cards.length === 0) {
      throw createError(404, 'No cards found in this column');
    }

    res.json({
      status: 200,
      message: `Cards retrieved successfully for boardId ${boardId} `,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

export const getCardByIdController = async (req, res, next) => {
  try {
    const { boardId } = req.body;
    const { cardId } = req.params;
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
    const { title, description, priority, boardId, columnId, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({ message: 'Invalid boardId' });
    }

    if (columnId && !mongoose.Types.ObjectId.isValid(columnId)) {
      return res.status(400).json({ message: 'Invalid columnId' });
    }

    const cardData = {
      title,
      description,
      priority,
      boardId,
      columnId,
      date: date ? new Date(date) : null, 
    };

    const newCard = await Card.create(cardData);
    console.log('Created card:', newCard);

    if (columnId) {
      const updatedColumn = await Column.findByIdAndUpdate(
        columnId,
        { $push: { cards: newCard._id } },
        { new: true },
      );

      if (!updatedColumn) {
        return res.status(404).json({ message: 'Column not found' });
      }

      console.log('Updated column with new card:', updatedColumn);
    }

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
    const { cardId } = req.params;
    const { boardId, newColumnId, ...updateData } = req.body;
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);
    
    if (!mongoose.Types.ObjectId.isValid(cardId) || !mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({ message: 'Invalid cardId or boardId format' });
    }
    if (newColumnId && !mongoose.Types.ObjectId.isValid(newColumnId)) {
      return res.status(400).json({ message: 'Invalid newColumnId format' });
    }

    if (newColumnId) {
      updateData.columnId = newColumnId;
    }

    const updatedCard = await updateCard(cardId, boardId, updateData);

    if (!updatedCard) {
      throw createError(404, 'Card not found');
    }

    if (newColumnId) {
      await Column.findByIdAndUpdate(updateData.columnId, { $pull: { cards: cardId } });
      await Column.findByIdAndUpdate(newColumnId, { $push: { cards: updatedCard._id } }, { new: true });
    }

    return res.json({
      status: 200,
      message: `Successfully updated Card with id ${cardId}!`,
      data: updatedCard,
    });
  } catch (error) {
    next(error);
  }
};

